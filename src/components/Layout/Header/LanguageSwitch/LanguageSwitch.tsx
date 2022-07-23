import { Menu, Tooltip, UnstyledButton } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ChevronDown, Language } from 'tabler-icons-react'

import i18nConfig from '@/lib/i18n'

import { useStyles } from '@/components/Layout/Header/LanguageSwitch/LanguageSwitch.styles'
import { list } from '@/components/Layout/Header/LanguageSwitch/list'

export default function LanguageSwitch() {
  const [opened, setOpened] = React.useState(false)
  const { classes } = useStyles({ opened })
  const router = useRouter()
  const [locale, setLocale] = useLocalStorage({ key: 'locale' })
  const { locales, defaultLocale } = i18nConfig
  const { t } = useTranslation()

  // * Redirect when current language not same with language in localstorage
  React.useEffect(() => {
    if (typeof locale === 'string' && locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [defaultLocale, locale, locales, router])

  const changeLanguage = (locale: string) => {
    setLocale(locale)
    router.push(router.asPath, router.asPath, { locale })
  }

  const items = list.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={22} height={22} alt='Flags' />}
      onClick={() => changeLanguage(item.locale)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ))

  return (
    <Menu
      transition='pop'
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius='md'
      control={
        <Tooltip label={t('common:languageSwitch')} openDelay={500}>
          <UnstyledButton className={classes.control}>
            <Language size={18} />
            <ChevronDown size={16} className={classes.icon} />
          </UnstyledButton>
        </Tooltip>
      }
    >
      {items}
    </Menu>
  )
}
