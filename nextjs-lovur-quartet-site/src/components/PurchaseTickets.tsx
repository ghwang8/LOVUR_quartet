export type TicketTier = {
  heading: string;
  subheading?: string;
  price: number;
  availability: 'open' | 'few' | 'closed';
  url?: string;
  showTime: string;
  bgcolor?: string;
  eventInstanceDate?: string; 
  address: string;      
};


type PurchaseTicketsProps = {
  tickets: TicketTier[];
};

const PurchaseTickets: React.FC<PurchaseTicketsProps> = ({ tickets }) => {
  const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
   });
  };

  return (
    <div className="flex flex-col justify-center w-full py-10 bg-gray-50" id="tickets-section">
      <h2 className="text-center text-3xl font-montserrat font-bold mb-8">PURCHASE TICKETS</h2>

      <div className="flex flex-wrap w-full items-center justify-center gap-5 px-4 max-w-7xl mx-auto">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className={`relative w-[350px] h-full shadow-md transition-all duration-300`}
          >
            {/* SOLD OUT overlay */}
            {ticket.availability === 'closed' && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 text-white text-2xl font-bold flex items-center justify-center z-10 rounded-xl">
                SOLD OUT
              </div>
            )}
            <div style={{ backgroundColor: ticket.bgcolor }} className="h-[180px] py-18">
            <h3 className="text-3xl uppercase font-bold text-center mb-2">{ticket.heading}</h3>

                {ticket.subheading && (
                <p className="text-center text-md text-gray-700 mb-2">{ticket.subheading}</p>
                )}
    
            </div>
                        
            <div className="flex flex-col justify-center align-center py-14 px-5 font-montserrat">
                <p className="text-center text-3xl font-bold text-gray-900 mb-">
                CA${ticket.price}.00
                </p>
                <p className="text-center text-sm italic mb-6">*price before tax</p>
                <ul className="w-full text-sm text-center text-lg space-y-1 mb-6">
                   <li className="flex w-full text-lg justify-center items-center">
                        <img src="/media/icons/date.png" alt="date" className="w-5 h-5 mr-2" />
                        {ticket.showTime
                        ? (ticket.eventInstanceDate ? `${formatDateTime(ticket.eventInstanceDate)} ${ticket.showTime}` : ticket.showTime)
                        : (ticket.eventInstanceDate ? formatDateTime(ticket.eventInstanceDate) : 'Date TBA')}
                    </li>

                    <li className="flex w-full text-lg justify-center items-center">
                        <img src="/media/icons/pin.png" alt="location" className="w-5 h-5 mr-2" />
                        {ticket.address && (
                        ticket.address
                    )}
                    </li>
                    
                </ul>
                {/* Availability Message */}
                <div className="mb- flex items-center justify-center">
                {ticket.availability === 'few' && (
                    <p className="text-red-600 font-semibold text-sm">**Only a few left!**</p>
                )}
                </div>

                {/* Purchase Button */}
                <div className="text-center">
                {ticket.url ? (
                    <a
                    href={ticket.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#1b73e8] text-white text-lg font-bold py-3 px-20 rounded-full hover:bg-[#adc7e9] transition"
                    >
                    PURCHASE
                    </a>
                ) 
                : (
                    <span className="inline-block bg-gray-300 text-gray-600 py-2 px-4 rounded-lg cursor-not-allowed">
                    Unavailable
                    </span>
                )}
            </div>           
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseTickets;
