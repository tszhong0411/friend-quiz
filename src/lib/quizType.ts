import { config } from '@/data/config'

export const quizType = (url: string) => {
  let result: string

  config.support_site.forEach((item) => {
    const { name } = item

    const re = new RegExp(name.toLowerCase(), 'i')
    if (re.test(url)) {
      result = name.toLowerCase()
    }
  })

  return result
}
