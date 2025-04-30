'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white py-8 flex flex-col items-center">
      {/* Top border */}
      <div className="w-4/5 border-t border-gray-300 mb-6" />

      {/* Social icons */}
      <div className="flex space-x-4 items-center">
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

      {/* Logo */}
      <Image
        src="/media/arietta-logo-black.svg" 
        alt="LOVUR Logo"
        width={100}
        height={100}
      />
    </footer>
  );
}
