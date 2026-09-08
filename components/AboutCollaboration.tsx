import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';

export const AboutCollaboration: React.FC = () => {
    return (
        <section id="AboutCollaboration" className="py-24 bg-navy-950 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <RevealOnScroll variant="up">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-gold-400" />
                            <span className="text-gold-400 uppercase tracking-[0.3em] text-xs font-bold">About Us</span>
                            <div className="h-[1px] w-12 bg-gold-400" />
                        </div>
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                            NeoLiv x <span className="text-gold-400 italic">Amolik Builders</span>
                        </h2>
                        <p className="text-gray-300 text-base md:text-xl font-light leading-relaxed">
                            A powerful collaboration bringing together vision-led land development and proven execution excellence to create thoughtfully designed, high-value real estate developments. Built on trust, planning, and delivery discipline, this partnership is focused on shaping communities with long-term value.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Split Content Section */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* About NeoLiv */}
                    <RevealOnScroll variant="left">
                        <div className="h-full p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-gold-400/30 transition-all duration-500 group">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="font-serif text-3xl text-white group-hover:text-gold-400 transition-colors duration-500">About NeoLiv</h3>
                                <div className="w-10 h-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </div>
                            </div>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base mb-6">
                                NeoLiv is a new-age real estate development vision focused on curated land-led opportunities and premium plotted communities.
                            </p>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                With a strong emphasis on strategic planning, transparency, and long-term value creation, NeoLiv transforms land into meaningful, future-ready investment assets.
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* About Amolik Builders */}
                    <RevealOnScroll variant="right">
                        <div className="h-full p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-gold-400/30 transition-all duration-500 group">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="font-serif text-3xl text-white group-hover:text-gold-400 transition-colors duration-500">About Amolik Builders</h3>
                                <div className="w-10 h-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </div>
                            </div>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base mb-6">
                                Amolik Builders is a trusted real estate developer known for quality construction, timely delivery, and customer-first development practices.
                            </p>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                Backed by a strong and strategically curated land bank, Amolik is well-positioned to develop thoughtfully planned communities in high-growth corridors. This foundation enables the brand to consistently identify the right locations and transform them into long-term value-driven developments.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
