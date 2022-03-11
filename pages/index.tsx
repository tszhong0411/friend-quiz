/* eslint-disable @typescript-eslint/no-explicit-any */
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import { isValidHttpUrl } from '@/lib/utils/checkUrl'

import { config } from '@/data/config'

import Container from '@/components/Container'
import Link from '@/components/Link'

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
      if (res.status === 404) {
        toast.error('網址錯誤，請檢查後再試')
      }

      if (res.status === 504) {
        toast.error('伺服器超出負荷，請重試')
      }

      if (res.status === 200) {
        const data = await res.json()

        setAnswer({ data })
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
            <div key={index}>
              <p className="mb-2 text-base sm:text-xl">{`${index + 1}. ${question.question}`}</p>
              <div>
                <p className="text-base sm:text-lg">
                  {question.options[Number(question.choosenOption) - 1].content}
                </p>
              </div>
            </div>
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
            <div key={index}>
              <p className="mb-2 text-base sm:text-xl">
                {`${index + 1}. ${
                  question.question.includes('<html>')
                    ? parser.parseFromString(question.question, 'text/html').querySelector('h2')
                        .innerText
                    : question.question
                }`}
              </p>
              <div>
                <p className="text-base sm:text-lg">
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
                </p>
              </div>
            </div>
          )
        })
      default:
        return <h1>No answer found</h1>
    }
  }

  return (
    <Container>
      <div>
        <h1 className="text-3xl font-bold text-center">好友問卷作弊器</h1>
        <p className="my-6 text-lg font-medium text-center">
          使用我們的好友問卷作弊器可以輕鬆知道好友問卷上的答案
        </p>
        <Alert severity="info" className="font-sans font-medium">
          <AlertTitle className="font-sans font-medium">注意</AlertTitle>
          <p>
            目前伺服器不能處理超過十秒的要求 <s>(因為沒錢)</s>
          </p>
          <p>如果十秒後沒有回應，請重試</p>
        </Alert>
        <form onSubmit={(e) => submitHandler(e)}>
          {' '}
          <div className="my-10 gap-x-4 sm:flex">
            <input
              type="url"
              required
              placeholder="網址: https://example.com"
              ref={urlRef}
              className="solid border-[rgb(108, 119, 147)] focus:border-brand w-full rounded-md border-2 shadow-md outline-none duration-300 text-typeface-primary dark:text-typeface-primary-dark bg-body-secondary dark:bg-body-secondary-dark"
            />
            <motion.button
              className="w-full h-12 my-2 text-white duration-300 bg-blue-500 rounded-md hover:bg-blue-600 sm:my-0 sm:h-12 sm:w-1/3"
              disabled={loading}
            >
              {loading ? (
                <div className="inline-flex items-center">
                  <Oval
                    ariaLabel="loading-indicator"
                    height={30}
                    width={30}
                    strokeWidth={3}
                    color="white"
                    secondaryColor="white"
                  />
                </div>
              ) : (
                '提交'
              )}
            </motion.button>
          </div>
        </form>
      </div>
      <div>
        {type !== null && answer !== null && (
          <>
            <h2 className="mb-4 text-2xl font-bold">答案</h2>
            <div className="space-y-6">{result()}</div>
          </>
        )}
      </div>
      <div className="mt-32 space-y-10">
        <div>
          <h2 className="mb-4 text-2xl font-bold">支援網址</h2>
          <div>
            <ul className="space-y-3">
              {config.support_site.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="duration-300 border-b-2 border-transparent hover:border-blue-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">作者</h2>
          <div>
            <p className="text-lg">
              <Link
                href="https://honghong.me"
                className="duration-300 border-b-2 border-transparent hover:border-blue-500"
              >
                小康
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
