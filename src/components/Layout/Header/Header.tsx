import { Container, Group, Header as MantineHeader } from '@mantine/core'
import React from 'react'

import { useStyles } from './Header.styles'
import HeaderLogo from './HeaderLogo'
import LanguageSwitch from './LanguageSwitch'
import ThemeSwitch from './ThemeSwitch'

export const HEADER_HEIGHT = 56

export default function Header() {
  const { classes } = useStyles()

  return (
    <>
      <MantineHeader height={HEADER_HEIGHT} sx={{ position: 'relative' }}>
        <Container className={classes.inner}>
          <HeaderLogo />
          <Group spacing={8} className={classes.social} position='right' noWrap>
            <LanguageSwitch />
            <ThemeSwitch />
          </Group>
        </Container>
      </MantineHeader>
    </>
  )
}
