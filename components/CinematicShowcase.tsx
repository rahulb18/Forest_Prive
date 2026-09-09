import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from 'framer-motion';

const SCENES = [
  {
    src: "assets/grand_forest_optimized/cinematic-club-facade.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-pool-clubhouse.webp",
    type: "zoom"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-pergola-jogging.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-reception.webp",
    type: "zoom"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-gymnasium.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-event-lawns.webp",
    type: "zoom"
  }
];

interface SceneProps {
  scene: typeof SCENES[0];
  index: number;
  totalScenes: number;
  scrollYProgress: MotionValue<number>;
}

const Scene: React.FC<SceneProps> = ({ scene, index, totalScenes, scrollYProgress }) => {
  const start = index / totalScenes;
  const end = (index + 1) / totalScenes;

  // --- Background Motion Logic ---
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.08, start, end, end + 0.08],
    [0, 1, 1, 0]
  );

  const visibility = useTransform(
    scrollYProgress,
    (latest: number) => (latest >= start - 0.1 && latest <= end + 0.1 ? 'visible' : 'hidden')
  );

  const filter = useTransform(
    scrollYProgress,
    (latest: number) => {
      if (latest < start - 0.1 || latest > end + 0.1) return 'none';
      if (latest >= start && latest <= end) return 'none';
      if (latest < start) {
        const b = Math.round(20 * (1 - (latest - (start - 0.1)) / 0.1));
        return b > 0 ? `blur(${b}px)` : 'none';
      }
      const b = Math.round(20 * ((latest - end) / 0.1));
      return b > 0 ? `blur(${b}px)` : 'none';
    }
  );

  // Panoramic Panning Effect - Subtle for Mobile
  const panX = useTransform(
    scrollYProgress,
    [start, end],
    scene.type === "panoramic" ? ["-5%", "5%"] : ["0%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    scene.type === "zoom" ? [1.1, 1.0] : [1.05, 1.1]
  );

  return (
    <motion.div
      style={{ 
        opacity,
        visibility,
        zIndex: index + 10,
        filter,
        willChange: "opacity, transform"
      }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div
        style={{ 
            scale,
            x: panX,
            willChange: "transform"
        }}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        <img
          src={scene.src}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-transparent to-navy-950/50" />
      </motion.div>
    </motion.div>
  );
};

export const CinematicShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] md:h-[1200vh] bg-navy-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {SCENES.map((scene, index) => (
          <Scene 
            key={scene.src} 
            scene={scene} 
            index={index} 
            totalScenes={SCENES.length} 
            scrollYProgress={smoothProgress} 
          />
        ))}

        {/* Artistic Impression Overlay Label */}
        <div className="absolute top-6 right-6 z-[100] pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] text-gold-300 font-semibold shadow-lg">
            Artistic Impression
          </span>
        </div>

        {/* SIDE PROGRESS NAVIGATION - Responsive */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6 md:gap-10">
          {SCENES.map((_, i) => {
            const start = i / SCENES.length;
            const end = (i + 1) / SCENES.length;
            const isActive = useTransform(smoothProgress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0]);

            return (
              <div key={i} className="group relative flex items-center">
                <motion.div 
                    style={{ scaleX: isActive, opacity: isActive }}
                    className="absolute left-full ml-3 md:ml-4 text-gold-400 font-serif text-lg md:text-2xl font-bold"
                >
                    0{i + 1}
                </motion.div>
                
                <div className="w-[1.5px] md:w-[2px] h-8 md:h-12 bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div 
                        style={{ 
                            scaleY: useTransform(smoothProgress, [start, end], [0, 1]),
                            opacity: isActive
                        }}
                        className="absolute inset-0 bg-gold-400 origin-top"
                    />
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-grain" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        </div>
      </div>
    </section>
  );
};
