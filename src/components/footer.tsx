import { SiGithub, SiInstagram, SiX } from '@icons-pack/react-simple-icons'
import { Link } from '@tszhong0411/ui'

type Links = Array<{
  href: string
  icon: React.ReactNode
}>

const Footer = () => {
  const links: Links = [
    {
      href: 'https://twitter.com/tszhong0411',
      icon: <SiX size={20} />
    },
    {
      href: 'https://github.com/tszhong0411',
      icon: <SiGithub size={20} />
    },
    {
      href: 'https://www.instagram.com/tszhong0411/',
      icon: <SiInstagram size={20} />
    }
  ]

  return (
    <footer className='mx-auto max-w-4xl px-6 py-4'>
      <div className='flex items-center justify-between'>
        <p className='mb-4 text-sm'>© {new Date().getFullYear()} Hong</p>

        <div className='flex items-center gap-6'>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
