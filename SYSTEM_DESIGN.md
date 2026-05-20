# WeWake IndiGreen — System Design Guide

> A teaching companion to the codebase. Reading this file from
> top to bottom should give you the mental model behind every
> architectural choice, not just *what* we did, but *why*.

---

## 1. The high-level architecture

This project is a **headless CMS website**. It has two cleanly separated halves that communicate over HTTP/JSON:

```
┌──────────────────┐           HTTP (GROQ / images)          ┌──────────────────┐
│  Sanity Studio   │ ◀──────────────────────────────────────▶│  Next.js App     │
│   (the backend)  │       https://*.api.sanity.io           │   (the frontend) │
│                  │                                          │                  │
│  - schemas       │                                          │  - server pages  │
│  - admin UI      │                                          │  - components    │
│  - content store │                                          │  - SSR / ISR     │
└──────────────────┘                                          └──────────────────┘
```

The split matters because it gives each side a single responsibility:

- The **backend** (Sanity Studio under `/backend`) only cares about *modelling and editing content*. It doesn't know anything about how a page looks.
- The **frontend** (Next.js app under `/frontend`) only cares about *rendering content into HTML and reacting to user input*. It doesn't know how the editor types data.

This pattern is called **headless CMS** — the "head" (the rendering layer) is detached from the body (the content store).

---

## 2. Why headless instead of monolithic CMS?

A traditional CMS (WordPress, Drupal) ships the editor and the renderer as one box. That's fine until you want:

- a fast React/Next.js front-end with great Core Web Vitals
- the same content shown on web, mobile, kiosks, partners' sites
- type-safety in the rendering layer
- to deploy the frontend separately from content updates

Headless solves all of that. **Sanity** is one of the better headless CMSes because:

1. Schemas are written as TypeScript modules → version-controlled like the rest of the code.
2. It exposes content over a graph query language called **GROQ**, which is much more efficient than REST round-trips.
3. Image assets are served from a global CDN with on-the-fly transforms.
4. Editors get a real-time, collaborative Studio UI for free.

---

## 3. Repository structure

```
wewakeindigreen/
├─ backend/                ← Sanity Studio (CMS)
│  ├─ sanity.config.ts
│  └─ schemaTypes/
│     ├─ index.ts          ← registers every schema
│     ├─ objects/          ← reusable object types
│     ├─ siteSettings.ts   ← global config singleton
│     ├─ navbar.ts         ← per-section singletons …
│     ├─ hero.ts
│     ├─ ticker.ts
│     ├─ about.ts
│     ├─ story.ts
│     ├─ biom.ts
│     ├─ product.ts        ← collection (many docs)
│     ├─ productsSection.ts
│     ├─ sdg.ts
│     ├─ blogSection.ts
│     ├─ visionMission.ts
│     ├─ contact.ts
│     ├─ footer.ts
│     └─ blog.ts
└─ frontend/               ← Next.js 16 (App Router)
   ├─ app/
   │  ├─ page.tsx          ← homepage (server component)
   │  ├─ blog/[slug]/page.tsx
   │  ├─ components/<section>/
   │  ├─ lib/sanity/
   │  │  ├─ client.ts      ← typed Sanity client
   │  │  ├─ queries.ts     ← GROQ queries
   │  │  ├─ image.ts       ← image URL builder + resolver
   │  │  ├─ types.ts       ← shared TS types
   │  │  └─ fallbacks.ts   ← static fallback content
   │  └─ lib/util.ts       ← splitTitle, scrollToHash …
   └─ globals.css
```

Folder layout is itself a design decision. **Component co-location** — putting a section's TSX next to its data and styles — means a developer ramping up can grep one folder and find everything related to "About" or "Hero".

---

## 4. Schema design — modelling content

We followed a few rules:

### 4.1. One section, one document
The site is a long single page. Each section maps to one **singleton document** in Sanity (`navbar`, `hero`, `about`, …). A singleton is just a document type the editor only ever creates one of. We hint to editors with the `preview.prepare` override (`{title: 'Hero Section'}`).

### 4.2. Collections separate from copy
Where the section has *one* set of repeating items (products), we split:

- `productsSection` — the *intro copy* for the section (one doc).
- `product` — the *cards* (many docs, ordered by an `order` field).

The frontend joins the two with a `Promise.all` so the page query is still parallel.

### 4.3. Reusable object types
`imageOrUrl` and `navLink` live in `objects/`. They're not documents — they're embedded shapes you can drop into any field. This avoids ten copy-pasted "image + URL + alt" definitions and keeps the studio UI consistent.

### 4.4. Image flexibility
Editors often paste a Google image or unsplash URL while the brand photographer is still shooting. Our `imageOrUrl` object lets them either upload a Sanity asset *or* drop in a URL. The frontend `resolveImage()` helper tries each one in turn and returns whichever is set.

### 4.5. Pipe-split titles
Many headlines have one italic/accent word. Rather than building a full Portable Text rich-text field just to mark a word as italic, we adopted a convention:

