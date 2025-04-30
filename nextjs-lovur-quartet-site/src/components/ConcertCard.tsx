import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react';
import { Concert } from "@/types/concert"; 

export default function ConcertCard({ concert }: { concert: Concert }) {
  const { title, dateRange, location, bulletPoints, details, ticketLink } = concert

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })

  const dateDisplay = dateRange.end
    ? `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}`
    : formatDate(dateRange.start)

  const components: PortableTextComponents = {
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold">{children}</strong>
      ),
    },
  }

  return (
    <div className="font-montserrat bg-white border shadow-md rounded-xl p-6 max-w-xl w-full mx-auto space-y-4">
      <div className="text-gray-500 text-sm">{dateDisplay}</div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 italic">{location}</p>

      <ul className="list-disc pl-5 text-gray-700">
        {bulletPoints.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <div className="prose prose-sm text-gray-800">
        <PortableText value={details} />
      </div>

      {ticketLink && (
        <a
          href={ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Buy Tickets
        </a>
      )}
    </div>
  )
}
