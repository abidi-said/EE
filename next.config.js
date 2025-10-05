const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // Required for static export
  },
  // GitHub Pages configuration
  assetPrefix: isProd ? '/EE' : '',
  basePath: isProd ? '/EE' : '',
  trailingSlash: true,
  output: 'export', // Enable static export
  distDir: 'out', // Output directory for static files
}

module.exports = nextConfig
