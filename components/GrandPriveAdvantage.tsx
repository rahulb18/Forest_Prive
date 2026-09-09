import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { 
    Tag, Clock, CalendarCheck, Percent, 
    TrendingUp, Award, ArrowRight, FileCheck 
} from 'lucide-react';
import { modalState } from '../lib/modal-state';

const COMMERCIAL_METRICS = [
    {
        value: "₹5,299/sq. ft.*",
        label: "Privé Price",
        highlight: true,
        icon: Tag
    },
    {
        value: "₹5,999/sq. ft.*",
        label: "Launch Price",
        highlight: false,
        icon: TrendingUp
    },
    {
        value: "1,500 sq. ft. onwards*",
        label: "Available Inventory",
        highlight: false,
        icon: Award
    },
    {
        value: "18 Months*",
        label: "Privé Payment Plan",
        highlight: false,
        icon: Clock
    },
    {
        value: "30%*",
        label: "Pay just 30% in 2026",
        highlight: true,
        icon: CalendarCheck
    },
    {
        value: "Zero*",
        label: "Transfer Charges",
        highlight: true,
        icon: Percent
    }
];

export const GrandPriveAdvantage: React.FC = () => {
    return (
        <section id="Pricing" className="py-16 md:py-28 bg-navy-900 text-white relative overflow-hidden">
            {/* Background Texture & Soft Accents */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-7xl">
                
                {/* 09. GRAND PRIVÉ ADVANTAGE */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <RevealOnScroll variant="up">
                        <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Grand Privé Advantage
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight">
                            A Privileged <span className="text-gold-400 italic">Opportunity</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
                        <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
                            A special proposition created around attractive pricing and a flexible payment structure.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* 6 Commercial Metrics Cards - Mobile-First 2-Column Scorecard */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 mb-8 sm:mb-12">
                    {COMMERCIAL_METRICS.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <RevealOnScroll key={idx} delay={idx * 30} variant="up">
                                <div className={`h-full p-4 sm:p-7 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group ${
                                    item.highlight 
                                        ? 'bg-navy-950/90 border-gold-400/40 hover:border-gold-400' 
                                        : 'bg-navy-950/60 border-white/10 hover:border-gold-400/30'
                                }`}>
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300">
                                            <Icon size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-sans text-lg sm:text-2xl lg:text-3xl text-white font-bold tracking-tight mb-1 [font-variant-numeric:lining-nums]">
                                            {item.value}
                                        </div>
                                        <p className="font-serif text-xs sm:text-sm lg:text-base text-gray-300 font-light leading-tight">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* CTA: Get Privé Price Details */}
                <div className="text-center mb-16 sm:mb-24">
                    <RevealOnScroll variant="up">
                        <button
                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Privé Price Details")}
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 sm:px-9 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                        >
                            <span>Get Privé Price Details</span>
                            <ArrowRight size={14} />
                        </button>
                    </RevealOnScroll>
                </div>

                {/* 10. INVESTMENT OPPORTUNITY */}
                <div className="pt-12 sm:pt-16 border-t border-white/10">
                    <RevealOnScroll variant="up">
                        <div className="bg-navy-950 border border-gold-400/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                                <div className="lg:col-span-8 space-y-5 sm:space-y-6">
                                    <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold">
                                        Investment Opportunity
                                    </span>
                                    
                                    <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
                                        Lifestyle Today. <br />
                                        <span className="text-gold-400 italic">Potential for Tomorrow.</span>
                                    </h3>
                                    
                                    <div className="w-16 h-px bg-gold-400/50" />
                                    
                                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                                        <p>
                                            Grand Forest Privé combines a premium integrated township proposition with proximity to major infrastructure such as the Mumbai–Pune Expressway and Navi Mumbai International Airport.
                                        </p>
                                        <p>
                                            The supplied opportunity document also cites a projected 4X ROI as per a Colliers report and an investor-friendly exit structure on 30% payment.
                                        </p>
                                    </div>

                                    {/* Compliance Note */}
                                    <div className="p-3.5 sm:p-4 rounded-xl bg-navy-900/80 border border-white/5 text-[11px] sm:text-xs text-gray-400 leading-relaxed font-light">
                                        <div className="flex items-center gap-2 text-gold-400 font-semibold uppercase tracking-wider mb-1 text-[10px]">
                                            <FileCheck size={14} />
                                            <span>Statutory Disclosure</span>
                                        </div>
                                        <p>
                                            *The 4X ROI projection is based on a report by Colliers and is subject to market conditions, statutory approvals, and agreement terms. It should not be construed as a financial guarantee.
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Investment Opportunity")}
                                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                                        >
                                            <span>Request Investment Details</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* ROI Highlight Capsule */}
                                <div className="lg:col-span-4">
                                    <div className="bg-navy-900/90 border border-gold-400/30 rounded-2xl p-7 text-center space-y-4 shadow-2xl">
                                        <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mx-auto">
                                            <TrendingUp size={28} />
                                        </div>
                                        <div>
                                            <p className="text-gold-400 text-[10px] uppercase tracking-[0.25em] font-mono mb-1">
                                                Colliers Report
                                            </p>
                                            <div className="font-sans text-4xl sm:text-5xl text-white font-bold tracking-tight [font-variant-numeric:lining-nums]">
                                                4X <span className="text-gold-400 text-xl font-light">ROI*</span>
                                            </div>
                                            <p className="text-gray-400 text-xs font-light mt-2">
                                                Investor-friendly exit structure on 30% payment.
                                            </p>
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
