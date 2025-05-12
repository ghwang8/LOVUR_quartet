'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrolled = () => {
      const currentScrollY = window.scrollY;
      // Only update state if we've passed the threshold by at least 10px
      if (currentScrollY > 60 || currentScrollY < 40) {
        setScrolled(currentScrollY > 50);
      }
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav 
      className={`w-full bg-white shadow-md shadow-gray-800/10 pb-1 sticky top-0 z-50 transition-[padding] duration-400 ease-in-out delay-100 ${
        scrolled ? 'md:pt-2' : 'pt-2 md:pt-7'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-start md:items-end justify-between">
        {/* Left: Title + Nav */}
        <div className="flex flex-col">
          {/* Make heading a link to home */}
          <Link 
            href="/" 
            className={`text-2xl md:text-4xl text-gray-800 font-normal transition-all duration-400 ease-in-out ${
              scrolled ? 'md:hidden md:opacity-0 md:invisible' : 'opacity-100'
            } hover:opacity-80 relative z-[60] block w-fit cursor-pointer
            safari-tap-fix`}
          >
            LOVUR Quartet
          </Link>
          
          <div className="hidden sm:flex flex-wrap gap-4 mt-2 font-montserrat text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `transition-all duration-200 pb-1 uppercase 
                  ${isActive(link.href, link.exact)
                    ? 'font-bold text-gray-900 border-b-2 border-gray-900'
                    : 'font-medium text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'}`
                }
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
            <div className="flex flex-col gap-2 font-montserrat text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    `transition-all duration-200 pb-1 uppercase
                    ${isActive(link.href, link.exact)
                      ? 'font-bold text-gray-900 border-b-2 border-gray-900'
                      : 'font-medium text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'}`
                  }
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
        <img src="/media/ig.png" alt="Instagram" className="w-9 h-9 md:w-6 md:h-6" />
      </a>
      <a
        href="https://www.tiktok.com/@lovurquartet"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/tiktok.png" alt="TikTok" className="w-9 h-9 md:w-6 md:h-6" />
      </a>
      <a
        href="https://www.youtube.com/@LOVURquartet"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/youtube.png" alt="YouTube" className="w-9 h-9 md:w-6 md:h-6" />
      </a>
      <a
        href="https://open.spotify.com/artist/0HJkJhSSyp7IVB7DPOLHj2"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50 transition-opacity"
      >
        <img src="/media/spotify.png" alt="Spotify" className="w-9 h-9 md:w-6 md:h-6" />
      </a>
    </>
  );
}
