import type { PortableTextBlock } from "sanity";

export type Concert = {
  _id: string;
  title: string;
  location: string;
  dateRange: { start: string; end?: string };
  bulletPoints: string[];
  details: PortableTextBlock[]; 
  ticketLink?: string;
};
