import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/global.css'

import Analytics from '@/components/analytics'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={'system'}>
      <Analytics />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
