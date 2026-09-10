import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ArrowRight, Mountain, Trees, Compass } from 'lucide-react';

export const CuratedLifestyle: React.FC = () => {
  return (
    <section id="Lifestyle" className="pt-8 pb-16 md:pt-10 md:pb-24 lg:pt-12 lg:pb-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Ambient Mountain Horizon Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Narrative (Strictly Client Copy) */}
          <div className="lg:col-span-6 space-y-6">
            <RevealOnScroll variant="up">
              <span className="inline-block text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                Nature & Lifestyle
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.14] mb-4 sm:mb-6">
                Wake Up to a Different <br className="hidden sm:inline" />
                <span className="text-gold-400 italic">View of the World.</span>
              </h2>

              <div className="w-20 h-px bg-gradient-to-r from-gold-400/80 to-transparent mb-6 sm:mb-8" />

              {/* Exact 3 Paragraphs from Client Document */}
              <div className="space-y-4 sm:space-y-5 text-gray-300 text-sm sm:text-lg font-light leading-relaxed drop-shadow-sm">
                <p className="font-serif text-base sm:text-xl text-gray-100 italic border-l-2 border-gold-400/60 pl-4 sm:pl-5">
                  “Imagine mornings framed by mountains, evenings surrounded by greenery and weekends where stepping outside is all it takes to unwind.”
                </p>

                <p>
                  Grand Forest Privé is envisioned around a green, low-density lifestyle, allowing nature and open spaces to become an everyday part of living.
                </p>

                <p className="text-white/90 font-normal">
                  Here, luxury isn't only about what is built. It's also about everything around you.
                </p>
              </div>

              {/* Exact Client CTA */}
              <div className="pt-4 sm:pt-6">
                <a
                  href="#Amenities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                >
                  <span>Experience Grand Forest Privé</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: High-End Landscape Visual Presentation */}
          <div className="lg:col-span-6">
            <RevealOnScroll variant="up" delay={150}>
              <div className="relative">
                {/* Main Landscape Window */}
                <div className="relative rounded-3xl overflow-hidden border border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-navy-900">
                    <img
                      src="assets/client/amenities-3.jpg"
                      alt="Grand Forest Privé Multi-Sport Arena & Forest Trails"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                    
                    {/* Artistic Impression Overlay Label */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] text-gold-300 font-semibold shadow-lg">
                        Artistic Impression
                      </span>
                    </div>

                    {/* Integrated Caption */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-semibold mb-1">
                        <Mountain size={14} />
                        <span>Active Recreation & Trails</span>
                      </div>
                      <p className="text-white font-serif text-lg sm:text-xl">
                        Sport Courts Embraced by Forest Canopies
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Inset Visual */}
                <div className="hidden sm:block absolute -bottom-8 -left-8 w-48 lg:w-56 rounded-2xl overflow-hidden border-2 border-gold-400/40 shadow-2xl z-30 bg-navy-900">
                  <div className="aspect-square relative">
                    <img
                      src="assets/client/amenities-2.jpg"
                      alt="Forest-View Fitness & Wellness Center"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[8px] uppercase tracking-widest text-gold-300 font-bold block">
                        Fitness Studio
                      </span>
                      <span className="text-[10px] text-white font-serif">
                        Panoramic Nature Views
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};
