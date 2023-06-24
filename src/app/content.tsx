'use client'
import { Button, Input, Skeleton } from '@codewithhong/ui'
import { cx } from '@codewithhong/utils'
import React from 'react'
import { toast } from 'react-hot-toast'

import { site } from '@/config/site'

import { Answer } from '@/types'

const Content = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [answers, setAnswers] = React.useState<Answer[] | null>()

  const handleSubmit = async () => {
    if (!inputRef.current?.value)
      return toast.error('Please enter the quiz URL')

    setLoading(true)
    setAnswers(null)

    const res = await fetch(
      `${site.apiURL}/friend-quiz/${encodeURIComponent(
        inputRef.current?.value
      )}`
    )

    if (!res.ok) {
      setLoading(false)
      return toast.error('Please enter the correct quiz URL')
    }

    const answers = await res.json()

    setLoading(false)
    setAnswers(answers)

    return
  }

  const sortedSites = site.supportedSites.sort((a, b) => {
    const labelA = a.label.toUpperCase()
    const labelB = b.label.toUpperCase()
    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }
    return 0
  })

  return (
    <div className='flex items-center justify-center bg-black text-white'>
      <div className='w-full max-w-2xl space-y-12 px-4'>
        <div>
          <h1 className='mb-4 text-center text-4xl font-bold'>
            Friend Quiz Cheating Tool
          </h1>
          <p className='mb-8 text-center'>
            Enter your quiz URL, then click &apos;Get Answers&apos; to retrieve
            your quiz answers.
          </p>
          <div className='mb-4 flex flex-col gap-4 sm:flex-row'>
            <div className='flex-1'>
              <Input
                type='url'
                placeholder='Enter the quiz URL'
                className='w-full'
                ref={inputRef}
              />
            </div>
            <Button onClick={handleSubmit} disabled={loading} type='button'>
              Get Answers
            </Button>
          </div>
        </div>
        <div className='space-y-4'>
          {loading && (
            <div className='mb-8 space-y-4'>
              {Array.from(Array(10).keys()).map((i) => (
                <Skeleton key={i} className='h-14' />
              ))}
            </div>
          )}

          {answers && <h2 className='text-xl font-bold'>Answers:</h2>}
          {answers?.map((answer, i) => (
            <div
              key={answer.title}
              className='my-4 rounded-md border border-accent-2 p-4'
            >
              <div>
                {i + 1}. {answer.title}
              </div>
              {answer.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={answer.image}
                  width={120}
                  height={120}
                  className='my-2 rounded-sm'
                  alt={`Question ${i + 1}`}
                />
              )}
              <div>{answer.content}</div>
            </div>
          ))}

          <h2 className='text-xl font-bold'>Supported sites:</h2>

          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='border-b border-accent-2 bg-accent-1 text-xs uppercase'>
                <tr>
                  <th className='px-6 py-3'>Site name</th>
                  <th className='px-6 py-3'>Format</th>
                </tr>
              </thead>
              <tbody>
                {sortedSites.map(({ label, url }, i) => (
                  <tr
                    key={label}
                    className={cx('bg-accent-1 text-center', {
                      ['border-b border-accent-2']:
                        sortedSites.length - 1 !== i,
                    })}
                  >
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>
                      {label}
                    </td>
                    <td className='px-6 py-4 text-sm'>{url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
