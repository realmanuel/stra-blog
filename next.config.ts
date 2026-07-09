import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['next-sanity'],
turbopack: {
    resolveAlias: {
      'swr': 'swr',
    },
  },
}

export default nextConfig