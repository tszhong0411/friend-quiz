import { useStyles } from './HeaderLogo.styles'

import Link from 'next/link'

import Logo from '@/components/Logo'

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
