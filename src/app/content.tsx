'use client'

import clsx from 'clsx'
import React from 'react'
import { toast } from 'react-hot-toast'

import Skeleton from '@/components/Skeleton'

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
          <div className='mb-4 flex gap-4'>
            <div className='flex-1'>
              <input
                type='url'
                className='w-full rounded-lg border border-accent-2 bg-transparent px-4 py-2 transition-colors duration-300 hover:border-white focus:outline-none'
                placeholder='Enter the quiz URL'
                ref={inputRef}
              />
            </div>
            <button
              className='rounded-md border border-accent-2 px-4 py-2 font-bold text-white transition-colors duration-300 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              onClick={handleSubmit}
              disabled={loading}
              type='button'
            >
              Get Answers
            </button>
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
                {site.supportedSites.map(({ label, url }, i) => (
                  <tr
                    key={label}
                    className={clsx('bg-accent-1 text-center', {
                      ['border-b border-accent-2']:
                        site.supportedSites.length - 1 !== i,
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
