'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Define navigation links
  const navLinks = [
    { href: '/', label: 'Home', exact: true },  // Home needs exact match
    { href: '/about', label: 'About' },
    { href: '/members', label: 'Members' },
    { href: '/concerts', label: 'Concerts' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact Us' },
  ];

  // Helper function to determine if link is active
  const isActive = (href: string, exact: boolean = false) => {
    return exact 
      ? pathname === href
      : pathname.startsWith(href) && (href !== '/' || pathname === '/');
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm pt-7 pb-1 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        {/* Left Side: Title and Nav Links */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl text-gray-800 mb-2">LOVUR String Quartet</h1>
          <div className="uppercase font-montserrat flex flex-wrap gap-4 text-sm sm:text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  transition-all duration-200 pb-1
                  ${isActive(link.href, link.exact)
                    ? 'font-bold text-gray-900 border-b-2 border-gray-900'
                    : 'font-medium text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex space-x-4 items-end">
          <a href="https://www.instagram.com/lovurquartet/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
            <img 
              src="/media/ig.png" 
              alt="Instagram" 
              className="w-5 h-5 sm:w-7 sm:h-7" 
            />
          </a>
          <a href="https://www.tiktok.com/@lovurquartet" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
            <img 
              src="/media/tiktok.png" 
              alt="Tiktok" 
              className="w-5 h-5 sm:w-7 sm:h-7" 
            />
          </a>
          <a href="https://www.youtube.com/@LOVURquartet" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
            <img 
              src="/media/youtube.png" 
              alt="Youtube" 
              className="w-5 h-5 sm:w-7 sm:h-7" 
            />
          </a>
          <a href="https://open.spotify.com/artist/0HJkJhSSyp7IVB7DPOLHj2" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
            <img 
              src="/media/spotify.png" 
              alt="Spotify" 
              className="w-5 h-5 sm:w-7 sm:h-7" 
            />
          </a>
        </div>
      </div>
    </nav>
  );
}