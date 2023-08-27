import { Instagram, Twitter, Youtube } from 'lucide-react'

type Links = {
  href: string
  icon: React.ReactNode
}[]

const Footer = () => {
  const links: Links = [
    {
      href: 'https://twitter.com/tszhong0411',
      icon: <Twitter className='h-5 w-5' />,
    },
    {
      href: 'https://www.youtube.com/@tszhong0411',
      icon: <Youtube className='h-5 w-5' />,
    },
    {
      href: 'https://www.instagram.com/tszhong0411/',
      icon: <Instagram className='h-5 w-5' />,
    },
  ]

  return (
    <footer className='mx-auto max-w-4xl px-6 py-4'>
      <div className='flex items-center justify-between'>
        <p className='mb-4 text-sm'>© {new Date().getFullYear()} Hong</p>

        <div className='flex items-center gap-4'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer