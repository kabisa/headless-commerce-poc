import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.css'
import { useRouter } from 'next/router'

const Navbar: FC = () => {
  const router = useRouter()

return (
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
            <Link href="/search?sort=latest-desc">
              <a className={`${s.link} ${router.pathname == "/search" && router.query.q == undefined ? s.active : ""}`}>All</a>
            </Link>
            <Link href="/search?q=clothes">
              <a className={`${s.link} ${router.pathname == "/search" && router.query.q == 'clothes' ? s.active : ""}`}>Clothes</a>
            </Link>
            <Link href="/search?q=accessories">
              <a className={`${s.link} ${router.pathname == "/search" && router.query.q == 'accessories' ? s.active : ""}`}>Accessories</a>
            </Link>
            <Link href="/search?q=shoes">
              <a className={`${s.link} ${router.pathname == "/search" && router.query.q == 'shoes' ? s.active : ""}`}>Shoes</a>
            </Link>
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
