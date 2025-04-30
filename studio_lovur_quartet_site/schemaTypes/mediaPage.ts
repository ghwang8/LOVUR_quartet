import { defineType, defineField } from 'sanity'

// Singleton Press Kit (only one instance)
export const pressKit = defineType({
    name: 'pressKit',
    title: 'Press Kit',
    type: 'document',
    fields: [
      defineField({
        name: 'downloadLink',
        title: 'Download Link',
        type: 'url',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        initialValue: 'Download our press kit here'
      }),
      defineField({
        name: 'year',
        title: 'Year',
        type: 'string',
        description: 'The year for the press kit (e.g., 2025)',
        initialValue: new Date().getFullYear().toString(),
        validation: Rule => Rule.required()
      })
    ],
    // Ensures only one document can exist
    __experimental_omnisearch_visibility: false,
    preview: {
      prepare() {
        return {
          title: 'Press Kit Settings'
        }
      }
    }
  })
  

// Social Video Schema
export const socialVideo = defineType({
  name: 'socialVideo',
  title: 'Social Media Video',
  type: 'document',
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the video (YouTube, Vimeo, etc.)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    })
  ]
})

// Image Gallery Schema
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for accessibility',
      validation: Rule => Rule.required()
    })
  ]
})