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

  // --- PROGRESSIVE SMART-BUFFER PRELOADER ---
  useEffect(() => {
    // Initial buffer: first 18 frames (~9 MB) ensures instant entry with zero stutter,
    // while remaining 174 frames stream smoothly in the background
    const INITIAL_READY_COUNT = 18;
    let initialLoadedCount = 0;
    let isExperienceReady = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const onImageLoad = (index: number) => {
      // Progress calculation based on initial buffer readiness
      if (index < INITIAL_READY_COUNT) {
        initialLoadedCount++;
        const initialProgress = Math.min(100, Math.round((initialLoadedCount / INITIAL_READY_COUNT) * 100));
        if (onProgress) onProgress(initialProgress);

        if (initialLoadedCount >= INITIAL_READY_COUNT && !isExperienceReady) {
          isExperienceReady = true;
          setIsLoaded(true);
          if (onProgress) onProgress(100);
        }
      }

      // Draw initial frame 0 immediately when ready for zero-latency First Contentful Paint
      if (index === 0 && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx && images[0]?.complete) {
          ctx.drawImage(images[0], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
      }
    };

    // 1. Prioritize Frame 0 immediately for instant First Contentful Paint
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(0);
    images[0] = firstImg;
    (async () => {
      try {
        if ('decode' in firstImg) {
          await (firstImg as HTMLImageElement).decode();
        }
      } catch {
        // Fallback
      } finally {
        onImageLoad(0);
      }
    })();

    // 2. Load Phase 1: Initial Buffer (Frames 1 to 17) with high priority
    const loadInitialBuffer = async () => {
      const bufferPromises = [];
      for (let i = 1; i < INITIAL_READY_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        images[i] = img;

        const promise = (async () => {
          try {
            if ('decode' in img && typeof (img as any).decode === 'function') {
              await (img as any).decode();
            } else {
              await new Promise<void>((res) => {
                img.onload = () => res();
                img.onerror = () => res();
              });
            }
          } catch {
            // Fallback
          } finally {
            onImageLoad(i);
          }
        })();
        bufferPromises.push(promise);
      }
      await Promise.all(bufferPromises);

      // 3. Load Phase 2: Background Stream (Frames 18 to 191) in smooth batches
      loadBackgroundStream(INITIAL_READY_COUNT, 8);
    };

    // Phase 2: Background Streamer with micro-intervals to keep UI thread fluid
    const loadBackgroundStream = async (start: number, batchSize: number) => {
      if (start >= FRAME_COUNT) return;
      const end = Math.min(start + batchSize, FRAME_COUNT);
      const batchPromises = [];

      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        images[i] = img;

        const promise = (async () => {
          try {
            if ('decode' in img && typeof (img as any).decode === 'function') {
              await (img as any).decode();
            } else {
              await new Promise<void>((res) => {
                img.onload = () => res();
                img.onerror = () => res();
              });
            }
          } catch {
            // Fallback
          } finally {
            onImageLoad(i);
          }
        })();
        batchPromises.push(promise);
      }

      await Promise.all(batchPromises);

      if (end < FRAME_COUNT) {
        setTimeout(() => loadBackgroundStream(end, batchSize), 20);
      }
    };

    loadInitialBuffer();
    imagesRef.current = images;
  }, []);

  // --- RENDER LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Perf: Disable alpha for opaque sequence
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Perf: Optimized context settings
    ctx.imageSmoothingEnabled = false; 

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
    let isVisible = true;

    const render = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }

      const lerpFactor = window.innerWidth < 768 ? 0.12 : 0.08; 
      scrollProg.current += (targetScrollProg.current - scrollProg.current) * lerpFactor;
      
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(scrollProg.current * FRAME_COUNT)));

      if (frameIndex !== lastFrame) {
        let img = imagesRef.current[frameIndex];

        // Seamless fallback: if the requested frame is still buffering during super-fast scroll,
        // search backward for the closest already decoded frame so the canvas never drops or flickers
        if (!img || !img.complete) {
          for (let f = frameIndex - 1; f >= 0; f--) {
            if (imagesRef.current[f]?.complete) {
              img = imagesRef.current[f];
              break;
            }
          }
          if (!img || !img.complete) {
            img = imagesRef.current[0];
          }
        }

        if (img && img.complete) {
          ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
        lastFrame = frameIndex;
        setCurrentFrame(frameIndex);
      }
      rafId = requestAnimationFrame(render);
    };

    // OPTIMIZATION: Pause RAF render loop when Hero is out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          rafId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    rafId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-[100dvh] bg-navy-950 overflow-hidden will-change-transform">
        {/* Instant LCP Visual Anchor - Frame 0 rendered immediately by browser */}
        <img
          src="assets/sequenceLandscape/frame_001.jpg"
          alt="NeoLiv Grand Forest Privé"
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
            currentFrame > 0 ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* Contrast Scrim ONLY on Initial Hero (Slide 1), completely fades out from second slide onward */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${currentFrame <= 15 ? "opacity-100" : "opacity-0"}`}>
            {/* Base gradient ensuring top brand lockup, paragraph, and CTAs are crisp */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/50 to-navy-950/90" />
            {/* Central radial vignette ensuring central text zone readability against video brightness */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,15,35,0.7)_0%,rgba(5,15,35,0.3)_60%,transparent_90%)]" />
        </div>

        {/* Top Brand Lockup */}
        <div className="absolute top-5 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center px-4 w-full max-w-xl flex flex-col items-center">
            <img src="assets/logo.png" alt="NeoLiv" className="h-6 sm:h-7 md:h-8 w-auto mb-2 opacity-95 drop-shadow-md" />
            <h1 className="font-serif text-sm sm:text-base md:text-xl text-white tracking-[0.22em] uppercase font-bold drop-shadow-2xl">
                GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
            </h1>
        </div>

        {/* Initial Hero Welcome Panel */}
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-all duration-700 pointer-events-none ${currentFrame <= 15 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
            <div className="max-w-3xl space-y-3 sm:space-y-4 pt-10 sm:pt-14 md:pt-16">
                
                {/* Refined Eyebrow */}
                <div>
                    <span className="inline-block px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-semibold backdrop-blur-md">
                        PLOTTED LIVING • 360° MOUNTAIN VIEWS
                    </span>
                </div>

                {/* Exquisite Headline */}
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.12] uppercase tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                    Where Nature <br className="hidden sm:inline" />
                    <span className="text-gold-400 italic">Becomes a Privilege.</span>
                </h2>

                {/* Focused Subheading - Exact Client Copy */}
                <p className="text-gray-100 text-xs sm:text-sm md:text-base font-normal max-w-md md:max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    Premium plotted living surrounded by mountains, greenery and thoughtfully curated experiences. Discover a low-density lifestyle with 360° mountain views, wide roads, premium infrastructure and access to two exclusive clubs.
                </p>

                {/* Luxury Frosted Glass Metrics Capsule (Mobile Optimized) */}
                <div className="pt-2 pb-1 flex justify-center w-full px-2">
                    <div className="w-full sm:w-auto inline-flex items-center justify-center gap-4 sm:gap-10 px-4 sm:px-10 py-2.5 sm:py-3.5 rounded-2xl bg-navy-950/90 backdrop-blur-md border border-gold-400/35 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                        <div className="text-center flex-1 sm:flex-initial">
                            <div className="font-sans font-bold text-base sm:text-xl md:text-2xl text-white tracking-tight [font-variant-numeric:lining-nums] drop-shadow-sm">
                                1,500 <span className="text-[11px] sm:text-sm font-normal text-gold-300">sq. ft.*</span>
                            </div>
                            <p className="text-gold-400 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold mt-0.5">
                                Plots Starting From
                            </p>
                        </div>

                        <div className="w-px h-7 sm:h-10 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />

                        <div className="text-center flex-1 sm:flex-initial">
                            <div className="font-sans font-bold text-base sm:text-xl md:text-2xl text-white tracking-tight [font-variant-numeric:lining-nums] drop-shadow-sm">
                                ₹5,299 <span className="text-[11px] sm:text-sm font-normal text-gold-300">/ sq. ft.*</span>
                            </div>
                            <p className="text-gold-400 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold mt-0.5">
                                Special Privé Price
                            </p>
                        </div>
                    </div>
                </div>

                {/* Luxury CTA Buttons */}
                <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 pointer-events-auto w-full max-w-sm sm:max-w-md mx-auto pt-1">
                    <a
                        href="#Overview"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                        <span>Explore Grand Privé</span>
                        <ArrowRight size={13} className="hidden sm:inline" />
                    </a>
                    <button
                        onClick={() => modalState.open("NeoLiv Grand Forest Privé - Enquiry")}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-3 sm:px-8 sm:py-3.5 bg-navy-950/80 hover:bg-white/10 text-white border border-gold-400/40 hover:border-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-semibold rounded-full backdrop-blur-md shadow-xl hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                        Enquire Now
                    </button>
                </div>

                {/* Subtle Artistic Impression Indicator */}
                <div className="pt-3 pointer-events-none">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-navy-950/60 backdrop-blur-md border border-white/10 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold-300/80 font-mono">
                        Artistic Impression
                    </span>
                </div>
            </div>
        </div>

        {/* Narrative Scroll Chapters (Appears during sequence - NO blue box or dark overlay) */}
        <div className={`absolute bottom-28 sm:bottom-28 md:bottom-24 left-0 w-full z-20 pointer-events-none px-6 transition-opacity duration-1000 ${isLoaded && currentFrame > 15 ? "opacity-100" : "opacity-0"}`}>
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
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out transform"
                style={{ opacity, transform: `translateY(${translateY}px)` }}
              >
                <div className="space-y-1.5 text-center max-w-2xl mx-auto px-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                    <p className="text-gold-400 font-medium tracking-[0.35em] text-[9px] sm:text-[11px] uppercase opacity-95">
                        {chapter.subtitle}
                    </p>
                    <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-wider drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
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
