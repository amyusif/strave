"use client"

import { motion } from "framer-motion"

const PartnersSection = () => {
  const partners = [
    { name: "Garden City University", image: "/gcuc.png" },
    { name: "KNUST", image: "/knust.png" },
    { name: "CSUC", image: "/csuc.jpeg" },
    { name: "AAMUSTED", image: "/aamusted.jpeg" },
  ]

  return (
    <section id="partners" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our School Partners
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We proudly collaborate with student bodies, university departments, and academic institutions to bring this
            experience to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-shadow duration-300 flex items-center justify-center bg-white">
                {partner.name === "Garden City University" ? (
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="object-contain w-28 h-28"
                  />
                ) : (
                  <img
                    src={partner.image || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-center text-white font-semibold">{partner.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
