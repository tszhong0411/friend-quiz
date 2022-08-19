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
import axios from 'axios'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { CircleX } from 'tabler-icons-react'

import { quizType } from '@/lib/quizType'
import { BuddymojoType, OtherQuizType } from '@/lib/types'

import { Content } from '@/components/Intro'
import { Favicons } from '@/components/Layout/Favicons'

export default function Home() {
  const [answer, setAnswer] = React.useState<any>()
  const [type, setType] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const router = useRouter()

  const form = useForm({
    initialValues: {
      url: '',
    },

    validate: {
      url: (value) =>
        /(https|http):\/\/([a-zA-Z]+\.|)(buddymojo|holaquiz|bakequiz|hellomate).(me|com)\/(sync-quiz|match|b)\/[0-9a-zA-Z]+/.test(
          value
        )
          ? null
          : t('urlErr'),
    },
  })

  const submitHandler = async (url: string) => {
    setLoading(true)
    setAnswer(null)
    setType(null)

    const type = quizType(url)

    const { data: res } = await axios.post('/api/answer', null, {
      params: {
        url,
        type,
      },
    })

    if (res.error) {
      showNotification({
        title: t('err'),
        message: res.error === 404 && t('urlErr'),
        icon: <CircleX />,
      })
    } else {
      ;/buddymojo/i.test(type) && setAnswer(res.data.questions)
      ;/holaquiz|bakequiz|hellomate/i.test(type) && setAnswer(res.questions)
      setType(type)
    }

    setLoading(false)
  }

  return (
    <>
      <NextSeo
        titleTemplate='%s | 小康'
        defaultTitle='小康'
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
          {type === 'buddymojo' &&
            answer &&
            answer.map((q: BuddymojoType, i: number) => (
              <Box my={16} key={i}>
                <Text>{`${i + 1}. ${q.question}`}</Text>
                <div>
                  <Text>{q.options[Number(q.choosenOption) - 1].content}</Text>
                </div>
              </Box>
            ))}
          {/holaquiz|bakequiz|hellomate/.test(type) &&
            answer &&
            answer.map((q: OtherQuizType, i: number) => {
              const parser = new DOMParser()
              const answer = q.options.find(
                (e) => e.questionOptionId === q.chQuestionOptionId
              ).content

              return (
                <div key={i}>
                  <p>
                    {`${i + 1}. ${
                      q.question.includes('<html>')
                        ? parser
                            .parseFromString(q.question, 'text/html')
                            .querySelector('h2').innerText
                        : q.question
                    }`}
                  </p>
                  <div>
                    <p>
                      {answer.includes('<html>') ? (
                        <Image
                          width={175}
                          height={175}
                          src={parser
                            .parseFromString(answer, 'text/html')
                            .querySelector('img')
                            .getAttribute('src')}
                          alt='answer cover'
                        />
                      ) : (
                        answer
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
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
