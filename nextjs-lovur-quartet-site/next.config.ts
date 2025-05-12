import type { NextConfig } from "next";
import path from "path";

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
