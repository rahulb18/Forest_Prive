import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Camera, Calendar, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { modalState } from '../lib/modal-state';

interface GalleryItem {
    src: string;
    title: string;
    category: 'all' | 'club' | 'entrance' | 'sports' | 'nature' | 'masterplan';
    badge: 'ARTISTIC IMPRESSION';
}

const GALLERY_CATEGORIES = [
    { id: 'all', label: 'All Impressions' },
    { id: 'club', label: 'Club & Wellness' },
    { id: 'entrance', label: 'Grand Arrival' },
    { id: 'sports', label: 'Sports & Culture' },
    { id: 'nature', label: 'Nature & Trails' },
    { id: 'masterplan', label: 'Masterplan & Layout' },
] as const;

const GALLERY_ITEMS: GalleryItem[] = [
    // Club & Wellness
    {
        src: 'assets/client/clubhouse-1600x1200.jpg',
        title: 'The Neo Club Concourse & Glass Facade',
        category: 'club',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/pool-1600x1200.jpg',
        title: 'Sunset Infinity Pool & Sahyadri Horizon Deck',
        category: 'club',
        badge: 'ARTISTIC IMPRESSION',
    },
    // Grand Arrival
    {
        src: 'assets/client/Gallery-1.jpg',
        title: 'Grand Entrance Portal & Security Pavilion (Twilight)',
        category: 'entrance',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/Gallery-5.jpg',
        title: 'Grand Entrance Portal Architectural Detail (Daylight)',
        category: 'entrance',
        badge: 'ARTISTIC IMPRESSION',
    },
    // Sports & Culture
    {
        src: 'assets/client/Gallery-4.jpg',
        title: 'Multiplay Sports Arena (Basketball & Pickleball Courts)',
        category: 'sports',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/Gallery-6.jpg',
        title: 'Stepped Amphitheatre & Open-Air Cultural Lawn',
        category: 'sports',
        badge: 'ARTISTIC IMPRESSION',
    },
    // Masterplan & Layout
    {
        src: 'assets/client/1920x1080.jpg',
        title: 'Cinematic Mountain Forest Township Panorama',
        category: 'masterplan',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/1920x1080-2.jpg',
        title: 'Forest Enclave Master Entry & Plotted Living Perspective',
        category: 'masterplan',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/1600x1200.jpg',
        title: 'Aerial Villa Plots Layout Demarcation View',
        category: 'masterplan',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/Masterplan.jpg',
        title: 'Official Architectural Master Development Plan',
        category: 'masterplan',
        badge: 'ARTISTIC IMPRESSION',
    },
    // Nature & Trails
    {
        src: 'assets/client/1920x1080-3.jpg',
        title: 'Sunlit Forest Canopy Trail & Timber Split-Rail Fencing',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/1920x1080-4.jpg',
        title: 'Botanical Garden Walkway & Amber Blossom Meadow',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/1920x1080-5.jpg',
        title: 'Cobblestone Rainforest Walk & Exotic Native Flora',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/1920x1080-6.jpg',
        title: 'Sensory Garden, Contoured Lawns & Children Play Park',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/Gallery-2.jpg',
        title: 'Joyful Family Running Through Wildflower Forest Meadow',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
    {
        src: 'assets/client/Gallery-3.jpg',
        title: 'Multi-Generational Living & Manicured Estate Lawns',
        category: 'nature',
        badge: 'ARTISTIC IMPRESSION',
    },
];

export const Gallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [visibleCards, setVisibleCards] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems = activeCategory === 'all'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === activeCategory);

    // Responsive visible cards determination
    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const maxIndex = Math.max(0, filteredItems.length - visibleCards);

    // Guard currentIndex within valid bounds on screen resize or category filter change
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    // Reset currentIndex when category changes
    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setCurrentIndex(0);
    };

    // Navigation handlers
    const handlePrev = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex >= 0) return; // let lightbox handle its own keys
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [maxIndex, lightboxIndex]);

    // Touch swipe drag handling
    const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
        const swipeThreshold = 50;
        if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
            handleNext();
        } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
            handlePrev();
        }
    };

    // Auto-advance every 5.5 seconds when not paused
    useEffect(() => {
        if (isPaused || lightboxIndex >= 0) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, 5500);
        return () => clearInterval(interval);
    }, [maxIndex, isPaused, lightboxIndex]);

    return (
        <section id="Gallery" className="pt-16 pb-24 md:py-24 bg-navy-950 text-white relative border-t border-white/5 overflow-hidden scroll-mt-20 md:scroll-mt-24">
            {/* Ambient Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* SECTION HEADER: Editorial & Refined */}
                <RevealOnScroll variant="up">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
                        <div className="max-w-2xl">
                            <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                                Architectural Vision & Impressions
                            </span>
                            
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                                More Than <span className="text-gold-400 italic">a Vision.</span>
                            </h2>
                            
                            <div className="w-20 h-px bg-gradient-to-r from-gold-400 to-transparent mb-4" />
                            
                            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                                Experience Grand Forest Privé taking shape through envisioned architectural expressions of an extraordinary lifestyle across 16 official client renders.
                            </p>
                        </div>

                        {/* Slider Controls Header */}
                        <div className="flex items-center gap-4 self-start md:self-end shrink-0">
                            {/* Counter */}
                            <div className="flex items-baseline gap-1.5 font-mono text-sm sm:text-base">
                                <span className="text-gold-400 font-bold text-lg sm:text-xl [font-variant-numeric:lining-nums]">
                                    {(currentIndex + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="text-gray-500 text-xs">/</span>
                                <span className="text-gray-400 text-xs font-medium">
                                    {filteredItems.length.toString().padStart(2, '0')}
                                </span>
                            </div>

                            {/* Arrow Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrev}
                                    aria-label="Previous Slide"
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-400/30 bg-navy-900/90 text-gold-300 hover:text-navy-950 hover:bg-gold-400 hover:border-gold-400 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    aria-label="Next Slide"
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-400/30 bg-navy-900/90 text-gold-300 hover:text-navy-950 hover:bg-gold-400 hover:border-gold-400 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CATEGORY FILTER TABS */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none no-scrollbar">
                        {GALLERY_CATEGORIES.map(cat => {
                            const isSelected = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                                        isSelected
                                            ? 'bg-gold-400 text-navy-950 shadow-[0_2px_12px_rgba(212,175,55,0.4)]'
                                            : 'bg-navy-900/80 border border-white/10 text-gray-300 hover:text-white hover:border-gold-400/40'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </RevealOnScroll>

                {/* MODERN SLIDER CAROUSEL TRACK */}
                <div 
                    ref={containerRef}
                    className="relative overflow-hidden mb-8 sm:mb-10 select-none"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing touch-pan-y"
                        style={{ touchAction: 'pan-y' }}
                    >
                        <motion.div
                            animate={{
                                x: `-${currentIndex * (100 / visibleCards)}%`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 30,
                                mass: 0.8
                            }}
                            className="flex -mx-2 sm:-mx-3"
                        >
                            {filteredItems.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        style={{ width: `${100 / visibleCards}%` }}
                                        className="flex-shrink-0 px-2 sm:px-3"
                                    >
                                        <div
                                            onClick={() => setLightboxIndex(idx)}
                                            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/60 bg-navy-900 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end h-full"
                                        >
                                            {/* Image container */}
                                            <div className="aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-navy-950 relative">
                                                <img
                                                    src={encodeURI(item.src)}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />

                                                {/* Gradient Overlays */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                                                <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/5 transition-colors duration-500 pointer-events-none" />

                                                {/* Quick View Floating Cue */}
                                                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 group-hover:bg-gold-400 group-hover:text-navy-950 group-hover:scale-110 transition-all shadow-lg">
                                                    <Eye size={13} />
                                                </div>

                                                {/* Bottom Title Bar */}
                                                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 pr-28 sm:pr-36 z-10">
                                                    <h3 className="font-serif text-sm sm:text-base lg:text-lg text-white group-hover:text-gold-300 transition-colors leading-snug">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-xs text-gold-400/70 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Click to view fullscreen
                                                    </p>
                                                </div>

                                                {/* Mandatory Compliance Text - Minimalist Bottom Right Watermark */}
                                                <div className="absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-10 pointer-events-none select-none">
                                                    <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] uppercase font-semibold text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                                                        {item.badge}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>

                {/* PAGINATION DOTS / SLIDE INDICATORS */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-10 sm:mb-14">
                    {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
                        const isActive = currentIndex === dotIdx;
                        return (
                            <button
                                key={dotIdx}
                                onClick={() => setCurrentIndex(dotIdx)}
                                aria-label={`Go to slide ${dotIdx + 1}`}
                                className="p-2 flex items-center justify-center cursor-pointer"
                            >
                                <span className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 block ${
                                    isActive
                                        ? 'w-7 sm:w-8 bg-gold-400 shadow-md shadow-gold-400/30'
                                        : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                                }`} />
                            </button>
                        );
                    })}
                </div>

                {/* SECTION ACTION CTAs */}
                <div className="text-center flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                    <RevealOnScroll variant="up">
                        <button
                            onClick={() => setLightboxIndex(currentIndex)}
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                        >
                            <Camera size={14} />
                            <span>View Gallery</span>
                        </button>
                    </RevealOnScroll>

                    <RevealOnScroll variant="up" delay={100}>
                        <button
                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Schedule a Visit")}
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-navy-900 hover:bg-navy-800 text-white border border-gold-400/40 hover:border-gold-400 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-xl transition-all active:scale-95 cursor-pointer"
                        >
                            <Calendar size={14} />
                            <span>Schedule a Visit</span>
                        </button>
                    </RevealOnScroll>
                </div>

                {/* Fullscreen Lightbox */}
                <Lightbox
                    open={lightboxIndex >= 0}
                    close={() => setLightboxIndex(-1)}
                    index={lightboxIndex}
                    slides={filteredItems.map(item => ({ src: encodeURI(item.src), title: item.title }))}
                />
            </div>
        </section>
    );
};
