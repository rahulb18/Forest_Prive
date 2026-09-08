import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ShieldCheck, Award, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';

const CREDENTIAL_PILLARS = [
    {
        title: "₹870 Cr*",
        label: "Fund Raise",
        icon: TrendingUp
    },
    {
        title: "150+ Years*",
        label: "Experience of Equity Partners",
        icon: Award
    },
    {
        title: "SEBI Approved",
        label: "CAT II AIF",
        icon: ShieldCheck
    },
    {
        title: "360 ONE",
        label: "Strategic Equity Partner",
        icon: Briefcase
    }
];

export const AboutUs: React.FC = () => {
    return (
        <section id="AboutUs" className="py-16 md:py-28 bg-navy-950 text-white relative overflow-hidden">
            {/* Ambient Lighting & Texture */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gold-400/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* 11. ABOUT NEOLIV HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <RevealOnScroll variant="up">
                        <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            About NeoLiv
                        </span>
                        
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white leading-tight">
                            Building Joy. <br />
                            <span className="text-gold-400 italic">Backed by Experience.</span>
                        </h2>
                        
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8" />
                        
                        <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                            <p>
                                NeoLiv was founded by Mohit Malhotra, former MD & CEO of Godrej Properties, leading industry experts and 360 ONE, described in the supplied document as India's leading wealth and alternatives-focused asset management firm with USD 74 billion AUM.
                            </p>
                            <p className="text-white/90 font-normal">
                                NeoLiv brings together fund management and an in-house development arm within one integrated platform.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* 4 Pillars Grid - Mobile 2x2 Scorecard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-10 sm:mb-14">
                    {CREDENTIAL_PILLARS.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <RevealOnScroll key={idx} delay={idx * 40} variant="up">
                                <div className="h-full bg-navy-900/80 border border-gold-400/20 hover:border-gold-400/50 p-4 sm:p-7 rounded-xl sm:rounded-2xl text-center shadow-xl group transition-all duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mx-auto mb-3 sm:mb-5 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300">
                                            <Icon size={18} />
                                        </div>
                                        <h3 className="font-sans text-lg sm:text-2xl lg:text-3xl text-white font-bold mb-1 sm:mb-2 group-hover:text-gold-300 transition-colors [font-variant-numeric:lining-nums]">
                                            {pillar.title}
                                        </h3>
                                        <p className="font-serif text-[11px] sm:text-xs lg:text-sm text-gray-300 font-light leading-snug">
                                            {pillar.label}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* CTA: Discover NeoLiv */}
                <div className="text-center">
                    <RevealOnScroll variant="up">
                        <a
                            href="#Contact"
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 sm:px-9 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                        >
                            <span>Discover NeoLiv</span>
                            <ArrowRight size={14} />
                        </a>
                    </RevealOnScroll>
                </div>

            </div>
        </section>
    );
};
