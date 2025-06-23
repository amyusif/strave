"use client"

import { motion } from "framer-motion"
import { Headphones, Flame, Lightbulb, UtensilsCrossed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const HighlightsSection = () => {
  const highlights = [
    {
      icon: Headphones,
      title: "Live DJs & Artists",
      description: "Top student DJs and surprise guest artists lighting up the night with electrifying performances.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Flame,
      title: "Fire Performances",
      description: "Breathtaking fire breathers and dancers that will ignite your excitement for the night.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "LED Dancers",
      description: "Vibrant LED-lit performers bringing the rhythm to life with mesmerizing light shows.",
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: UtensilsCrossed,
      title: "Food & Drinks",
      description: "Gourmet food trucks and specialty drink stations to fuel your night of dancing.",
      gradient: "from-yellow-400 to-red-500",
    },
  ]

  return (
    <section id="highlights" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Event Highlights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            An unforgettable night packed with amazing performances, interactive experiences, and vibrant energy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full bg-black/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${highlight.gradient} flex items-center justify-center`}
                  >
                    <highlight.icon className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
