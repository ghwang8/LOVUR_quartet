import { client } from '@/sanity/client';
import ConcertList from '@/components/ConcertList';
import ConcertCard from '@/components/ConcertCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Concert } from '@/types/concert';
// This is a specific Sanity tool. Sanity Stores images as complex data objects;
// This builder turns those objects into a simple URL that a browser can understand.
import imageUrlBuilder from '@sanity/image-url';
import { groq } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

/**
 * This page is the Concert Listing page (generates the list of all concerts).
 * The Candlelight missing from the main list could also be here (Gemini says it's most likely here).
 */

// Define types for your concert page data
// Defines that the "Header" of this specific page looks like (image, title, subtitle)
interface ConcertPageData {
  heroImage?: SanityImageSource;
  heroTitle?: string;
  heroSubtitle?: string;
}

// Properly type the image builder function
const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Asks for every document where the type is "concert".
// It pulls in everything: titles, dates, ticket prices and even performer details.
// This line could be why candlelight is missing
const CONCERTS_QUERY = groq`*[_type == "concert"]{
  _id,
  title,
  subHeading,
  location,
  address,
  city,
  heroImage,
  description,
  slug,
  linkType,
  externalUrl,
  program,
  ageRequirement,
  isArchived,
  performerDetails[]{
    description,
    url
  },
  eventInstances[]{
    startDate,
    endDate,
    doorsTime,
    time,
    location,
    address,
    city
  },
  ticketTiers[]{
    heading,
    subheading,
    price,
    availability,
    eventInstanceDate,
    url,
    showTime,
    bgcolor,
    address
  }
}`;

// Asks for the settings of the page itself (like the big banner image at the top)
const CONCERT_PAGE_QUERY = groq`*[_type == "concertPage"][0]{
  heroImage,
  heroTitle,
  heroSubtitle
}`;

export default async function ConcertsPage() {
  // Promise.all is a performance booster. It tells the server:
  // "Go get the list of converts AND the page header at the same time.
  // Don't wait for one to finish before starting the other"
  const [concerts, concertPage] = await Promise.all([
    client.fetch<Concert[]>(CONCERTS_QUERY),
    client.fetch<ConcertPageData>(CONCERT_PAGE_QUERY)
  ]);

  return (
    <>
      <Navbar />
      <section className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full">
        {concertPage?.heroImage ? (
          <img
            src={urlFor(concertPage.heroImage).url()}
            alt="Concert Hero Image"
            className="w-full h-full object-cover" 
          />
        ) : (
          <img
            src="/media/about_group_photo.jpg" 
            alt="Default Concert Image"
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute bottom-0 lg:bottom-[45px] lg:left-[170px] p-6 text-left bg-gradient-to-t from-black/70 to-transparent">
          <h1 className="text-3xl md:text-6xl text-white font-normal mb-2">
            {concertPage?.heroTitle || 'Upcoming Concerts'}
          </h1>
          {concertPage?.heroSubtitle && (
            <p className="text-xl md:text-2xl text-white/90">
              {concertPage.heroSubtitle}
            </p>
          )}
        </div>
      </section>
      {/* <main className="container mx-auto p-2 space-y-8">
        {concerts.length === 0 ? (
          <p className="text-center text-gray-500">No concerts currently scheduled.</p>
        ) : (
          concerts.map((concert, index) => (
            <ConcertCard 
              key={concert._id} 
              concert={concert}
              isLast={index === concerts.length-1}
            />
          ))
        )}
      </main> */}
      <main className="container mx-auto p-2 space-y-8">
        {/* 2. REPLACED THE OLD MAPPING LOGIC WITH THIS */}

          <ConcertList concerts={concerts} />
  
      </main>
      <Footer />
    </>
  )
}