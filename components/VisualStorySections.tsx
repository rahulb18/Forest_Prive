import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { modalState } from "../lib/modal-state";

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
  objectPosition?: string;
}

const STORY_SLIDES: StorySlideData[] = [
  {
    id: "home",
    image: "assets/client/Gallery-2.jpg",
    alt: "NeoLiv Grand Forest Privé - A Life Privately Immersed in Nature",
    eyebrow: "NEOLIV GRAND FOREST PRIVÉ",
    titleWhite: "A Life Privately",
    titleGold: "Immersed in Nature.",
    subtitle: "Curated forest living in Khopoli, Mumbai 3.0. A rare world where expansive greens, curated experiences and space come together.",
    nextDestination: "Discover Privé",
    showLogo: true,
  },
  {
    id: "slide-arrival",
    image: "assets/client/Gallery-1.jpg",
    alt: "NeoLiv Grand Forest Privé - The Gateway to Grandeur",
    eyebrow: "ARRIVAL",
    titleWhite: "The Gateway",
    titleGold: "To Grandeur.",
    subtitle: "A grand arrival framed by landscape and architecture, marking your serene transition home.",
    nextDestination: "Swimming Pool",
    objectPosition: "object-[25%_center] sm:object-center",
  },
  {
    id: "slide-pool",
    image: "assets/client/pool-1600x1200.jpg",
    alt: "NeoLiv Grand Forest Privé - Swimming Pool & Open Skies",
    eyebrow: "EVERY DAY A HOLIDAY",
    titleWhite: "Some Places Change",
    titleGold: "Your sense of time.",
    subtitle: "Swim beneath open skies and unwind beside tranquil waters where leisure needs no occasion.",
    nextDestination: "The Privé Club",
  },
  {
    id: "slide-club",
    image: "assets/client/clubhouse-1600x1200.jpg",
    alt: "NeoLiv Grand Forest Privé - The Privé Club",
    eyebrow: "THE PRIVÉ CLUB",
    titleWhite: "Your Private Escape",
    titleGold: "Steps from home.",
    subtitle: "An exclusive clubhouse designed for slow afternoons and unhurried evenings of leisure.",
    nextDestination: "Plotted Living",
  },
  {
    id: "slide-township",
    image: "assets/client/1920x1080.jpg",
    alt: "NeoLiv Grand Forest Privé - Masterplan and Plotted Living",
    eyebrow: "A RARE SENSE OF SPACE",
    titleWhite: "Green Gated Living",
    titleGold: "Designed around you.",
    subtitle: "Thoughtfully planned plotted living balancing natural privacy, expansive greens and community.",
    nextDestination: "Curated Experiences",
  },
  {
    id: "slide-sports",
    image: "assets/client/Gallery-4.jpg",
    alt: "NeoLiv Grand Forest Privé - Curated Amenities & Active Living",
    eyebrow: "EXPERIENCES CURATED FOR LIFE",
    titleWhite: "Every Mood",
    titleGold: "Has its place.",
    subtitle: "Curated spaces for fitness, sports and quiet contemplation across forest canopies.",
    nextDestination: "Generational Living",
  },
  {
    id: "slide-amphitheatre",
    image: "assets/client/Gallery-6.jpg",
    alt: "NeoLiv Grand Forest Privé - Multi Generational Living",
    eyebrow: "DESIGNED FOR GENERATIONS",
    titleWhite: "Generations Connected",
    titleGold: "One address.",
    subtitle: "A timeless sanctuary where childhoods unfold, parents unwind, and families reconnect.",
    nextDestination: "Explore Masterplan",
    objectPosition: "object-[78%_center] sm:object-center",
  },
];

