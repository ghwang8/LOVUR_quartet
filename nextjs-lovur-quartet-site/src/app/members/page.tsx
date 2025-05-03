import { client } from '@/sanity/client';
import MembersComponent from '@/components/MembersComponent';
import { Member } from '@/types/member';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MEMBERS_QUERY = `*[_type == "member"] | order(order asc){
    _id,
    name,
    position,
    photo,
    description,
    slug
  }`;
  

export default async function MembersPage() {
  // Fetch all the members
  const members = await client.fetch<Member[]>(MEMBERS_QUERY);

  return (
    <>
    <Navbar />
    <div className="container max-w-5xl mx-auto my-7 p-8 space-y-8">
      <div className="space-y-8">
        {members.map((member, index) => (
          <MembersComponent key={member._id} member={member} index={index} total={members.length} />
        ))}
      </div>
    </div>
    <Footer />
    </>
    
  );
}
