import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const Lifestyle: React.FC = () => {
  return (
    <section className="bg-navy-900 text-white overflow-hidden relative">

      {/* SPACE BREATHES - Premium Asymmetric Layout */}
      <div className="min-h-screen py-16 md:py-12 md:h-screen relative flex items-center" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        backgroundColor: '#0f172a'
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Text Content - Takes more space */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <RevealOnScroll variant="left" duration={1000}>
                <div className="inline-block mb-2 md:mb-3">
                  <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-light">The Masterplan</span>
                  <div className="h-px w-16 bg-gold-400 mt-2"></div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="left" delay={150} duration={1000}>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-4 leading-[1.1] uppercase tracking-tight">
                  Where Nature<br />
                  <span className="text-gold-400">Meets Modernity</span>
                </h3>
              </RevealOnScroll>

              <div className="space-y-2 md:space-y-3 max-w-2xl">
                <RevealOnScroll variant="up" delay={300}>
                  <p className="font-sans text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed font-light">
                    Strategically positioned between Mumbai and Pune, this limited-inventory community offers just 99 thoughtfully curated plots.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll variant="up" delay={450}>
                  <p className="font-sans text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed font-light tracking-wide">
                    Sprawling 65+ acre master-planned township in Khopoli, offering the perfect blend of nature, connectivity, and world-class lifestyle. Located close to Imagicaa, this is where your dream home finds its ground.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll variant="scale" delay={600}>
                  <div className="pt-3 md:pt-4">
                    <div className="inline-flex items-center gap-2 md:gap-3 text-gold-400 text-[10px] md:text-xs tracking-wider">
                      <span className="w-8 md:w-12 h-px bg-gold-400"></span>
                      <span>PREMIUM PLOTS IN KHOPOLI</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

            {/* Image - Floating effect */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <RevealOnScroll variant="right" duration={1500}>
                <div className="relative group">
                  {/* Decorative frame */}
                  <div className="absolute -top-2 -right-2 w-full h-full border border-gold-400/30 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>

                  <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                    <img
                      src="assets/projects/neoliv/constru/1.webp"
                      alt="Plot Layout"
                      className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-transparent to-gold-400/10"></div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </div>

      {/* GREEN GRACE - REPURPOSED FOR AMENITIES LIST PREVIEW */}
      <div className="min-h-screen py-16 md:py-12 md:h-screen relative flex items-center" style={{
        background: 'linear-gradient(135deg, #0a1810 0%, #0f172a 100%)',
        backgroundColor: '#0f172a'
      }}>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Image - Left side */}
            <div className="lg:col-span-5">
              <RevealOnScroll variant="left" duration={1500}>
                <div className="relative group">
                  {/* Decorative frame */}
                  <div className="absolute -top-2 -left-2 w-full h-full border border-gold-400/20 transition-all duration-700 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

                  <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                    <img
                      src="assets/projects/neoliv/constru/4.webp"
                      alt="Amenities"
                      className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-navy-900/60 via-transparent to-gold-400/10"></div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Text Content - Right side */}
            <div className="lg:col-span-7">
              <RevealOnScroll variant="right" duration={1000}>
                <div className="inline-block mb-2 md:mb-3">
                  <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-light">Lifestyle & Leisure</span>
                  <div className="h-px w-16 bg-gold-400 mt-2"></div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="right" delay={150} duration={1000}>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-4 leading-[1.1] uppercase tracking-tight">
                  Curated for<br />
                  <span className="text-gold-400">The Discerning</span>
                </h3>
              </RevealOnScroll>

              <div className="space-y-2 md:space-y-3 max-w-2xl">
                <RevealOnScroll variant="up" delay={300}>
                  <p className="font-sans text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed font-light">
                    Over 30+ world-class amenities designed to elevate your everyday experience.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll variant="up" delay={450}>
                  <p className="font-sans text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed font-light tracking-wide">
                    From a children's play area and reflexology park to a clubhouse and yoga deck, every amenity is a testament to NeoLiv's commitment to quality and community living.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll variant="scale" delay={600}>
                  <div className="pt-3 md:pt-4">
                    <div className="inline-flex items-center gap-2 md:gap-3 text-gold-400 text-[10px] md:text-xs tracking-wider">
                      <span className="w-8 md:w-12 h-px bg-gold-400"></span>
                      <span>A SANCTUARY OF AMENITIES</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};