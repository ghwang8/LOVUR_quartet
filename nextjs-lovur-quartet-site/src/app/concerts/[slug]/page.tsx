// 'use client' tells Next.js that this page is interactive (uses useState and useEffect)
// meaning it runes on the user's browser, not just the server.
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PurchaseTickets from '@/components/PurchaseTickets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { Concert } from '@/types/concert';

/**
 * This page is for a generating a single concert.
 * @returns 
 */

const ConcertDetailsPage: React.FC = () => {
  // useParams() looks at the browswer URL to see which concert was clicked
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [concert, setConcert] = useState<Concert | null>(null);

  // As soon as the page loads, this "hook" triggers the Sanity fetch
  useEffect(() => {

    // This could be the main cause as to why Candlelight is not showing (Concert Detail page)
    if (slug) {
      const fetchConcert = async () => {
        try {
          const result = await client.fetch(
            `*[_type == "concert" && slug.current == $slug][0]{
                ...,
                heroImage {
                  asset->{
                    url
                  }
                }
              }`,
            { slug }
          );
          console.log('Concert fetch result:', result);

          // This saves the fetched data into the page's memory.
          // small change
          setConcert(result);
        } catch (error) {
          console.error('Error fetching concert:', error);
        }
      };

      fetchConcert();
    }
  }, [slug]);

  // If the data hasn't arrived from Sanity yet, it shows a spinning circle and the text "Loading concert..."
  if (!concert) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          <p className="text-gray-700 text-lg font-medium">Loading concert...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <div className="relative w-full h-[220px] md:h-[300px] lg:h-[500px] overflow-hidden">
        <img
          src={concert.heroImage?.asset?.url || '/media/default_banner.jpg'}
          alt={concert.title || 'Concert image'}
          className="absolute inset-0 w-full h-full scale-[155%] object-[center_170%] md:scale-[150%] md:object-[center_50%] lg:scale-[100%] lg:object-[center_60%] object-cover"
        />

        <div className="relative z-10 flex flex-col items-start justify-end h-full text-white pb-5 pl-5 lg:pb-15 lg:pl-25 bg-black/40">
          <h2 className="text-4xl md:text-5xl lg:text-7xl lg:w-[60%] tracking-wide">
            {concert.title}
          </h2>
          <div className="flex lg:w-[60%]">
            <h3 className="text-2xl lg:text-4xl tracking-widest font-montserrat uppercase">
              {concert.subHeading}
            </h3>
          </div>
        </div>
      </div>
      <div className="max-w-7xl p-6 mt-5 text-left">
        <h3 className="text-xl md:text-2xl font-semibold">
          {formatDateWithManualTime(
            concert.eventInstances?.[0]?.startDate,
            concert.eventInstances?.[0]?.endDate,
            concert.eventInstances?.[0]?.time
          )}
        </h3>
        <div className="flex flex-col md:flex-row align-end">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold mt-2 md:mb-8">
            {`${concert.title} :`.toUpperCase()}
          </h2>
          <h2 className="text-3xl md:ml-2 md:text-3xl lg:text-4xl font-bold md:mt-2 mb-4 md:mb-8">
            {concert.subHeading ? ` ${concert.subHeading}` : ''}
          </h2>
        </div>
        <div className="font-montserrat mt-4 text-lg">
          <p>{concert.description}</p>
        </div>
      </div>
      <PurchaseTickets tickets={concert.ticketTiers ?? []} />
      <EventDetails
        location={concert.eventInstances?.[0]?.location || "TBA"}
        address={concert.eventInstances?.[0]?.address}
        startDate={concert.eventInstances?.[0]?.startDate}
        endDate={concert.eventInstances?.[0]?.endDate}
        program={concert.program}
        time={concert.eventInstances?.[0]?.time}
      />
      <Footer />
    </div>
  );
};


const EventDetails = ({
  location,
  address,
  program,
  startDate,
  endDate,
  time,
}: {
  location: string;
  program: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
}) => {

  const [hover, setHover] = useState(false);
  console.log(program)
  return (
    <div className="w-full font-montserrat py-14 px-4 bg-white" id="event-details-section">
      <div className="w-full flex flex-col items-center max-w-6xl mx-auto mb-18">
        <h3 className="text-3xl font-bold mb-6 uppercase">Event Details</h3>
        <ul className="space-y-2 text-2xl text-center">
          <li className="flex flex-col"><strong className="m-5">Venue:</strong> {`${location}, ${address}`}</li>
          <li className="flex flex-col">
            <strong className="m-5">Date and Time:</strong> {formatDateWithManualTime(startDate, endDate, time)}
          </li>
          <li className="flex flex-col"><strong className="m-5">Program:</strong> {program}</li>
          <li className="flex flex-col"><strong className="m-5">Age Requirement:</strong> All ages welcome! Anyone under 16 must be accompanied by an adult.</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center text-center max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 uppercase">Performers</h3>
        <p className="text-2xl">
          LOVUR String Quartet - read about the musicians{' '}
          <Link
            href='/members'
            style={{
              color: hover ? '#d6b39d' : '#ac5134',
              fontWeight: 'bold',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

function formatDateWithManualTime(start?: string, end?: string, time?: string): string {
  if (!start) return 'TBA';

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Vancouver', // Or your desired timezone
  };

  const formattedStart = startDate.toLocaleDateString('en-US', options);

  if (!endDate || startDate.toDateString() === endDate.toDateString()) {
    return time ? `${formattedStart} at ${time}` : formattedStart;
  }

  const formattedEnd = endDate.toLocaleDateString('en-US', options);
  return time
    ? `${formattedStart} at ${time} – ${formattedEnd}`
    : `${formattedStart} – ${formattedEnd}`;
}

export default ConcertDetailsPage;
