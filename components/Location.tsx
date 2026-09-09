import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Plane, Navigation, Milestone, Building, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

const CONNECTIVITY_POINTS = [
    {
        badge: "Approx. 45 mins*",
        title: "Navi Mumbai International Airport (NMIA)",
        icon: Plane,
        isPrimary: true
    },
    {
        badge: "Approx. 7 mins*",
        title: "Mumbai–Pune Expressway",
        icon: Navigation,
        isPrimary: true
    },
    {
        badge: "Infrastructure",
        title: "Wide roads and planned infrastructure",
        icon: Milestone,
        isPrimary: false
    },
    {
        badge: "Zoning",
        title: "Residential zone",
        icon: Building,
        isPrimary: false
    },
    {
        badge: "Ecosystem",
        title: "Grade-A ready infrastructure ecosystem",
        icon: ShieldCheck,
        isPrimary: false
    }
];

export const Location: React.FC = () => {
    const [isMapActive, setIsMapActive] = useState(false);

    return (
        <section id="Location" className="py-16 md:py-28 bg-navy-900 text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
                {/* Header */}
                <RevealOnScroll variant="up">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <span className="inline-block text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Location & Connectivity
                        </span>
                        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight">
                            Connected to <span className="text-gold-400 italic">What's Next.</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4 sm:mb-6" />
                        <p className="text-gray-300 text-sm sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                            Grand Forest Privé offers the rare combination of a tranquil setting and connectivity to two important infrastructure anchors in the region.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* 2-Column: Connectivity Anchors & Interactive Map (Balanced Baseline & Equal Height) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
                    
                    {/* Left Column: 5 Approved Connectivity Anchors */}
                    <div className="lg:col-span-5 h-full">
                        <RevealOnScroll variant="left" className="h-full flex flex-col justify-between">
                            <div className="space-y-2.5 sm:space-y-3">
                                {CONNECTIVITY_POINTS.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-navy-950/80 p-3.5 sm:p-5 rounded-2xl border border-white/5 hover:border-gold-400/40 transition-all duration-300 group shadow-xl flex items-center gap-3.5"
                                        >
                                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gold-400/10 border border-gold-400/20 flex-shrink-0 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300">
                                                <Icon size={18} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={`inline-block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1 ${
                                                    item.isPrimary 
                                                        ? 'bg-gold-400/15 border-gold-400/35 text-gold-300 font-bold' 
                                                        : 'bg-white/5 border-white/10 text-gray-400'
                                                }`}>
                                                    {item.badge}
                                                </span>
                                                <h3 className="font-serif text-xs sm:text-base text-white group-hover:text-gold-300 transition-colors leading-snug truncate">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Exact CTA: View Location */}
                            <div className="pt-4 sm:pt-6">
                                <a
                                    href="https://maps.google.com/?q=Mumbai+Pune+Expressway"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                                >
                                    <MapPin size={14} />
                                    <span>View Location</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Large Interactive Location Map with Dynamic Height Match */}
                    <div className="lg:col-span-7 h-full">
                        <RevealOnScroll variant="right" className="h-full">
                            <div className="rounded-3xl overflow-hidden border border-gold-400/30 shadow-2xl bg-navy-950 relative h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[540px]">
                                <iframe
                                    title="Grand Forest Privé Location Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.16347318534!2d73.10986756858277!3d18.99770020163304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8412674e14f%3A0x8e57929d29f8a329!2sMumbai%20-%20Pune%20Hwy!5e0!3m2!1sen!2sin!4v1714240000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(115%)' }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={isMapActive ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"}
                                />

                                {/* Mobile Map Scroll-Trap Shield Overlay */}
                                {!isMapActive && (
                                    <div 
                                        onClick={() => setIsMapActive(true)}
                                        className="md:hidden absolute inset-0 bg-navy-950/20 backdrop-blur-[1px] flex items-center justify-center cursor-pointer z-20"
                                    >
                                        <span className="px-4 py-2 rounded-full bg-navy-950/95 border border-gold-400 text-gold-400 text-xs font-semibold shadow-2xl flex items-center gap-2">
                                            <MapPin size={12} />
                                            Tap to Interact with Map
                                        </span>
                                    </div>
                                )}

                                {/* Interactive Overlay Badge */}
                                <div className="absolute top-4 left-4 bg-navy-950/90 backdrop-blur-md border border-gold-400/30 px-3.5 py-2 rounded-xl shadow-xl pointer-events-none z-10">
                                    <div className="flex items-center gap-2 text-gold-400 text-[11px] sm:text-xs font-serif font-bold">
                                        <MapPin size={12} />
                                        <span>Grand Forest Privé Strategic Corridor</span>
                                    </div>
                                    <p className="text-gray-400 text-[9px] sm:text-[10px] font-mono mt-0.5">
                                        Approx. 7 mins* to Mumbai–Pune Expressway
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    );
};
