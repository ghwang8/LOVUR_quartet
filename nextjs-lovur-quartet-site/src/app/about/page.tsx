// A query language (like a filter) used to tell Sanity exactly which data we want to grab
import { groq } from 'next-sanity';
// The "phone line" that connects this code to the Sanity database
import { client } from '@/sanity/client';
// A tool that converts Sanity's special text format to actual HTML
import { PortableText, PortableTextComponents } from '@portabletext/react';
// A "Type definition" for TypeScript (like a rulebook that tells the computer what text data should look like)
import { PortableTextBlock } from '@portabletext/types';
// The reusable header and footer sections of the website
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Anything with "interface" and "type" are TypeScript.
 * 
 * These lines tells the code exactly what to expect from Sanity.
 * Example: headerImage must have a url. If the backend changes
 * and breaks this, TypeScript will alert you.
 */

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

/**
 * This maps "data" to "design".
 * 
 * For example, normal: ... tells the site to add a margin (mb-6)
 * to every normal paragraph.
 * 
 * And the custom "headingBreak" tells the site to use the font
 * "theseasons" for specific titles.
 */

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

/**
 * This is your "shopping list" for the database.
 * 
 * It asks for the image, the specific content blocks,
 * and the date it was last updated.
 */
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

/**
 * The heart of the page.
 * 
 * const data = await client.fetch(...) is the moment
 * the website "calls" Sanity to get the info.
 * 
 * @returns data?.headerImage?.asset?.url && (...) - is a safety check
 * and says "Only try to show the image if the URL actually exists".
 * 
 * PortableText value={data.content} - This takes the messy data from
 * Sanity and runs it through the "Stylist" we defined on line 30.
 */
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