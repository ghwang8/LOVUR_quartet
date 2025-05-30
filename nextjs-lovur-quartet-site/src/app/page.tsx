import { client } from '@/sanity/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Concert } from '@/types/concert';
import ConcertCard from '@/components/ConcertCard';
import FeatureSongComponent, { FeatureSong } from "@/components/FeatureSong";


export const revalidate = 30;

const FEATURED_SONG_QUERY = `*[_type == "featuredSong"][0]{
  _id,
  title,
  subheading,
  caption,
  spotifyLink, 
  coverImage
}`;

const UPCOMING_CONCERTS_QUERY = `*[_type == "concert" && eventInstances[0].startDate >= now()] | order(eventInstances[0].startDate asc)[0..2] {
  _id,
  title,
  subHeading,
  eventInstances,
  heroImage,
  slug
}`;

export default async function HomePage() {
  const song = await client.fetch<FeatureSong>(FEATURED_SONG_QUERY);
  const concerts: Concert[] = await client.fetch(UPCOMING_CONCERTS_QUERY);
  
  return (
    <>
      <Navbar />
      <section className="relative h-[530px] md:h-[680px] lg:h-[95vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/media/group_photo.jpg" 
            alt="Landing"
            className="w-full h-full object-cover mobile-slow-animation -translate-y-33 md:animate-none"
          />
          <div className="mobile-image-fade-overlay mobile-fade-overlay-animating"></div>
        </div>
        <div className="absolute pb-0 bottom-0 w-full bg-white bg-opacity-80 p-6 text-center flex flex-col items-center z-20">
          <div className='flex items-end mb-3'>
            <h2 className="text-lg md:text-xl font-semibold mr-2">LOVUR:</h2>
            <p className="text-lg md:text-xl mt-3">
              pronounced 
                <code className="font-noto-sans-mono">
                  /ˈlʌvɚ/
                </code> 
                <span className="italic">(LUV-er)</span>
            </p>
          </div>
          <h3 className="text-2xl md:text-3xl font-theseasons-it">
            Multi-genre string quartet based in Vancouver
          </h3>
          <p className="font-montserrat mt-3 text-lg md:text-xl text-gray-700">
              43,000+ followers   |   10,000,000+ views
          </p>
        </div>
      </section>
      <div className="flex w-full justify-center space-y-16 p-8">
        <div className='w-full md:w-4/5 border-t border-gray-300 mb-6'>
          {song && <FeatureSongComponent song={song} />}
        </div>
    </div>

  {/* Upcoming Concerts Section */}
      <section className="flex flex-col justify-center items-center w-full mx-auto p-8 bg-gray-400">
        <h2 className="text-3xl md:text-5xl text-white py-2 mb-12">Upcoming Concerts</h2>
        <div className="flex flex-col justify-center items-center mb-8">
          {concerts.length > 0 ? (
            concerts.map((concert: Concert) => (
              <div key={concert._id} className='drop-shadow-[0_0_7px_white]'>
                <ConcertCard key={concert._id} concert={concert} />
              </div>
            ))
          ) : (
            <p>No upcoming concerts at this time.</p>
          )}
        </div>
        <div className="my-10 text-center">
          <Link href="/concerts">
            <p className="rounded-full font-montserrat font-semibold inline-block px-6 py-3 bg-white hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg">
              View More Concerts <span>&rarr;</span>
            </p>
          </Link>
        </div>
      </section>

    <Footer />
    </>
  );
}

