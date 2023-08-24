'use client'

import { Toaster } from 'react-hot-toast'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidersProps) => {
  const { children } = props

  return (
    <>
      {children}
      <Toaster
        position='bottom-right'
        toastOptions={{
          className: '!bg-background !text-foreground !border',
        }}
      />
    </>
  )
}

export default Providers
