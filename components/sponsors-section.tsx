"use client";

import { motion } from "framer-motion";
import { TrendingUp, Megaphone, Users, Camera, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SponsorsSection = () => {
  const sponsors = [
    { name: "Spotify", color: "text-green-500" },
    { name: "Apple Music", color: "text-gray-300" },
    { name: "SoundCloud", color: "text-orange-500" },
    { name: "TikTok", color: "text-pink-500" },
    { name: "YouTube", color: "text-red-500" },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Unrivaled Campus Reach",
      description:
        "Direct access to thousands of engaged students and young adults.",
    },
    {
      icon: Megaphone,
      title: "Dynamic Brand Exposure",
      description:
        "Creative integration opportunities throughout the event experience.",
    },
    {
      icon: Users,
      title: "Engagement Opportunities",
      description:
        "Interactive activations to connect with your target audience.",
    },
    {
      icon: Camera,
      title: "Content Collaboration",
      description: "Co-create authentic content with student influencers.",
    },
  ];

  return (
    <section id="sponsors" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Sponsors
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Students Rave is proud to be powered by forward-thinking brands
            that believe in the energy and creativity of student communities.
          </p>
        </motion.div>

        {/* Sponsor Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 mb-16"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-4 min-w-[120px] w-full sm:w-auto"
            >
              <div
                className={`text-5xl font-bold ${sponsor.color} text-center w-full`}
              >
                {sponsor.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <Card className="bg-black/50 border-gray-800 backdrop-blur-sm">
          <CardContent className="p-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Why Sponsor Us?
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <benefit.icon className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="mb-6 text-gray-300">
                <strong className="text-white">
                  Want to Join the Lineup of Sponsors?
                </strong>
                <br />
                Partner with us and position your brand where it matters most—at
                the heart of campus culture.
              </p>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-full">
                <Mail className="mr-2" size={18} />
                Contact Us
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SponsorsSection;
