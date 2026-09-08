import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const Philosophy: React.FC = () => {
  return (
    <section id="Philosophy" className="min-h-screen py-16 md:py-12 md:h-screen px-6 md:px-12 relative z-10 overflow-hidden flex items-center" style={{
      background: 'radial-gradient(circle at 30% 50%, rgba(30, 41, 59, 0.4) 0%, #0f172a 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
    }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 items-center relative z-10 w-full">

        <div className="border-l-2 border-gold-400 pl-6 md:pl-10">
          <RevealOnScroll variant="left" duration={1000}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-2 uppercase tracking-tight">
              Premium Plots,
            </h3>
          </RevealOnScroll>
          <RevealOnScroll variant="left" delay={200} duration={1000}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gold-400 leading-tight mb-2 uppercase tracking-tight">
              Lifestyle Address,
            </h3>
          </RevealOnScroll>
          <RevealOnScroll variant="left" delay={400} duration={1000}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight uppercase tracking-tight">
              By NeoLiv
            </h3>
          </RevealOnScroll>
        </div>

        <div>
          <RevealOnScroll variant="up" delay={300}>
            <p className="font-sans text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed font-light tracking-wide italic">
              "A limited-inventory community offering just 99 thoughtfully curated plots within a sprawling 65+ acre master-planned township—the perfect blend of nature, connectivity, and world-class lifestyle."
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={500}>
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <h4 className="text-gold-400 font-serif text-2xl lg:text-3xl">65+ ACRES</h4>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2">Proposed Development</p>
              </div>
              <div>
                <h4 className="text-gold-400 font-serif text-2xl lg:text-3xl">99 PLOTS</h4>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2">Limited Inventory</p>
              </div>
              <div>
                <h4 className="text-gold-400 font-serif text-2xl lg:text-3xl">2.5 ACRES</h4>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2">Private Club Land</p>
              </div>
              <div>
                <h4 className="text-gold-400 font-serif text-2xl lg:text-3xl">30+</h4>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2">World Class Amenities</p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="scale" delay={700}>
            <div className="mt-8">
              <div className="h-px w-32 bg-gradient-to-r from-gold-400 via-gold-400/50 to-transparent"></div>
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
};