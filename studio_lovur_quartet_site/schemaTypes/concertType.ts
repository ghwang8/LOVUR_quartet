
const concertType = {
  name: 'concert',
  type: 'document',
  title: 'Concert',
  fields: [
    { name: 'title', type: 'string', title: 'Concert Title' },
    {
      name: 'dateRange',
      type: 'object',
      title: 'Date Range',
      fields: [
        { name: 'start', type: 'datetime', title: 'Start Date' },
        { name: 'end', type: 'datetime', title: 'End Date (optional)' }
      ]
    },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'bulletPoints', type: 'array', of: [{ type: 'string' }], title: 'Details (Bullets)' },
    { name: 'details', type: 'array', of: [{ type: 'block' }], title: 'Details (Rich Text)' },
    { name: 'ticketLink', type: 'url', title: 'Ticket Link' }
  ]
};

export default concertType;
