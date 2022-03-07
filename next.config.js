module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    domains: ['img.holaquiz.com', 'img.bakequiz.com', 'img.theshookers.com'],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib'],
  },
}
