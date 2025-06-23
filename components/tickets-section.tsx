"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TicketsSectionProps {
  onTicketSelect: (ticketType: string) => void
}

const TicketsSection = ({ onTicketSelect }: TicketsSectionProps) => {
  const tickets = [
    {
      type: "Early Bird",
      price: "$25",
      description: "Limited access\nGeneral Admission only",
      popular: false,
    },
    {
      type: "General Admission",
      price: "$40",
      description: "Student Discount\nStandard Entry",
      popular: true,
    },
    {
      type: "VIP Experience",
      price: "$75",
      description: "VIP Lounge • Fast Track • Meet & Greet",
      popular: false,
    },
  ]

  return (
    <section id="tickets" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get Your Tickets
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your experience level and join us for an unforgettable night
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.type}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  ticket.popular
                    ? "bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/25"
                    : "bg-black/50 border-gray-800 hover:border-cyan-500/50"
                }`}
              >
                {ticket.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">{ticket.type}</h3>
                  <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {ticket.price}
                  </div>
                  <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed">{ticket.description}</p>
                  <Button
                    onClick={() => onTicketSelect(ticket.type)}
                    className={`w-full ${
                      ticket.popular
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                        : "bg-gray-800 hover:bg-gray-700 border border-cyan-500/50 hover:border-cyan-500"
                    } text-white font-bold py-3 rounded-full transition-all duration-300`}
                  >
                    Select Ticket
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TicketsSection
