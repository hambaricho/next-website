"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "../context/CursorContext"
import Image from "next/image"

type CursorType = "default" | "bag" | "bean" | "cup" | "cup2" | "machine"

const CursorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { cursor, setCursor } = useCursor()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const cursors = [
        { id: "default", name: "Default", image: null },
        { id: "bag", name: "Coffee Bag", image: "/images/cursor/bag.png" },
        { id: "bean", name: "Coffee Bean", image: "/images/cursor/bean.png" },
        { id: "cup", name: "Coffee Cup", image: "/images/cursor/cup.png" },
        { id: "machine", name: "Coffee Machine", image: "/images/cursor/machine.png" },
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
        <div ref={dropdownRef} className="relative hidden lg:flex">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded transition-all duration-200 relative bg-white/10 hover:bg-white/20 hover:scale-105"
                aria-label="Select cursor style"
            >
                {activeCursor.image ? (
                    <Image 
                        src={activeCursor.image} 
                        alt={activeCursor.name} 
                        width={24} 
                        height={24}
                        className="w-6 h-6 object-contain"
                    />
                ) : (
                    <span className="text-white text-lg">👆</span>
                )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 bg-greenSecondary border border-white overflow-hidden z-50 min-w-[250px]"
                    >
                        <div className="py-1">
                            <p className="text-center text-white py-2 font-bold">Experimental Cursors</p>
                            {cursors.map((cursorOption, index) => (
                                <motion.button
                                    key={cursorOption.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleSelect(cursorOption.id)}
                                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                                        cursor === cursorOption.id
                                            ? "bg-primary/20 text-white"
                                            : ""
                                    }`}
                                >
                                    {cursorOption.image ? (
                                        <Image 
                                            src={cursorOption.image} 
                                            alt={cursorOption.name} 
                                            width={24} 
                                            height={24}
                                            className="w-6 h-6 object-contain"
                                        />
                                    ) : (
                                        <span className="text-lg">👆</span>
                                    )}
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
            </AnimatePresence>
        </div>
    )
}

export default CursorSelector
