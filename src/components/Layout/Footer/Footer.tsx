import { ActionIcon, Container, Group, Text } from '@mantine/core'
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
} from '@tabler/icons'
import React from 'react'

import Link from '@/components/Link'

import { useStyles } from './Footer.styles'

export default function Footer() {
  const { classes } = useStyles()

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>&copy; {new Date().getFullYear()} 小康</Text>
        <Group spacing={0} className={classes.links} position='right' noWrap>
          <ActionIcon
            size='lg'
            component={Link}
            noIcon
            href='https://github.com/tszhong0411'
          >
            <IconBrandGithub size={18} />
          </ActionIcon>
          <ActionIcon
            size='lg'
            component={Link}
            noIcon
            href='https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q'
          >
            <IconBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon
            size='lg'
            component={Link}
            noIcon
            href='https://www.instagram.com/tszhong0411/'
          >
            <IconBrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  )
}
