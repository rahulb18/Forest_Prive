import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const Overview: React.FC = () => {
  const highlights = [
    "47 Acre Premium Township",
    "Plot Sizes: 180.01 Sq. Yrds onwards",
    "Wide Internal Roads & Green Landscapes",
    "Future-Ready Infrastructure",
    "Gated Community with 24/7 Security"
  ];

  return (
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >

            <h2 className="font-serif text-4xl md:text-5xl text-[#1d417f] leading-tight mb-8">
              Own a Nature-Inspired Luxury Plot at Grand Forest Privé
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A rare plotted development designed for those who value <strong className="text-[#1d417f]">space</strong>, <strong className="text-[#1d417f]">privacy</strong>, and <strong className="text-[#1d417f]">long-term appreciation</strong>.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              Located in <strong className="text-[#1d417f]">Khopoli</strong>, this premium township offers low-density plots where you design your dream villa—within a secure, master-planned community.
            </p>

            <h3 className="font-serif text-2xl text-[#1d417f] mb-6 border-b border-gray-200 pb-4">
              Project Highlights
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d6ba43] mt-1 shrink-0" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="assets/client/Clubhouse-amenities.jpg" 
              alt="Grand Forest Privé Club Experience" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d417f]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-l-4 border-[#d6ba43]">
                <p className="text-[#1d417f] font-serif text-xl italic">
                  "Experience a lifestyle where every day flows seamlessly, surrounded by lush greens."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#eef1f6] -skew-x-12 translate-x-1/2 -z-10" />
    </section>
  );
};
