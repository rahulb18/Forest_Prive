import React from "react";
import { ArrowDown } from "lucide-react";

export interface StorySlideData {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  titleWhite: string;
  titleGold: string;
  subtitle: string;
  nextDestination: string;
  showLogo?: boolean;
}

const STORY_SLIDES: StorySlideData[] = [
  {
    id: "home",
    image: "assets/client/Gallery-1.jpg",
    alt: "NeoLiv Grand Forest Privé - Sunset Infinity Pool & Mountain Horizon",
    eyebrow: "PLOTTED LIVING • 360° MOUNTAIN VIEWS",
    titleWhite: "Where Nature",
    titleGold: "Becomes a Privilege.",
    subtitle: "Neoliv Grand Forest Privé — Low-density forest sanctuaries with 360° mountain vistas & Grade-A ready infrastructure.",
    nextDestination: "Explore Township",
    showLogo: true,
  },
  {
    id: "slide-township",
    image: "assets/client/Gallery-3.jpg",
    alt: "NeoLiv Grand Forest Privé - 360° Mountain Township & Low-Density Plotted Living",
    eyebrow: "360° FOREST TOWNSHIP",
    titleWhite: "Low-Density Plotted Living",
    titleGold: "Cradled in nature's canopy.",
    subtitle: "Contoured residential parcels with wide planned avenues, Sahyadri horizons, and untouched forest buffers.",
    nextDestination: "The Neo Club",
  },
  {
    id: "slide-club",
    image: "assets/client/Gallery-2.jpg",
    alt: "NeoLiv Grand Forest Privé - The Neo Club Sanctuary & Reflection Pool",
    eyebrow: "THE NEO CLUB SANCTUARY",
    titleWhite: "The Neo Club Sanctuary",
    titleGold: "& reflection pool.",
    subtitle: "Luminous glasshouse pavilion mirrored in tranquil waters for serene community living and twilight views.",
    nextDestination: "Glass Pavilion",
  },
  {
    id: "slide-architecture",
    image: "assets/client/Clubhouse-amenities.jpg",
    alt: "NeoLiv Grand Forest Privé - Two-Story Glass Pavilion Clubhouse Architecture",
    eyebrow: "CLUBHOUSE ARCHITECTURE",
    titleWhite: "Two-Story Glass Pavilion",
    titleGold: "Amidst mountain air.",
    subtitle: "Contemporary architectural marvel offering curated social, dining, and leisure spaces connected to nature.",
    nextDestination: "Sports Arena",
  },
  {
    id: "slide-sports",
    image: "assets/client/amenities-3.jpg",
    alt: "NeoLiv Grand Forest Privé - Multiplay Sports Arena & Forest Trails",
    eyebrow: "SPORTS & RECREATION",
    titleWhite: "Multiplay Sports Arena",
    titleGold: "& forest trails.",
    subtitle: "Active outdoor recreation with professional-grade multi-sport courts, jogging tracks, and walking trails under open skies.",
    nextDestination: "Fitness Studio",
  },
  {
    id: "slide-wellness",
    image: "assets/client/amenities-2.jpg",
    alt: "NeoLiv Grand Forest Privé - Panoramic Fitness Studio Overlooking Nature",
    eyebrow: "WELLNESS & FITNESS",
    titleWhite: "Panoramic Fitness Studio",
    titleGold: "Overlooking nature.",
    subtitle: "State-of-the-art cardiovascular and strength equipment framed by floor-to-ceiling glass gazing upon flowering forest gardens.",
    nextDestination: "Explore Masterplan",
  },
];

