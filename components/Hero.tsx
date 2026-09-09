import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ArrowDown, ArrowRight } from "lucide-react";
import { modalState } from "../lib/modal-state";

// --- CONFIG ---
const FRAME_COUNT = 192; 
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const FRAME_PATH = (index: number) =>
  `assets/sequenceLandscape/frame_${(index + 1).toString().padStart(3, "0")}.jpg`;

// BRAND STORY NARRATIVE - NEOLIV GRAND FOREST PRIVÉ
const NARRATIVE = [
  {
    start: 0,
    end: 64,
    title: "Where Nature Becomes a Privilege",
    subtitle: "Neoliv Grand Forest Privé",
  },
  {
    start: 64,
    end: 128,
    title: "360° Mountain Views & Wide Roads",
    subtitle: "Low-Density Plotted Living",
  },
  {
    start: 128,
    end: 192,
    title: "Two Exclusive Clubs & Curated Experiences",
    subtitle: "Grade-A Infrastructure",
  },
];

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

interface HeroProps {
  onProgress?: (progress: number) => void;
  onEnquire?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onProgress }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProg = useRef(0);
  const targetScrollProg = useRef(0);

  // --- UNIFIED HIGH-PERFORMANCE RENDER LIFECYCLE (SAFARI & CHROME COMPATIBLE) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.imageSmoothingEnabled = false;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;
    let isExperienceReady = false;

    const triggerExperienceReady = () => {
      if (!isExperienceReady) {
        isExperienceReady = true;
        setIsLoaded(true);
        if (onProgress) onProgress(100);
      }
    };

    // 1. Instantly paint Frame 0
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(0);
    images[0] = firstImg;

    const paintInitial = () => {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        ctx.drawImage(firstImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        triggerExperienceReady();
      }
    };

    if (firstImg.complete) {
      paintInitial();
    } else {
      firstImg.onload = paintInitial;
    }

    (async () => {
      try {
        if ('decode' in firstImg) {
          await firstImg.decode();
          paintInitial();
        }
      } catch {
        // Fallback handled by onload
      }
    })();

    // 2. Pre-buffer on desktop only after a safe delay, keeping mobile cellular bandwidth 100% free
    const bufferTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        for (let i = 1; i <= 4 && i < FRAME_COUNT; i++) {
          if (!images[i]) {
            const img = new Image();
            img.src = FRAME_PATH(i);
            images[i] = img;
          }
        }
      }
    }, 1200);

    const readyTimer = setTimeout(triggerExperienceReady, 300);

    // Scroll calculation
    const handleScroll = () => {
      const h = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const maxScroll = h * (isMobile ? 6 : 12);
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      targetScrollProg.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    let rafId = 0;
    let lastFrame = -1;
    let lastReportedFrame = -1;

    const render = () => {
      const h = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const maxScroll = h * (isMobile ? 6 : 12);
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;

      // When user is scrolled far past Hero, pause GPU draw calls
      if (currentScroll > maxScroll + h * 1.5) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const diff = targetScrollProg.current - scrollProg.current;
      const isMoving = Math.abs(diff) > 0.0001;

      if (isMoving) {
        const lerpFactor = isMobile ? 0.2 : 0.09;
        scrollProg.current += diff * lerpFactor;
      } else {
        scrollProg.current = targetScrollProg.current;
      }

      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(scrollProg.current * FRAME_COUNT)));

      // Buffer upcoming frames ONLY when user is scrolling into the sequence
      if (scrollProg.current > 0.001) {
        const BUFFER_AHEAD = isMobile ? 3 : 8;
        const targetEnd = Math.min(FRAME_COUNT, frameIndex + BUFFER_AHEAD);
        for (let i = frameIndex; i < targetEnd; i++) {
          if (!images[i]) {
            const nextImg = new Image();
            nextImg.src = FRAME_PATH(i);
            images[i] = nextImg;
          }
        }
      }

      // ONLY redraw canvas when frameIndex has actually changed
      if (frameIndex !== lastFrame) {
        let img = images[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let f = frameIndex - 1; f >= 0; f--) {
            if (images[f]?.complete && images[f]?.naturalWidth > 0) {
              img = images[f];
              break;
            }
          }
          if (!img || !img.complete) {
            img = images[0];
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          lastFrame = frameIndex;
        }
      }

      // CRITICAL FOR MOBILE SAFARI: ONLY trigger React state update when frame actually changes
      if (frameIndex !== lastReportedFrame) {
        lastReportedFrame = frameIndex;
        setCurrentFrame(frameIndex);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(bufferTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-full bg-navy-950 overflow-hidden">
        {/* Instant LCP Visual Anchor - Frame 0 rendered immediately by browser */}
        <img
          src="assets/sequenceLandscape/frame_001.jpg"
          alt="NeoLiv Grand Forest Privé"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* Persistent Top Scrim: Subtle natural gradient for pristine brand lockup legibility without darkening landscape */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-44 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-20" />

        {/* Soft, luminous vignette ONLY on Initial Hero: preserves true daylight, vivid greens, pools & architecture */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${currentFrame <= 15 ? "opacity-100" : "opacity-0"}`}>
            {/* Targeted central radial vignette: darkens the central reading zone while leaving the surrounding landscape bright & vivid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_48%,rgba(5,15,35,0.72)_0%,rgba(5,15,35,0.4)_45%,transparent_85%)]" />
            {/* Bottom subtle scrim for scroll cue clarity */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Bottom Sequence Scrim: Soft ambient feathering active only during scroll sequence */}
        <div className={`absolute inset-x-0 bottom-0 h-52 sm:h-72 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-15 transition-opacity duration-700 ${isLoaded && currentFrame > 15 ? "opacity-100" : "opacity-0"}`} />

        {/* Top Brand Lockup - Prominently Sized for Desktop & Mobile with Refined Proportions */}
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

        {/* Initial Hero Welcome Panel - Focused Luxury Editorial: Single Headline with CTAs */}
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-all duration-700 pointer-events-none ${currentFrame <= 15 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
            <div className="w-full max-w-4xl space-y-4 sm:space-y-6 relative py-4 px-2 pointer-events-auto">
                {/* Soft feathered dark aura directly behind the headline and CTAs */}
                <div className="absolute inset-0 bg-navy-950/50 rounded-full blur-3xl -z-10 scale-110 pointer-events-none" />
                
                {/* Refined Eyebrow */}
                <div>
                    <span className="inline-block max-w-[92vw] px-4 py-1.5 rounded-full bg-black/65 border border-gold-400/50 text-amber-300 text-[8.5px] sm:text-[11px] md:text-xs tracking-[0.20em] sm:tracking-[0.28em] uppercase font-semibold backdrop-blur-md shadow-xl truncate">
                        PLOTTED LIVING • 360° MOUNTAIN VIEWS
                    </span>
                </div>

                {/* Single Majestic Headline with High-Contrast Multi-Tier Text Shadow */}
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium uppercase tracking-wide leading-[1.14] [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.9),_0_14px_48px_rgba(0,0,0,0.95)]">
                    Where Nature <br className="hidden sm:inline" />
                    <span className="text-[#F6D57E] italic font-serif">Becomes a Privilege.</span>
                </h2>

                {/* Dual Luxury Action CTAs: Stacked cleanly on mobile to never overflow screen borders, side-by-side on sm+ */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto relative z-30 w-full max-w-[280px] sm:max-w-xl mx-auto pt-2 sm:pt-4 touch-manipulation">
                    <a
                        href="#Overview"
                        onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById("Overview");
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                            } else {
                                const h = window.innerHeight;
                                const isMobile = window.innerWidth < 768;
                                window.scrollTo({ top: h * (isMobile ? 6 : 12) + 50, behavior: "smooth" });
                            }
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.6)] transition-all active:scale-95 cursor-pointer whitespace-nowrap touch-manipulation select-none min-h-[44px]"
                    >
                        <span>Explore Grand Forest Privé</span>
                        <ArrowRight size={14} className="inline" />
                    </a>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            modalState.open("NeoLiv Grand Forest Privé - Enquiry");
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-3.5 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white border border-gold-400/60 hover:border-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold rounded-full backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 cursor-pointer whitespace-nowrap touch-manipulation select-none min-h-[44px]"
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
        </div>

        {/* Narrative Scroll Chapters - Floating Cinematic Movie Titles (NO artificial box/border) */}
        <div className={`absolute bottom-24 sm:bottom-28 md:bottom-28 left-0 w-full z-20 pointer-events-none px-6 transition-opacity duration-1000 ${isLoaded && currentFrame > 15 ? "opacity-100" : "opacity-0"}`}>
          {NARRATIVE.map((chapter, index) => {
            const fadeInDuration = 10;
            const fadeOutDuration = 10;
            const fadeInEnd = chapter.start + fadeInDuration;
            const fadeOutStart = chapter.end - fadeOutDuration;

            let opacity = 0;
            let translateY = 10;

            if (currentFrame < chapter.start) {
              opacity = 0;
            } else if (currentFrame < fadeInEnd) {
              opacity = easeOutCubic((currentFrame - chapter.start) / fadeInDuration);
              translateY = 10 * (1 - opacity);
            } else if (currentFrame < fadeOutStart) {
              opacity = 1;
              translateY = 0;
            } else if (currentFrame <= chapter.end) {
              const p = (currentFrame - fadeOutStart) / fadeOutDuration;
              opacity = index === NARRATIVE.length - 1 ? 1 : 1 - easeOutCubic(p);
              translateY = index === NARRATIVE.length - 1 ? 0 : -5 * easeOutCubic(p);
            } else if (index === NARRATIVE.length - 1) {
              opacity = 1;
            }

            return (
              <div
                key={index}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out transform px-4"
                style={{ opacity, transform: `translateY(${translateY}px)` }}
              >
                <div className="relative max-w-4xl mx-auto px-4 text-center pointer-events-none space-y-2">
                    {/* Feathered dark radial aura: 100% invisible edges, diffuses contrast without any box or border */}
                    <div className="absolute inset-0 -inset-x-16 bg-black/60 rounded-full blur-3xl -z-10 scale-125 pointer-events-none" />

                    {/* Subtitle / Eyebrow */}
                    <p className="text-[#F6D57E] font-medium tracking-[0.35em] sm:tracking-[0.45em] text-[10px] sm:text-xs md:text-sm uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                        {chapter.subtitle}
                    </p>

                    {/* Cinematic Chapter Title */}
                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider font-normal leading-[1.18] [text-shadow:_0_2px_6px_rgba(0,0,0,1),_0_6px_20px_rgba(0,0,0,0.95),_0_16px_48px_rgba(0,0,0,0.98)]">
                        {chapter.title}
                    </h2>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator with safe clearance & readability */}
        <div className={`absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white transition-opacity duration-700 pointer-events-none ${currentFrame > 5 ? "opacity-0" : "opacity-90"}`}>
            <span className="px-3 py-1 rounded-full bg-navy-950/75 border border-gold-400/30 backdrop-blur-sm text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-gold-300 font-medium shadow-md">
                Scroll to Explore
            </span>
            <ArrowDown size={11} className="animate-bounce text-gold-400 drop-shadow" />
        </div>
    </div>
  );
};
