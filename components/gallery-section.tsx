"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const GallerySection = () => {
  const galleryItems = [
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "DJ Performance",
      subtitle: "2024 Event",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Vibrant Crowd",
      subtitle: "2024 Event",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Light Show",
      subtitle: "2024 Event",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Relive the magic from previous events</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden bg-black/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6"
                  >
                    <div>
                      <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.subtitle}</p>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
