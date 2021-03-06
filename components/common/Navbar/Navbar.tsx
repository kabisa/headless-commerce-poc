import {FC, VFC} from 'react'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import s from './Navbar.module.css'
import { useRouter } from "next/router";

interface Link {
  href: string
  label: string
}
interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const router = useRouter()

  const menuItemClassName = (pathname: string, query: string, target: string | undefined): string => {
    return `${router.pathname == `/${pathname}` && router.query[query] == target ? s.active : ''}`
  }

  return(
    <NavbarRoot>
      <Container>
        <div className="relative flex flex-row justify-between py-4 align-center">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="hidden ml-6 space-x-4 lg:block">
              <Link href={"/search?sort=latest-desc"}>
                <a className={`${s.link} ${menuItemClassName('search','q', undefined)}`}>All</a>
              </Link>
              <Link href={"/search?q=clothes"}>
                <a className={`${s.link} ${menuItemClassName('search','q', 'clothes')}`}>Clothes</a>
              </Link>
              <Link href={"/search?q=accessories"}>
                <a className={`${s.link} ${menuItemClassName('search','q', 'accessories')}`}>Accessories</a>
              </Link>
              <Link href={"/search?q=shoes"}>
                <a className={`${s.link} ${menuItemClassName('search','q', 'shoes')}`}>Shoes</a>
              </Link>
              {/*{links?.map((l) => ( // Map links received from shopify*/}
              {/*  <Link href={l.href} key={l.href}>*/}
              {/*    <a className={s.link}>{l.label}</a>*/}
              {/*  </Link>*/}
              {/*))}*/}
            </nav>
          </div>

          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>

          <div className="flex justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>

        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
