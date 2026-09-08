import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Camera, Calendar, Eye, ArrowRight, MapPin } from 'lucide-react';

type TabType = 'All' | 'Site Photographs' | 'Artistic Impressions' | 'Infrastructure' | 'Lifestyle' | 'Amenities' | 'Club';

interface GalleryItem {
    src: string;
    title: string;
    badge: 'ACTUAL SITE PHOTOGRAPH' | 'ACTUAL ROAD AT SITE' | 'ARTISTIC IMPRESSION';
    categories: TabType[];
}

const GALLERY_ITEMS: GalleryItem[] = [
    {
        src: 'assets/projects/neoliv/constru/1.webp',
        title: 'Wide Internal Boulevard Development',
        badge: 'ACTUAL ROAD AT SITE',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/projects/neoliv/constru/2.webp',
        title: 'Township Master Grading & Leveling',
        badge: 'ACTUAL SITE PHOTOGRAPH',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/projects/neoliv/constru/3.webp',
        title: 'Mountain Backdrop & Plot Demarcation',
        badge: 'ACTUAL SITE PHOTOGRAPH',
        categories: ['All', 'Site Photographs', 'Lifestyle']
    },
    {
        src: 'assets/projects/neoliv/constru/4.webp',
        title: 'Grade-A Stormwater & Boundary Setup',
        badge: 'ACTUAL SITE PHOTOGRAPH',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/projects/neoliv/constru/5.webp',
        title: 'Phase-1 Plotted Sector Mobilization',
        badge: 'ACTUAL SITE PHOTOGRAPH',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/projects/neoliv/constru/6.webp',
        title: 'Central Avenue Paving in Progress',
        badge: 'ACTUAL ROAD AT SITE',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/neoliv_optimized/Golf Aerial.webp',
        title: 'Integrated Township Mountain Vista',
        badge: 'ARTISTIC IMPRESSION',
        categories: ['All', 'Artistic Impressions', 'Lifestyle']
    },
    {
        src: 'assets/neoliv_optimized/Golf Mood View.webp',
        title: 'Curated Greenery & Walking Trail Concept',
        badge: 'ARTISTIC IMPRESSION',
        categories: ['All', 'Artistic Impressions', 'Amenities']
    },
    {
        src: 'assets/neoliv_optimized/Golf Side villa.webp',
        title: 'Grand Forest Clubhouse Architecture',
        badge: 'ARTISTIC IMPRESSION',
        categories: ['All', 'Artistic Impressions', 'Club']
    },
    {
        src: 'assets/neoliv_optimized/Road To Golf View.webp',
        title: 'Grand Entrance & Tree-Lined Boulevard',
        badge: 'ARTISTIC IMPRESSION',
        categories: ['All', 'Artistic Impressions', 'Infrastructure']
    },
    {
        src: 'assets/projects/neoliv/constru/7.webp',
        title: 'Substation & Ground Utility Lines',
        badge: 'ACTUAL SITE PHOTOGRAPH',
        categories: ['All', 'Site Photographs', 'Infrastructure']
    },
    {
        src: 'assets/neoliv_optimized/Golf Bird Eye.webp',
        title: 'Nature-Led Community Masterplan',
        badge: 'ARTISTIC IMPRESSION',
        categories: ['All', 'Artistic Impressions', 'Amenities', 'Club']
    }
];

const TABS: TabType[] = [
    'All',
    'Site Photographs',
    'Lifestyle',
    'Amenities',
    'Club',
    'Artistic Impressions',
    'Infrastructure'
];

