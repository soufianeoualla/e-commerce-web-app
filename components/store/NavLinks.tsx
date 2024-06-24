import Link from 'next/link'
import React from 'react'
import { CategoryMenu } from './CategoryMenu'

export const NavLinks = () => {
  return (
    <nav>
          <ul className="flex items-center gap-8 text-sm text-neutral-500 font-medium  sm:flex-col">
            <li className="hover:text-neutral-black">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-neutral-black">
            <CategoryMenu/>
            </li>
            <li className="hover:text-neutral-black">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="hover:text-neutral-black">
              <Link href={"/conatct"}>Contact</Link>
            </li>
          </ul>
        </nav>
  )
}
