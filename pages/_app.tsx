import { createTheme, ThemeProvider as MUIProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/global.css'

import Analytics from '@/components/analytics'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MUIProvider theme={theme}>
      <ThemeProvider attribute="class" defaultTheme={'system'}>
        <Analytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </MUIProvider>
  )
}
