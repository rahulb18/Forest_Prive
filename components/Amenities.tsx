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
        title: "Jogging / Walking Track", 
        desc: "For refreshing mornings and leisurely evening walks.", 
        icon: Footprints 
    },
    { 
        title: "Forest Maze", 
        desc: "An immersive experience inspired by the natural surroundings.", 
        icon: Trees 
    },
    { 
        title: "Butterfly Garden", 
        desc: "A colourful space where landscape and nature come together.", 
        icon: Flower2 
    },
    { 
        title: "Herb & Fragrance Circle", 
        desc: "A sensory landscape designed around herbs and fragrances.", 
        icon: Sparkles 
    },
    { 
        title: "Multiplay Court", 
        desc: "A dedicated space for recreation and active living.", 
        icon: Trophy 
    },
    { 
        title: "Amphitheatre", 
        desc: "A community setting for gatherings and shared experiences.", 
        icon: Theater 
    },
    { 
        title: "Kid's Play Area", 
        desc: "A dedicated outdoor space for younger residents.", 
        icon: Baby 
    },
    { 
        title: "Pet Park", 
        desc: "A dedicated space for four-legged members of the family.", 
        icon: Dog 
    },
    { 
        title: "Bonfire Deck", 
        desc: "A relaxed outdoor setting for memorable evenings.", 
        icon: Flame 
    },
    { 
        title: "Reflexology Park", 
        desc: "A therapeutic stone pathway designed for natural healing and wellness.", 
        icon: HeartHandshake 
    },
    { 
        title: "Splash Pond", 
        desc: "A refreshing water feature designed for playful moments and gentle relaxation.", 
        icon: Droplets 
    },
    { 
        title: "Happy Street", 
        desc: "A vibrant pedestrian avenue designed for community celebrations and evening strolls.", 
        icon: Smile 
    },
];

export const Amenities: React.FC = () => {
    return (
        <section id="Amenities" className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
            {/* Ambient Lighting & Texture */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* 06. AMENITIES SECTION */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <RevealOnScroll variant="up">
                        <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Amenities
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight">
                            Designed Around the <br />
                            <span className="text-gold-400 italic">Way You Want to Live.</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
                        <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
                            From quiet walks surrounded by greenery to active afternoons, family evenings and spaces created simply to slow down, Grand Forest Privé offers thoughtfully curated experiences for different moments of your day.
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
                                            <span className="text-xs sm:text-xs md:text-sm font-mono text-gold-400 font-bold tracking-wider">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-xs sm:text-base md:text-lg text-white mb-1 group-hover:text-gold-300 transition-colors leading-snug">
                                            {amenity.title}
                                        </h3>
                                        {amenity.desc && (
                                            <p className="text-gray-300/80 text-[10px] sm:text-xs md:text-sm font-light leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
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
                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Amenities & Club")}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                        >
                            <span>Explore All Amenities</span>
                            <ArrowRight size={14} />
                        </button>
                    </RevealOnScroll>
                </div>

                {/* 07. CLUB EXPERIENCE SECTION */}
                <div className="pt-12 sm:pt-16 border-t border-white/10">
                    <RevealOnScroll variant="up">
                        <div className="bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900/90 border border-gold-400/30 rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                                    <span className="inline-block text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold">
                                        Club Experience
                                    </span>
                                    
                                    <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
                                        Two Clubs. <br />
                                        <span className="text-gold-400 italic">Countless Ways to Unwind.</span>
                                    </h3>
                                    
                                    <div className="w-16 h-px bg-gold-400/50" />
                                    
                                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-lg font-light leading-relaxed">
                                        <p>
                                             Grand Forest Privé extends the lifestyle beyond the outdoors with access to two exclusive clubs.
                                        </p>
                                        <p>
                                            Designed as social and recreational destinations within the integrated township, they add another layer of exclusivity to everyday living.
                                        </p>
                                    </div>

                                    <div className="pt-2 sm:pt-4">
                                        <button
                                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Club Experience")}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                                        >
                                            <span>Explore the Club Experience</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Club Visual Impression */}
                                <div className="lg:col-span-5">
                                    <div className="relative rounded-2xl overflow-hidden border border-gold-400/30 shadow-2xl group">
                                        <div className="aspect-[4/3] relative bg-navy-950">
                                            <img
                                                src="assets/grand_forest_optimized/amenities-club-deck.webp"
                                                alt="Grand Forest Privé Club Experience"
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                                            <div className="absolute top-3 right-3">
                                                <span className="px-3 py-1 rounded-full bg-navy-950/90 border border-white/10 text-[9px] uppercase tracking-widest text-gold-300 font-semibold shadow">
                                                    Artistic Impression
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                                                    <Building2 size={14} />
                                                    <span>Two Exclusive Clubs</span>
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
