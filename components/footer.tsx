"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, Facebook, Twitter } from "lucide-react"

const Footer = () => {
  const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "Tickets", href: "#tickets" },
    { label: "Lineup", href: "#lineup" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#faq" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="py-12 px-4 bg-black border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 mb-6 md:mb-0"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 bg-white rounded-full"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              The Students Rave
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0"
          >
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm"
        >
          <p className="mb-2">&copy; {new Date().getFullYear()} The Students Rave. All rights reserved.</p>
          <p className="flex items-center justify-center">
            Designed with <Heart className="text-red-500 mx-1" size={16} /> for students everywhere
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
