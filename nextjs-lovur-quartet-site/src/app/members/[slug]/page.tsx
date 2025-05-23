import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from '@portabletext/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
};

interface Member {
  name: string;
  position: string;
  photo: SanityImageSource;
  description: string;
  bioPhoto?: SanityImageSource;
  fullBio?: PortableTextBlock[];
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    groq`*[_type == "member" && defined(slug.current)]{ "slug": slug }`
  );

  return slugs.map(({ slug }) => ({
    slug: slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const member: Member | null = await client.fetch(
    groq`*[_type == "member" && slug.current == $slug][0]{ name, description }`,
    { slug: params.slug }
  );

  return {
    title: member ? `${member.name} | LOVUR Quartet` : 'Member Profile',
    description: member?.description || 'LOVUR Quartet member profile',
  };
}

export default async function MemberPage({
  params,
}: {
  params: { slug: string };
}) {
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

  const paragraphBlocks = (member.fullBio || []).filter(
    (block): block is PortableTextBlock => block._type === 'block'
  );

  const firstTwoParagraphs = paragraphBlocks.slice(0, 2);
  const remainingParagraphs = paragraphBlocks.slice(2);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center container mx-auto px-4 py-10 font-montserrat">
        <div className="flex flex-col h-[auto] lg:h-[600px] max-w-6xl lg:flex-row lg:gap-8">
          <div className="lg:w-[55%] lg:h-[600px] flex flex-col justify-between">
            <div className="mb-14">
              <h1 className="font-theseasons text-4xl font-normal mb-2">{member.name}</h1>
              <h2 className="italic text-lg text-gray-600">{member.position}</h2>
            </div>
            <div className="space-y-4">
              {firstTwoParagraphs.length > 0 && (
                <PortableText value={firstTwoParagraphs} components={portableTextComponents} />
              )}
            </div>
          </div>

          <div className="h-[auto] lg:w-[45%] lg:h-[560px] flex justify-center mb-5 lg:mb-8 lg:mt-0">
            <Image
              src={urlFor(member.bioPhoto || member.photo).url()}
              alt={member.name}
              width={430}
              height={400}
              className="shadow-lg object-cover object-top lg:translate-y-4"
              priority
            />
          </div>
        </div>

        {remainingParagraphs.length > 0 && (
          <div className="max-w-6xl mx-auto lg:prose">
            <PortableText value={remainingParagraphs} components={portableTextComponents} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
