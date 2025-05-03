import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
        {/* Header Image */}
        <div className="w-full flex justify-center mb-8">
            <div className="w-full h-[auto] md:w-[1000px] md:h-[600px] relative overflow-hidden shadow-md">
            <Image
                src="/media/about_group_photo.jpg" 
                alt="About LOVUR Quartet"
                width={1000}
                height={600}
                className="w-full h-auto object-cover"
            />
            </div>
        </div>

        {/* Paragraphs */}
        <div className="font-montserrat text-[0.95rem] max-w-[1000px] mx-auto space-y-6 text-lg leading-relaxed text-gray-800">
            <p>
            The LOVUR String Quartet, based in Vancouver, is a dynamic and genre-defying ensemble known for its captivating performances that bridge the gap between classical tradition and modern flair. Founded and led by Juilliard School alumna, Esther Hwang (violin 1), the quartet includes David Lee (violin 2), Luci Barz (viola), and Allen Zhou (cello) - four accomplished musicians who share a deep passion for artistry, collaboration, and innovation.
            </p>
            <p>
            Each member brings a wealth of experience as soloists, chamber musicians, and orchestral performers:
            </p>

            {/* Bullet Points */}
            <ul className="list-disc list-inside space-y-2">
            <li>Esther Hwang has appeared as a soloist with the Vancouver Symphony Orchestra since the age of nine and studied under world-renowned professors at The Juilliard School. A prizewinner of numerous national competitions, she has performed at festivals such as Heifetz, Aspen, Banff, and the New York String Orchestra Seminar.
            </li>
            <li>David Lee recently served as Associate Concertmaster at the prestigious Schleswig-Holstein Music Festival in Germany, performing at the Elbphilharmonie and alongside artists like Lang Lang and Alisa Weilerstein. He is an active performer and conductor in BC and a sought-after violin instructor.</li>
            <li>Luci Barz, a Romanian-born violist, has performed around the globe and studied under top mentors including Marina Thibeault and Isabelle Roland. He balances an active performing career with a deep commitment to teaching and community outreach.</li>
            <li>Allen Zhou holds advanced degrees in cello performance from the University of Ottawa and the University of Montreal. A dedicated chamber musician and educator, he performs regularly with the Vancouver Metropolitan Orchestra and as principal cellist with regional ensembles.
            </li>
            </ul>

            {/* Subheading + More Paragraphs */}
            <h2 className="font-theseasons text-2xl md:text-4xl mt-8 leading-[145%]">As a group, LOVUR has amassed a significant digital presence, with over 43,000 followers across social media platforms and more than 10 million views on their performance videos.</h2>

            <p>Their innovative arrangements and stylistic versatility - from timeless classical works to fresh pop covers - have resonated with a global audience.
            </p>
            <p>They are frequent performers at the Whistler Candlelight Concerts at the Maury Young Arts Centre and are members of the Vancouver Metropolitan Orchestra.
            </p>
            <p>The quartet’s name, “LOVUR,” is a stylized take on the word lover, symbolizing the ensemble’s heartfelt dedication to their craft and their love for creating unforgettable musical experiences. Whether performing in intimate venues or on grand stages, the LOVUR String Quartet brings elegance, energy, and emotional depth to every performance.
            </p>
            <p>Current as of April, 2025
            </p>
        </div>
        </div>
        <Footer />
    </>
    
  );
}
