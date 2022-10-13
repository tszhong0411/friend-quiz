import { Menu, Tooltip, UnstyledButton } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconChevronDown, IconLanguage } from '@tabler/icons'
import { useRouter } from 'next/router'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { useStyles } from '@/components/Layout/Header/LanguageSwitch/LanguageSwitch.styles'

export default function LanguageSwitch() {
  const { classes } = useStyles()
  const router = useRouter()
  const [locale, setLocale] = useLocalStorage({ key: 'locale' })
  const { t } = useTranslation('common')

  React.useEffect(() => {
    const redirect = async () => {
      await setLanguage(locale)
    }

    if (locale) {
      if (locale !== router.locale) {
        redirect()
      }
    }
  }, [locale, router])

  const changeLanguage = async (locale: string) => {
    setLocale(locale)
    await setLanguage(locale)
  }

  const languages = {
    'zh-TW': {
      name: '繁體中文',
    },
    en: {
      name: 'English',
    },
  }

  return (
    <Menu width={200} position='bottom-end'>
      <Tooltip label={t('switchLanguage')} openDelay={500}>
        <span>
          <Menu.Target>
            <UnstyledButton className={classes.control}>
              <IconLanguage size={18} />
              <IconChevronDown size={16} />
            </UnstyledButton>
          </Menu.Target>
        </span>
      </Tooltip>

      <Menu.Dropdown>
        <Menu.Label>{t('language')}</Menu.Label>
        {router.locales.map((item: string, index: number) => {
          const name = languages[item].name

          return (
            <Menu.Item key={index} onClick={() => changeLanguage(item)}>
              {name}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
