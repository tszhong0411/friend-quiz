/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranslate = require('next-translate')

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    domains: ['img.holaquiz.com', 'img.bakequiz.com', 'img.theshookers.com'],
  },

  eslint: {
    dirs: ['src'],
  },
}

module.exports = nextTranslate(nextConfig)
