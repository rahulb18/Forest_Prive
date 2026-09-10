import React from 'react';
import { ArrowRight, Mountain, Trees, Compass, ShieldCheck } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { modalState } from '../lib/modal-state';

export const CinematicShowcase: React.FC = () => {
  return (
    <section
      id="EnclaveShowcase"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-navy-950 text-white overflow-hidden"
    >
      {/* Invisible anchor for backward compatibility */}
      <span id="Cinematic" className="absolute top-0 left-0" />

      {/* Atmospheric Background Ambient Lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <RevealOnScroll variant="up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold mb-4">
              <Compass size={13} />
              <span>THE MASTER TOWNSHIP ENCLAVE</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.12] mb-6">
              360° Mountain Horizons. <br className="hidden sm:inline" />
              <span className="text-gold-400 italic">Pristine Forest Canopy.</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Cradled in the majestic Western Ghats foothills, Grand Forest Privé is an integrated low-density
              sanctuary where every residential parcel is surrounded by native tree canopies, sweeping ridgelines,
              and thoughtfully engineered infrastructure.
            </p>
          </RevealOnScroll>
        </div>

        {/* Hero Visual Card: Dedicated Client Render (Gallery-3.jpg) */}
        <RevealOnScroll variant="up" delay={150}>
          <div className="relative rounded-3xl overflow-hidden border border-gold-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group mb-14 sm:mb-16 bg-navy-900">
            {/* Image Container with smooth aspect ratio and zoom effect */}
            <div className="aspect-[16/9] sm:aspect-[21/9] relative w-full overflow-hidden">
              <img
                src="assets/client/Gallery-3.jpg"
                alt="NeoLiv Grand Forest Privé - 360° Mountain Township & Low-Density Plotted Living"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/50 via-transparent to-navy-950/50" />

              {/* Top Artistic Impression Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className="px-3 sm:px-4 py-1.5 rounded-full bg-navy-950/85 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-300 font-semibold shadow-lg">
                  Artistic Impression
                </span>
              </div>

              {/* Bottom Visual Overlay Callout */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold block mb-1">
                    Panoramic Township Architecture
                  </span>
                  <p className="font-serif text-lg sm:text-2xl md:text-3xl text-white font-medium drop-shadow-md">
                    Low-Density Plotted Parcels with Expansive Mountain Frontages
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => modalState.open("NeoLiv Grand Forest Privé - Site Visit")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-[0.18em] shadow-lg hover:bg-gold-300 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>Book Site Visit</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Enclave Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <RevealOnScroll variant="up" delay={200}>
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-gold-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-5">
                <Mountain size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-2 font-medium">
                Contoured Topography
              </h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Respecting natural elevation gradients, each parcel provides terraced natural privacy and uninterrupted horizon views of the lush Sahyadri ridgeline.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="up" delay={250}>
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-gold-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-5">
                <Trees size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-2 font-medium">
                Protected Green Corridors
              </h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Over thousands of native indigenous trees integrated into pedestrian promenades, sensory gardens, and continuous bio-diversity green belts.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="up" delay={300}>
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-gold-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-2 font-medium">
                Grade-A Ready Infrastructure
              </h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Wide tree-lined avenues with underground electrical and fiber ducting, storm water systems, 24x7 gated security, and treated water supply.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
