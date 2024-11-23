const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.vam.ac.uk',
        port: '',
        pathname: '/media/thira/collection_images/**',
      },
    ],
  },
}

module.exports = nextConfig

