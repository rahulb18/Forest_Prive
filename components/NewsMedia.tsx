import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const newsItems = [
    {
        date: "09-10-2025",
        source: "Business Standard",
        title: "Realty firm NeoLiv to develop ₹2,300 cr township project in Faridabad",
        url: "https://www.business-standard.com/companies/news/realty-firm-neoliv-to-develop-2-300-cr-township-project-in-faridabad-125100900432_1.html"
    },
    {
        date: "09-10-2025",
        source: "The Economic Times",
        title: "NeoLiv to develop Rs 2,300 cr township in Faridabad",
        url: "https://economictimes.indiatimes.com/industry/services/property-/-cstruction/neoliv-to-develop-rs2300-cr-township-infaridabad/articleshow/124407673.cms?from=mdr"
    },
    {
        date: "09-10-2025",
        source: "BW Business World",
        title: "NeoLiv Plans 62 Acre Faridabad Township, Rs 2,300 Cr Potential",
        url: "https://www.businessworld.in/article/neoliv-plans-62-acre-faridabad-township-rs-2-300-cr-potential-574820"
    },
    {
        date: "09-10-2025",
        source: "Hindustan Times",
        title: "NeoLiv to develop premium plotted township in Faridabad with projected sales of ₹2,300 crore",
        url: "https://www.hindustantimes.com/real-estate/neoliv-to-develop-premium-plotted-township-in-faridabad-with-projected-sales-of-rs-2-300-crore-101760019318814.html"
    },
    {
        date: "10-10-2025",
        source: "Torbit Realty",
        title: "NeoLiv expands NCR footprint with 62-acre mixed-use plotted development in Faridabad",
        url: "https://therealtytoday.com/news/commercial/neoliv-to-develop-2300-crore-township-in-faridabad-expands-ncr-presence/"
    },
    {
        date: "11-10-2025",
        source: "News18 Hindi",
        title: "फरीदाबाद के इन दो सैक्टरों में कटने वाले हैं शानदार प्लॉट, विला और फ्लोर बनाने का होगा मौका, शुरू होगा ये प्रोजेक्ट",
        url: "https://hindi.news18.com/news/business/property-these-two-sectors-of-faridabad-offering-plots-soon-with-opportunity-to-build-villa-flats-residential-and-commercial-project-near-delhi-noida-ws-kln-9717966.html"
    }
];

export const NewsMedia: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const ticking = useRef(false);
    const checkScroll = () => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                if (scrollRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    setCanScrollLeft(scrollLeft > 0);
                    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
                }
                ticking.current = false;
            });
            ticking.current = true;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 320 : 450;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="News" className="py-24 bg-navy-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <RevealOnScroll variant="left">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[1px] w-12 bg-gold-400" />
                                <span className="text-gold-400 uppercase tracking-[0.3em] text-xs font-bold">Press Coverage</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-6xl text-white">News & <span className="text-gold-400 italic">Media</span></h2>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll variant="right">
                        <div className="flex gap-4">
                            <button 
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-950' : 'border-white/10 text-white/20'}`}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-950' : 'border-white/10 text-white/20'}`}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </RevealOnScroll>
                </div>

                <div 
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
                >
                    {newsItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[300px] md:min-w-[400px] snap-start"
                        >
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block h-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-gold-400/40 transition-all duration-500 group"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                                        <Newspaper size={24} />
                                    </div>
                                    <span className="text-[10px] text-gray-500 tracking-[0.2em] font-medium border border-white/10 px-3 py-1 rounded-full">{item.date}</span>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-gold-400 text-xs uppercase tracking-[0.3em] font-bold group-hover:tracking-[0.4em] transition-all">{item.source}</h4>
                                    <h3 className="text-white font-serif text-xl md:text-2xl leading-tight group-hover:text-gold-400 transition-colors line-clamp-4 min-h-[5.5rem] md:min-h-[6.5rem]">
                                        {item.title}
                                    </h3>
                                    <div className="pt-6 flex items-center gap-2 text-white/40 group-hover:text-gold-400 transition-colors text-xs uppercase tracking-widest font-medium">
                                        <span>Read Article</span>
                                        <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
