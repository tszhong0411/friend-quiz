import { FaGithub, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full max-w-4xl px-6 py-2 mx-auto mt-8 mb-8 text-sm xs:text-base">
      <div className="flex items-center gap-x-4">
        <div className="w-full text-center">
          <a
            href="https://github.com/tszhong0411"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center duration-300 border-b-2 border-transparent hover:border-blue-500"
          >
            <FaGithub size={16} className="mr-1" />
            Github
          </a>
        </div>
        <div className="w-full text-center">
          <a
            href="https://instagram.com/tszhong0411/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center duration-300 border-b-2 border-transparent hover:border-blue-500"
          >
            <FaInstagram size={16} className="mr-1" />
            Instagram
          </a>
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
