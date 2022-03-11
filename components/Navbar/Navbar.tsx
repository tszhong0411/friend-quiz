import { useState } from 'react'

import Link from '@/components/Link'
import Logo from '@/components/Logo'
import { MobileNav } from '@/components/Navbar'
import ThemeSwitch from '@/components/ThemeSwitch'

export const NavItem = [
  {
    name: '首頁',
    href: '/',
  },
]

export const Navbar = () => {
  const [navShow, setNavShow] = useState(false)

  return (
    <header>
      <div className="flex items-center justify-between max-w-4xl px-6 py-2 mx-auto">
        <div className="flex items-center gap-x-8">
          <div>
            <Link href={'/'}>
              <Logo size={20} />
            </Link>
          </div>
          <ul className="items-center hidden sm:flex">
            {NavItem.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="font-medium hover:text-brand">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
          <MobileNav navShow={navShow} setNavShow={setNavShow} />
        </div>
      </div>
    </header>
  )
}
