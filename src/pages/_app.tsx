import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Global,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import React from 'react'

import { isProd } from '@/lib/isProduction'

import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

export default function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily:
            'Sora,Noto Sans TC,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
          primaryColor: 'red',
          breakpoints: {
            xs: 375,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        }}
      >
        <NotificationsProvider>
          <Global
            styles={() => ({
              html: {
                scrollBehavior: 'smooth',
              },
              '::selection': {
                background: 'rgb(249, 6, 6, 0.05)',
                color: '#f90606',
              },
              '::-webkit-scrollbar': {
                width: 7,
                height: 5,
              },
              '::-webkit-scrollbar-thumb': {
                background: '#ef4444',
                transition: '0.25s',
                borderRadius: 2,
              },
              '::-webkit-scrollbar-track': {
                background: '0 0',
              },
              'input:-webkit-autofill, input:-webkit-autofill:focus': {
                transition: 'background-color 600000s 0s, color 600000s 0s',
              },
            })}
          />
          {isProd && (
            <Script
              async
              defer
              data-website-id='e1e23abc-a33d-438b-9621-a961221fdd51'
              src='https://umami.honghong.me/umami.js'
            />
          )}
          <Header />
          <Container
            sx={(theme) => ({
              padding: '24px 16px',
              [theme.fn.largerThan('sm')]: {
                padding: '48px 32px',
              },
            })}
          >
            <Component {...pageProps} />
          </Container>
          <Footer />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
