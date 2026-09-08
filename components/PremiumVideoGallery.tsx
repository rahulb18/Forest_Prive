import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const videos = [
  { 
    id: 1, 
    src: "assets/videos_optimized/GettyImages-992886438.mp4",
    poster: "assets/videos_optimized/posters/GettyImages-992886438.webp"
  },
  { 
    id: 2, 
    src: "assets/videos_optimized/Golfers_with_subtle_202604271837.mp4",
    poster: "assets/videos_optimized/posters/Golfers_with_subtle_202604271837.webp"
  },
  { 
    id: 3, 
    src: "assets/videos_optimized/5773780_Coll_wavebreak_Golf_1280x720.mp4",
    poster: "assets/videos_optimized/posters/5773780_Coll_wavebreak_Golf_1280x720.webp"
  },
  { 
    id: 4, 
    src: "assets/videos_optimized/Video_Generation_Complete (1).mp4",
    poster: "assets/videos_optimized/posters/Video_Generation_Complete (1).webp"
  },
  { 
    id: 5, 
    src: "assets/videos_optimized/Video_Generation_Complete.mp4",
    poster: "assets/videos_optimized/posters/Video_Generation_Complete.webp"
  },
  { 
    id: 6, 
    src: "assets/videos_optimized/Video_Generation_Without_Layout.mp4",
    poster: "assets/videos_optimized/posters/Video_Generation_Without_Layout.webp"
  },
  { 
    id: 7, 
    src: "assets/videos_optimized/animate_202604271835.mp4",
    poster: "assets/videos_optimized/posters/animate_202604271835.webp"
  },
  { 
    id: 8, 
    src: "assets/videos_optimized/neolivVideo.mp4",
    poster: "assets/videos_optimized/posters/neolivVideo.webp"
  },
];

interface VideoSceneProps {
  video: typeof videos[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isGalleryInView: boolean;
}

const VideoScene: React.FC<VideoSceneProps> = ({ video, index, total, scrollYProgress, isGalleryInView }) => {
  const step = 1 / total;
  const sceneStart = index * step;
  const sceneEnd = (index + 1) * step;

  // Virtualization: active window is slightly broader than the scene so the video has time to start playing
  const [isActive, setIsActive] = useState(index === 0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const isSceneActive = index === 0
        ? latest <= (step + 0.08)
        : index === total - 1
          ? latest >= (sceneStart - 0.08)
          : latest >= (sceneStart - 0.08) && latest <= (sceneEnd + 0.08);
      setIsActive(isSceneActive);
    });
  }, [scrollYProgress, sceneStart, sceneEnd, step, index, total]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive && isGalleryInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isGalleryInView]);

  // Robust opacity calculation: Scene 0 is fully visible (1) from progress 0
  const opacityInput = index === 0
    ? [0, step, Math.min(1, step + 0.06)]
    : index === total - 1
      ? [Math.max(0, sceneStart - 0.06), sceneStart, 1]
      : [Math.max(0, sceneStart - 0.06), sceneStart, sceneEnd, Math.min(1, sceneEnd + 0.06)];

  const opacityOutput = index === 0
    ? [1, 1, 0]
    : index === total - 1
      ? [0, 1, 1]
      : [0, 1, 1, 0];

  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const scale = useTransform(scrollYProgress, [Math.max(0, sceneStart - 0.05), Math.min(1, sceneEnd + 0.05)], [1.05, 1.0]);
  const y = useTransform(scrollYProgress, [Math.max(0, sceneStart - 0.05), Math.min(1, sceneEnd + 0.05)], ["1%", "-1%"]);

  return (
    <motion.div
      style={{ 
        opacity,
        zIndex: total - index,
        willChange: "opacity"
      }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div style={{ scale, y }} className="w-full h-full relative">
        {/* Background Poster Image: ALWAYS visible so media is never blank/black */}
        <img
          src={video.poster}
          alt=""
          loading={index <= 1 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Active Video Decoder */}
        {isActive && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={video.poster}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            src={video.src}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export const PremiumVideoGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGalleryInView, setIsGalleryInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGalleryInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[800vh] md:h-[1500vh] bg-navy-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {videos.map((video, index) => (
          <VideoScene 
            key={video.id} 
            video={video} 
            index={index} 
            total={videos.length} 
            scrollYProgress={smoothProgress} 
            isGalleryInView={isGalleryInView}
          />
        ))}

        {/* Cinematic Navigation Dock - Mobile Optimized */}
        <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 md:gap-8 px-6 md:px-10 py-3 md:py-5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
           <div className="hidden md:flex gap-4">
                {videos.map((_, i) => {
                    const sceneStart = i / videos.length;
                    const sceneEnd = (i + 1) / videos.length;
                    const dotOpacity = useTransform(smoothProgress, [sceneStart - 0.05, sceneStart, sceneEnd, sceneEnd + 0.05], [0.2, 1, 1, 0.2]);
                    return <motion.div key={i} style={{ opacity: dotOpacity }} className="w-1.5 h-1.5 rounded-full bg-gold-400" />;
                })}
           </div>
           
           <div className="hidden md:block w-px h-6 bg-white/20" />
           
           <div className="flex items-baseline gap-2">
                <motion.span className="text-gold-400 font-serif text-xl md:text-2xl tabular-nums">
                    {useTransform(smoothProgress, (p) => Math.min(videos.length, Math.floor(p * videos.length) + 1))}
                </motion.span>
                <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">/ 0{videos.length}</span>
           </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      </div>
    </section>
  );
};
