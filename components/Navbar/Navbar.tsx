import { useState } from 'react'

import { Box } from '@/components/Box'
import Logo from '@/components/Logo'
import { Flex } from '@/components//Flex'
import Link from '@/components/Link'
import ThemeSwitch from '@/components/ThemeSwitch'
import { MobileNav } from '@/components/Navbar'

export const NavItem = [
  {
    name: '首頁',
    href: '/',
  },
]

export const Navbar = () => {
  const [navShow, setNavShow] = useState(false)

  return (
    <Box as="header" css={{ backgroundColor: '$honghong-colors-header' }}>
      <Flex
        justifyContent={'between'}
        alignItems={'center'}
        css={{ maxWidth: '$max-w-4xl', mx: 'auto', py: '$2', px: '$5' }}
      >
        <Flex
          alignItems={'center'}
          css={{
            gapX: '$6',
          }}
        >
          <Box>
            <Logo size={20} />
          </Box>
          <Flex
            as="ul"
            alignItems={'center'}
            css={{
              display: 'none',
              '@sm': {
                display: 'flex',
              },
            }}
          >
            {NavItem.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  css={{ fontWeight: 500, '&:hover': { color: '$honghong-colors-brand' } }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </Flex>
        </Flex>
        <Flex alignItems={'center'}>
          <ThemeSwitch />
          <MobileNav navShow={navShow} setNavShow={setNavShow} />
        </Flex>
      </Flex>
    </Box>
  )
}
