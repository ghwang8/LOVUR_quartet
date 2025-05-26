'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PurchaseTickets from '@/components/PurchaseTickets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { Concert } from '@/types/concert';

const ConcertDetailsPage: React.FC = () => {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const [concert, setConcert] = useState<Concert | null>(null);

    useEffect(() => {
    
    if (slug) {
        const fetchConcert = async () => {
        try {
            const result = await client.fetch(
            `*[_type == "concert" && slug.current == $slug][0]`,
            { slug }
            );
            console.log('Concert fetch result:', result);
            setConcert(result);
        } catch (error) {
            console.error('Error fetching concert:', error);
        }
        };

        fetchConcert();
    }
    }, [slug]);

  if (!concert) return <div>Loading...</div>;

  
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/media/taylor_swift.jpg"
          alt="Concert image"
          className="absolute inset-0 w-full h-full object-[center_60%] object-cover"
        />
        <div className="relative z-10 flex flex-col items-start justify-end h-full text-white pb-15 pl-25 bg-black/40">
          <h2 className="text-8xl w-[60%] tracking-wide">
            {concert.title}
          </h2>
          <div className="flex w-[60%]">
            <h3 className="text-6xl tracking-widest font-montserrat uppercase">
              {concert.subHeading}
            </h3>
          </div>
        </div>
      </div>
      <div className="max-w-7xl p-6 mt-5 text-left">
        <h3 className="text-2xl font-semibold">
            {formatDateWithManualTime(
              concert.eventInstances?.[0]?.startDate,
              concert.eventInstances?.[0]?.endDate,
              concert.eventInstances?.[0]?.time
            )}
        </h3>
        <h2 className="text-4xl font-bold mt-2 mb-8">{concert.title.toUpperCase()}</h2>
        <div className="font-montserrat mt-4 text-lg">
           <p>{concert.description}</p>
        </div>
      </div>
      <PurchaseTickets tickets={concert.ticketTiers ?? []} />
      <EventDetails
        location={concert.eventInstances?.[0]?.location || "TBA"}
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
  program,
  startDate,
  endDate,
  time,
}: {
  location: string;
  program: string;
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
          <li className="flex flex-col"><strong className="m-5">Venue:</strong> {location}</li>
          <li className="flex flex-col">
            <strong className="m-5">Date and Time:</strong> {formatDateWithManualTime(startDate, endDate,time)}
          </li>
          <li className="flex flex-col"><strong className="m-5">Program:</strong> {program}</li>
          <li className="flex flex-col"><strong className="m-5">Age Requirement:</strong> All ages welcome! Anyone under 16 must be accompanied by an adult.</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center max-w-6xl mx-auto">
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

function formatDateRange(start?: string, end?: string): string {
  if (!start) return 'TBA';

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Vancouver',
  };

  const formattedStart = startDate.toLocaleString('en-US', options);

  if (!endDate || startDate.toDateString() === endDate.toDateString()) {
    return formattedStart;
  }

  const formattedEnd = endDate.toLocaleString('en-US', options);
  return `${formattedStart} – ${formattedEnd}`;
}

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
