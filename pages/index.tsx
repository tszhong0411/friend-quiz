/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Container from '@/components/Container'
import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { MotionButton } from '@/components/Button'
import { darkTheme } from '@/lib/stitches.config'
import { config } from '@/data/config'
import Link from '@/components/Link'
import { Flex } from '@/components/Flex'
import { isValidHttpUrl } from '@/lib/utils/checkUrl'
import Image from 'next/image'

interface Type {
  name: string
}

export default function Home() {
  const urlRef = useRef(null)
  const [answer, setAnswer] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<Type>(null)

  const submitHandler = async (e: React.FormEvent) => {
    // * 清除 type & data
    setAnswer(null)
    setType(null)
    e.preventDefault()
    // * 設置 loading 狀態
    setLoading(true)
    // * 再次檢查 url 是否正確
    if (isValidHttpUrl(urlRef.current.value)) {
      urlRef.current.value.includes('buddymojo.com') && setType({ name: 'buddymojo' })
      urlRef.current.value.includes('holaquiz.com') && setType({ name: 'holaquiz' })
      urlRef.current.value.includes('bakequiz.com') && setType({ name: 'bakequiz' })
      urlRef.current.value.includes('hellomate.me') && setType({ name: 'hellomate' })

      const res = await fetch(`/api/getAnswer?url=${urlRef.current.value}`)

      // * 結果
      if (res.status !== 404) {
        const data = await res.json()

        setAnswer({ data })
      } else {
        toast.error('網址錯誤，請檢查後再試')
      }
    } else {
      toast.error('請檢查網址的有效性')
    }
    setLoading(false)
  }

  const result = () => {
    switch (type.name) {
      case 'buddymojo':
        return answer.data.data.questions.map((question, index) => {
          return (
            <Box key={index}>
              <Text as="p" css={{ mb: '$2', fontSize: '$md', '@sm': { fontSize: '$xl' } }}>
                {`${index + 1}. ${question.question}`}
              </Text>
              <Box>
                <Text as="p" css={{ fontSize: '$md', '@sm': { fontSize: '$lg' } }}>
                  {question.options[Number(question.choosenOption) - 1].content}
                </Text>
              </Box>
            </Box>
          )
        })
      case 'holaquiz':
      case 'bakequiz':
      case 'hellomate':
        return answer.data.questions.map((question, index) => {
          // * 格式化 DOM 結構
          const parser = new DOMParser()
          const answer = question.options.find(
            (e) => e.questionOptionId === question.chQuestionOptionId
          ).content

          return (
            <Box key={index}>
              <Text as="p" css={{ mb: '$2', fontSize: '$md', '@sm': { fontSize: '$xl' } }}>
                {`${index + 1}. ${
                  question.question.includes('<html>')
                    ? parser.parseFromString(question.question, 'text/html').querySelector('h2')
                        .innerText
                    : question.question
                }`}
              </Text>
              <Box>
                <Text as="p" css={{ fontSize: '$md', '@sm': { fontSize: '$lg' } }}>
                  {answer.includes('<html>') ? (
                    <Image
                      width={175}
                      height={175}
                      src={parser
                        .parseFromString(answer, 'text/html')
                        .querySelector('img')
                        .getAttribute('src')}
                      alt="answer cover"
                    />
                  ) : (
                    answer
                  )}
                </Text>
              </Box>
            </Box>
          )
        })
      default:
        return <h1>No answer found</h1>
    }
  }

  return (
    <Container>
      <Box>
        <Text size={7} as="h1" css={{ ta: 'center', fontWeight: 700 }}>
          好友問卷作弊器
        </Text>
        <Text size={4} as="p" css={{ my: '$5', fontWeight: 400, ta: 'center' }}>
          使用我們的好友問卷作弊器可以輕鬆知道好友問卷上的答案
        </Text>
        <form onSubmit={(e) => submitHandler(e)}>
          {' '}
          <Box css={{ my: '$10', '@sm': { display: 'flex', gapX: '$4' } }}>
            <Box
              as="input"
              type="url"
              required
              placeholder="網址: https://example.com"
              ref={urlRef}
              css={{
                width: '100%',
                border: '2px solid hsla($palette-gray-50, 100%)',
                borderRadius: '$2',
                outline: 'none',
                transition: '0.3s',
                px: '$4',
                py: '$3',
                '&:focus': {
                  borderColor: '$honghong-colors-brand',
                  boxShadow: '0 0 8px 0',
                },
              }}
            />
            <MotionButton
              css={{
                height: '$12',
                backgroundColor: '$honghong-colors-brand',
                br: '$2',
                width: '100%',
                my: '$2',
                transition: '0.3s',
                color: '$honghong-colors-white-in-white',
                '&:hover': {
                  backgroundColor: 'hsla($palette-blue-55, 100%)',
                  [`.${darkTheme} &`]: {
                    backgroundColor: 'hsla($palette-blue-40, 100%)',
                  },
                },
                '@sm': {
                  my: '0',
                  height: 'calc($12 + 4px)',
                  width: 'calc(100%/3)',
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <Flex inlineFlex alignItems={'center'}>
                  <Oval
                    ariaLabel="loading-indicator"
                    height={30}
                    width={30}
                    strokeWidth={3}
                    color="white"
                    secondaryColor="white"
                  />
                </Flex>
              ) : (
                '提交'
              )}
            </MotionButton>
          </Box>
        </form>
      </Box>
      <Box>
        {type !== null && answer !== null && (
          <>
            <Text size={6} as="h2" css={{ mb: '$4', fontWeight: 700 }}>
              答案
            </Text>
            <Box css={{ spaceY: '$5' }}>{result()}</Box>
          </>
        )}
      </Box>
      <Box css={{ mt: '$13', spaceY: '$10' }}>
        <Box>
          <Text size={6} as="h2" css={{ mb: '$4', fontWeight: 700 }}>
            支援網址
          </Text>
          <Box>
            <Box as="ul" css={{ spaceY: '$3' }}>
              {config.support_site.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} variant={'blue'} underline>
                    {item.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <Text size={6} as="h2" css={{ mb: '$4', fontWeight: 700 }}>
            作者
          </Text>
          <Box>
            <Text size={4} as="p">
              <Link href="https://honghong.me" underline variant="blue">
                小康
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
