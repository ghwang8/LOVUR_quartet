import { client } from '@/sanity/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

export default async function HomePage() {

  const song = await client.fetch<FeatureSong>(FEATURED_SONG_QUERY);
  
  return (
    <>
      <Navbar />
      <section className="relative h-[530px] md:h-[680px] lg:h-[95vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/media/group_photo.jpg" 
            alt="Landing"
            className="w-full h-full object-cover animate-slow-pan -translate-y-33 md:animate-none"
          />
        </div>
        <div className="absolute pb-0 bottom-0 w-full bg-white bg-opacity-80 p-6 text-center flex flex-col items-center">
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
    <Footer />
    </>
  );
}

