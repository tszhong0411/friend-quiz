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
    if (!inputRef.current?.value) return toast.error('請輸入測驗網址')

    setLoading(true)
    setAnswers(null)

    const res = await fetch(
      `${site.apiURL}/friend-quiz/${encodeURIComponent(
        inputRef.current?.value
      )}`
    )

    if (!res.ok) {
      setLoading(false)
      return toast.error('請輸入正確的測驗網址')
    }

    const answers = await res.json()

    setLoading(false)
    setAnswers(answers)
  }

  return (
    <div className='bg-black text-white flex items-center justify-center'>
      <div className='w-full max-w-2xl px-4 space-y-12'>
        <div>
          <h1 className='text-4xl text-center font-bold mb-4'>
            好友測驗作弊器
          </h1>
          <p className='mb-8 text-center'>
            輸入您的測驗網址，然後點擊 &quot;取得答案&quot; 來獲取您的測驗答案。
          </p>
          <div className='flex mb-4 gap-4'>
            <div className='flex-1'>
              <input
                type='url'
                className='bg-transparent rounded-lg py-2 px-4 focus:outline-none border hover:border-white border-accent-2 w-full'
                placeholder='輸入測驗網址'
                ref={inputRef}
              />
            </div>
            <button
              className='rounded-md py-2 px-4 text-white font-bold border border-accent-2 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              onClick={handleSubmit}
              disabled={loading}
            >
              取得答案
            </button>
          </div>
        </div>
        <div className='space-y-4'>
          {loading && (
            <div className='space-y-4 mb-8'>
              {Array.from(Array(10).keys()).map((i) => (
                <Skeleton key={i} className='h-14' />
              ))}
            </div>
          )}

          {answers && <h2 className='font-bold text-xl'>答案:</h2>}
          {answers?.map((answer, i) => (
            <div key={i} className='my-4 border border-accent-2 p-4 rounded-md'>
              <div>
                {i + 1}. {answer.title}
              </div>
              {answer.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={answer.image}
                  width={120}
                  height={120}
                  className='rounded-sm my-2'
                  alt={`Image of question ${i + 1}`}
                />
              )}
              <div>{answer.content}</div>
            </div>
          ))}

          <h2 className='font-bold text-xl'>支援網址:</h2>

          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='text-xs uppercase bg-accent-1 border-b border-accent-2'>
                <tr>
                  <th className='px-6 py-3'>網站名稱</th>
                  <th className='px-6 py-3'>格式</th>
                </tr>
              </thead>
              <tbody>
                {site.supportSites.map(({ label, url }, i) => (
                  <tr
                    key={label}
                    className={clsx('bg-accent-1 text-center', {
                      ['border-b border-accent-2']:
                        site.supportSites.length - 1 !== i,
                    })}
                  >
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
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
