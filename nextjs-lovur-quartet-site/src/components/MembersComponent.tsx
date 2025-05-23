import Image from 'next/image';
import { Member } from '@/types/member';
import { urlFor } from '@/sanity/client';

interface Props {
  member: Member;
  index: number;
  total: number; 
}


const MembersComponent = ({ member, index, total }: Props) => {
  const isEven = index % 2 === 1;
  const isLast = index === total - 1;
  return (
    <div
      className={`flex flex-col lg:flex-row items-center ${
        isLast ? '' : 'border-b border-gray-300 pb-6'
      } ${isEven ? 'flex-col lg:flex-row-reverse text-right' : ''}`}
    >

      {/* Member Image */}
      <div className="flex-shrink-0 w-[230px] h-auto mb-5 md:mb-0 overflow-hidden">
        <Image
          src={urlFor(member.photo).url()}
          alt={member.name}
          width={230}
          height={305}
          className={`h-auto object-cover ${ isLast ? 'scale-135' : ''}`}
        />
      </div>

      {/* Member Details */}
      <div
        className={`flex flex-col items-center font-montserrat space-y-4 flex-grow ${
          isEven ? 'md:items-end md:mr-6' : 'md:items-start md:ml-6'
        }`}
      >
        <h2 className="font-theseasons text-3xl mb-0">{member.name}</h2>
        <p className="italic text-lg text-gray-700 mb-6">{member.position}</p>
        <p className="text-gray-600 mb-7 text-center md:text-justify font-normal">{member.description}</p>

      </div>
    </div>
  );
};

export default MembersComponent;
