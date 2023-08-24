'use client'

import React from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { site } from '@/config/site'

import { Answer } from '@/types'

const Content = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [answers, setAnswers] = React.useState<Answer[] | null>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current?.value)
      return toast.error('Please enter the quiz URL')

    setLoading(true)
    setAnswers(null)

    const res = await fetch(
      `${site.apiURL}/friend-quiz/${encodeURIComponent(
        inputRef.current?.value,
      )}`,
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
          <form
            className='mb-4 flex flex-col gap-4 sm:flex-row'
            onSubmit={handleSubmit}
          >
            <div className='flex-1'>
              <Input
                type='url'
                placeholder='Enter the quiz URL'
                className='w-full'
                ref={inputRef}
              />
            </div>
            <Button disabled={loading} type='submit'>
              Get Answers
            </Button>
          </form>
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
            <div key={answer.title} className='my-4 rounded-md border p-4'>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site name</TableHead>
                  <TableHead>Format</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSites.map(({ label, url }) => (
                  <TableRow key={label}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{url}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
