import Image from 'next/image';
import Link from 'next/link';
import { Member } from '@/types/member';
import { urlFor } from '@/sanity/client';

interface Props {
  member: Member;
  index: number; 
}

const MembersComponent = ({ member, index }: Props) => {
  const isEven = index % 2 === 1;

  return (
    <div
      className={`flex items-center border-b border-gray-300 pb-6 ${
        isEven ? 'flex-row-reverse text-right' : ''
      }`}
    >
      {/* Member Image */}
      <div className="flex-shrink-0 w-48 h-auto">
        <Image
          src={urlFor(member.photo).url()}
          alt={member.name}
          width={190}
          height={285}
          className="h-auto object-cover"
        />
      </div>

      {/* Member Details */}
      <div
        className={`font-montserrat space-y-4 flex-grow ${
          isEven ? 'mr-6' : 'ml-6'
        }`}
      >
        <h2 className="font-theseasons text-2xl font-semibold">{member.name}</h2>
        <p className="italic text-lg text-gray-700">{member.position}</p>
        <p className="text-gray-600">{member.description}</p>

        {/* Button to Full Bio */}
        <Link href={`/members/${member.slug.current}`}>
          <p className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Full Bio
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MembersComponent;
