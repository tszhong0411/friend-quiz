'use client'

import {
  Button,
  Input,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast
} from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'
import { useRef, useState } from 'react'

import { API_URL } from '@/lib/constants'

type Answer = {
  title: string
  content: string
  image?: string
}

const supportedSites = [
  {
    label: 'Buddymojo',
    url: 'buddymojo.com/match/<id>'
  },
  {
    label: 'Holaquiz',
    url: 'holaquiz.com/sync-quiz/<id>'
  },
  {
    label: 'Hellomate',
    url: 'hellomate.me/sync-quiz/<id>'
  },
  {
    label: 'Bakequiz',
    url: 'bakequiz.com/b/match/<id>'
  },
  {
    label: 'Theshookers',
    url: 'theshookers.com/sync-quiz/<id>'
  },
  {
    label: 'Friend2021',
    url: 'friend2021.com/d20/quiz/<id>'
  },
  {
    label: 'Daremessage',
    url: 'daremessage.xyz/quiz/<id>'
  },
  {
    label: 'Dudequiz',
    url: 'www.dudequiz.com/start.html?quiz=<id>'
  },
  {
    label: 'Helopal',
    url: 'helopal.club/<code>/d/<id>'
  },
  {
    label: 'Fun dare',
    url: 'q.fun-dare.com/<code>/d/<id>'
  },
  {
    label: 'Quizyourfriends',
    url: 'www.quizyourfriends.com/take-quiz.php?id=<id>'
  },
  {
    label: 'Matequiz',
    url: 'www.matequiz.com/start.html?quiz=<id>'
  },
  {
    label: 'Realtest',
    url: 'cn.realtest.me/rt/sync-quiz/<id>'
  }
]

const sortedSites = supportedSites.sort((a, b) => {
  const labelA = a.label.toUpperCase()
  const labelB = b.label.toUpperCase()

  if (labelA < labelB) return -1
  if (labelA > labelB) return 1

  return 0
})

const Content = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState<Answer[] | null>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current?.value) {
      toast.error('Please enter the quiz URL')
      return
    }

    setLoading(true)
    setAnswers(null)

    const res = await fetch(`${API_URL}/friend-quiz/${encodeURIComponent(inputRef.current.value)}`)

    if (!res.ok) {
      setLoading(false)
      toast.error('Please enter the correct quiz URL')
      return
    }

    const result = (await res.json()) as Answer[]

    setLoading(false)
    setAnswers(result)
  }

  return (
    <div className='flex items-center justify-center text-white'>
      <div className='w-full max-w-2xl space-y-12 px-4'>
        <div>
          <h1 className='mb-4 text-center text-4xl font-bold'>Friend Quiz Cheating Tool</h1>
          <p className='mb-8 text-center'>
            Enter your quiz URL, then click <span className='font-bold'>Get Answers</span> to reveal
            the quiz answers.
          </p>
          <form className='mb-4 flex flex-col gap-4 sm:flex-row' onSubmit={handleSubmit}>
            <div className='flex-1'>
              <Input
                type='url'
                placeholder='Enter the quiz URL'
                className='w-full'
                ref={inputRef}
              />
            </div>
            <Button disabled={loading} type='submit'>
              {loading ? <Loader2Icon size={16} className='mr-2 animate-spin' /> : null}
              Get Answers
            </Button>
          </form>
        </div>
        <div className='space-y-4'>
          {loading ? (
            <div className='mb-8 space-y-4'>
              {[...Array.from({ length: 10 }).keys()].map((i) => (
                <Skeleton key={i} className='h-14' />
              ))}
            </div>
          ) : null}

          {answers ? <h2 className='text-xl font-bold'>Answers:</h2> : null}
          {answers?.map((answer, i) => (
            <div key={answer.title} className='my-4 rounded-md border p-4'>
              <div>
                {i + 1}. {answer.title}
              </div>
              {answer.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- third party image
                <img
                  src={answer.image}
                  width={120}
                  height={120}
                  className='my-2 rounded-sm'
                  alt={`Question ${i + 1}`}
                />
              ) : null}
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
