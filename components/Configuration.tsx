import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Lock } from 'lucide-react';
import { modalState } from '../lib/modal-state';

const plots = [
    { size: '1,500 SQ.FT', title: 'Plot Size 1', img: 'assets/floorplans/floorplan_1.png' },
    { size: '1,800 SQ.FT', title: 'Plot Size 2', img: 'assets/floorplans/floorplan_2.png' },
    { size: '2,000 SQ.FT', title: 'Plot Size 3', img: 'assets/floorplans/floorplan_3.png' },
    { size: '2,200 SQ.FT', title: 'Plot Size 4', img: 'assets/floorplans/floorplan_4.png' },
];

export const Configuration: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleEnquire = (size: string) => {
        modalState.open(`NeoLiv Grand Forest Privé - Plan Details: ${size}`);
    };

    return (
        <section id="Configuration" className="py-20 bg-navy-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <RevealOnScroll variant="up">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl mb-4">Project Configurations</h2>
                        <div className="w-24 h-px bg-gold-400 mx-auto"></div>
                    </div>
                </RevealOnScroll>

                <div className="relative group/slider">
                    <div
                        className="flex lg:grid lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto lg:overflow-visible hide-scrollbar snap-x snap-mandatory pb-8 md:pb-0 touch-pan-x scroll-smooth"
                        onScroll={(e) => {
                            const container = e.currentTarget;
                            const index = Math.round(container.scrollLeft / (container.offsetWidth * 0.85));
                            setActiveIndex(index);
                        }}
                    >
                        {plots.map((plot, idx) => (
                            <div key={idx} className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-center first:pl-2">
                                <RevealOnScroll delay={idx * 100} variant="up">
                                    <div
                                        className="group relative bg-navy-900 border border-white/10 overflow-hidden rounded-lg transition-all hover:border-gold-400/50 duration-500 cursor-pointer"
                                        onClick={() => handleEnquire(plot.size)}
                                    >
                                        <div className="aspect-square flex items-center justify-center bg-navy-950 relative overflow-hidden">
                                            {/* Blurred Floorplan Background */}
                                            <img
                                                src={plot.img}
                                                alt={`Floorplan ${plot.size}`}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-[1.5s] group-hover:scale-110"
                                            />
                                            {/* Subtle Gradient Overlay for contrast with text */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-navy-950/40" />

                                            <div className="flex flex-col items-center gap-4 transition-transform group-hover:scale-110 duration-500 relative z-10">
                                                <div className="w-20 h-20 rounded-full border border-gold-400/40 flex items-center justify-center bg-navy-950/80 backdrop-blur-md shadow-2xl">
                                                    <Lock className="text-gold-400" size={32} strokeWidth={1.5} />
                                                </div>
                                                <span className="text-[10px] tracking-[0.3em] uppercase text-white font-medium drop-shadow-lg">Plan Locked</span>
                                            </div>
                                        </div>
                                        <div className="p-6 text-center relative z-10 transition-colors group-hover:bg-gold-400 group-hover:text-navy-900">
                                            <span className="text-xs uppercase tracking-widest opacity-60 block mb-1">Plot Option</span>
                                            <h3 className="font-serif text-xl md:text-2xl">{plot.size}</h3>
                                            <button className="mt-4 px-6 py-2 border border-current text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors">Request Plan</button>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicators */}
                    <div className="flex lg:hidden justify-center items-center gap-3 mt-4">
                        {plots.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-300 rounded-full ${activeIndex === i ? 'w-8 bg-gold-400' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>

                    {/* Visual Cues - Subtle Arrows for Mobile */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none lg:hidden">
                        <div className={`w-8 h-8 rounded-full bg-navy-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-opacity ${activeIndex === 0 ? 'opacity-0' : 'opacity-100'}`}>
                            <span className="text-gold-400/50 text-xl">‹</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-navy-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-opacity ${activeIndex === plots.length - 1 ? 'opacity-0' : 'opacity-100'}`}>
                            <span className="text-gold-400/50 text-xl">›</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
