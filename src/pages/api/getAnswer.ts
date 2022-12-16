/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { JSDOM, VirtualConsole } from 'jsdom'
import type { NextApiRequest, NextApiResponse } from 'next'

import { buddymojoAPI } from '@/lib/buddymojoAPI'

import { config } from '@/data/config'

export type Answer = {
  title: string
  content: string
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string
  const formattedURL = url.replace(/^(https?):\/\//, '')

  const type = getQuizType(url)

  const errorHandler = () => res.status(404).end()

  // * buddymojo
  if (type === 'buddymojo') {
    const _answers: Array<Answer> = []
    const apiID = buddymojoAPI(formattedURL.split('.')[0])

    const { data: html } = await axios.get(url)

    const re = new RegExp('var userQuizId {6}= {3}(.+);')
    const quizId = html.match(re)

    if (quizId) {
      const apiURL = `https://buddymojo.com/api/v1/quiz/${apiID}?userQuizId=${quizId[1].replace(
        /['"]+/g,
        ''
      )}&type=friend&stats=1`

      const {
        data: { data },
      } = await axios.get(apiURL)

      data.questions.forEach((question) => {
        const title = question.question
        const content = question.options[question.choosenOption - 1].content

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  // * holaquiz / bakequiz / hellomate
  if (type === 'holaquiz' || type === 'hellomate' || type === 'bakequiz') {
    const _answers: Array<Answer> = []
    const re = new RegExp('var arrQuizDetail=(.+);')
    const { data: html } = await axios.post(
      url,
      'userFullName=user&sync_quiz=%25E9%2596%258B%25E5%25A7%258B',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (html.match(re)) {
      const arrQuizDetail = JSON.parse(html.match(re)[1])

      arrQuizDetail.questions.forEach((question: any) => {
        const contentHTML = question.options.find(
          (option: any) =>
            option.questionOptionId === question.chQuestionOptionId
        ).content

        const { document } = new JSDOM(contentHTML).window

        const title = question.question
        const content = document.body.textContent.trim()

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  // * friend2021
  if (type === 'friend2021') {
    const _answers: Array<Answer> = []
    const { data: html } = await axios.get(url)
    const { document } = new JSDOM(html).window

    document.querySelectorAll('.question_attempt_text').forEach((el) => {
      const title = el.textContent.trim()
      const content = el.nextElementSibling
        .querySelector('.answer.center.correct')
        .textContent.trim()

      _answers.push({
        title,
        content,
      })
    })

    if (_answers.length === 0) return errorHandler()

    return res.status(200).send(_answers)
  }

  if (type === 'daremessage') {
    const _answers: Array<Answer> = []
    const re = new RegExp('var qa_array =(.+);')
    const { data: html } = await axios.post(
      `${url.replace('quiz', 'challenge')}?username=test`
    )
    const { document } = new JSDOM(html).window

    if (html.match(re)) {
      const qa_array = JSON.parse(
        html.match(re)[1].replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
      )

      document.querySelectorAll('.question.unans').forEach((el) => {
        const answerId = qa_array[el.getAttribute('id')]
        const title = el
          .querySelector('.question-text.que-text')
          .textContent.trim()
        const content = el
          .querySelector(`.qns.option[val="${answerId}"]`)
          .textContent.trim()

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  if (type === 'dudequiz') {
    const _answers: Array<Answer> = []
    const quizURL = new URL(url)
    const id = quizURL.searchParams.get('quiz')

    if (id) {
      const {
        data: { answers, author, questions, quizLanguage },
      } = await axios.post('https://app.dudequiz.com/get-dudes-quiz', {
        quizId: id,
      })

      const _questions: Array<number> = JSON.parse(questions)

      const { data } = await axios.get(
        `https://www.dudequiz.com/static/js/translations_${quizLanguage}.js`
      )
      const re = new RegExp('var questionsDude = \\[(.+)];', 's')
      const QA = JSON.parse(`[${data.match(re)[1]}]`)
      const answersArray: Array<number> = answers
        .split('')
        .map((question: string) => Number(question))

      _questions.forEach((question, i) => {
        const title = QA[question].question.replace('AUTHOR', author)
        const content = QA[question].altText[answersArray[i]]

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  if (type === 'helopal') {
    const _answers: Array<Answer> = []
    const { data: html } = await axios.get(url)
    const { document } = new JSDOM(html).window

    if (document.getElementById('nametb')) {
      document.querySelectorAll('.question-div.ng-scope').forEach((el) => {
        const title = el
          .querySelector('.questions h5.text-center b')
          .textContent.trim()
        const content = el
          .querySelector('.card.options.option.option-ans.correct')
          .textContent.trim()

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  if (type === 'quizyourfriends') {
    const _answers: Array<Answer> = []
    const virtualConsole = new VirtualConsole()

    const { data } = await axios.get(url)
    const { document } = new JSDOM(data, { virtualConsole }).window

    const id = (document.querySelector('input#id[name=id]') as HTMLInputElement)
      .value
    const qyfcode = (
      document.querySelector('input[name=qyfcode]') as HTMLInputElement
    ).value

    const { data: html } = await axios.post(
      `https://www.quizyourfriends.com/quiz-questions?id=${id}`,
      `id=${id}&qyfcode=${qyfcode}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    const { document: questionDocument } = new JSDOM(html, { virtualConsole })
      .window

    const re = new RegExp('"questions": \\[{(.+)}],', 's')
    const answersArray = JSON.parse(`[{${html.match(re)[1]}}]`)

    questionDocument.querySelectorAll('.wpvqgr-page').forEach((el, i) => {
      const answerIndex = answersArray[
        i
      ].wpvqgr_quiz_questions_answers.findIndex(
        (answer: { wpvqgr_quiz_questions_answers_right: boolean }) =>
          answer.wpvqgr_quiz_questions_answers_right === true
      )

      const title = el
        .querySelector('.wpvqgr-question-label')
        .textContent.trim()
      const content = el
        .querySelectorAll('.wpvqgr-answer-col')
        [answerIndex].querySelector('.wpvqgr-answer-label b')
        .textContent.trim()

      _answers.push({
        title,
        content,
      })
    })

    return res.status(200).send(_answers)
  }

  if (type === 'matequiz') {
    const _answers: Array<Answer> = []
    const quizURL = new URL(url)
    const id = quizURL.searchParams.get('quiz')

    if (id) {
      const { data } = await axios.post('https://app.matequiz.com/get-quiz', {
        quizId: id,
      })

      const questions = JSON.parse(decodeURIComponent(data.questions)).map(
        (question: any) => JSON.parse(question)
      )
      const answersArray: Array<number> = data.answers
        .split('')
        .map((question: string) => Number(question) - 1)

      questions.forEach(({ question, answers }, i: number) => {
        const title = question
        const content = answers[answersArray[i]]

        _answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(_answers)
    } else {
      return errorHandler()
    }
  }

  return errorHandler()
}