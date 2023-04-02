/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },

  images: {
    domains: ['img.holaquiz.com', 'img.bakequiz.com', 'img.theshookers.com'],
  },
}

export default nextConfig
