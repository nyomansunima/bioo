'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '~/app/components/ui/button'

type NavMenu = {
  label: string
  link: string
}

const navMenus: NavMenu[] = [
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
  { label: 'Pricing', link: '/pricing' },
  { label: 'Features', link: '/features' },
]

function Brand() {
  return (
    <Link href={'/'}>
      <Image
        src={'/images/logo.png'}
        alt="Bioo Logo"
        height={40}
        width={40}
        quality={100}
      />
    </Link>
  )
}

function Menus() {
  return (
    <nav className="flex items-center flex-1 ml-20">
      <ul className="flex items-center list-none gap-8">
        {navMenus.map((menu, i) => (
          <li
            className="flex transition-all duration-700 hover:-translate-y-1"
            key={i}
          >
            <Link href={menu.link} className="font-medium">
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function MainHeader() {
  function goToWaitlistSection() {
    window.scrollTo({ top: 0 })
  }

  return (
    <header className="flex items-center px-10 py-4 border-b border-border">
      <Brand />
      <Menus />
      <Button variant={'secondary'} onClick={goToWaitlistSection}>
        Join Waitlist
      </Button>
    </header>
  )
}
