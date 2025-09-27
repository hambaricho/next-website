"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

const navLinks = [
  { name: "Products", href: "#products" },
  { name: "Export", href: "#export" },
  { name: "Contact", href: "#contact" }
]

const emojiCursors = [
  { name: "jebena", src: "/images/jebena.webp" },
  { name: "bean", src: "/images/bean.webp" }
]

const NavBar = () => {
  const [theme, setTheme] = useState("light")
  const [cursor, setCursor] = useState<string | null>(null)

  useEffect(() => {
    if (cursor) {
      document.body.style.cursor = `url(${cursor}), auto`
    } else {
      document.body.style.cursor = "auto"
    }
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [cursor])

  // Theme switcher toggles landing page bg
  useEffect(() => {
    const landing = document.querySelector(".landing-bg")
    if (landing) {
      landing.classList.toggle("bg-secondary", theme === "dark")
      landing.classList.toggle("bg-white", theme === "light")
    }
  }, [theme])

  return (
    <div className="w-full bg-gray-100 pt-2">
      <nav className="w-11/12 mx-auto flex items-center justify-between px-4 py-2 bg-gray-200">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/images/footerLogo.svg" alt="Logo" width={40} height={40} />
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-[SuisseIntl-Light] px-4 py-2 rounded transition-colors text-secondary"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: Emoji buttons, theme switcher */}
        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`w-10 h-10 flex items-center justify-center rounded ${theme === "dark" ? "bg-secondary" : "bg-[#a3d46e]"}`}
            aria-label="Toggle theme"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill={theme === "dark" ? "#fff" : "#222"} />
              <path d="M10 2v2M10 16v2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M2 10h2M16 10h2M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke={theme === "dark" ? "#222" : "#fff"} strokeWidth="1.5" />
            </svg>
          </button>
        </div>

      </nav>
    </div>
  )
}

export default NavBar