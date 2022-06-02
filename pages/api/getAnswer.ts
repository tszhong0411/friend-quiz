import type { NextApiRequest, NextApiResponse } from 'next'

import { buddymojoAPI } from '@/lib/buddymojoAPI'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query
  const formattedURL = url.toString().trim().replace('https://', '').replace('http://', '')

  // * buddymojo
  if (formattedURL.includes('buddymojo.com')) {
    // * 取得 buddymojo api 代號
    const apiID = buddymojoAPI(formattedURL.split('.')[0])
    // * 取得 問卷 id
    fetch(url.toString())
      .then((response) => response.text())
      .then((result) => {
        const quizId = result.match(/var userQuizId {6}= {3}(.+);/)[1].replace(/['"]+/g, '')

        const apiURL = `https://buddymojo.com/api/v1/quiz/${apiID}?userQuizId=${quizId}&type=friend&stats=1`

        // * 返回數據
        const options = {
          method: 'GET',
        }

        fetch(apiURL, options)
          .then((response) => response.json())
          .then((data) => {
            res.statusCode = 200
            res.end(JSON.stringify(data))
          })
      })
  }

  /*
   * holaquiz
   * bakequiz
   * hellomate
   */
  if (
    formattedURL.includes('holaquiz.com') ||
    formattedURL.includes('bakequiz.com') ||
    formattedURL.includes('hellomate.me')
  ) {
    // * 取得 問卷 答案
    fetch(url.toString(), {
      method: 'POST',
      body: 'userFullName=user&sync_quiz=%E9%96%8B%E5%A7%8B',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.text())
      .then((result) => {
        if (result.match(/var arrQuizDetail=(.+);/)) {
          res.statusCode = 200
          res.end(result.match(/var arrQuizDetail=(.+);/)[1])
        } else {
          res.statusCode = 404
          res.end()
        }
      })
  }
}
