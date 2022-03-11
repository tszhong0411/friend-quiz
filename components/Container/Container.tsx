import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function Container(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: '好友問卷作弊器 – 小康',
    description: '使用我們的好友問卷作弊器可以輕鬆知道好友問卷上的答案',
    image: 'https://friendquiz.honghong.me/static/images/banner.png',
    type: 'website',
    ...customMeta,
  }

  return (
    <div className="flex flex-col justify-between">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:url" content={`https://friendquiz.honghong.me${router.asPath}`} />
        <link rel="canonical" href={`https://friendquiz.honghong.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="好友問卷作弊器" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:alt" content={meta.description} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={'zh-TW'}></meta>
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TszhongLai0411" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:creator" content="@TszhongLai0411" />
      </Head>
      <Navbar />
      <main className="w-full max-w-3xl px-4 py-12 mx-auto sm:px-6 xl:px-0">{children}</main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  )
}
