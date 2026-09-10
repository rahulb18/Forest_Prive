import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Mountain, Sparkles, Building2, Milestone } from "lucide-react";
import { modalState } from "../lib/modal-state";

interface HeroProps {
  onProgress?: (progress: number) => void;
  onEnquire?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onProgress }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (onProgress) onProgress(100);
  }, [onProgress]);

  const scrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("EnclaveShowcase") || document.getElementById("Overview");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center select-none overflow-hidden bg-navy-950 text-white"
    >
      {/* BACKGROUND IMAGE: Dedicated Client Render 01 (Sunset Infinity Pool & Mountain Horizon) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="assets/client/Gallery-1.jpg"
          alt="NeoLiv Grand Forest Privé - Sunset Infinity Pool & Mountain Horizon"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[4000ms] ease-out will-change-transform motion-safe:hover:scale-105"
          style={{
            WebkitTransform: 'translate3d(0,0,0)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      </div>

      {/* Atmospheric Luxury Scrims & Vignettes for Uncompromising Readability */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-56 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_50%,rgba(5,15,35,0.6)_0%,rgba(5,15,35,0.3)_50%,transparent_85%)] pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* TOP BRAND LOCKUP */}
      <header className="relative z-20 w-full pt-6 sm:pt-8 md:pt-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <img
          src="assets/logo.png"
          alt="NeoLiv"
          width={140}
          height={40}
          className="h-9 sm:h-10 md:h-12 w-auto mb-2.5 opacity-95 drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]"
        />
        <p className="font-serif text-xs sm:text-sm md:text-base text-white tracking-[0.26em] uppercase font-bold [text-shadow:_0_2px_12px_rgba(0,0,0,0.98),_0_4px_24px_rgba(0,0,0,0.95)]">
          GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
        </p>
      </header>

      {/* CENTER NARRATIVE CONTENT */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 my-auto text-center py-8">
        {/* Feathered dark backdrop aura */}
        <div className="absolute inset-0 bg-navy-950/60 rounded-full blur-3xl -z-10 scale-110 pointer-events-none" />

        {/* Eyebrow Pill */}
        <div className="mb-4 sm:mb-5 inline-block">
          <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-black/65 border border-gold-400/50 text-amber-300 text-[9px] sm:text-xs tracking-[0.24em] uppercase font-semibold backdrop-blur-md shadow-2xl">
            <Sparkles size={12} className="text-gold-400" />
            <span>NATURE-LED PLOTTED LIVING • 360° MOUNTAIN VIEWS</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium uppercase tracking-wide leading-[1.12] sm:leading-[1.1] [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.9),_0_14px_48px_rgba(0,0,0,0.95)]">
          Where Nature <br className="hidden sm:inline" />
          <span className="text-[#F6D57E] italic font-serif">Becomes a Privilege.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-gray-200 text-xs sm:text-sm md:text-base font-light tracking-[0.12em] uppercase max-w-2xl mx-auto leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.9)]">
          Neoliv Grand Forest Privé — Low-Density Forest Sanctuaries with 360° Mountain Vistas & Grade-A Ready Infrastructure.
        </p>

        {/* Key Highlight Pills Bar */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/45 border border-white/10 backdrop-blur-sm">
            <Mountain size={14} className="text-gold-400 shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-gray-200 whitespace-nowrap">
              360° Mountain Views
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/45 border border-white/10 backdrop-blur-sm">
            <Sparkles size={14} className="text-gold-400 shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-gray-200 whitespace-nowrap">
              Low-Density Living
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/45 border border-white/10 backdrop-blur-sm">
            <Building2 size={14} className="text-gold-400 shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-gray-200 whitespace-nowrap">
              2 Exclusive Clubs
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/45 border border-white/10 backdrop-blur-sm">
            <Milestone size={14} className="text-gold-400 shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-gray-200 whitespace-nowrap">
              Wide Internal Roads
            </span>
          </div>
        </div>

        {/* Direct Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Hero Enquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.6)] transition-all active:scale-95 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Enquire Now</span>
            <ArrowRight size={14} />
          </button>

          <a
            href="#EnclaveShowcase"
            onClick={scrollToNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white border border-gold-400/60 hover:border-gold-400 text-xs uppercase tracking-[0.18em] font-semibold rounded-full backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Explore The Enclave</span>
          </a>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR: Direct Anchor to Native Scroll Flow */}
      <footer className="relative z-20 pb-6 sm:pb-8 flex flex-col items-center">
        <a
          href="#EnclaveShowcase"
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1.5 text-white/80 hover:text-gold-300 transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll down to explore township enclave"
        >
          <span className="px-3.5 py-1 rounded-full bg-navy-950/80 border border-gold-400/30 backdrop-blur-sm text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-gold-300 font-medium shadow group-hover:border-gold-400">
            Scroll to Explore
          </span>
          <ArrowDown size={14} className="animate-bounce text-gold-400 drop-shadow" />
        </a>
      </footer>
    </section>
  );
};
