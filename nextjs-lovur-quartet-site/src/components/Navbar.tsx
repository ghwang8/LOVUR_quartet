'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', exact: true },
    { href: '/about', label: 'About' },
    { href: '/members', label: 'Members' },
    { href: '/concerts', label: 'Concerts' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const isActive = (href: string, exact = false) => {
    return exact
      ? pathname === href
      : pathname.startsWith(href) && (href !== '/' || pathname === '/');
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm pt-2 md:pt-7 pb-1 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-start md:items-end justify-between">
        {/* Left: Title + Nav */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl text-gray-800 font-normal">LOVUR Quartet</h1>
          <div className="hidden sm:flex flex-wrap gap-4 mt-2 font-montserrat text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  transition-all duration-200 pb-1 uppercase
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

        {/* Right: Social + Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Desktop social icons */}
          <div className="hidden sm:flex space-x-4 items-center">
            <SocialIcons />
          </div>

          {/* Hamburger for mobile */}
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden overflow-hidden px-4 pb-4 space-y-4"
          >
            <div className="flex flex-col gap-2 font-montserrat text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    transition-all duration-200 pb-1 uppercase
                    ${isActive(link.href, link.exact)
                      ? 'font-bold text-gray-900 border-b-2 border-gray-900'
                      : 'font-medium text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex space-x-4 pt-2">
              <SocialIcons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Social Icons component (reuse for desktop + mobile)
function SocialIcons() {
  return (
    <>
      <a
        href="https://www.instagram.com/lovurquartet/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/ig.png" alt="Instagram" className="w-6 h-6" />
      </a>
      <a
        href="https://www.tiktok.com/@lovurquartet"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/tiktok.png" alt="TikTok" className="w-6 h-6" />
      </a>
      <a
        href="https://www.youtube.com/@LOVURquartet"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/youtube.png" alt="YouTube" className="w-6 h-6" />
      </a>
      <a
        href="https://open.spotify.com/artist/0HJkJhSSyp7IVB7DPOLHj2"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/spotify.png" alt="Spotify" className="w-6 h-6" />
      </a>
    </>
  );
}
