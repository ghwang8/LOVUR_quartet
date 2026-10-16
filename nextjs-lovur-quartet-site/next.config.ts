import type { NextConfig } from "next";
import path from "path";

if (typeof window === 'undefined' && global.localStorage && typeof global.localStorage.getItem !== 'function') {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    },
    writable: true,
  });
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity's CDN to the list of allowed domains
  },
};

export default nextConfig;
