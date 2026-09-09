import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Leaf, 
  Wind, 
  PlayCircle, 
  MapPin, 
  Activity, 
  Flower2, 
  Droplets, 
  Gamepad2, 
  Users 
} from 'lucide-react';

const features = [
  { icon: Wind, text: "Panoramic 360° mountain views and vast scenic horizons" },
  { icon: Activity, text: "Curated collection of nature-led lifestyle and wellness amenities" },
  { icon: PlayCircle, text: "Grand arrival boulevard designed for privacy and distinction" },
  { icon: MapPin, text: "Thoughtfully engineered wide road networks and planned infrastructure" },
  { icon: Flower2, text: "Experiential themed gardens including herb, fragrance, and butterfly zones" },
  { icon: Droplets, text: "Grade-A infrastructure with underground cabling and smart utilities" },
  { icon: ShieldCheck, text: "Multi-tier security for complete peace of mind in a gated township" },
  { icon: Gamepad2, text: "Engaging outdoor zones including forest maze, kid's play area, and splash pond" },
  { icon: Leaf, text: "Rich, evergreen landscaping that enhances natural mountain biodiversity" },
  { icon: Users, text: "Exclusive access to two private clubs for recreation and social gatherings" },
];

export const PropertyDetails: React.FC = () => {
  return (
    <section id="Details" className="py-16 md:py-20 bg-navy-950 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Narrative */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-serif text-3xl md:text-5xl text-white uppercase tracking-tight leading-tight">
                A Rare <span className="text-gold-400 italic">Expression</span> of Nature
              </h2>
              <div className="h-0.5 w-16 bg-gold-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-white/70 text-base md:text-lg font-light leading-relaxed"
            >
              <p>
                Welcome to a rare expression of nature-led luxury living—crafted for those who value space, privacy, and an uncompromising standard of master-planned excellence.
              </p>
              <p className="text-white/90 font-serif italic border-l-2 border-gold-400 pl-4 py-1 text-sm md:text-base">
                "An address that transcends the idea of a conventional development to stand as a symbol of stature, foresight, and refined living."
              </p>
              <p>
                Envisioned as one of Maharashtra's most prestigious plotted enclaves, Grand Forest Privé brings together leading planning expertise and disciplined execution.
              </p>
            </motion.div>

            {/* Infrastructure Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-gold-400 text-[9px] uppercase tracking-widest font-bold">Master Plan</p>
                <p className="text-white text-xs font-medium">Integrated Township</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-4">
                <p className="text-gold-400 text-[9px] uppercase tracking-widest font-bold">Lifestyle</p>
                <p className="text-white text-xs font-medium">Two Clubs</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-4">
                <p className="text-gold-400 text-[9px] uppercase tracking-widest font-bold">Infrastructure</p>
                <p className="text-white text-xs font-medium">Grade-A Ecosystem</p>
              </div>
            </div>
          </div>

          {/* Right Column: Features Grid */}
          <div className="relative">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <feature.icon className="w-5 h-5 text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white/70 text-xs leading-snug tracking-wide">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Closing Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="text-white font-serif text-xl md:text-2xl leading-relaxed italic opacity-80">
            "A carefully envisioned ecosystem where privacy, design, and global standards come together to elevate everyday living."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
