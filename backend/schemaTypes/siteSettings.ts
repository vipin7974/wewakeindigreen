/**
 * DOCUMENT — siteSettings (singleton)
 * --------------------------------------------------------------
 * Global, cross-page values that never belong to a single section.
 * Editors update one document and it propagates everywhere.
 *
 * Includes: site title, logo, contact email/phone, social links,
 * SEO defaults, and the Google-Form endpoint used by the contact
 * form. Keeping these here avoids hard-coding values in the code.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site title', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),

    // Logo image used in the navbar + footer.
    defineField({name: 'logo', title: 'Logo', type: 'imageOrUrl'}),

    // Default contact details (also rendered in the footer).
    defineField({name: 'email', title: 'Contact email', type: 'string'}),
    defineField({name: 'phone', title: 'Contact phone', type: 'string'}),

    // Social profiles displayed in the footer.
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),

    /**
     * GOOGLE FORM — Contact form integration.
     * ------------------------------------------------------
     * Replace with the user's real form action URL and the
     * entry IDs from their Google Form when ready. The frontend
     * reads these fields and POSTs the form fields, which then
     * automatically lands rows in the linked Google Sheet.
     */
    defineField({
      name: 'googleFormActionUrl',
      title: 'Google Form action URL',
      type: 'url',
      description:
        'Public URL ending in /formResponse. Used by the Contact form to deliver submissions to your Google Sheet.',
    }),
    defineField({name: 'gfFirstNameEntry', title: 'First name entry ID', type: 'string'}),
    defineField({name: 'gfLastNameEntry', title: 'Last name entry ID', type: 'string'}),
    defineField({name: 'gfEmailEntry', title: 'Email entry ID', type: 'string'}),
    defineField({name: 'gfTopicEntry', title: 'Topic entry ID', type: 'string'}),
    defineField({name: 'gfMessageEntry', title: 'Message entry ID', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
