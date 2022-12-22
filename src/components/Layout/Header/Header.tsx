import {
  Container,
  Group,
  Header as MantineHeader,
  useMantineColorScheme,
} from '@mantine/core'
import React from 'react'

import Logo from '@/components/Logo'

import { useStyles } from './Header.styles'
import LanguageSwitch from './LanguageSwitch'
import ThemeSwitch from './ThemeSwitch'

export const HEADER_HEIGHT = 56

export default function Header() {
  const { classes } = useStyles()
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <>
      <MantineHeader height={HEADER_HEIGHT} sx={{ position: 'relative' }}>
        <Container className={classes.inner}>
          <Logo width={20} color={dark ? 'white' : 'black'} />
          <Group spacing={8} className={classes.social} position='right' noWrap>
            <LanguageSwitch />
            <ThemeSwitch />
          </Group>
        </Container>
      </MantineHeader>
    </>
  )
}
