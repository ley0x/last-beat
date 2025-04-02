import type { NextConfig } from "next";
// lastfm.freetls.fastly.net
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
