"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "../context/CursorContext"

type CursorType = "default" | "coffee-bean" | "coffee-cup" | "pointer"

const CursorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { cursor, setCursor } = useCursor()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const cursors = [
        { id: "default", name: "Default", icon: "↖" },
        { id: "coffee-bean", name: "Coffee Bean", icon: "🫘" },
        { id: "jebena", name: "Jebena", icon: "🫖" },
        { id: "art", name: "Art", icon: "🎨" },
        { id: "smoke", name: "Smoke", icon: "�" },
    ] as const

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const handleSelect = (cursorId: string) => {
        setCursor(cursorId as CursorType)
        setIsOpen(false)
    }

    const activeCursor = cursors.find(c => c.id === cursor) || cursors[0]

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded transition-colors relative"
                aria-label="Select cursor style"
            >
                <span className="text-xl">{activeCursor.icon}</span>
            </button>

            {/* Dropdown Menu */}
            {/* <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 min-w-[180px]"
                    >
                        <div className="py-1">
                            {cursors.map((cursorOption, index) => (
                                <motion.button
                                    key={cursorOption.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleSelect(cursorOption.id)}
                                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                                        cursor === cursorOption.id
                                            ? "bg-primary/20 text-primary"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-secondary"
                                    }`}
                                >
                                    <span className="text-xl">{cursorOption.icon}</span>
                                    <span className="font-[SuisseIntl-Regular] text-sm">
                                        {cursorOption.name}
                                    </span>
                                    {cursor === cursorOption.id && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-auto text-primary"
                                        >
                                            ✓
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </div>
    )
}

export default CursorSelector
