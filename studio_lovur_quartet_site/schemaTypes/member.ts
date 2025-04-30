import { defineType } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Quartet Member',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order members appear in on the website',
    },
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position in Quartet',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Member Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bioPhoto',
      title: 'Photo for Full Bio Page',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      slug: 'slug'
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug?.current ? `/members/${slug.current}` : 'Missing slug'
      }
    }
  }
})
