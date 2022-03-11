import { FaGithub, FaInstagram } from 'react-icons/fa'
import { SiSimpleanalytics } from 'react-icons/si'

import Link from '@/components/Link'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center w-full max-w-4xl px-6 py-2 mx-auto mt-8 mb-8 text-sm xs:text-base sm:justify-between sm:flex-row">
      <div className="flex flex-col items-center mb-4 gap-x-4 sm:flex-row gap-y-4 sm:mb-0">
        <div className="text-center">
          <Link href="https://github.com/tszhong0411" className="flex items-center justify-center">
            <FaGithub size={16} className="mr-1" />
            Github
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="https://instagram.com/tszhong0411/"
            className="flex items-center justify-center"
          >
            <FaInstagram size={16} className="mr-1" />
            Instagram
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="https://umami.honghong.me/share/ZDzXuMyg/friendquiz"
            className="flex items-center justify-center"
          >
            <SiSimpleanalytics size={16} className="mr-1" />
            Analytics
          </Link>
        </div>
      </div>
      <div className="font-medium">
        © {new Date().getFullYear()}
        {' 小康'}
      </div>
    </footer>
  )
}

export default Footer
