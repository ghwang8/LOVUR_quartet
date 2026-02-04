'use client';

import { useState } from 'react';
import ConcertCard from './ConcertCard';
import { Concert } from '@/types/concert';

export default function ConcertList({ concerts }: { concerts: Concert[] }) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'archive'>('upcoming');

  const now = new Date().setHours(0, 0, 0, 0);

//   // Logic: Upcoming if manual toggle is OFF AND at least one date is today or in the future
//   const upcoming = concerts.filter((concert) => {
//     const isManuallyArchived = (concert as any).isArchived === true;
//     const latestDate = new Date(concert.eventInstances?.[0]?.startDate || concert.date).getTime();
//     return !isManuallyArchived && latestDate >= now;
//   }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

//   // Logic: Archived if manual toggle is ON OR all dates are in the past
//   const archive = concerts.filter((concert) => {
//     const isManuallyArchived = (concert as any).isArchived === true;
//     const latestDate = new Date(concert.eventInstances?.[0]?.startDate || concert.date).getTime();
//     return isManuallyArchived || latestDate < now;
//   }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const upcoming = concerts
  .filter((concert) => {
    // We use (concert as any) to bypass the strict type check if isArchived isn't in your types file yet
    const isManuallyArchived = concert.isArchived === true;
    
    // Use the first instance date, or fallback to a very old date if missing so it filters out
    const concertDate = new Date(concert.eventInstances?.[0]?.startDate || 0).getTime();
    
    return !isManuallyArchived && concertDate >= now;
  })
  .sort((a, b) => {
    const dateA = new Date(a.eventInstances?.[0]?.startDate || 0).getTime();
    const dateB = new Date(b.eventInstances?.[0]?.startDate || 0).getTime();
    return dateA - dateB; // Soonest first
  });

const archive = concerts
  .filter((concert) => {
    const isManuallyArchived = concert.isArchived === true;
    const concertDate = new Date(concert.eventInstances?.[0]?.startDate || 0).getTime();

    return isManuallyArchived || concertDate < now;
  })
  .sort((a, b) => {
    const dateA = new Date(a.eventInstances?.[0]?.startDate || 0).getTime();
    const dateB = new Date(b.eventInstances?.[0]?.startDate || 0).getTime();
    return dateB - dateA; // Most recent past event first
  });

  const displayList = activeTab === 'upcoming' ? upcoming : archive;

  return (
    <div className="space-y-12 pt-3">
      <div className="flex justify-center space-x-10 border-b border-gray-200 font-montserrat">
        {['upcoming', 'archive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'upcoming' | 'archive')}
            className={`pb-4 text-sm md:text-base tracking-[0.2em] uppercase transition-all duration-300 ${
              activeTab === tab 
                ? 'border-b-2 border-gray-900 font-bold text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8 min-h-[300px]">
        {displayList.length === 0 ? (
          <p className="text-center py-20 text-gray-400 italic font-montserrat">
            No {activeTab} concerts to display.
          </p>
        ) : (
          displayList.map((concert, index) => (
            <ConcertCard 
              key={concert._id} 
              concert={concert}
              isLast={index === displayList.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}