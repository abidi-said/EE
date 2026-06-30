/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'api.epoxy.tn'],
    unoptimized: true,
  },
}

module.exports = nextConfig
