"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

export type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // null prevents hydration mismatch
  const [theme, setThemeState] = useState<Theme | null>(null)

  // Load saved theme or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") {
      setThemeState(stored)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark")
    } else {
      setThemeState("light")
    }
  }, [])

  // Update <html> classes and persist
  useEffect(() => {
    if (!theme) return
    console.log('setting theme class to', theme)
    localStorage.setItem("theme", theme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => {
    console.log('toggling theme from', theme, 'to', theme === "light" ? "dark" : "light")
    setThemeState(t => (t === "light" ? "dark" : "light"))
  }

  if (!theme) return null // avoid flicker on first paint

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
