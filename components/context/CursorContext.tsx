"use client"
import { createContext, useContext, useEffect, useState } from "react"

type CursorType = "default" | "bag" | "bean" | "cup" | "cup2" | "machine"

interface CursorContextType {
    cursor: CursorType
    setCursor: (cursor: CursorType) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [cursor, setCursor] = useState<CursorType>("default")

    useEffect(() => {
        // Load saved cursor preference from localStorage
        const savedCursor = localStorage.getItem("cursor-preference") as CursorType
        if (savedCursor) {
            setCursor(savedCursor)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cursor-preference", cursor)

        // Apply cursor style to body
        const body = document.body
        
        // Remove all cursor classes
        body.classList.remove("cursor-bag", "cursor-bean", "cursor-cup", "cursor-cup2", "cursor-machine")
        
        switch (cursor) {
            case "bag":
                body.classList.add("cursor-bag")
                break
            case "bean":
                body.classList.add("cursor-bean")
                break
            case "cup":
                body.classList.add("cursor-cup")
                break
            case "cup2":
                body.classList.add("cursor-cup2")
                break
            case "machine":
                body.classList.add("cursor-machine")
                break
            default:
                // Use default cursor
                body.style.cursor = "default"
        }
    }, [cursor])

    return (
        <CursorContext.Provider value={{ cursor, setCursor }}>
            {children}
        </CursorContext.Provider>
    )
}

export const useCursor = () => {
    const context = useContext(CursorContext)
    if (!context) {
        throw new Error("useCursor must be used within a CursorProvider")
    }
    return context
}
