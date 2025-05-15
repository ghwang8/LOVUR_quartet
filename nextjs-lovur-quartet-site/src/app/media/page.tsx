import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

// Define types for your data structures
interface PressKit {
  downloadLink: string;
  buttonText: string;
  year?: string;
}

interface SocialVideo {
  videoUrl: string;
  thumbnail: SanityImageSource;
  title?: string;
}

interface GalleryImage {
  _id: string;
  image: SanityImageSource;
  altText?: string;
  size?: 'small' | 'large';
}

interface Gallery {
  title?: string;
  images: GalleryImage[];
}

interface MediaPageData {
  pressKit?: PressKit;
  videos?: SocialVideo[];
  gallery?: Gallery;
}

// Properly typed image URL builder
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const MEDIA_QUERY = groq`{
  "pressKit": *[_type == "pressKit"][0]{
    downloadLink,
    buttonText,
    year
  },
  "videos": *[_type == "socialVideo"]{
    videoUrl,
    thumbnail
  },
  "gallery": *[_type == "gallery"][0]{
    title,
    images[]->{
      _id,
      image,
      altText,
      size
    }
  }
}`;

export default async function MediaPage() {
  const { pressKit, videos, gallery } = await client.fetch<MediaPageData>(MEDIA_QUERY);

  return (
    <>
      <Navbar />
      <main className="container flex flex-col w-full justify-center items-center mx-auto px-4 py-12">
        {/* Press Kit Section */}
        <section className="flex flex-col w-full max-w-6xl items-start mb-16 text-left">
          {pressKit && (
            <div className="space-y-4">
              <h2 className="text-4xl mb-4">
                Press Kit {pressKit.year}
              </h2>
              <a
                href={pressKit.downloadLink}
                className="font-montserrat inline-block py-3 rounded-lg text-lg transition-colors hover:text-blue-400"
                download
              >
                {pressKit.buttonText}
              </a>
            </div>
          )}
        </section>

        {/* Videos Section */}
        {videos && videos.length > 0 && (
          <section className="mb-16 w-full max-w-6xl">
            <h2 className="text-4xl mb-8 text-left">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6">
              {videos.map((video) => (
                <div key={video.videoUrl} className="overflow-hidden shadow-lg">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={urlFor(video.thumbnail).url()}
                      alt={video.title || 'Social media video'}
                      width={600}
                      height={500}
                      className="w-full h-50 lg:h-80 object-cover"
                    />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {gallery && gallery.images.length > 0 && (
          <section className='w-full max-w-6xl'>
            <h2 className="text-4xl mb-8 text-left">Gallery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-4">
              {gallery.images.map((image) => {
                const isLarge = image.size === 'large';
                return (
                  <div
                    key={image._id}
                    className={`group relative overflow-hidden ${
                      isLarge ? 'col-span-2' : 'col-span-1'
                    }`}
                  >
                    <Image
                      src={urlFor(image.image).url()}
                      alt={image.altText || 'Gallery image'}
                      width={isLarge ? 500 : 250}
                      height={400}
                      className="w-full h-[230px] md:h-[400px] object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}