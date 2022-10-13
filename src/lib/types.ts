export type ConfigType = {
  support_site: Array<{
    name: string
    href: string
  }>
}

export type ChildrenType = {
  children: React.ReactNode
}

export type NavLinkType = {
  link: string
  label: string
}

export type FaviconType = {
  rel: string
  href: string
  sizes?: string
  type?: string
}

// * buddymojo
export type BuddymojoType = {
  choosenOption: string
  options: Array<BuddymojoOption>
  question: string
  questionId: string
  themeId: string
}

export type BuddymojoOption = {
  content: string
}

// * OtherQuizType
export type OtherQuizType = {
  AlQuestionOptionId: string
  chQuestionOptionId: string
  correctOptionId: string
  optionType: number
  options: Array<OtherQuizOption>
  question: string
  questionId: string
  questionType: number
}

export type OtherQuizOption = {
  content: string
  questionOptionId: string
  type: string
}
