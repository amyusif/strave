"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EventsSection from "@/components/events-section"
import HighlightsSection from "@/components/highlights-section"
import GallerySection from "@/components/gallery-section"
import LineupSection from "@/components/lineup-section"
import TicketsSection from "@/components/tickets-section"
import SponsorsSection from "@/components/sponsors-section"
import PartnersSection from "@/components/partners-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingLogo from "@/components/floating-logo"
import TicketModal from "@/components/ticket-modal"

export default function HomePage() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState("")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const openTicketModal = (ticketType: string) => {
    setSelectedTicketType(ticketType)
    setIsTicketModalOpen(true)
  }

  const closeTicketModal = () => {
    setIsTicketModalOpen(false)
    setSelectedTicketType("")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      <motion.div style={{ opacity }}>
        <HeroSection onGetTickets={() => openTicketModal("General Admission")} />
      </motion.div>

      <EventsSection onGetTickets={openTicketModal} />
      <HighlightsSection />
      <GallerySection />
      <LineupSection />
      <TicketsSection onTicketSelect={openTicketModal} />
      <SponsorsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />

      <FloatingLogo />

      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} ticketType={selectedTicketType} />
    </div>
  )
}
