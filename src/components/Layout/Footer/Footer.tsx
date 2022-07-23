import { ActionIcon, Container, Group, Text } from '@mantine/core'
import React from 'react'
import { BrandGithub, BrandInstagram, BrandYoutube } from 'tabler-icons-react'

import { useStyles } from '@/components/Layout/Footer/Footer.styles'
import Link from '@/components/Link'

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
            <BrandGithub size={18} />
          </ActionIcon>
          <ActionIcon
            size='lg'
            component={Link}
            noIcon
            href='https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q'
          >
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon
            size='lg'
            component={Link}
            noIcon
            href='https://www.instagram.com/tszhong0411/'
          >
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  )
}
