const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // Required for static export
  },
}

// Development configuration
if (isDev) {
  nextConfig.i18n = i18n
}

// Production configuration for GitHub Pages
if (isProd) {
  nextConfig.assetPrefix = '/EE'
  nextConfig.basePath = '/EE'
  nextConfig.trailingSlash = true
  nextConfig.output = 'export'
  nextConfig.distDir = 'out'
}

module.exports = nextConfig
