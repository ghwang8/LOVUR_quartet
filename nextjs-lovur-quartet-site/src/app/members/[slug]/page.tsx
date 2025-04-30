import { client } from '@/sanity/client';
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Custom PortableText components for styling
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>, 
  },
}

interface Member {
  name: string;
  position: string;
  photo: any;
  description: string;
  bioPhoto: any;
  fullBio: any;
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    groq`*[_type == "member" && defined(slug.current)]{ "slug": slug }`
  );

  return slugs.map(({ slug }) => ({
    slug: slug.current,
  }));
}

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member: Member | null = await client.fetch(
    groq`*[_type == "member" && slug.current == $slug][0]{
      name,
      position,
      photo,
      description,
      bioPhoto,
      fullBio
    }`,
    { slug: params.slug }
  );

  if (!member) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="font-montserrat container mx-auto px-4 py-10">
        <h1 className="font-theseasons text-4xl font-bold text-center mb-4">{member.name}</h1>
        <h2 className="italic text-xl text-center text-gray-600 mb-8">{member.position}</h2>
        
        {member.bioPhoto ? (
          <div className="flex justify-center mb-8">
            <Image
              src={urlFor(member.bioPhoto).url()}
              alt={member.name}
              width={400}
              height={400}
              className="rounded shadow-lg object-cover"
            />
          </div>
        ) : member.photo ? (
          <div className="flex justify-center mb-8">
            <Image
              src={urlFor(member.photo).url()}
              alt={member.name}
              width={400}
              height={400}
              className="rounded shadow-lg object-cover"
            />
          </div>
        ) : null}
        
        <div className="max-w-3xl mx-auto">
          {member.fullBio ? (
            <div className="prose">
              <PortableText 
                value={member.fullBio} 
                components={portableTextComponents} 
              />
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-center">{member.description}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
    
  );
}