"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";

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
  ];

  // Slider logic for mobile
  const [current, setCurrent] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    setCurrent(idx);
    if (scrollRef.current) {
      const child = scrollRef.current.children[idx] as HTMLElement;
      if (child) child.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the magic from previous events
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-x-visible scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="min-w-[300px] max-w-xs snap-center md:min-w-0 md:max-w-none"
              >
                <Card className="group relative overflow-hidden bg-black/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
