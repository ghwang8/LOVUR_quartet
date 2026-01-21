import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'concertPage',
  title: 'Concert Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title Text',
      type: 'string',
      initialValue: 'Upcoming Concerts',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle Text',
      type: 'string',
      description: 'Optional subtitle text below the main title'
    })
  ]
})