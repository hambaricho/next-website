"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/components/context/ThemeContext"
import Audio from "../ui/Audio"
import { Moon, Sun } from "lucide-react"

const navLinks = [
  { name: "Products", href: "#products" },
  { name: "Export", href: "/services" },
  { name: "Our Story", href: "/story" }
]


const NavBar = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="w-full bg-gray-100 dark:bg-secondary pt-2">
      <nav className="w-11/12 mx-auto flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-black">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/footerLogo.svg" alt="Logo" width={40} height={40} />
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-[SuisseIntl-Light] px-4 py-2 rounded transition-colors text-secondary dark:text-gray-100"
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Right: Emoji buttons, theme switcher */}
        <div className="flex items-center gap-2">
          <Audio />
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="text-primary" /> : <Sun className="text-primary" />}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar