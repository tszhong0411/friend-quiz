import Link from 'next/link'

import Logo from './Logo'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-40 shadow-sm backdrop-blur-[10px] bg-black/50 saturate-100'>
      <div className='container mx-auto px-4 py-6 flex justify-between items-center max-w-4xl'>
        <Link href='/' className='flex items-center'>
          <Logo />
        </Link>
      </div>
    </header>
  )
}

export default Header
