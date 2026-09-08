import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Mountain, Trees, ShieldCheck, Milestone, Compass, Sparkles, Building2, ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
    {
        highlight: "360°",
        label: "Mountain Views",
        icon: Mountain,
    },
    {
        highlight: "Low-Density",
        label: "Living",
        icon: Sparkles,
    },
    {
        highlight: "2 Exclusive",
        label: "Clubs",
        icon: Building2,
    },
    {
        highlight: "Wide",
        label: "Roads",
        icon: Milestone,
    },
    {
        highlight: "Premium",
        label: "Integrated Township",
        icon: Compass,
    },
    {
        highlight: "Green",
        label: "Living",
        icon: Trees,
    },
    {
        highlight: "Grade-A Ready",
        label: "Infrastructure Ecosystem",
        icon: ShieldCheck,
    },
];

export const AboutNeoLiv: React.FC = () => {
    return (
        <section id="Overview" className="py-16 md:py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden flex items-center min-h-[calc(100vh-80px)] lg:min-h-screen">
            {/* Environmental Landscape Backdrop (Direct visual grounding in the mountain & nature landscape) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                <img 
                    src="assets/neoliv_optimized/Golf Mood View.webp" 
                    alt="" 
                    className="w-full h-full object-cover object-center opacity-20 scale-105 filter blur-[1px]" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/90 to-navy-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.95)_100%)]" />
                <div className="absolute inset-0 bg-grain opacity-[0.03]" />
            </div>

            {/* Subtle Luxury Atmospheric Glow */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-gold-400/8 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
                    
                    {/* Left Column: The Vision & Living Philosophy (The Story) */}
                    <div className="lg:col-span-7 xl:col-span-7 text-left">
                        <RevealOnScroll variant="up">
                            {/* Eyebrow */}
                            <span className="inline-block text-gold-400 text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.35em] font-semibold mb-4">
                                Welcome to Grand Forest Privé
                            </span>

                            {/* Main Headline */}
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white leading-[1.12] mb-6">
                                A Different Side of <br className="hidden sm:inline" />
                                <span className="text-gold-400 italic">Life Awaits.</span>
                            </h2>

                            {/* Lead Philosophy Quote Callout */}
                            <div className="border-l-2 border-gold-400/60 pl-5 mb-6">
                                <p className="font-serif text-lg sm:text-xl lg:text-2xl text-gray-100 font-light leading-relaxed italic drop-shadow-sm">
                                    “A home should give you more than an address. It should give you room to breathe, space to reconnect and a setting that makes every day feel a little more extraordinary.”
                                </p>
                            </div>

                            {/* Narrative Paragraphs */}
                            <div className="space-y-4 text-gray-300/90 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
                                <p>
                                    Grand Forest Privé brings together nature-led living, thoughtfully planned infrastructure and premium community experiences in an integrated township surrounded by a beautiful mountain landscape.
                                </p>
                                <p>
                                    With wide roads, green surroundings, a low-density environment and curated lifestyle spaces, it is designed for those who value space, privacy and a deeper connection with nature.
                                </p>
                            </div>

                            {/* CTA Button (Desktop View) */}
                            <div className="hidden lg:block">
                                <a
                                    href="#Lifestyle"
                                    className="inline-flex items-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                                >
                                    <span>Discover the Lifestyle</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Project Highlights (The Living Pillars / Evidence) */}
                    <div className="lg:col-span-5 xl:col-span-5">
                        <RevealOnScroll variant="up" delay={150}>
                            <div className="rounded-3xl bg-navy-900/80 border border-gold-400/25 backdrop-blur-xl p-5 sm:p-7 xl:p-8 shadow-2xl relative overflow-hidden">
                                {/* Subtle inner glow */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

                                {/* Highlights Header */}
                                <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                                    <p className="text-gold-400 font-semibold tracking-[0.3em] text-[9px] sm:text-xs uppercase mb-1">
                                        Project Highlights
                                    </p>
                                    <h3 className="font-serif text-lg sm:text-2xl text-white tracking-wide leading-tight">
                                        Everything You Value. <span className="text-gold-400 italic">Thoughtfully Brought Together.</span>
                                    </h3>
                                </div>

                                {/* 7 Pillars Matrix: 2-Column on Mobile & Desktop for Glanceable Dashboard View */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    {HIGHLIGHTS.slice(0, 6).map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div 
                                                key={idx}
                                                className="flex items-center gap-2.5 p-2.5 sm:p-3.5 rounded-xl bg-navy-950/80 border border-white/5 hover:border-gold-400/40 hover:bg-navy-950 transition-all duration-300 group"
                                            >
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300 shrink-0">
                                                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                </div>
                                                <div className="text-left min-w-0">
                                                    <div className="font-sans font-bold text-xs sm:text-sm md:text-base text-white tracking-tight [font-variant-numeric:lining-nums] leading-tight group-hover:text-gold-300 transition-colors truncate">
                                                        {item.highlight}
                                                    </div>
                                                    <div className="font-serif text-[10px] sm:text-xs text-gray-300/90 font-light leading-snug mt-0.5 truncate">
                                                        {item.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* 7th Pillar (Spans full width across 2 columns) */}
                                    {HIGHLIGHTS.slice(6, 7).map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div 
                                                key={idx}
                                                className="col-span-2 flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl bg-navy-950/80 border border-white/5 hover:border-gold-400/40 hover:bg-navy-950 transition-all duration-300 group"
                                            >
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300 shrink-0">
                                                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                </div>
                                                <div className="text-left min-w-0">
                                                    <div className="font-sans font-bold text-xs sm:text-sm md:text-base text-white tracking-tight [font-variant-numeric:lining-nums] leading-tight group-hover:text-gold-300 transition-colors">
                                                        {item.highlight}
                                                    </div>
                                                    <div className="font-serif text-[10px] sm:text-xs text-gray-300/90 font-light leading-snug mt-0.5">
                                                        {item.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* CTA Button (Mobile View - Direct Flow after Highlights) */}
                        <div className="mt-6 text-center lg:hidden">
                            <a
                                href="#Lifestyle"
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
                            >
                                <span>Discover the Lifestyle</span>
                                <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};


