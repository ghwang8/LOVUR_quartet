import type { PortableTextBlock } from "sanity"

// Technical hurdle for task 4
export type EventInstance = {
  startDate: string;         // ISO date string
  endDate?: string;
  doorsTime?: string;   // e.g. "3:30 PM"
  time?: string;  
  location: string;
  address: string; 
  city: string;     // e.g. "4:00 PM"
};

export type PerformerDetails = {
  description: string;
  url?: string;
};

export type TicketTier = {
  heading: string;
  subheading?: string;
  price: number;
  availability: 'open' | 'few' | 'closed';
  url?: string;
  bgcolor?: string;
  eventInstanceDate?: string; // ISO string date
  showTime: string;          // new field for display time
  address: string;
};

export type Concert = {
  _id: string;
  title: string;
  subHeading: string;
  slug: {
    current: string;
  };
  linkType?: "internal" | "external";
  externalUrl?: string;
  concertType: string;
  city: string;
  date: string;
  time: string;
  program: string;
  location: string;
  address: string;
  dateRange?: string;
  description: string;
  details?: PortableTextBlock[];
  heroImage?: {
  asset?: {
      url?: string;
    };
    alt?: string;
  };
  isArchived?: boolean;
  performerDetails?: PerformerDetails[];
  eventInstances?: EventInstance[];
  ticketTiers?: TicketTier[];
  
};
