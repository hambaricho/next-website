"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/components/context/ThemeContext"
import Audio from "../ui/Audio"
import CursorSelector from "../ui/CursorSelector"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const navLinks = [
  { name: "Catalog", href: "/catalog" },
  { name: "Export", href: "/services" },
  { name: "Our Story", href: "/story" }
]

const NavBar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <nav className="w-11/12 mx-auto flex items-center justify-between px-4 py-1 z-50 absolute top-4 left-1/2 -translate-x-1/2">
        <div className="bg-gray-200 flex p-2 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/footerLogo.svg" alt="Logo" width={40} height={40} />
          </Link>

          {/* Desktop Navigation */}
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
        </div>

        {/* Right: Emoji buttons, theme switcher, hamburger */}
        <div className="flex items-center gap-4 bg-gray-200 p-2">
          {/* Text Marquee */}
          <div className="hidden lg:flex items-center overflow-hidden whitespace-nowrap w-64">
            <div className="animate-marquee text-secondary font-[SuisseIntl-Regular] text-sm uppercase">
              Hambaricho Coffee CO • Hambaricho Coffee CO • Hambaricho Coffee CO
            </div>
          </div>

          <CursorSelector />
          <Audio className="hidden lg:flex" />
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 hidden lg:flex items-center justify-center rounded cursor-pointer `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="text-primary" /> : <Sun className="text-primary" />}
          </button>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer relative z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-primary block"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-primary block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-primary block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-gray-200 shadow-2xl z-50 md:hidden"
          >
            <div className="flex justify-end gap-2 w-full">

              <Audio className="flex lg:hidden" />
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer `}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Moon className="text-primary" /> : <Sun className="text-primary" />}
              </button>
            </div>

            <div className="flex flex-col h-full pt-24 px-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-2xl font-[SuisseIntl-Light] py-4 text-secondary border-b border-secondary/20 hover:bg-primary/10 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="flex items-center overflow-hidden whitespace-nowrap w-full absolute bottom-4">
              <div className="animate-marquee text-primary font-[SuisseIntl-Regular] text-2xl uppercase">
                Hambaricho Coffee CO • Hambaricho Coffee CO • Hambaricho Coffee CO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar