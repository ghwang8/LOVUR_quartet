import { groq } from 'next-sanity';
import { client } from '@/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define types for your custom content
interface HeadingBreak {
  _type: 'headingBreak';
  heading: string;
}

// Union type for all possible content blocks
type AboutContent = PortableTextBlock | HeadingBreak;

interface AboutPageData {
  headerImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  content: AboutContent[]; // Properly typed content array
  lastUpdated: string;
}

// Typed components for PortableText
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6">{children}</ul>
    ),
  },
  types: {
    headingBreak: ({ value }: { value: HeadingBreak }) => (
      <h2 className="font-theseasons text-2xl md:text-4xl my-8 leading-[145%]">
        {value.heading}
      </h2>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    headerImage {
      ...,
      "asset": asset->
    },
    content[] {
      ...,
      // Explicitly include _type for all content
      _type == "headingBreak" => {
        heading
      }
    },
    lastUpdated
  }
`;

export default async function AboutPage() {
  const data: AboutPageData = await client.fetch(aboutPageQuery);

  return (
    <>
      <Navbar />
      <div className="container mx-auto md:px-4 md:py-8">
        {/* Header Image */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full h-[auto] md:w-[1000px] lg:h-[550px] relative overflow-hidden shadow-md">
           {data?.headerImage?.asset?.url && (
            <img
              src={data.headerImage.asset.url}
              alt={data.headerImage.alt || 'About LOVUR Quartet'}
              width={1000}
              height={550}
              className="w-full h-auto object-cover transform scale-120 -translate-y-[10px] md:-translate-y-[20px] lg:scale-110 lg:-translate-y-[30px]"
            />
          )}
          </div>
        </div>

        {/* Content */}
        <div className="font-montserrat px-4 md:px-0 text-[0.95rem] max-w-[1000px] mx-auto text-lg leading-relaxed text-gray-800">
          {data?.content && (
            <PortableText
              value={data.content}
              components={components}
            />
          )}
          
          {data?.lastUpdated && (
            <p className="mt-8">Current as of {new Date(data.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}