export const Gallery: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<TabType>('All');
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [showAllMobile, setShowAllMobile] = useState(false);

    const filteredItems = selectedTab === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.categories.includes(selectedTab));

    // On mobile, show first 6 items unless expanded
    const displayedItems = showAllMobile ? filteredItems : filteredItems.slice(0, 6);

    return (
        <section id="Gallery" className="py-16 md:py-28 bg-navy-950 text-white relative border-t border-white/5 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* 08 & 12. SECTION HEADERS: Actual Site & Development & Gallery */}
                <RevealOnScroll variant="up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Actual Site & Development
                        </span>
                        
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white leading-tight">
                            More Than <span className="text-gold-400 italic">a Vision.</span>
                        </h2>
                        
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
                        
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-6">
                            See Grand Forest Privé taking shape through actual site photographs and actual road-at-site imagery, alongside artistic impressions that present the project's envisioned lifestyle.
                        </p>

                        <div className="pt-2">
                            <h3 className="font-serif text-lg sm:text-2xl text-gold-300 mb-1.5 sm:mb-2">
                                See Life Differently.
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                                Explore the landscapes, lifestyle spaces, club experience and actual development at Grand Forest Privé.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Filter Tabs - Horizontal Scroll on Mobile */}
                <RevealOnScroll variant="up">
                    <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setSelectedTab(tab);
                                    setShowAllMobile(false);
                                }}
                                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${
                                    selectedTab === tab
                                        ? 'bg-gold-400 text-navy-950 shadow-lg shadow-gold-400/20 font-bold'
                                        : 'bg-navy-900/80 text-gray-400 hover:text-white border border-white/5 hover:border-gold-400/30'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Gallery Grid - Mobile 2-Column Responsive View */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-8 sm:mb-14">
                    {displayedItems.map((item, idx) => {
                        let badgeStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                        if (item.badge === "ACTUAL ROAD AT SITE") {
                            badgeStyle = "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
                        } else if (item.badge === "ARTISTIC IMPRESSION") {
                            badgeStyle = "bg-amber-500/20 text-amber-300 border-amber-500/30";
                        }

                        return (
                            <RevealOnScroll key={idx} delay={(idx % 6) * 30} variant="up">
                                <div
                                    onClick={() => setLightboxIndex(idx)}
                                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/50 bg-navy-900 shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col justify-end"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-navy-950">
                                        <img
                                            src={encodeURI(item.src)}
                                            alt={item.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                                    {/* Mandatory Compliance Badge */}
                                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                                        <span className={`inline-block px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7.5px] sm:text-[9px] font-mono tracking-wider uppercase font-bold border backdrop-blur-md shadow-md ${badgeStyle}`}>
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* Title & Expand Cue */}
                                    <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-5 z-10 flex items-end justify-between gap-2">
                                        <div>
                                            <h4 className="font-serif text-[11px] sm:text-base lg:text-lg text-white group-hover:text-gold-300 transition-colors leading-tight">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-navy-950/80 border border-white/20 flex items-center justify-center text-white/70 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all shrink-0">
                                            <Eye size={12} />
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Mobile-Only Show More / Show Less Toggle if more than 6 items */}
                {filteredItems.length > 6 && (
                    <div className="text-center mb-8 sm:hidden">
                        <button
                            onClick={() => setShowAllMobile(!showAllMobile)}
                            className="px-6 py-2.5 rounded-full border border-gold-400/40 text-gold-400 bg-navy-900 text-xs font-mono tracking-wider uppercase hover:bg-gold-400 hover:text-navy-950 transition-all cursor-pointer"
                        >
                            {showAllMobile ? "Show Less" : `View All ${filteredItems.length} Photos`}
                        </button>
                    </div>
                )}

                {/* Section 08 Exact CTAs: View Site Gallery | Schedule a Visit */}
                <div className="text-center flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                    <RevealOnScroll variant="up">
                        <button
                            onClick={() => setLightboxIndex(0)}
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                        >
                            <Camera size={14} />
                            <span>View Site Gallery</span>
                        </button>
                    </RevealOnScroll>

                    <RevealOnScroll variant="up" delay={100}>
                        <a
                            href="#Contact"
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-navy-900 hover:bg-navy-800 text-white border border-gold-400/40 hover:border-gold-400 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-xl transition-all active:scale-95 cursor-pointer"
                        >
                            <Calendar size={14} />
                            <span>Schedule a Visit</span>
                        </a>
                    </RevealOnScroll>
                </div>

                {/* Lightbox Component */}
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
