"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetTickets: () => void;
}

const HeroSection = ({ onGetTickets }: HeroSectionProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("April 25, 2026 19:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToEvents = () => {
    const element = document.getElementById("events");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-2"
    >
      {/* Background Video for md+ screens */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block w-full h-full object-cover brightness-90"
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Always show gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 max-w-2xl md:max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Experience the Ultimate
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Campus Night Festival
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="text-cyan-400" size={20} />
              <span>April 25, 2026</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-cyan-400" size={20} />
              <span>7 PM – 2 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-cyan-400" size={20} />
              <span>Campus Forecourt</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 flex-wrap"
          >
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center px-2 sm:px-4"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-300">
                  {unit}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={onGetTickets}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <span>Get Tickets</span>
              </motion.span>
            </Button>

            <Button
              onClick={scrollToEvents}
              variant="outline"
              size="lg"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              View Events
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToEvents}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white hover:text-cyan-400 transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
