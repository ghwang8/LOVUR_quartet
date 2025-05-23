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
    }
  ]
})
