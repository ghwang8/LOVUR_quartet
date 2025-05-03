import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react';
import { Concert } from "@/types/concert"; 

export default function ConcertCard({ concert, isLast }: { concert: Concert, isLast?:boolean }) {
  const { title, dateRange, location, bulletPoints, details, ticketLink } = concert

  const formatMonth = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { month: "short" }); 

  const formatDay = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: "numeric" });

  const formattedEndDate = dateRange.end
  ? new Date(dateRange.end).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  : null;

  const formatFullDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  const dateDisplay = dateRange.end
    ? `${formatFullDate(dateRange.start)} – ${formatFullDate(dateRange.end)}`
    : formatFullDate(dateRange.start)

  const components: PortableTextComponents = {
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold">{children}</strong>
      ),
    },
  }

  return (
    <div className={`flex flex-col font-montserrat bg-white ${isLast ? '' : 'border-b border-gray-300'} p-6 w-[80vw] max-w-6xl mx-auto space-y-4`}>
      <div className='flex w-full'>
        {/* Date square */}
        <div className='flex flex-col w-[100px] h-[100px] bg-gray-200 items-center justify-center'>
          <div className="text-center w-[70%] border-b border-gray-400 leading-tight">
            <p className="uppercase text-lg text-gray-700">
              {formatMonth(dateRange.start)}
            </p>
            <p className="text-base text-gray-900">
              {formatDay(dateRange.start)}
            </p>
          </div>
          <div className="mt-1">
            {formattedEndDate && (
              <p className="text-sm text-gray-800">
                TO {formattedEndDate}
              </p>
            )}
          </div>
        </div>

        <div className='flex flex-col w-[90%] ml-8'>
          <div className="flex mb-5">
            <h3 className="text-xl text-gray-900 mr-2">{location}</h3>
            <p className='text-xl mr-1'> | </p>
            <h3 className="text-xl text-gray-900">{title}</h3>
          </div>
          <ul className="list-disc pl-5 text-gray-900 mb-5">
            {bulletPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="prose prose-sm text-gray-800 mb-9">
            <PortableText value={details} components={components} />
          </div>
        </div>
      </div>
            <div className='flex w-full justify-center'>
          {ticketLink && (
            <a
              href={ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase flex justify-center bg-gray-900 w-[120px] hover:bg-gray-500 text-white font-medium py-2 px-4 transition"
            >
              Tickets
            </a>
          )}  
        </div>
        
    </div>
  )
}
