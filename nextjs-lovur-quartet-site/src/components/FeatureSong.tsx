import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type FeatureSong = {
  _id: string;
  title: string;
  subheading: string;
  caption: string;
  spotifyLink: string;
  coverImage: SanityImageSource;
};

export default function FeatureSong({ song }: { song: FeatureSong }) {
  return (
    <div className="flex flex-col lg:flex-row bg-white md:p-6 rounded-xl w-full md:max-w-5xl mx-auto justify-center items-center text-center">
      <div className="flex justify-center items-center w-100 h-100">
        {song.coverImage && (
          <Image
            src={urlFor(song.coverImage).url()}
            alt={song.title}
            width={350}
            height={350}
            className="rounded"
          />
        )}
      </div>
      <div className="flex flex-col lg:h-[350px] items-center lg:items-start lg:justify-between">
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-4xl uppercase">{song.title}</h2>
          <p className="font-montserrat mb-5 md:mb-7 text-gray-600">{song.subheading}</p>
          <p className="font-montserrat mb-10 mt-2 text-gray-700">{song.caption}</p>
        </div>
        <div>
          <a
            href={song.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat uppercase inline-block bg-gray-900 hover:bg-gray-600 text-white px-5 py-2 rounded-3xl font-semibold cursor-pointer"
          >
            Listen Now
          </a>
        </div>
      </div>
    </div>
  );
}
