import { Button, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { useStyles } from '../Header.styles'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { t } = useTranslation('common')
  const { classes } = useStyles()

  return (
    <Tooltip label={dark ? t('lightmode') : t('darkmode')} openDelay={500}>
      <Button
        variant='light'
        color='gray'
        sx={{
          width: 36,
          padding: 0,
        }}
        className={classes.button}
        onClick={() => toggleColorScheme()}
      >
        {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
      </Button>
    </Tooltip>
  )
}

export default ThemeSwitch
