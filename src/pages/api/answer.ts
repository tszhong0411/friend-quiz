import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { buddymojoAPI } from 'src/lib/buddymojoAPI'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, type } = req.query
  const formattedURL = url.toString().replace(/^(https?|ftp):\/\//, '')

  // * buddymojo
  if (type === 'buddymojo') {
    const apiID = buddymojoAPI(formattedURL.split('.')[0])

    const { data: html } = await axios.get(url.toString())

    const quizId = html.match(/var userQuizId {6}= {3}(.+);/)

    if (quizId) {
      const apiURL = `https://buddymojo.com/api/v1/quiz/${apiID}?userQuizId=${quizId[1].replace(
        /['"]+/g,
        ''
      )}&type=friend&stats=1`

      const { data } = await axios.get(apiURL)

      res.status(200).send(data)
    } else {
      res.status(200).send({ error: 404 })
    }
  }

  // * holaquiz / bakequiz / hellomate
  if (/holaquiz|bakequiz|hellomate/.test(type.toString())) {
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
      res.status(200).send(html.match(re)[1])
    } else {
      res.status(200).send({ error: 404 })
    }
  }
}
