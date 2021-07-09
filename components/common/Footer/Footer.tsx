import React, { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Moon, Sun, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import Kabisa from "@components/icons/Kabisa";
import { useTheme } from "next-themes";

interface Props {
  className?: string
  children?: never
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { theme, setTheme } = useTheme()
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b dark:border-t border-accent-2 py-12 text-white transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="https://kabisa.nl/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="mr-2">
                  <Logo />
                </span>
                <span>Kabisa</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url || ''}>
                    <a className="text-white hover:text-accent-3 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-white">
            <div className="flex space-x-3 items-center h-10">
              <a className={cn(s.link, 'cursor-pointer')}
                 onClick={() => { theme === 'dark' ? setTheme('light') : setTheme('dark')}} >
                {theme === 'dark' && (<Moon width={24} height={24} />) }
                {theme === 'light' && (<Sun width={24} height={24} />) }
              </a>
              <a className={s.link}
                 aria-label="Github Repository"
                 href="https://github.com/kabisa/headless-commerce-poc">
                <Github />
              </a>
              <I18nWidget />
            </div>
          </div>
        </div>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 font-medium">
          <div>
            <span>&copy; 2021 Kabisa B.V. All rights reserved.</span>
          </div>
          <div className="flex items-center text-white text-sm">
            <span className="text-white">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://kabisa.nl"
              aria-label="Kabisa.nl Link"
              target="_blank"
              className="text-white"
            >
              <Kabisa
                className="inline-block h-6 mx-2 text-white"
                alt="Kabisa.nl Logo"
              />
            </a>
            <span className="text-white hidden xsm:inline-block">&</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-white"
            >
              <Vercel
                className="hidden h-6 ml-2 text-white xsm:inline-block"
                alt="Vercel.com Logo"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
