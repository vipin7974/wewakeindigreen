/**
 * DOCUMENT — biom (singleton)
 * --------------------------------------------------------------
 * BioMANS feature/spec section.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'biom',
  title: 'BioMANS Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "|BioMANS| — The Future of Materials"',
    }),
    defineField({name: 'paragraph1', title: 'Paragraph 1', type: 'text'}),
    defineField({name: 'paragraph2', title: 'Paragraph 2', type: 'text'}),

    // Feature bullet rows with a check icon.
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Raw materials sub-grid (e.g. "Beads" / "Sheets").
    defineField({name: 'rawMaterialsTitle', title: 'Raw materials heading', type: 'string'}),
    defineField({
      name: 'rawMaterials',
      title: 'Raw materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (emoji)', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'desc', title: 'Description', type: 'text'}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'BioMANS Section'})},
})
