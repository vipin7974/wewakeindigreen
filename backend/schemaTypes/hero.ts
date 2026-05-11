import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',

  title: 'Hero Section',

  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'badge1',
      title: 'Badge1',
      type: 'string',
    }),
    defineField({
      name: 'badge2',
      title: 'Badge2',
      type: 'string',
    }),
    defineField({
      name: 'badge3',
      title: 'Badge3',
      type: 'string',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
  ],
})
