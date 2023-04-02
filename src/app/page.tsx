import type { Metadata } from 'next'
import React from 'react'

import { site } from '@/config/site'

import Content from './content'

export const metadata: Metadata = {
  alternates: {
    canonical: site.url,
  },
}

const HomePage = async () => {
  return <Content />
}

export default HomePage
