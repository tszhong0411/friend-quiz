import Link from 'next/link'

import Logo from '@/components/Logo'

import { useStyles } from './HeaderLogo.styles'

export default function HeaderLogo() {
  const { classes } = useStyles()

  return (
    <Link href='/'>
      <a className={classes.logoWrapper}>
        <Logo className={classes.logo} />
      </a>
    </Link>
  )
}
