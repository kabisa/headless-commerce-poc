import { FC, useEffect, useState } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'

const Head: FC = () => {
  const [primaryColor, setPrimaryColor]: any | null = useState(null)

  useEffect(() => {
    const root = document.querySelector(':root');
    const style = getComputedStyle(root!);
    setPrimaryColor(style.getPropertyValue('--primary'))

    const observer = new MutationObserver(function(mutations) {
      mutations.map(function(mutation) {
        if (mutation.type == "attributes" && mutation.attributeName == "data-theme") {
          setPrimaryColor(style.getPropertyValue('--primary'))
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true })
  }, [])

  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href={"/site.webmanifest"} key="site-manifest" />
        <meta name="theme-color" content={primaryColor} />
      </NextHead>
    </>
  )
}

export default Head
