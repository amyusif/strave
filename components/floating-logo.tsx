"use client"

import { motion } from "framer-motion"

const FloatingLogo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-shadow"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 bg-white rounded-full"
        />
      </motion.button>
    </motion.div>
  )
}

export default FloatingLogo
