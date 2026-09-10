import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollPresentation } from '../lib/scroll-presentation';

export interface CinematicScene {
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  type: "zoom" | "panoramic";
}

const SCENES: CinematicScene[] = [
  {
    src: "assets/client/Gallery-1.jpg",
    title: "Sunset Poolside Deck",
    subtitle: "Infinity waters meeting untouched mountain horizons",
    badge: "Neo Club • Pool Deck",
    type: "zoom"
  },
  {
    src: "assets/client/Gallery-2.jpg",
    title: "The Neo Club Sanctuary",
    subtitle: "Luminous glasshouse pavilion mirrored in tranquil waters",
    badge: "Clubhouse • Landscape",
    type: "panoramic"
  },
  {
    src: "assets/client/Gallery-3.jpg",
    title: "360° Forest Township View",
    subtitle: "Low-density plotted living cradled in nature's canopy",
    badge: "Plotted Living • Township",
    type: "zoom"
  },
  {
    src: "assets/client/Clubhouse-amenities.jpg",
    title: "Two-Story Glass Pavilion",
    subtitle: "A luminous architectural centerpiece for the community",
    badge: "Clubhouse • Architecture",
    type: "panoramic"
  },
  {
    src: "assets/client/amenities-2.jpg",
    title: "Panoramic Fitness Studio",
    subtitle: "State-of-the-art wellness overlooking flowering forest gardens",
    badge: "Wellness • Gymnasium",
    type: "zoom"
  },
  {
    src: "assets/client/amenities-3.jpg",
    title: "Multiplay Sports Arena",
    subtitle: "Active recreation nestled among walking trails and trees",
    badge: "Sports • Recreation",
    type: "panoramic"
  }
];

export const CinematicShowcase: React.FC = () => {
  const [activeScene, setActiveScene] = useState(() => scrollPresentation.getCinematicScene());

  // Synchronize reactively with unified presentation controller
  useEffect(() => {
    return scrollPresentation.subscribe((state) => {
      setActiveScene(state.cinematicScene);
    });
  }, []);

  // Jump smoothly to a specific scene (from vertical progress rail)
  const goToScene = (targetIndex: number) => {
    scrollPresentation.setCinematicScene(targetIndex);
  };

  const currentSceneData = SCENES[activeScene];

  return (
    <section className="relative w-full h-full bg-navy-950 select-none overflow-hidden">
        {/* BACKGROUND SCENES: High-Performance Luxury Crossfade & WebKit GPU Compositing */}
        {SCENES.map((scene, index) => {
          const isActive = index === activeScene;
          return (
            <div
              key={scene.src}
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
                src={scene.src}
                alt={scene.title}
                decoding="async"
                loading={index <= 1 ? "eager" : "lazy"}
                className={`w-full h-full object-cover transition-transform duration-[2400ms] ease-out will-change-transform ${
                  isActive
                    ? "scale-100"
                    : scene.type === "zoom"
                    ? "scale-106"
                    : "scale-104"
                }`}
                style={{
                  WebkitTransform: isActive
                    ? 'scale(1) translate3d(0,0,0)'
                    : scene.type === 'zoom'
                    ? 'scale(1.06) translate3d(0,0,0)'
                    : 'scale(1.04) translate3d(0,0,0)',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/75" />
            </div>
          );
        })}

        {/* Ambient Left Lens Vignette for side navigation legibility */}
        <div className="absolute inset-y-0 left-0 w-40 sm:w-60 md:w-72 bg-gradient-to-r from-black/75 via-black/30 to-transparent pointer-events-none z-20" />

        {/* Artistic Impression Overlay Label */}
        <div className="absolute top-6 right-6 z-30 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-gold-400/30 text-[9px] uppercase tracking-[0.2em] text-amber-300 font-semibold shadow-lg">
            Artistic Impression
          </span>
        </div>

        {/* SIDE PROGRESS NAVIGATION: Minimalist Luxury Rail */}
        <div className="absolute left-4 sm:left-7 md:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 select-none">
          {SCENES.map((_, i) => {
            const isActive = i === activeScene;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goToScene(i)}
                aria-label={`View scene 0${i + 1}`}
                className="group relative flex flex-col items-center gap-1 sm:gap-1.5 focus:outline-none cursor-pointer touch-manipulation py-0.5"
              >
                {/* Number Indicator */}
                <span
                  className={`font-serif font-bold text-[11px] sm:text-xs md:text-sm tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-amber-300 scale-110 [text-shadow:_0_0_12px_rgba(246,213,126,0.8)]"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  0{i + 1}
                </span>

                {/* Progress Track Line */}
                <div className="w-[2px] sm:w-[2.5px] h-6 sm:h-8 md:h-10 bg-white/30 rounded-full relative overflow-hidden group-hover:bg-white/50 transition-colors duration-300">
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-amber-300 via-gold-400 to-amber-500 rounded-full transition-transform duration-500 origin-top ${
                      isActive ? "scale-y-100 shadow-[0_0_10px_rgba(212,175,55,1)]" : "scale-y-0"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* BOTTOM SCENE EDITORIAL CAPTION CARD */}
        <div className="absolute bottom-8 sm:bottom-12 left-16 sm:left-24 md:left-32 right-6 max-w-2xl z-30 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSceneData.src}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-gold-400/40 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
                  {currentSceneData.badge}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {currentSceneData.title}
              </h3>
              <p className="text-gray-200/90 text-xs sm:text-sm font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {currentSceneData.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ambient Subtle Film Grain & Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-grain" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]" />
        </div>
    </section>
  );
};
