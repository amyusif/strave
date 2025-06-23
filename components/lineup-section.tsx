"use client"

import { motion } from "framer-motion"
import { Instagram, Music, Youtube } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const LineupSection = () => {
  const artists = [
    {
      name: "DJ Spark",
      time: "10:00 PM - 11:30 PM",
      image: "/placeholder.svg?height=200&width=200",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "The Neon Collective",
      time: "9:00 PM - 10:00 PM",
      image: "/placeholder.svg?height=200&width=200",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Bass Queen",
      time: "11:30 PM - 1:00 AM",
      image: "/placeholder.svg?height=200&width=200",
      gradient: "from-red-500 to-orange-500",
    },
    {
      name: "Synthwave Surfer",
      time: "8:00 PM - 9:00 PM",
      image: "/placeholder.svg?height=200&width=200",
      gradient: "from-green-400 to-blue-500",
    },
    {
      name: "Electric Dreams",
      time: "7:30 PM - 8:30 PM",
      image: "/placeholder.svg?height=200&width=200",
      gradient: "from-yellow-400 to-red-500",
    },
  ]

  return (
    <section id="lineup" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Artist Lineup
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the incredible talent performing at this year's event
          </p>
        </motion.div>

        <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <Card className="w-64 bg-black/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r ${artist.gradient} overflow-hidden`}
                  >
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-white">{artist.name}</h3>
                  <p className="text-cyan-400 mb-4">{artist.time}</p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-cyan-400">
                      <Instagram size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-cyan-400">
                      <Music size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-cyan-400">
                      <Youtube size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LineupSection
