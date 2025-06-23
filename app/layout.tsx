import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "The Students Rave - Ultimate Campus Night Festival",
  description:
    "Experience the ultimate campus night festival packed with music, lights, food and unforgettable experiences. Get your tickets now for April 25, 2026.",
  keywords: "students rave, campus festival, music event, night party, university event",
  openGraph: {
    title: "The Students Rave - Ultimate Campus Night Festival",
    description:
      "Experience the ultimate campus night festival packed with music, lights, food and unforgettable experiences.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
