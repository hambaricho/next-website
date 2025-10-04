"use client"
import { createContext, useContext, useEffect, useState } from "react"

type CursorType = "default" | "coffee-bean" | "coffee-cup" | "pointer"

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
        // Save cursor preference to localStorage
        localStorage.setItem("cursor-preference", cursor)

        // Apply cursor style to body
        const body = document.body
        
        // Remove all cursor classes
        body.classList.remove("cursor-coffee-bean", "cursor-coffee-cup", "cursor-pointer-custom")
        
        // Add appropriate cursor class
        switch (cursor) {
            case "coffee-bean":
                body.classList.add("cursor-coffee-bean")
                break
            case "coffee-cup":
                body.classList.add("cursor-coffee-cup")
                break
            case "pointer":
                body.classList.add("cursor-pointer-custom")
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
