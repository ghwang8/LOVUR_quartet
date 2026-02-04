import { Rule } from 'sanity';

// This is the golden file for why candlelight is missing
// small change
const concertType = {
  name: 'concert',
  type: 'document',
  title: 'Concert',
  fields: [
    { name: 'title', type: 'string', title: 'Concert Title' },
    { name: 'subHeading', type: 'string', title: 'Subheading (e.g. “Taylor Swift Edition”) (optional)' },
    {
      name: 'isArchived',
      type: 'boolean',
      title: 'Archive Concert (Manual)',
      description: 'Toggle this ON to manually hide the concert from the upcoming list immediately. \n If you want to unhide the archived concert, you need to untoggle this checkbox and change the current date to a one that is in the future. \n This may take a minute to update.',
      initialValue: false,
      options: {
        layout: 'checkbox' // This often helps align the toggle/box more traditionally
      }
    },
    {
      name: 'eventInstances',
      type: 'array',
      title: 'Event Instances (Date Range + Details)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'startDate',
              type: 'datetime',
              title: 'Start Date',
              description: 'Select the concert date — ignore the auto input time, it is there to prevent timezone bugs.'
            },
            {
              name: 'endDate',
              type: 'datetime',
              title: 'End Date (optional)',
              description: 'Used for multi-day events'
            },
            {
              name: 'doorsTime',
              type: 'string',
              title: 'Doors Time (e.g. "3:30 PM")',
              validation: (Rule: Rule) =>
                Rule.regex(/^([1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i)
            },
            {
              name: 'time',
              type: 'string',
              title: 'Concert Time (e.g. "4:00 PM")',
              validation: (Rule: Rule) =>
                Rule.regex(/^([1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i)
            },
            { name: 'location', type: 'string', title: 'Venue Name' },
            { name: 'address', type: 'string', title: 'Street Address' },
            { name: 'city', type: 'string', title: 'City (e.g. Vancouver BC)' }
          ]
        }
      ]
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image (Details Banner recommended size 1400px by 500px)',
      options: { hotspot: true }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Concert Description (paragraph for details page)'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug (concert details page URL extension, ie. lovur-taylorswift)',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      description: 'Choose whether the ticket button should link to an internal details page or an external website.',
      options: {
        list: [
          { title: 'Internal Details Page', value: 'internal' },
          { title: 'External Link', value: 'external' }
        ],
        layout: 'radio'
      },
      initialValue: 'internal'
    },
    {
      name: 'externalUrl',
      type: 'url',
      title: 'External URL (if applicable)',
      description: 'Provide the external ticket or event page URL if using External Link',
      hidden: (context: { parent: any }) => context.parent?.linkType !== 'external'
    },
    {
      name: 'program',
      type: 'string',
      title: 'Program Description (short)'
    },
    {
      name: 'ageRequirement',
      type: 'string',
      title: 'Age Requirement (e.g. “All ages welcome…”)'
    },
    {
      name: 'performerDetails',
      title: 'Performer Details',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'Brief info about the performer'
        },
        {
          name: 'url',
          title: 'Link URL',
          type: 'url',
          description: 'Link to performer website or profile'
        }
      ]
    },
    {
      name: 'ticketTiers',
      type: 'array',
      title: 'Ticket Tiers',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading (e.g. age group, or tier list)' },
            { name: 'subheading', type: 'string', title: 'Subheading (optional)' },
            { name: 'price', type: 'number', title: 'Price (e.g. 35)' },
            {
              name: 'availability',
              type: 'string',
              title: 'Availability',
              options: {
                list: ['open', 'few', 'closed']
              }
            },
            {
              name: 'eventInstanceDate',
              type: 'string',
              title: 'Associated Event Date',
              description: 'Copy/paste the exact date string from the Event Instances if needed for now.'
            },
            {
              name: 'showTime',
              title: 'Show Time',
              type: 'string',
              description: 'Enter show time as a formatted string, e.g. "7:30 PM"',
            },
            {
              name: 'address',
              type: 'string',
              title: 'Address',
              description: 'Address associated with this ticket tier.',
            },
            { name: 'url', type: 'url', title: 'Purchase Link' },
            { name: 'bgcolor', type: 'string', title: 'Background Color (hex)' }
          ]
        }
      ]
    }
  ]
};

export default concertType;
