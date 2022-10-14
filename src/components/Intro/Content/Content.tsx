import {
  Button,
  Group,
  Stepper,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
} from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { config } from '@/data/config'

import Link from '@/components/Link'

import { useStyles } from './Content.styles'

export const Content = () => {
  const [active, setActive] = React.useState(0)
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  const router = useRouter()
  const { t } = useTranslation('common')
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { classes } = useStyles()

  return (
    <TypographyStylesProvider>
      <Title order={2} mb={24}>
        {t('tutorial')}
      </Title>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint='sm'
        my={48}
        classNames={{
          content: classes.step,
        }}
      >
        <Stepper.Step label={t('step', { step: 1 })} description={t('step1')}>
          <Image
            src={`/static/images/tutorial/step-1${
              router.locale === 'en' ? '-en' : ''
            }${dark ? '-dark' : ''}.png`}
            width={600}
            height={160}
            alt='Step 1'
            quality={100}
          />
        </Stepper.Step>
        <Stepper.Step label={t('step', { step: 2 })} description={t('step2')}>
          <Image
            src={`/static/images/tutorial/step-2${
              router.locale === 'en' ? '-en' : ''
            }${dark ? '-dark' : ''}.png`}
            width={600}
            height={160}
            alt='Step 1'
            quality={100}
          />
        </Stepper.Step>
        <Stepper.Step label={t('step', { step: 3 })} description={t('step3')}>
          <Image
            src={`/static/images/tutorial/step-3${
              router.locale === 'en' ? '-en' : ''
            }${dark ? '-dark' : ''}.png`}
            width={600}
            height={670}
            alt='Step 1'
            quality={100}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <Text align='center' my={24}>
            {t('finishTutorial')}
          </Text>
        </Stepper.Completed>
      </Stepper>
      <Group position='center' mt='xl'>
        <Button variant='default' onClick={prevStep}>
          {t('prevStep')}
        </Button>
        <Button onClick={nextStep}>
          {active === 2 ? t('finish') : t('nextStep')}
        </Button>
      </Group>
      <div>
        <h2>{t('supportSite')}</h2>
        <div>
          <ul>
            {config.support_site.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>{t('author')}</h2>
        <div>
          <p>
            <Link href='https://honghong.me'>小康</Link>
          </p>
        </div>
      </div>
      <div>
        <h2>{t('contribution')}</h2>
        <div>
          <Trans
            i18nKey='common:contributionContent'
            components={{
              p: <p />,
              li: <li />,
              ol: <ol />,
              strong: <strong />,
              code: <code />,
            }}
          />
        </div>
      </div>
      <div>
        <h2>{t('license')}</h2>
        <div>
          <Trans
            i18nKey='common:licenseContent'
            components={{
              p: <p />,
              link: (
                <Link href='https://github.com/TszHong0411/friend-quiz/blob/main/LICENSE' />
              ),
            }}
          />
        </div>
      </div>
      <div>
        <h2>{t('contact')}</h2>
        <div>
          <Trans
            i18nKey='common:contactContent'
            components={{
              p: <p />,
              link1: <Link href='https://www.instagram.com/tszhong0411/' />,
              link2: <Link href='mailto:info@honghong.me' />,
              link3: <Link href='https://github.com/tszhong0411/friend-quiz' />,
            }}
          />
        </div>
      </div>
    </TypographyStylesProvider>
  )
}
