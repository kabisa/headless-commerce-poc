import {FC, useEffect, useState} from 'react'
import NextHead from 'next/head'
import {DefaultSeo} from 'next-seo'
import config from '@config/seo.json'
import tailwindConfig from 'tailwind.config'

const Head: FC = () => {
  const [primaryColor, setPrimaryColor]: any | null = useState(null)

  useEffect(() => {
    // Get the root element
    const root = document.querySelector(':root');
    const rs = getComputedStyle(root!);
    setPrimaryColor(rs.getPropertyValue('--primary'))
  }, [])

  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="manifest" href="/site.webmanifest" key="site-manifest"/>
        <meta name="theme-color" content={primaryColor}/>
      </NextHead>
    </>
  )
}

export default Head
