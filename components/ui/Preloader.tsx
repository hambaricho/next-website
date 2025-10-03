"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if preloader has been shown this session
    const hasShownPreloader = sessionStorage.getItem('preloaderShown')
    
    if (hasShownPreloader) {
      setLoading(false)
      return
    }

    let progressInterval: NodeJS.Timeout

    // Wait for all images to load
    const loadImages = async () => {
      // Simulate progress while images load
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 100)

      // Wait for DOM to be ready
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(true)
        } else {
          window.addEventListener('load', () => resolve(true))
        }
      })

      // Get all image elements specifically from landing page
      const landingSection = document.querySelector('main') || document.body
      const images = Array.from(landingSection.querySelectorAll('img')) as HTMLImageElement[]
      
      // Also get Next.js Image components
      const nextImages = Array.from(landingSection.querySelectorAll('img[srcset]')) as HTMLImageElement[]
      const allImages = [...images, ...nextImages]
      
      // Create promises for each image
      const imagePromises = allImages.map((img) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            resolve(true)
          } else {
            img.onload = () => resolve(true)
            img.onerror = () => resolve(true) // Resolve even on error to not block
            // Timeout fallback in case image never loads
            setTimeout(() => resolve(true), 3000)
          }
        })
      })

      // Wait for all images (or timeout)
      await Promise.all(imagePromises)
      
      // Clear the interval and set progress to 100%
      clearInterval(progressInterval)
      setProgress(100)
      
      // Mark preloader as shown for this session
      sessionStorage.setItem('preloaderShown', 'true')
      
      // Small delay before hiding preloader
      setTimeout(() => {
        setLoading(false)
      }, 800)
    }

    // Start loading images
    loadImages()

    // Cleanup
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-greenSecondary dark:bg-secondary"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/images/footerLogo.svg"
              alt="Hambaricho Coffee"
              width={120}
              height={120}
              priority
            />
          </motion.div>

          {/* Loading Text */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-[SuisseIntl-Bold] text-white mb-8"
          >
            Hambaricho Coffee
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-64 md:w-80 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-primary rounded-full"
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 mt-4 font-[SuisseIntl-Light]"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
