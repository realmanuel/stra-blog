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
  experimental: {
    turbo: {
      resolveAlias: {
        'swr': 'swr',
      },
    },
  },
}

export default nextConfig