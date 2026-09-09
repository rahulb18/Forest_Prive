import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { modalState } from '../lib/modal-state';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const h = window.innerHeight;
                    const threshold = window.innerWidth < 768 ? h * 5.8 : h * 11.8;
                    setIsScrolled(window.scrollY > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Overview', href: '#Overview' },
        { name: 'Lifestyle', href: '#Lifestyle' },
        { name: 'Amenities', href: '#Amenities' },
        { name: 'Location', href: '#Location' },
        { name: 'Gallery', href: '#Gallery' },
        { name: 'About NeoLiv', href: '#AboutUs' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${isScrolled
                    ? 'bg-navy-950/95 backdrop-blur-md border-b border-gold-400/20 py-3 translate-y-0'
                    : 'bg-transparent py-6 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center gap-6">
                    {/* Logo & Project Title */}
                    <a href="#" className="flex items-center gap-3 md:gap-3.5 group shrink-0">
                        <img src="assets/logo.png" alt="NeoLiv" className="h-7 md:h-8 w-auto shrink-0 transition-transform group-hover:scale-105 duration-300" />
                        <div className="w-px h-5 md:h-6 bg-gold-400/30 shrink-0" />
                        <span className="font-serif text-xs md:text-sm tracking-[0.2em] text-white uppercase font-bold leading-none whitespace-nowrap shrink-0">
                            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[9px] uppercase tracking-[0.25em] text-gray-300 hover:text-gold-400 transition-all duration-300 font-medium hover:tracking-[0.3em]"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => modalState.open("NeoLiv Grand Forest Privé - Enquiry")}
                            className="bg-gold-400 text-navy-950 px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold hover:scale-105 hover:brightness-110 hover:shadow-2xl hover:shadow-gold-400/40 transition-all duration-500 shadow-xl shadow-gold-400/20 border border-gold-400/20 cursor-pointer"
                        >
                            Enquire Now
                        </button>
                    </div>

                    {/* Mobile & Tablet Toggle */}
                    <button
                        className="xl:hidden text-gold-400 p-2 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[200] bg-navy-950 overflow-y-auto transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} xl:hidden`}>
                <div className="flex flex-col min-h-screen p-6 md:p-8">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3 shrink-0">
                            <img src="assets/logo.png" alt="NeoLiv" className="h-7 w-auto shrink-0" />
                            <div className="w-px h-5 bg-gold-400/30 shrink-0" />
                            <span className="font-serif text-xs tracking-[0.18em] text-white uppercase font-bold whitespace-nowrap leading-none">
                                GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                            </span>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gold-400 p-3 bg-white/5 rounded-full border border-white/10 cursor-pointer">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 text-center mb-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-serif text-white hover:text-gold-400 transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10 text-center pb-8">
                        <p className="text-white font-serif text-base mb-6 tracking-[0.22em] uppercase font-bold">
                            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                        </p>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                modalState.open("NeoLiv Grand Forest Privé - Enquiry");
                            }}
                            className="w-full bg-gold-400 text-navy-900 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-gold-400/20 active:scale-95 transition-all cursor-pointer"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
