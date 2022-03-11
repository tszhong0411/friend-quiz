// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './lib/**/*.js',
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './lib/**/*.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        // @ts-ignore
        sans: ['Noto Sans TC', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        body: 'rgb(251, 251, 252)',
        'body-secondary': 'rgb(240, 241, 244)',
        'body-secondary-dark': 'rgb(30, 34, 41)',
        'body-dark': 'rgb(22, 24, 29)',
        'typeface-primary': 'rgb(4, 5, 47)',
        'typeface-secondary': 'rgb(98, 107, 132)',
        'typeface-teriary': 'rgb(87, 95, 117)',
        'typeface-primary-dark': 'rgb(232, 232, 253)',
        'typeface-secondary-dark': 'rgb(152, 160, 179)',
        'typeface-teriary-dark': 'rgb(196, 201, 212)',
        'border-primary': 'rgb(240, 241, 244)',
        'border-primary-dark': 'rgb(30, 34, 41)',
        primary: colors.blue,
        gray: colors.neutral,
        dark: '#000',
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      screens: {
        xs: '375px',
        s: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        '2lg': '1190px',
        xl: '1280px',
        '2xl': '1536px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.typeface-secondary'),
            a: {
              color: theme('colors.typeface-primary'),
              textDecoration: 'none',
              borderBottom: `2px solid transparent`,
              transition: 'border-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                borderBottom: `2px solid ${theme('colors.primary.500')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.typeface-primary'),
            },
            'h2,h3,h4': {
              'scroll-margin-top': defaultTheme.spacing[32],
            },
            pre: {
              backgroundColor: '#24283b',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            },
            code: {
              color: theme('colors.blue.700'),
              backgroundColor: '#f3f3f3',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
            img: {
              borderRadius: '12px',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.typeface-secondary-dark'),
            a: {
              color: theme('colors.typeface-primary-dark'),
              textDecoration: 'none',
              borderBottom: `2px solid transparent`,
              transition: 'border-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                borderBottom: `2px solid ${theme('colors.primary.500')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.typeface-primary-dark'),
            },
            pre: {
              backgroundColor: '#171717',
            },
            code: {
              color: theme('colors.blue.400'),
              backgroundColor: '#171717',
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
