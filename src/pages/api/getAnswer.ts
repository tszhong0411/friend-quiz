/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { JSDOM } from 'jsdom'
import type { NextApiRequest, NextApiResponse } from 'next'
import { buddymojoAPI } from 'src/lib/buddymojoAPI'

type Answer = {
  title: string
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, type } = req.query
  const formattedURL = url.toString().replace(/^(https?|ftp):\/\//, '')

  // * buddymojo
  if (type === 'buddymojo') {
    const answers: Array<Answer> = []
    const apiID = buddymojoAPI(formattedURL.split('.')[0])

    const { data: html } = await axios.get(url.toString())

    const quizId = html.match(/var userQuizId {6}= {3}(.+);/)

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

        answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(answers)
    } else {
      return res.status(200).send({ error: 404 })
    }
  }

  // * holaquiz / bakequiz / hellomate
  if (/holaquiz|bakequiz|hellomate/.test(type.toString())) {
    const answers: Array<Answer> = []
    const re = new RegExp('var arrQuizDetail=(.+);')
    const { data: html } = await axios.post(
      url.toString(),
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

        answers.push({
          title,
          content,
        })
      })

      return res.status(200).send(answers)
    } else {
      return res.status(200).send({ error: 404 })
    }
  }

  // * friend2021
  if (/friend2021/.test(type.toString())) {
    const { data: html } = await axios.get(url.toString())
    const { document } = new JSDOM(html).window

    const answers: Array<Answer> = []

    document.querySelectorAll('.question_attempt_text').forEach((el) => {
      const title = el.textContent
      const content = el.nextElementSibling
        .querySelector('.answer.center.correct')
        .textContent.trim()

      answers.push({
        title,
        content,
      })
    })

    return res.status(200).send(answers)
  }

  res.status(404).send({ error: 404 })
}
