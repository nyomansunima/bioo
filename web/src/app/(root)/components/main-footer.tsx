'use client'

import Link from 'next/link'

type Menu = {
  label: string
  link: string
}

const secondaryMenus: Menu[] = [
  { label: 'Privacy', link: '/privacy' },
  { label: 'Terms', link: '/terms' },
]

export default function MainFooter() {
  const getCreditYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col">
      <div className="flex items-center border-t border-border px-10 py-6 font-medium gap-10">
        <span>Copyright {getCreditYear}</span>
        <div className="flex items-center flex-grow justify-end gap-14">
          <ul className="flex items-center list-none gap-6">
            {secondaryMenus.map((menu, i) => (
              <li
                key={i}
                className="transition-all duration-700 hover:-translate-y-1"
              >
                <Link href={menu.link}>{menu.label}</Link>
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-2">
            Created with <i className="fi fi-rr-heart" />
          </span>
        </div>
      </div>
    </footer>
  )
}
