import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const videos = [
    {
        url: "assets/video/neolivVideo.mp4",
        title: "The Vision of Luxury",
        desc: "Experience the grand design and meticulous craftsmanship of NeoLiv Grand Forest Privé."
    },
    {
        url: "assets/video/Video_Generation_Without_Layout.mp4",
        title: "Life on the Greens",
        desc: "A glimpse into the serene and vibrant lifestyle that awaits you."
    }
];

export const VideoShowcase: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextVideo = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <section id="Videos" className="py-24 bg-navy-950 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <RevealOnScroll variant="up">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-400 font-medium tracking-[0.3em] text-xs uppercase mb-4">Cinematic Experience</h3>
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">A Masterpiece <span className="text-gold-400 italic">In Motion</span></h2>
                        <div className="w-24 h-px bg-gold-400/30 mx-auto" />
                    </div>
                </RevealOnScroll>

                <div className="relative group">
                    {/* Slider Container */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/5 shadow-2xl bg-black">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <video
                                    src={videos[currentIndex].url}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster="assets/grand_forest_optimized/overview-masterplan-backdrop.webp"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                
                                {/* Video Info Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h4 className="text-white font-serif text-2xl md:text-4xl mb-2">{videos[currentIndex].title}</h4>
                                        <p className="text-gray-300 text-sm md:text-base max-w-xl font-light">{videos[currentIndex].desc}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 md:px-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button 
                                onClick={prevVideo}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold-400 hover:text-navy-950 hover:border-gold-400 transition-all active:scale-90"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button 
                                onClick={nextVideo}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold-400 hover:text-navy-950 hover:border-gold-400 transition-all active:scale-90"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </div>

                        {/* Progress Dots */}
                        <div className="absolute top-8 right-8 flex gap-2">
                            {videos.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
