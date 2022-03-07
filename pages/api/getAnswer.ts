import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

import { buddymojoAPI } from '@/lib/buddymojoAPI'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query
  const formattedURL = url.toString().replace('https://', '').replace('http://', '')

  // * buddymojo
  if (formattedURL.includes('buddymojo.com')) {
    try {
      // * 取得 buddymojo api 代號
      const apiID = buddymojoAPI(formattedURL.split('.')[0])
      // * 取得 問卷 id
      const getQuizId = async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url.toString())
        const quizId = await page.evaluate('userQuizId')

        await browser.close()

        return quizId
      }

      const quizId = await getQuizId()

      const apiURL = `https://buddymojo.com/api/v1/quiz/${apiID}?userQuizId=${quizId}&type=friend&stats=1`

      // * 返回數據
      return new Promise<void>((resolve) => {
        fetch(apiURL)
          .then((res) => res.json())
          .then((data) => {
            resolve()
            res.json(data)
          })
      })
    } catch (error) {
      res.status(404).send({ status: 404 })
    }
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
    try {
      // * 取得 問卷 答案
      const getQuizAnswer = async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(url.toString())
        await page.type('input[id=name]', 'user')
        await page.click('input[name=sync_quiz]')
        await page.waitForNavigation()
        const quizAnswer = await page.evaluate('arrQuizDetail')
        await browser.close()

        return quizAnswer
      }

      const quizAnswer = await getQuizAnswer()

      // * 返回數據
      return new Promise<void>((resolve) => {
        resolve()
        res.json(quizAnswer)
      })
    } catch (error) {
      res.status(404).send({ status: 404 })
    }
  }
}