export const VisualStorySections: React.FC = () => {
  const openEnquiry = (title = "NeoLiv Grand Forest Privé - Enquiry") => {
    modalState.open(title);
  };

  // Dynamic Scroll Snapping: Enforce mandatory 100% viewport snapping while navigating Slides 1-7,
  // then gracefully release into natural free-scrolling when entering detailed content sections (#Overview).
  React.useEffect(() => {
    const handleScrollSnap = () => {
      const overviewEl = document.getElementById("Overview");
      if (overviewEl) {
        const overviewTop = overviewEl.getBoundingClientRect().top;
        if (overviewTop > window.innerHeight * 0.4) {
          document.documentElement.classList.add("story-snap-active");
        } else {
          document.documentElement.classList.remove("story-snap-active");
        }
      } else {
        document.documentElement.classList.add("story-snap-active");
      }
    };

    handleScrollSnap();
    window.addEventListener("scroll", handleScrollSnap, { passive: true });
    window.addEventListener("resize", handleScrollSnap, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollSnap);
      window.removeEventListener("resize", handleScrollSnap);
      document.documentElement.classList.remove("story-snap-active");
    };
  }, []);

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
            className="story-snap-slide relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-navy-950 select-none"
          >
            {/* BACKGROUND RENDER: Dedicated high-resolution client visual */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <img
                src={slide.image}
                alt={slide.alt}
                fetchPriority={isFirst ? "high" : "auto"}
                loading={isFirst ? "eager" : "lazy"}
                decoding={isFirst ? "sync" : "async"}
                className={`w-full h-full object-cover scale-100 ${slide.objectPosition || "object-center"}`}
                style={{
                  WebkitTransform: "translate3d(0,0,0)",
                  transform: "translate3d(0,0,0)",
                }}
              />
            </div>

            {/* ATMOSPHERIC GRADIENT SCRIMS: Kept sleek and compact to maximize image view */}
            {/* Compact bottom scrim (lower 32% on mobile, 28% on desktop) */}
            <div className="absolute inset-x-0 bottom-0 h-[32%] sm:h-[28%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
            {/* Subtle bottom-left radial vignette */}
            <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.2)_50%,transparent_80%)] pointer-events-none z-10" />
            {/* Subtle top edge scrim for brand contrast */}
            <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

            {/* TOP BRAND LOCKUP (Slide 1): Sized up for commanding visibility on mobile */}
            {slide.showLogo ? (
              <header className="relative z-20 w-full pt-6 sm:pt-7 md:pt-9 px-6 flex flex-col items-center text-center">
                {/* Seamless feathered dark aura: eliminates bright sun flare behind text without visible box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-84 sm:w-[460px] h-28 sm:h-32 bg-navy-950/75 rounded-full blur-2xl sm:blur-3xl -z-10 pointer-events-none" />

                <div className="relative inline-flex flex-col items-center">
                  <img
                    src="assets/logo.png"
                    alt="NeoLiv"
                    width={180}
                    height={52}
                    className="h-12 sm:h-13 md:h-15 w-auto mb-2 opacity-100 filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-transform hover:scale-105 duration-300"
                  />
                  <span className="font-serif text-[11px] sm:text-xs md:text-sm text-white/95 tracking-[0.28em] uppercase font-medium [text-shadow:_0_2px_14px_rgba(0,0,0,0.98),_0_4px_28px_rgba(0,0,0,0.95)]">
                    GRAND FOREST <span className="text-gold-400 font-semibold">PRIVÉ</span>
                  </span>
                </div>
              </header>
            ) : (
              <div className="relative z-20 pt-5 sm:pt-7 px-5 sm:px-12 flex items-center justify-between pointer-events-none">
                <span className="numeric text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] text-white/80 font-sans font-medium bg-black/45 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm shadow">
                  0{index + 1} / 0{STORY_SLIDES.length}
                </span>
              </div>
            )}

            {/* BOTTOM CONTENT BAR: Grounded strictly in lower 20-25% to never crowd the image */}
            <div className="relative z-20 w-full px-4 sm:px-10 md:px-16 pb-3.5 sm:pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4">
              {/* BOTTOM-LEFT EDITORIAL TYPOGRAPHY */}
              <div className="max-w-xl text-left pointer-events-auto">
                {/* Discreet Eyebrow Pill: Slide 1 showcases NeoLiv bigger & Grand Forest Privé smaller */}
                <div className="mb-1 sm:mb-1.5">
                  {isFirst ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 border border-gold-400/40 backdrop-blur-md shadow-md">
                      <span className="font-bold text-white text-[9.5px] sm:text-[10.5px] tracking-[0.2em] uppercase">NEOLIV</span>
                      <span className="text-gold-400/50 text-[9px] sm:text-[10px] font-light">|</span>
                      <span className="text-gold-300/95 text-[7.5px] sm:text-[8.5px] tracking-[0.22em] uppercase font-medium">GRAND FOREST PRIVÉ</span>
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 border border-gold-400/40 text-gold-300 font-sans text-[7.5px] sm:text-[8.5px] tracking-[0.24em] uppercase font-semibold backdrop-blur-md shadow-md">
                      {slide.eyebrow}
                    </span>
                  )}
                </div>

                {/* Refined Headline: Natural Title Case, compact leading */}
                <h2 className="hero-display font-serif text-xl sm:text-2xl md:text-3xl lg:text-[40px] text-white font-normal leading-[1.18] tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  <span>{slide.titleWhite}</span> <br className="hidden sm:inline" />
                  <span className="text-[#F6D57E] italic font-serif sm:mt-0.5 inline-block">
                    {slide.titleGold}
                  </span>
                </h2>

                {/* Subtitle Description: Tight, concise, never crowding visual */}
                <p className="body-regular font-sans text-gray-200/90 text-[11px] sm:text-xs md:text-sm font-light tracking-[0.015em] max-w-lg mt-1 sm:mt-1.5 leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>
              </div>

              {/* DUAL ACTION CONTROLS: Next Destination (Left) + Enquire Now Button (Right) */}
              <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto pointer-events-auto pt-0.5 sm:pt-0 shrink-0">
                {/* 1. Next Chapter Destination Button */}
                <button
                  type="button"
                  onClick={() => scrollToNext(index)}
                  className="group flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0a1226]/85 hover:bg-[#0f1d3d] border border-white/20 hover:border-gold-400/50 text-white backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer active:scale-95 touch-manipulation min-h-[36px] sm:min-h-[40px]"
                  aria-label={slide.nextDestination}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse shrink-0" />
                  <span className="font-sans text-[8.5px] sm:text-[10px] uppercase font-semibold tracking-[0.18em] text-gray-200 group-hover:text-gold-300 transition-colors whitespace-nowrap">
                    {slide.nextDestination}
                  </span>
                  <span className="w-px h-3 bg-white/20 shrink-0" />
                  <ArrowDown size={12} className="text-gold-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </button>

                {/* 2. Luxury CTA Button: Enquire */}
                <button
                  type="button"
                  onClick={() => openEnquiry(`NeoLiv Grand Forest Privé - Enquire`)}
                  className="group flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-[9px] sm:text-[10px] uppercase tracking-[0.18em] shadow-[0_4px_22px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] transition-all duration-300 cursor-pointer active:scale-95 touch-manipulation min-h-[36px] sm:min-h-[40px] shrink-0"
                >
                  <span>Enquire</span>
                  <ArrowRight size={12} className="text-navy-950 stroke-[2.2] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

