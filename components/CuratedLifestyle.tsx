import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ArrowRight, Mountain, Trees, Sparkles, Feather } from 'lucide-react';
import { modalState } from '../lib/modal-state';

export const CuratedLifestyle: React.FC = () => {
  return (
    <section id="Lifestyle" className="pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Ambient Mountain Horizon Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        {/* SECTION 3: THE PRIVÉ PHILOSOPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Narrative (Strictly Client Copy) */}
          <div className="lg:col-span-6 space-y-6">
            <RevealOnScroll variant="up">
              <span className="eyebrow-label inline-block text-gold-400 font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                The Art of Private Living
              </span>

              <h2 className="section-heading font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.14] mb-4 sm:mb-6">
                More Nature. More Space. <br className="hidden sm:inline" />
                <span className="text-gold-400 italic">More of What Matters.</span>
              </h2>

              <div className="w-20 h-px bg-gradient-to-r from-gold-400/80 to-transparent mb-6 sm:mb-8" />

              {/* Exact Copy from Client Document */}
              <div className="space-y-4 sm:space-y-5 text-gray-300 text-sm sm:text-lg font-light leading-relaxed drop-shadow-sm">
                <p className="font-serif text-base sm:text-xl text-gray-100 italic border-l-2 border-gold-400/60 pl-4 sm:pl-5">
                  “Privé is conceived around a different idea of luxury. Not excess. But the freedom to slow down. The privilege of open skies. The joy of having nature close enough to become part of your everyday rituals.”
                </p>

                <p className="body-large font-sans">
                  A setting where families reconnect, generations come together and time seems to move at its own pace.
                </p>

                {/* Section 4: Forest and Open Spaces integration */}
                <div className="pt-2 border-t border-white/10">
                  <p className="font-sans text-gold-300 font-semibold tracking-[0.2em] text-xs uppercase mb-1.5 flex items-center gap-2">
                    <Trees size={14} />
                    <span>The Forest Within • <span className="numeric">2.5</span> Acres</span>
                  </p>
                  <p className="body-regular font-sans text-white/90 text-xs sm:text-base font-normal leading-relaxed">
                    Step beyond your everyday world and into a landscape shaped around nature. An urban forest, open greens and thoughtfully designed outdoor spaces create an environment where every walk feels restorative and every view carries a sense of openness.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 sm:pt-6">
                <a
                  href="#Amenities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                >
                  <span>Explore Experiences</span>
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
                      src="assets/client/Gallery-4.jpg"
                      alt="Grand Forest Privé Multi-Sport Arena & Forest Canopies"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                    
                    {/* Artistic Impression Overlay Label */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] text-gold-300 font-sans font-semibold shadow-lg">
                        Artistic Impression
                      </span>
                    </div>

                    {/* Integrated Caption: Section 4 */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-1">
                        <Trees size={14} />
                        <span>The Forest Within</span>
                      </div>
                      <p className="card-heading text-white font-serif text-lg sm:text-xl font-medium">
                        Nature is not an amenity here. It is the setting for life.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Inset Visual */}
                <div className="hidden sm:block absolute -bottom-8 -left-8 w-48 lg:w-56 rounded-2xl overflow-hidden border-2 border-gold-400/40 shadow-2xl z-30 bg-navy-900">
                  <div className="aspect-square relative">
                    <img
                      src="assets/client/Gallery-6.jpg"
                      alt="Grand Forest Privé Stepped Amphitheatre"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[8px] uppercase tracking-widest text-gold-300 font-sans font-semibold block">
                        Open-Air Gatherings
                      </span>
                      <span className="text-[10px] text-white font-sans font-light">
                        Quiet Corners for Reflection
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </div>

        </div>

        {/* SECTION 12: LIFESTYLE BREAK — THE PRIVÉ WEEKEND */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-white/10">
          <RevealOnScroll variant="up">
            <div className="bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/90 border border-gold-400/30 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-4xl mx-auto text-center">
                <span className="eyebrow-label inline-block text-gold-400 font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                  The Privé Weekend
                </span>
                <h3 className="section-heading font-serif text-2xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight font-medium">
                  Imagine a Different <span className="text-gold-400 italic">Kind of Weekend.</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 text-left">
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-white/5 flex items-start gap-3">
                    <Feather size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <p className="body-small font-sans text-gray-200 text-xs sm:text-sm font-light">Where the alarm is replaced by birdsong.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-white/5 flex items-start gap-3">
                    <Sparkles size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <p className="body-small font-sans text-gray-200 text-xs sm:text-sm font-light">Where children run outside before reaching for a screen.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-white/5 flex items-start gap-3">
                    <Feather size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <p className="body-small font-sans text-gray-200 text-xs sm:text-sm font-light">Where breakfast becomes brunch.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-white/5 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                    <Sparkles size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <p className="body-small font-sans text-gray-200 text-xs sm:text-sm font-light">Where evenings gather around conversations rather than calendars.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-white/5 flex items-start gap-3 sm:col-span-2 lg:col-span-2">
                    <Feather size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <p className="body-small font-sans text-gray-200 text-xs sm:text-sm font-light">Where Monday feels a little farther away.</p>
                  </div>
                </div>

                <p className="font-serif text-base sm:text-xl text-gold-300 italic font-light">
                  This is the privilege of Privé.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
};
