import { defineType, defineField } from 'sanity'
// This is the Sanity Schema ("Blueprint" for the Admin dashboard)
// This is where you can make price optional
export default defineType({
  name: 'aboutPage',
  title: 'About Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
          validation: Rule => Rule.required()
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
        defineField({
          type: 'object',
          name: 'headingBreak',
          title: 'Heading Break',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading Text',
              type: 'string',
              validation: Rule => Rule.required()
            }),
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare(selection) {
              return {
                title: `Heading: ${selection.title}`,
              }
            },
          },
        }),
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      options: {
        dateFormat: 'MMMM, YYYY',
      },
      initialValue: new Date().toISOString(),
      validation: Rule => Rule.required()
    })
  ]
})