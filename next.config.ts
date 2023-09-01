import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: true,
    serverActions: true
  },

  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true
  },

  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production'
  },

  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production'
  }
};

export default nextConfig;
