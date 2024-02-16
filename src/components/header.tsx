import { Logo } from '@tszhong0411/ui'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 bg-black/50 shadow-sm saturate-100 backdrop-blur-[10px]'>
      <div className='container mx-auto flex max-w-4xl items-center justify-between p-4'>
        <Link href='/' className='flex items-center'>
          <Logo width={24} height={24} />
        </Link>
      </div>
    </header>
  )
}

export default Header