```
Title:  "We build|tomorrow's|materials from today's waste"
                ^Part 1   ^Italic accent (middle)
```

`splitTitle()` in `lib/util.ts` does the split. The component renders `[p1, <em>p2</em>, p3]`. Editors don't need to know HTML; they just type `|` where the colour should change.

### 4.6. Fallback layer
`fallbacks.ts` mirrors the original hard-coded content. The `withFallback()` helper merges fetched data with fallbacks field-by-field: empty arrays and empty strings are treated as "missing" and fall through. This means:

- A fresh studio with zero content still renders a polished page.
- Editors can fill the CMS one field at a time — the rest keeps working.
- Developers can preview the site without booting Sanity.

This is a **progressive enhancement** pattern applied to content.

---

## 5. Data flow — from edit to render

```
Editor types → Sanity Content Lake → GROQ query → Next.js server → React HTML → browser
       ▲                                                                            │
       └────────────── ISR refresh every 60s ───────────────────────────────────────┘
```

### 5.1. The Sanity client (`lib/sanity/client.ts`)
A tiny `createClient` call configured from env vars:

```ts
projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
apiVersion: '2026-05-08',
useCdn: false,
```

`useCdn: false` is on purpose. With ISR we already cache the rendered HTML at the edge; we want the underlying GROQ query to hit the live API so refreshed content shows up the moment the ISR window expires.

### 5.2. GROQ queries (`lib/sanity/queries.ts`)
GROQ ("Graph Relational Object Queries") is to Sanity what GraphQL is to other APIs. A query for the hero looks like:

```groq
*[_type == "hero"][0]{
  title,
  eyebrow,
  primaryCtaLabel,
  primaryCtaHref,
  stats[]{value, label},
  "backgroundImage": backgroundImage{ "image": image, "url": url, "alt": alt }
}
```

`*[_type == "hero"]` is a filter, `[0]` takes the first match (singleton). The braces are a **projection** — they cherry-pick the fields we render. We never over-fetch.

### 5.3. The page (`app/page.tsx`)
The homepage is a **Server Component**. It:

```ts
const [site, navbar, hero, …, blogs] = await Promise.all([
  client.fetch(siteSettingsQuery),
  client.fetch(navbarQuery),
  …
]);
```

All queries fire in parallel. The page renders once on the server, gets cached for 60 s (`export const revalidate = 60`), and is served to subsequent visitors as static HTML until it stales.

This is **Incremental Static Regeneration (ISR)** — best of both worlds:

- as fast as a static site (no DB hit on most requests)
- as fresh as a dynamic site (content refreshes automatically)

### 5.4. Components
Each section component is a small React function that accepts `data` (or two props in the case of Products / Contact). It merges with the fallback, then maps over arrays of CMS items. They look almost identical, which is on purpose — repetition makes new sections trivial to add.

---

## 6. Separation of concerns

A useful way to keep large React codebases sane is to slice them into thin layers, each with one job:

| Layer       | Lives in                     | Knows about           | Doesn't know about       |
|-------------|------------------------------|-----------------------|--------------------------|
| Schema      | `backend/schemaTypes/`       | data shape            | rendering                |
| Query       | `frontend/app/lib/sanity/queries.ts` | shape & projection | components               |
| Types       | `frontend/app/lib/sanity/types.ts`   | TS contracts        | how data is fetched      |
| Fallback    | `frontend/app/lib/sanity/fallbacks.ts` | sensible defaults | the network              |
| Page        | `frontend/app/page.tsx`      | which sections to mount, in what order | rendering details |
| Section     | `frontend/app/components/<x>` | DOM + styling         | data fetching            |

Whenever a layer reaches "across" a boundary the design starts to rot. Keep them apart and the code stays maintainable.

---

## 7. Resilience patterns

Even a beautifully modelled CMS can return partial data. We use a few patterns to stay defensive:

- **`withFallback(data, fallback)`** — field-by-field merge so partial CMS state never breaks the UI.
- **`resolveImage(source, fallbackUrl)`** — tries uploaded asset → URL → fallback string.
- **Empty-array short-circuits** — every `.map()` over a CMS array is preceded by `?? []`.
- **No-data hides the section** — e.g. the blog section returns `null` if there are zero posts, instead of rendering an empty grid.
- **Date safety** — bad ISO strings are detected and emit "" rather than throwing in `format()`.

These are tiny, individually unremarkable choices, but together they make the difference between a brittle page and one that keeps showing nicely even mid-content-migration.

---

## 8. Performance choices

- **Server components** mean we ship *zero* React runtime for static sections. Only interactive components (`"use client"`) hydrate on the browser.
- **`Promise.all`** keeps the server-render path one round-trip wide instead of `N` queries deep.
- **ISR** caches the rendered HTML at the edge.
- **`next/image`** is used everywhere to leverage automatic resizing, WebP and lazy-loading.
- The **image URL builder** generates Sanity CDN URLs with width/height params so we never download a 4MB photo to render a thumbnail.

