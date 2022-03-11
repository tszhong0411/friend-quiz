import type { NextApiRequest, NextApiResponse } from 'next'

import { buddymojoAPI } from '@/lib/buddymojoAPI'

const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.body.url
  const formattedURL = url.replace('https://', '').replace('http://', '')
  // const isProduction = process.env.NODE_ENV === 'production'
  // * buddymojo
  if (formattedURL.includes('buddymojo.com')) {
    return new Promise<void>((resolve) => {
      try {
        // * 取得 buddymojo api 代號
        const apiID = buddymojoAPI(formattedURL.split('.')[0])
        // * 取得 問卷 id
        const getQuizId = async () => {
          const browser = await puppeteer.launch(
            process.env.AWS_EXECUTION_ENV
              ? {
                  args: chrome.args,
                  executablePath: await chrome.executablePath,
                  headless: chrome.headless,
                }
              : {
                  args: [],
                  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                  headless: true,
                }
          )
          const page = await browser.newPage()
          await page.goto(url.toString())
          const quizId = await page.evaluate('userQuizId')

          await browser.close()

          return quizId
        }

        getQuizId().then((quizId) => {
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
              resolve()
            })
        })
      } catch (error) {
        console.log(error)
        res.status(404).end()
        return resolve()
      }
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
    try {
      // * 取得 問卷 答案
      const getQuizAnswer = async () => {
        const browser = await puppeteer.launch(
          process.env.AWS_EXECUTION_ENV
            ? {
                args: chrome.args,
                executablePath: await chrome.executablePath,
                headless: chrome.headless,
              }
            : {
                args: [],
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                headless: false,
              }
        )
        const page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(url.toString())
        await page.type('input[id=name]', 'user')
        await page.click('input[name=sync_quiz]')
        if (formattedURL.includes('hellomate.me')) {
          await Promise.all([page.reload(), page.waitForNavigation()])
        } else {
          await Promise.all([page.waitForNavigation()])
        }
        const quizAnswer = await page.evaluate('arrQuizDetail')
        await browser.close()
        return quizAnswer
      }

      const quizAnswer = await getQuizAnswer()

      // * 返回數據
      return new Promise<void>((resolve) => {
        res.statusCode = 200
        res.json(quizAnswer)
        resolve()
      })
    } catch (error) {
      res.status(404).send(error)
      console.log(error)
    }
  }

  return res.status(404).json({ error: "Can't get Answer" })
}
