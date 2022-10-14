import {
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  Paper,
  Transition,
} from '@mantine/core'
import { useDisclosure, useScrollLock } from '@mantine/hooks'
import { useRouter } from 'next/router'
import React from 'react'

import Link from '@/components/Link'

import { useStyles } from './Header.styles'
import HeaderLogo from './HeaderLogo'
import LanguageSwitch from './LanguageSwitch'
import { links } from './links'
import ThemeSwitch from './ThemeSwitch'

export const HEADER_HEIGHT = 56

export default function Header() {
  const [opened, handlers] = useDisclosure(false)
  const [scrollLocked, setScrollLocked] = useScrollLock()
  const { classes, cx } = useStyles()
  const router = useRouter()

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: router.asPath === link.link,
      })}
      underline={false}
      onClick={() => opened && handlers.close()}
    >
      {link.label}
    </Link>
  ))

  return (
    <>
      <MantineHeader height={HEADER_HEIGHT} sx={{ position: 'relative' }}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={() => {
              handlers.toggle()
              setScrollLocked(!scrollLocked)
            }}
            size='sm'
            className={classes.burger}
          />
          <Group className={classes.links} spacing={5}>
            {items}
          </Group>

          <HeaderLogo />

          <Group spacing={8} className={classes.social} position='right' noWrap>
            <LanguageSwitch />
            <ThemeSwitch />
          </Group>
        </Container>
      </MantineHeader>
      <Transition transition='slide-right' duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
          </Paper>
        )}
      </Transition>
    </>
  )
}
