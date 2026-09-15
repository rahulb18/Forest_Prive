import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ShieldCheck, Award, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import { modalState } from '../lib/modal-state';

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
                
                {/* SECTION 13: THE NEOLIV PROMISE */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <RevealOnScroll variant="up">
                        {/* Official Client Developer Logo Badge */}
                        <div className="inline-block bg-white/95 backdrop-blur-md px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl border border-white/20 shadow-2xl mb-6">
                            <img
                                src="assets/client/Neoliv-logo.png"
                                alt="NeoLiv - India's Foremost Fund-Led Developer"
                                width={180}
                                height={57}
                                className="h-7 sm:h-8 w-auto object-contain"
                            />
                        </div>
                        
                        <div>
                            <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                                The NeoLiv Promise
                            </span>
                        </div>
                        
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white leading-tight">
                            Building Places — <br />
                            <span className="text-gold-400 italic">Building Joy.</span>
                        </h2>
                        
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8" />
                        
                        <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                            <p>
                                Grand Forest Privé comes from NeoLiv — India's foremost fund-led developer.
                            </p>
                            <p>
                                Built on professional governance, institutional backing and a vision to create communities people genuinely value, NeoLiv brings a contemporary approach to real estate development.
                            </p>
                            <p className="text-white/90 font-normal">
                                Thoughtfully conceived. Professionally delivered. Designed around life.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* 4 Pillars Grid - Mobile 2x2 Scorecard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-14 sm:mb-20">
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

                {/* SECTION 14: PARTNERS */}
                <div className="pt-12 sm:pt-16 border-t border-white/10">
                    <RevealOnScroll variant="up">
                        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                            <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                                Created with Expertise
                            </span>
                            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
                                Vision Brought to Life <br />
                                <span className="text-gold-400 italic">By the Finest Minds.</span>
                            </h3>
                            <div className="w-16 h-px bg-gold-400/50 mx-auto mb-4" />
                            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                                Exceptional places are shaped by exceptional collaborations. Grand Forest Privé brings together specialist partners and consultants to translate its vision of nature-led living into a thoughtfully planned destination.
                            </p>
                        </div>

                        {/* Partner Showcase Display: 360 ONE, Newarch, Hafeez Contractor */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
                            {/* Partner 1: 360 ONE */}
                            <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-400/30 text-center shadow-xl hover:border-gold-400/60 transition-all">
                                <div className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">Equity Partner</div>
                                <h4 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wider mb-2">360 ONE</h4>
                                <p className="text-gray-300 text-xs font-light leading-relaxed">
                                    India's leading wealth and alternatives-focused asset management firm with institutional governance.
                                </p>
                            </div>

                            {/* Partner 2: Hafeez Contractor */}
                            <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-400/30 text-center shadow-xl hover:border-gold-400/60 transition-all">
                                <div className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">Master Architecture</div>
                                <h4 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wider mb-2">Hafeez Contractor</h4>
                                <p className="text-gray-300 text-xs font-light leading-relaxed">
                                    Legendary architectural visionary shaping monumental spaces, clubhouse pavilions and master plans.
                                </p>
                            </div>

                            {/* Partner 3: Newarch */}
                            <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-400/30 text-center shadow-xl hover:border-gold-400/60 transition-all">
                                <div className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">Landscape Architecture</div>
                                <h4 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wider mb-2">Newarch Landscapes</h4>
                                <p className="text-gray-300 text-xs font-light leading-relaxed">
                                    Specialist landscape designers behind the 2.5 acres urban forest canopy, garden trails and nature immersion.
                                </p>
                            </div>
                        </div>

                        {/* CTA: Request a Private Preview */}
                        <div className="text-center">
                            <button
                                onClick={() => modalState.open("NeoLiv Grand Forest Privé - Request a Private Preview")}
                                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 sm:px-9 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                            >
                                <span>Request a Private Preview</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </RevealOnScroll>
                </div>

            </div>
        </section>
    );
};