export const VisualStorySections: React.FC = () => {
  const scrollToNext = (index: number) => {
    const nextSlide = STORY_SLIDES[index + 1];
    if (nextSlide) {
      const el = document.getElementById(nextSlide.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const overview = document.getElementById("Overview");
      if (overview) overview.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full">
      {STORY_SLIDES.map((slide, index) => {
        const isFirst = index === 0;

        return (
          <section
            key={slide.id}
            id={slide.id}
            className="story-snap-slide relative w-full h-screen min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-navy-950 select-none"
          >
            {/* BACKGROUND RENDER: Dedicated high-resolution client visual */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <img
                src={slide.image}
                alt={slide.alt}
                fetchPriority={isFirst ? "high" : "auto"}
                loading={isFirst ? "eager" : "lazy"}
                decoding={isFirst ? "sync" : "async"}
                className="w-full h-full object-cover object-center scale-100"
                style={{
                  WebkitTransform: "translate3d(0,0,0)",
                  transform: "translate3d(0,0,0)",
                }}
              />
            </div>

            {/* ATMOSPHERIC GRADIENT SCRIMS: Preserves brightness of architecture while keeping text crisp */}
            {/* Soft bottom scrim (only lower 40%) */}
            <div className="absolute inset-x-0 bottom-0 h-[45%] sm:h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
            {/* Subtle bottom-left radial vignette */}
            <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.25)_50%,transparent_80%)] pointer-events-none z-10" />
            {/* Subtle top edge scrim */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

            {/* TOP BRAND LOCKUP (Slide 1) or SLIDE CHAPTER COUNTER (Subsequent Slides) */}
            {slide.showLogo ? (
              <header className="relative z-20 w-full pt-6 sm:pt-8 md:pt-10 px-6 flex flex-col items-center text-center">
                <img
                  src="assets/logo.png"
                  alt="NeoLiv"
                  width={140}
                  height={40}
                  className="h-8 sm:h-9 md:h-10 w-auto mb-1.5 opacity-95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                />
                <span className="font-serif text-xs sm:text-sm text-white tracking-[0.24em] uppercase font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                </span>
              </header>
            ) : (
              <div className="relative z-20 pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/70 font-mono bg-black/45 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm shadow">
                  0{index + 1} / 0{STORY_SLIDES.length}
                </span>
              </div>
            )}

            {/* BOTTOM CONTENT BAR: Clean layout with zero overlaps on mobile & desktop */}
            <div className="relative z-20 w-full px-5 sm:px-12 md:px-16 pb-6 sm:pb-10 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-3.5 sm:gap-6">
              {/* BOTTOM-LEFT EDITORIAL TYPOGRAPHY */}
              <div className="max-w-xl text-left pointer-events-auto">
                {/* Discreet Eyebrow Pill */}
                <div className="mb-2 sm:mb-2.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 border border-gold-400/40 text-gold-300 text-[8px] sm:text-[9.5px] tracking-[0.24em] uppercase font-semibold backdrop-blur-md shadow-md">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Refined Headline: Natural Title Case */}
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-normal leading-[1.2] tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  <span>{slide.titleWhite}</span> <br className="hidden sm:inline" />
                  <span className="text-[#F6D57E] italic font-serif sm:mt-0.5 inline-block">
                    {slide.titleGold}
                  </span>
                </h2>

                {/* Subtitle Description */}
                <p className="text-gray-200/90 text-xs sm:text-[13px] md:text-sm font-light tracking-[0.02em] max-w-lg mt-1.5 sm:mt-2.5 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {slide.subtitle}
                </p>
              </div>

              {/* SINGLE UNIFIED BOTTOM ACTION: Contextual Next Chapter Pill (No duplicates, no collisions) */}
              <div className="flex items-center shrink-0 pointer-events-auto self-start md:self-end pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => scrollToNext(index)}
                  className="group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-[#0a1226]/85 hover:bg-[#0f1d3d] border border-gold-400/40 hover:border-gold-400 text-white backdrop-blur-md shadow-[0_6px_25px_rgba(0,0,0,0.85)] transition-all duration-300 cursor-pointer active:scale-95 touch-manipulation min-h-[40px]"
                  aria-label={slide.nextDestination}
                >
                  {/* Glowing Pulse Dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse shrink-0" />
                  
                  {/* Contextual Destination Name (e.g. Explore Township, The Neo Club, Explore Masterplan) */}
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-gray-100 group-hover:text-gold-300 transition-colors whitespace-nowrap">
                    {slide.nextDestination}
                  </span>
                  
                  {/* Subtle Divider */}
                  <span className="w-px h-3.5 bg-white/20 shrink-0" />
                  
                  {/* Down Arrow */}
                  <ArrowDown size={13} className="text-gold-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
