"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventsSectionProps {
  onGetTickets: (ticketType: string) => void;
}

const EventsSection = ({ onGetTickets }: EventsSectionProps) => {
  const events = [
    {
      title: "AKWAABA RAVE",
      date: "April 20",
      description: "DJ Bassline • LED Dome",
      image: "/akwaaba.webp",
      ticketType: "Early Bird",
    },
    {
      title: "Glowfest",
      date: "April 22",
      description: "Fire Dancers • Food Trucks",
      image: "/glowfest.jpg",
      ticketType: "General Admission",
    },
    {
      title: "Bass Drop",
      date: "April 23",
      description: "Bass Queen • Laser Show",
      image: "/bass_Drop.jpg",
      ticketType: "VIP Experience",
    },
    {
      title: "Final Countdown",
      date: "April 24",
      description: "All-Star Lineup • Fireworks",
      image: "/finalcountdown.jpg",
      ticketType: "VIP Experience",
    },
  ];

  return (
    <section
      id="events"
      className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Rave Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience multiple nights of incredible music, lights, and energy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden bg-black/50 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay for readability on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  >
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {event.date} • {event.description}
                    </p>
                    <Button
                      onClick={() => onGetTickets(event.ticketType)}
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                    >
                      Get Tickets
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
