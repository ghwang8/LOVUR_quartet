import { Concert } from "@/types/concert";
import Link from 'next/link';

export default function ConcertCard({ concert, isLast }: { concert: Concert, isLast?: boolean }) {
  const { 
    title, 
    location,
    eventInstances, 
    subHeading,
  } = concert;

    if (!eventInstances || eventInstances.length === 0) {
    return (
      <div className={`flex flex-col font-montserrat bg-white ${isLast ? '' : 'border-b border-gray-300'} lg:p-6 lg:w-[80vw] max-w-6xl mx-auto space-y-4`}>
        <p className="text-gray-500 text-center py-8">Event details coming soon.</p>
      </div>
    );
  }
  
  const formatMonth = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { month: "short" });

  const formatDay = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: "numeric" });

  const sortedEvents = eventInstances?.slice().sort((a, b) =>
  new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const startDate = sortedEvents?.[0]?.startDate;
  const endDate = sortedEvents?.[sortedEvents.length - 1]?.endDate || sortedEvents?.[sortedEvents.length - 1]?.startDate;

  function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return `${day}th`; // covers 11–13
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

  function formatPrettyDate(dateStr: string) {
    const date = new Date(dateStr);
    const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
    const month = date.toLocaleDateString(undefined, { month: 'long' });
    const day = getOrdinalSuffix(date.getDate());
    return `${weekday}, ${month} ${day}`;
  }

  function formatDateRange(start: string, end?: string) {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    const sameDay = !end || start === end;
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };

    if (sameDay) {
      return startDate.toLocaleDateString(undefined, options); // e.g. Saturday, July 5th
  }

  const startStr = startDate.toLocaleDateString(undefined, options);
  const endStr = endDate!.toLocaleDateString(undefined, options);

  return `${startStr} to ${endStr}`; // e.g. Saturday, July 5th – Monday, July 7th
}
  const groupedByVenue: Record<string, {
    location: string;
    address: string;
    events: typeof eventInstances;
  }> = {};

  eventInstances?.forEach(instance => {
    const key = `${instance.location}||${instance.address}`;
    if (!groupedByVenue[key]) {
      groupedByVenue[key] = {
        location: instance.location,
        address: instance.address,
        events: [],
      };
    }
    groupedByVenue[key].events.push(instance);
  });

  
  return (
    <div className={`flex flex-col font-montserrat bg-white ${isLast ? '' : 'border-b border-gray-300'} lg:p-6 lg:w-[80vw] max-w-6xl mx-auto space-y-4`}>
      <div className='flex flex-col items-center md:items-start md:flex-row w-full'>
        {/* Date square */}
        <div className='flex flex-col mb-5 w-[100px] h-[100px] bg-gray-200 items-center justify-center'>
        {eventInstances && eventInstances.length > 0 ? (
          <>
            <div className="text-center w-[70%] border-b border-gray-400 leading-tight">
              <p className="uppercase text-lg text-gray-700">
                {formatMonth(startDate!)}
              </p>
              <p className="text-lg text-gray-900">
                {formatDay(startDate!)}
              </p>
            </div>
            {endDate && endDate !== startDate && (
              <div className="mt-2 flex align-center justify-center text-center w-[70%] leading-tight">
                <p className="text-sm mr-1 "> TO </p>
                <p className="uppercase text-sm text-gray-700 mr-1">
                  {formatMonth(endDate)}
                </p>
                <p className="text-sm text-gray-900">
                  {formatDay(endDate)}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Date TBD</p>
        )}
        </div>

        <div className='flex flex-col md:w-[90%] md:ml-4 lg:ml-8'>
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-center md:text-left md:items-start mb-5">
            <h3 className="text-base italic mb-2 lg:mb-0 lg:text-xl text-gray-900 mr-2">{eventInstances?.[0].city}</h3>
            <p className='hidden lg:flex lg:text-xl mr-1'> | </p>
            <h3 className="text-lg md:text-2xl text-gray-900">
              {subHeading ? `${title}: ${subHeading}` : title}
            </h3>
          </div>
            {location || eventInstances ? 
              <>
                <ul className="pl-5 list-disc text-lg">
                  <li>{eventInstances?.[0].location}</li>
                  {startDate && (
                    <li>{formatDateRange(startDate, endDate)}</li>
                  )}
                </ul>
               {Object.entries(groupedByVenue).map(([key, group], index) => {
                  const sortedEvents = group.events
                    .slice()
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

                  const start = sortedEvents[0]?.startDate;
                  const end = sortedEvents[sortedEvents.length - 1]?.endDate || sortedEvents[sortedEvents.length - 1]?.startDate;

                  // If all events have the same time info, only show once
                  const allDoorsSame = group.events.every(e => e.doorsTime === group.events[0].doorsTime);
                  const allConcertSame = group.events.every(e => e.time === group.events[0].time);

                  return (
                    <div key={key} className="mt-4 text-base text-gray-800">
                      <p className="text-lg font-medium">
                        {formatDateRange(start, end)} – {group.location}, {group.address}
                      </p>
                      <ul className="text-gray-700">
                        {allDoorsSame && allConcertSame ? (
                          <li>
                            Doors: {group.events[0].doorsTime} | Concert: {group.events[0].time}
                          </li>
                        ) : (
                          group.events.map((event, i) => (
                            <li key={i}>
                              {formatPrettyDate(event.startDate)} – Doors: {event.doorsTime} | Concert: {event.time}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  );
                })}
              </>
              : <p>location TBD</p>
            }
        </div>
      </div>

      <div className='flex mb-8 md:mb-4 w-full justify-center'>
  {(() => {
    // Top-level external ticket link
    if (concert.externalUrl) {
      return (
        <a
          href={concert.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase flex justify-center bg-gray-900 w-[120px] hover:bg-gray-500 text-white font-medium py-2 px-4 transition cursor-pointer"
        >
          Tickets
        </a>
      );
    }


    // Default to internal detail page if nothing else is set
    if (concert.slug?.current) {
      return (
        <Link href={`/concerts/${concert.slug.current}`} passHref>
          <div className="uppercase flex justify-center bg-gray-900 w-[120px] hover:bg-gray-500 text-white font-medium py-2 px-4 transition cursor-pointer">
            Tickets
          </div>
        </Link>
      );
    }

    return null; // No button if no link of any kind
  })()}
</div>

    </div>
  )
}
