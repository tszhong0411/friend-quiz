/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCircleX } from '@tabler/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { config } from '@/data/config'

import { Content } from '@/components/Intro'
import { Favicons } from '@/components/Layout/Favicons'

import { Answer } from './api/getAnswer'

export default function Home() {
  const [answers, setAnswers] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const router = useRouter()

  const form = useForm({
    initialValues: {
      url: '',
    },

    validate: {
      url: (value) => (/^(https):\/\/[^ "]+$/.test(value) ? null : t('urlErr')),
    },
  })

  const getQuizType = (url: string) => {
    let type: string

    config.support_site.forEach((item) => {
      const { name } = item

      const re = new RegExp(name.toLowerCase(), 'i')
      if (re.test(url)) {
        type = name.toLowerCase()
      }
    })

    return type
  }

  const submitHandler = async (url: string) => {
    setLoading(true)
    setAnswers(null)

    const type = getQuizType(url)

    const { data: res } = await axios.post('/api/getAnswer', null, {
      params: {
        url,
        type,
      },
    })

    if (res.error) {
      showNotification({
        title: t('err'),
        message: res.error === 404 && t('urlErr'),
        icon: <IconCircleX />,
      })
    } else {
      setAnswers(res)
    }

    setLoading(false)
  }

  return (
    <>
      <NextSeo
        titleTemplate='%s | 小康 Friend quiz cheat tool'
        defaultTitle='小康 Friend quiz cheat tool'
        description='Friend quiz cheat tool'
        canonical={`https://friendquiz.honghong.me${router.asPath}`}
        twitter={{
          cardType: 'summary_large_image',
          site: '@TszhongLai0411',
          handle: '@TszhongLai0411',
        }}
        openGraph={{
          url: `https://friendquiz.honghong.me${router.asPath}`,
          type: 'website',
          title: '小康',
          description: 'Friend quiz cheat tool',
          images: [
            {
              url: 'https://friendquiz.honghong.me/static/images/banner.png',
              width: 1200,
              height: 630,
              alt: 'Friend quiz cheat tool',
            },
          ],
        }}
        additionalLinkTags={[...Favicons]}
      />
      <Container size={960}>
        <div>
          <Title order={1} mt={48} align='center'>
            {t('title')}
          </Title>
          <Text align='center' my={24}>
            {t('description')}
          </Text>
          <form
            onSubmit={form.onSubmit((values) => submitHandler(values.url))}
            className={classes.form}
          >
            <TextInput
              required
              label='URL'
              placeholder='https://buddymojo.com/'
              {...form.getInputProps('url')}
            />

            <Group position='right' mt='md'>
              <Button
                type='submit'
                sx={(theme) => ({
                  [theme.fn.smallerThan('sm')]: {
                    width: '100%',
                  },
                })}
              >
                {t('getAnswer')}
              </Button>
              <LoadingOverlay visible={loading} />
            </Group>
          </form>
        </div>
        <Box my={48}>
          {answers !== null &&
            answers.map((answer: Answer, i: number) => (
              <Box my={16} key={i}>
                <Text>{`${i + 1}. ${answer.title}`}</Text>
                <Text weight={600}>{answer.content}</Text>
              </Box>
            ))}
        </Box>
        <Content />
      </Container>
    </>
  )
}

const useStyles = createStyles(() => ({
  form: {
    position: 'relative',
  },
}))
