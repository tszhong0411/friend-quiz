import traditionalChinese from './flags/tw.png'
import english from './flags/uk.png'

import { ListType } from '@/components/Layout/Header/LanguageSwitch/types'

export const list: ListType[] = [
  { label: '繁體中文', locale: 'zh-TW', image: traditionalChinese.src },
  { label: 'English', locale: 'en', image: english.src },
]
