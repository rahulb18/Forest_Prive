import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { 
    Footprints, Trees, Flower2, Sparkles, Trophy, 
    Theater, Baby, Dog, Flame, HeartHandshake, 
    Droplets, Smile, Building2, ArrowRight 
} from 'lucide-react';
import { modalState } from '../lib/modal-state';

const AMENITIES_LIST = [
    { 
        title: "Forest Trails", 
        desc: "Lose yourself. Find your pace.", 
        icon: Trees 
    },
    { 
        title: "Swimming Pool", 
        desc: "For afternoons that refuse to be rushed.", 
        icon: Droplets 
    },
    { 
        title: "Gymnasium", 
        desc: "Well-being, surrounded by green.", 
        icon: Trophy 
    },
    { 
        title: "Yoga Deck", 
        desc: "Begin the day in balance.", 
        icon: Sparkles 
    },
    { 
        title: "Badminton Court", 
        desc: "For a little friendly competition.", 
        icon: Trophy 
    },
    { 
        title: "Multi-purpose Court", 
        desc: "Space to move. Space to play.", 
        icon: Trophy 
    },
    { 
        title: "Pet Park", 
        desc: "Because they deserve their own Prive life.", 
        icon: Dog 
    },
    { 
        title: "Kids Play Areas", 
        desc: "Little adventures, naturally.", 
        icon: Baby 
    },
    { 
        title: "Bonfire Deck", 
        desc: "Some evenings deserve to last longer.", 
        icon: Flame 
    },
    { 
        title: "Walking and Jogging Tracks", 
        desc: "Your everyday route through nature.", 
        icon: Footprints 
    },
    { 
        title: "Meditation Spaces", 
        desc: "Find stillness away from everything else.", 
        icon: HeartHandshake 
    },
    { 
        title: "Open Greens", 
        desc: "Room to gather. Room to breathe.", 
        icon: Flower2 
    },
];

export const Amenities: React.FC = () => {
    return (
        <section id="Amenities" className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
            {/* Ambient Lighting & Texture */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* SECTION 8: AMENITIES */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <RevealOnScroll variant="up">
                        <span className="eyebrow-label inline-block text-gold-400 font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Experiences Curated for Life
                        </span>
                        <h2 className="section-heading font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-medium leading-tight">
                            Every Mood <br />
                            <span className="text-gold-400 italic">Has Its Own Place.</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
                        <p className="body-large font-sans text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
                            Some days call for movement. Others for stillness. At Grand Forest Privé, thoughtfully curated spaces allow you to choose your own rhythm — from fitness and sport to quiet contemplation, nature walks and moments spent together.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* 12 Amenities Grid: 2-Column on Mobile, 4-Column on Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 mb-10 sm:mb-14">
                    {AMENITIES_LIST.map((amenity, idx) => {
                        const Icon = amenity.icon;
                        return (
                            <RevealOnScroll key={idx} delay={idx * 20} variant="up" className="h-full">
                                <div className="h-full bg-navy-900/80 border border-gold-400/20 p-3 sm:p-6 rounded-2xl group hover:border-gold-400/50 hover:bg-navy-900 transition-all duration-300 shadow-xl flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                                            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300 shrink-0">
                                                <Icon size={16} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <span className="numeric text-xs sm:text-xs md:text-sm font-sans text-gold-400 font-semibold tracking-wider">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h3 className="font-sans font-medium text-xs sm:text-base md:text-lg text-white mb-1 group-hover:text-gold-300 transition-colors leading-snug">
                                            {amenity.title}
                                        </h3>
                                        {amenity.desc && (
                                            <p className="body-small font-sans text-gray-300/80 text-[10px] sm:text-xs md:text-sm font-light leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                                                {amenity.desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
                {/* Amenities CTA */}
                <div className="text-center mb-16 sm:mb-24">
                    <RevealOnScroll variant="up">
                        <button
                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Request a Private Preview")}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                        >
                            <span>Request a Private Preview</span>
                            <ArrowRight size={14} />
                        </button>
                    </RevealOnScroll>
                </div>

                {/* SECTION 6: CLUBHOUSE & SECTION 7: SWIMMING POOL */}
                <div className="pt-12 sm:pt-16 border-t border-white/10">
                    <RevealOnScroll variant="up">
                        <div className="bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900/90 border border-gold-400/30 rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                                    <span className="eyebrow-label inline-block text-gold-400 font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold">
                                        The Privé Club
                                    </span>
                                    
                                    <h3 className="section-heading font-serif text-2xl sm:text-4xl md:text-5xl text-white font-medium leading-tight">
                                        Your Private Escape — <br />
                                        <span className="text-gold-400 italic">Just a Few Steps From Home.</span>
                                    </h3>
                                    
                                    <div className="w-16 h-px bg-gold-400/50" />
                                    
                                    <div className="body-large font-sans space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-lg font-light leading-relaxed">
                                        <p>
                                            At the heart of Grand Forest Privé is a clubhouse designed as an extension of the Privé lifestyle.
                                        </p>
                                        <p>
                                            Begin your morning with movement. Spend slow afternoons by the pool. Meet friends over conversations and coffee. Let evenings stretch naturally into leisure. Everything here is designed to make an ordinary day feel distinctly unordinary.
                                        </p>
                                    </div>

                                    <div className="pt-2 sm:pt-4">
                                        <button
                                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Request a Private Preview")}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                                        >
                                            <span>Request a Private Preview</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Club Visual Impression with Dual Club Switcher */}
                                <div className="lg:col-span-5">
                                    <div className="space-y-3">
                                        <div className="relative rounded-2xl overflow-hidden border border-gold-400/30 shadow-2xl group bg-navy-950">
                                            <div className="aspect-[4/3] relative">
                                                <img
                                                    src="assets/client/clubhouse-1600x1200.jpg"
                                                    alt="Grand Forest Privé The Privé Club Glass Concourse"
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                                                <div className="absolute top-3 right-3">
                                                    <span className="px-3 py-1 rounded-full bg-navy-950/90 border border-white/10 text-[9px] uppercase tracking-widest text-gold-300 font-semibold shadow">
                                                        Artistic Impression
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                                                        <Building2 size={14} />
                                                        <span>The Privé Club • Extension of Privé Living</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Second Club Impression: Section 7 Swimming Pool */}
                                        <div className="relative rounded-2xl overflow-hidden border border-gold-400/20 shadow-xl group bg-navy-950">
                                            <div className="aspect-[21/9] relative">
                                                <img
                                                    src="assets/client/pool-1600x1200.jpg"
                                                    alt="Grand Forest Privé Swimming Pool & Open Skies"
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                                                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                                                        <Building2 size={14} />
                                                        <span>Swimming Pool • Every Day a Holiday</span>
                                                    </div>
                                                    <span className="text-[9px] uppercase tracking-widest text-gray-300/80">
                                                        Unwind Beside Water
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

            </div>
        </section>
    );
};
