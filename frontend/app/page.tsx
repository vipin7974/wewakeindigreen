/**
 * HOMEPAGE — Server Component
 * --------------------------------------------------------------
 * Fetches every section's content from Sanity in parallel, then
 * hydrates the components.
 *
 * RENDERING MODE: `force-dynamic`
 *   Every request hits Sanity fresh. Editors save → next page
 *   load shows the change. No ISR window to wait through.
 *
 * The <LiveRefresh /> island also pings `router.refresh()` every
 * 30 s so an OPEN tab pulls updates without the user reloading.
 */
export const dynamic = "force-dynamic";

import LiveRefresh from "./components/shared/LiveRefresh";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Ticker from "./components/layout/Ticker";
import About from "./components/about/About";
import Story from "./components/story/Story";
import Biom from "./components/biom/Biom";
import ProductsSection from "./components/products/Products";
import SdgSection from "./components/sdg/SdgSection";
import BlogSection from "./components/blog/BlogSection";
import VisionMissionSection from "./components/vision/VisionMissionSection";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/footer/Footer";

import { client } from "./lib/sanity/client";
import {
  heroQuery,
  blogsQuery,
  siteSettingsQuery,
  navbarQuery,
  tickerQuery,
  aboutQuery,
  storyQuery,
  biomQuery,
  productsSectionQuery,
  productsQuery,
  sdgQuery,
  blogSectionQuery,
  visionMissionQuery,
  contactQuery,
  footerQuery,
} from "./lib/sanity/queries";

export default async function HomePage() {
  // Parallel fetch — one round-trip per query, but kicked off
  // together. Promise.all minimises total wait time.
  const [
    site,
    navbar,
    hero,
    ticker,
    about,
    story,
    biom,
    productsSection,
    products,
    sdg,
    blogSection,
    visionMission,
    contact,
    footer,
    blogs,
  ] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(navbarQuery),
    client.fetch(heroQuery),
    client.fetch(tickerQuery),
    client.fetch(aboutQuery),
    client.fetch(storyQuery),
    client.fetch(biomQuery),
    client.fetch(productsSectionQuery),
    client.fetch(productsQuery),
    client.fetch(sdgQuery),
    client.fetch(blogSectionQuery),
    client.fetch(visionMissionQuery),
    client.fetch(contactQuery),
    client.fetch(footerQuery),
    client.fetch(blogsQuery),
  ]);

  return (
    <main>
      {/* Background ticker that pulls fresh CMS content every 30 s */}
      <LiveRefresh />
      <Navbar data={navbar} />
      <Hero data={hero} />
      <Ticker data={ticker} />
      <About data={about} />
      <Story data={story} />
      <Biom data={biom} />
      <ProductsSection section={productsSection} products={products} />
      <SdgSection data={sdg} />
      <BlogSection blogs={blogs} section={blogSection} />
      <VisionMissionSection data={visionMission} />
      <ContactSection data={contact} site={site} />
      <Footer data={footer} />
    </main>
  );
}
