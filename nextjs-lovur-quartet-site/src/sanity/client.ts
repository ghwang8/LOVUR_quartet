import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '0js521rt',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);