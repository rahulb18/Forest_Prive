import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { modalState } from "../lib/modal-state";
import { scrollPresentation } from "../lib/scroll-presentation";

export interface HeroSlide {
  image: string;
  alt: string;
  eyebrow: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "assets/client/Gallery-1.jpg",
    alt: "NeoLiv Grand Forest Privé - Sunset Infinity Pool & Mountain Horizon",
    eyebrow: "PLOTTED LIVING • 360° MOUNTAIN VIEWS",
    titlePart1: "Where Nature",
    titlePart2: "Becomes a Privilege.",
    subtitle: "Neoliv Grand Forest Privé",
  },
  {
    image: "assets/client/Gallery-3.jpg",
    alt: "NeoLiv Grand Forest Privé - 360° Mountain Views & Low-Density Living",
    eyebrow: "LOW-DENSITY PLOTTED LIVING",
    titlePart1: "360° Mountain Views",
    titlePart2: "& Wide Roads.",
    subtitle: "Sanctuary Amidst Mountain Forest",
  },
  {
    image: "assets/client/Gallery-2.jpg",
    alt: "NeoLiv Grand Forest Privé - Two Exclusive Clubs & Curated Experiences",
    eyebrow: "GRADE-A INFRASTRUCTURE",
    titlePart1: "Two Exclusive Clubs",
    titlePart2: "& Curated Experiences.",
    subtitle: "Refined Leisure & Private Serenity",
  },
];

interface HeroProps {
  onProgress?: (progress: number) => void;
  onEnquire?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onProgress }) => {
  const [activeSlide, setActiveSlide] = useState(() => scrollPresentation.getHeroSlide());
  const [isLoaded, setIsLoaded] = useState(false);

  // Synchronize reactively with unified presentation controller
  useEffect(() => {
    return scrollPresentation.subscribe((state) => {
      setActiveSlide(state.heroSlide);
    });
  }, []);

  // Mark experience as loaded
  useEffect(() => {
    setIsLoaded(true);
    if (onProgress) onProgress(100);
  }, [onProgress]);

  // Jump to specific slide (from pagination pills)
  const goToSlide = (targetIndex: number) => {
    scrollPresentation.setHeroSlide(targetIndex);
  };

  const currentSlide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];

  return (
    <div id="home" className="relative w-full h-full bg-navy-950 overflow-hidden select-none">
      {/* BACKGROUND SLIDES: High-Performance Luxury Crossfade & WebKit GPU Motion */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={slide.image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out pointer-events-none will-change-transform ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              WebkitTransform: 'translate3d(0,0,0)',
              transform: 'translate3d(0,0,0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              fetchPriority={idx === 0 ? "high" : "auto"}
              decoding={idx === 0 ? "sync" : "async"}
              className={`w-full h-full object-cover object-center transition-transform duration-[2200ms] ease-out will-change-transform ${
                isActive ? "scale-100" : "scale-105"
              }`}
              style={{
                WebkitTransform: isActive ? 'scale(1) translate3d(0,0,0)' : 'scale(1.05) translate3d(0,0,0)',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
          </div>
        );
      })}

      {/* Persistent Top Scrim for crisp brand mark readability */}
      <div className="absolute inset-x-0 top-0 h-40 sm:h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-20" />

      {/* Atmospheric Central & Bottom Scrims for pristine luxury typography */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,rgba(5,15,35,0.65)_0%,rgba(5,15,35,0.35)_50%,transparent_85%)] pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-56 sm:h-72 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-20" />

      {/* TOP BRAND LOCKUP */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center px-4 w-full max-w-xl flex flex-col items-center">
        <img
          src="assets/logo.png"
          alt="NeoLiv"
          width={140}
          height={40}
          className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto mb-2 sm:mb-2.5 opacity-95 drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]"
        />
        <h1 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-white tracking-[0.22em] sm:tracking-[0.28em] uppercase font-bold [text-shadow:_0_2px_12px_rgba(0,0,0,0.98),_0_4px_24px_rgba(0,0,0,0.95)]">
          GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
        </h1>
      </div>

      {/* CENTER NARRATIVE CONTENT: Smoothly swaps content based on activeSlide */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-6 relative py-4 px-2 pointer-events-auto">
          {/* Feathered dark background aura */}
          <div className="absolute inset-0 bg-navy-950/60 rounded-full blur-3xl -z-10 scale-110 pointer-events-none" />

          {/* Dynamic Slide Content with Fluid Transition & Zero Text Ghosting */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.image}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Eyebrow */}
              <div className="mb-2 sm:mb-3">
                <span className="inline-block max-w-[92vw] px-4 py-1.5 rounded-full bg-black/65 border border-gold-400/50 text-amber-300 text-[8.5px] sm:text-[11px] md:text-xs tracking-[0.20em] sm:tracking-[0.28em] uppercase font-semibold backdrop-blur-md shadow-xl truncate">
                  {currentSlide.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium uppercase tracking-wide leading-[1.14] [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.9),_0_14px_48px_rgba(0,0,0,0.95)]">
                {currentSlide.titlePart1} <br className="hidden sm:inline" />
                <span className="text-[#F6D57E] italic font-serif">
                  {currentSlide.titlePart2}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-3 sm:mt-4 text-gray-200 text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase text-shadow">
                {currentSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto relative z-30 w-full max-w-[280px] sm:max-w-xl mx-auto pt-4 sm:pt-6 touch-manipulation">
            <a
              href="#Cinematic"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("Cinematic");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  const h = window.innerHeight;
                  window.scrollTo({ top: h * 3 + 20, behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-[11px] sm:text-xs uppercase tracking-[0.16em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.6)] transition-all active:scale-95 cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              <span>Explore Grand Forest Privé</span>
              <ArrowRight size={14} className="inline" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                modalState.open("NeoLiv Grand Forest Privé - Hero Enquiry");
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white border border-gold-400/60 hover:border-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold rounded-full backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* DISCRETE SLIDE PAGINATION PILLS (01, 02, 03) */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
        {HERO_SLIDES.map((_, idx) => {
          const isActive = idx === activeSlide;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Jump to hero slide 0${idx + 1}`}
              className="group flex items-center gap-1.5 focus:outline-none cursor-pointer py-1.5 px-2"
            >
              <span
                className={`font-serif text-[10px] sm:text-xs tracking-wider transition-colors duration-300 font-bold ${
                  isActive ? "text-amber-300" : "text-white/50 group-hover:text-white/80"
                }`}
              >
                0{idx + 1}
              </span>
              <span
                className={`block h-[2px] sm:h-[2.5px] rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-8 sm:w-10 bg-gradient-to-r from-amber-300 to-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    : "w-3 sm:w-4 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* SCROLL TO EXPLORE INDICATOR */}
      <div
        className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white transition-opacity duration-700 pointer-events-none ${
          activeSlide === 0 ? "opacity-90" : "opacity-0"
        }`}
      >
        <span className="px-3 py-1 rounded-full bg-navy-950/75 border border-gold-400/30 backdrop-blur-sm text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-gold-300 font-medium shadow-md">
          Scroll to Explore
        </span>
        <ArrowDown size={11} className="animate-bounce text-gold-400 drop-shadow" />
      </div>
    </div>
  );
};
