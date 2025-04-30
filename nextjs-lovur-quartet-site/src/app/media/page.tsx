import { client } from '@/sanity/client'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
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
    "gallery": *[_type == "galleryImage"]{
      image,
      altText
    }
}`

export default async function MediaPage() {
  const { pressKit, videos, gallery } = await client.fetch(MEDIA_QUERY)

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
          {/* Press Kit Section */}
          <section className="mb-16 text-center">
          {pressKit && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold mb-4">
                Press Kit {pressKit.year}
              </h2>
              <a
                href={pressKit.downloadLink}
                className="font-montserrat inline-block font-bold py-3 px-6 rounded-lg text-lg transition-colors"
                download
              >
                {pressKit.buttonText}
              </a>
            </div>
          )}
        </section>

        {/* Videos Section */}
        {videos?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: any) => (
                <div key={video.videoUrl} className="rounded-lg overflow-hidden shadow-lg">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={urlFor(video.thumbnail).url()}
                      alt={video.title || 'Social media video'}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {gallery?.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((image: any) => (
                <div key={image._id} className="group relative rounded-lg overflow-hidden">
                    <Image
                    src={urlFor(image.image).url()}
                    alt={image.altText}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                </div>
            ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}