---

## 9. Interaction layer

The site is mostly content but it does have interactive bits:

- **Smooth scroll** — anchor links and hero CTAs use `scrollToHash()` so the page slides instead of jumping. Mobile drawer auto-closes on tap.
- **Navbar** — listens to `window.scroll` to toggle a frosted-glass effect.
- **Product modal** — opens on card click, closes on overlay click, X button, or `Escape`. Body scroll is locked while open so iOS doesn't jitter.
- **Story orbit canvas** — an HTML5 canvas with hit-testing for hover + click. Items come from the CMS now, so editors can add a 4th or 5th node and the geometry redistributes itself (angles computed as `360 / count`).
- **Contact form** — controlled inputs + a hidden-iframe submission to a Google Form.

### 9.1. The Google Form trick

Google Forms is the cheapest viable way to capture form submissions into a Google Sheet without writing a backend. But its `/formResponse` endpoint doesn't return CORS headers, so a plain `fetch()` from a browser would error.

The classic workaround: a hidden `<iframe name="hidden_iframe">` plus a form whose `target="hidden_iframe"`. The browser POSTs the form normally, Google's redirect lands inside the invisible iframe, and our page never navigates.

To switch the user's real form on:

1. Create a Google Form linked to a Sheet.
2. Copy its public `formResponse` URL into **Site Settings → Google Form action URL** in Sanity.
3. Inspect the form's HTML to find each input's `entry.NNNNNN` ID and paste them into the matching fields in Site Settings.

Until those are filled in, the dummy IDs in the fallback object let the UI run without crashing.

---

## 10. Styling strategy

- **Tailwind v4** for layout utilities (flex/grid/spacing).
- **Hand-written CSS** in `globals.css` for the bespoke decorative effects — gradients, the canvas orbit, the floating boxes, etc.
- **MUI** for one or two button / drawer primitives where MUI's behaviour is easier to inherit than rebuild.

The decorative `.hero-box`, `.about-mini-box`, etc. are hidden on phones (last block in `globals.css`) so they never cause horizontal scrollbars.

---

## 11. Responsive strategy

We follow a **content-first** breakpoint approach:

- Default = mobile. Layouts collapse to single column.
- `sm:` and `md:` widen typography, add hover affordances.
- `lg:` and `xl:` open up multi-column grids.

Where a desktop-only decorative absolute element looked terrible on mobile, we add a single `@media (max-width: 768px)` override at the bottom of `globals.css` rather than re-author the original block.

---

## 12. Adding a new section — a worked example

Say marketing wants a new "Team" section.

1. **Schema** — add `backend/schemaTypes/team.ts` with whatever fields are needed (members array of name/role/photo/bio). Register it in `index.ts`.
2. **Query** — add a `teamQuery` in `frontend/app/lib/sanity/queries.ts` projecting just the fields you'll render.
3. **Type** — extend `lib/sanity/types.ts` with a `TeamData` interface.
4. **Fallback** — add a `teamFallback` in `lib/sanity/fallbacks.ts` so the section still renders before content is created.
5. **Component** — create `app/components/team/Team.tsx` with the same shape as the other sections (props → `withFallback` → render).
6. **Page** — add the query to the `Promise.all` and mount `<Team data={team} />` in the right slot.

Six small, additive changes — no edits to existing sections. This is the payoff of the layered architecture.

---

## 13. Things deliberately *not* done (and why)

- **No Portable Text on every paragraph.** Editors don't need a 30-toolbar rich-text editor for a one-line subtitle. Strings + the `|` convention are simpler and faster.
- **No tRPC / API routes.** The page is mostly static; adding RPC would add complexity for no speed benefit.
- **No client-side data fetching for sections.** Hydration cost on a long landing page is too high; server-rendered HTML with ISR is faster and SEO-friendlier.
- **No auth.** Public site, no need.

---

## 14. Glossary

- **Headless CMS** — content store + editor without an opinionated renderer.
- **GROQ** — Sanity's graph query language.
- **ISR** — Incremental Static Regeneration; static HTML rebuilt on a timer.
- **Server Component** — a React component that only ever runs on the server; ships no JS to the browser.
- **Client Component** — opted in with `"use client"`; hydrates on the browser, can use hooks.
- **Singleton** — a content type the editor only ever creates one document of.
- **Portable Text** — Sanity's portable rich-text format (block + spans + marks).

---

## 15. Cheat sheet

- **Edit content** → log in to Sanity Studio, open the relevant document.
- **Add a new field** → edit the schema → push → Studio shows it.
- **Refresh published site** → wait up to 60 s for ISR, or hit revalidate.
- **Run locally** → `cd frontend && npm run dev` (and `cd backend && npm run dev` for Studio).
- **Deploy** → Vercel for frontend, Sanity Cloud for Studio.

That's the whole system. Read each layer's file once; you'll see they all follow the same shape, just with different data. **Consistency is the design.**
