import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

import { isProduction } from '@/lib/constants'

type Site = {
  url: string
  apiURL: string
  title: string
  name: string
  titleTemplate: string
  description: string
  favicons: IconDescriptor[]
  supportSites: {
    label: string
    url: string
  }[]
}

export const site: Site = {
  url: isProduction ? 'https://honghong.me' : 'http://localhost:3000',
  apiURL: isProduction ? 'https://api.honghong.me' : 'http://localhost:8080',
  title: '小康的好友測驗作弊工具',
  name: '小康',
  titleTemplate: '- 小康的好友測驗作弊工具',
  description: '想要在好友測驗中獲得滿分嗎？這個工具可以幫助您破解',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/favicon/favicon-32x32.png',
    },
  ],
  supportSites: [
    {
      label: 'Buddymojo',
      url: 'buddymojo.com/match/<id>',
    },
    {
      label: 'Holaquiz',
      url: 'holaquiz.com/sync-quiz/<id>',
    },
    {
      label: 'Hellomate',
      url: 'hellomate.me/sync-quiz/<id>',
    },
    {
      label: 'Bakequiz',
      url: 'bakequiz.com/b/match/<id>',
    },
    {
      label: 'Theshookers',
      url: 'theshookers.com/sync-quiz/<id>',
    },
    {
      label: 'Friend2021',
      url: 'friend2021.com/d20/quiz/<id>',
    },
    {
      label: 'Daremessage',
      url: 'daremessage.xyz/quiz/<id>',
    },
    {
      label: 'Dudequiz',
      url: 'www.dudequiz.com/start.html?quiz=<id>',
    },
    {
      label: 'Helopal',
      url: 'helopal.club/<code>/d/<id>',
    },
    {
      label: 'Fun dare',
      url: 'q.fun-dare.com/<code>/d/<id>',
    },
    {
      label: 'Quizyourfriends',
      url: 'www.quizyourfriends.com/take-quiz.php?id=<id>',
    },
    {
      label: 'Matequiz',
      url: 'www.matequiz.com/start.html?quiz=<id>',
    },
  ],
}
