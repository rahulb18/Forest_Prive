import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { modalState } from '../lib/modal-state';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const overviewEl = document.getElementById('Overview');
            if (overviewEl) {
                const rect = overviewEl.getBoundingClientRect();
                setIsScrolled(rect.top <= 100);
            } else {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
                setIsScrolled(scrollY > window.innerHeight * 5);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ease-out ${
                    isScrolled
                        ? 'bg-navy-950/95 backdrop-blur-md border-b border-gold-400/20 py-3 translate-y-0 opacity-100'
                        : 'bg-transparent py-5 -translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center gap-6">
                    {/* Logo & Project Title */}
                    <a
                        href="#home"
                        onClick={scrollToTop}
                        className="flex items-center gap-3 md:gap-3.5 group shrink-0 cursor-pointer"
                    >
                        <img src="assets/logo.png" alt="NeoLiv" width={113} height={32} className="h-7 md:h-8 w-auto shrink-0 transition-transform group-hover:scale-105 duration-300" />
                        <div className="w-px h-5 md:h-6 bg-gold-400/30 shrink-0" />
                        <span className="font-serif text-xs md:text-sm tracking-[0.2em] text-white uppercase font-bold leading-none whitespace-nowrap shrink-0">
                            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[9px] uppercase tracking-[0.22em] text-gray-300 hover:text-gold-400 transition-all duration-300 font-medium hover:tracking-[0.28em]"
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
                        type="button"
                        className="xl:hidden text-gold-400 p-2 cursor-pointer touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-[200] bg-gradient-to-b from-[#070e1e] via-[#091224] to-[#050a16] transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
                } xl:hidden flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden`}
            >
                {/* Subtle Background Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Header with Logo & Refined Close Button */}
                <div className="relative z-10 flex justify-between items-center px-6 py-5 border-b border-white/10 shrink-0 bg-navy-950/40 backdrop-blur-md">
                    <div className="flex items-center gap-3 shrink-0">
                        <img src="assets/logo.png" alt="NeoLiv" width={98} height={28} className="h-6 sm:h-7 w-auto shrink-0" />
                        <div className="w-px h-4 sm:h-5 bg-gold-400/30 shrink-0" />
                        <span className="font-serif text-xs tracking-[0.18em] text-white uppercase font-bold whitespace-nowrap leading-none">
                            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                        </span>
                    </div>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 border border-gold-400/40 text-gold-400 transition-all cursor-pointer shadow-lg shadow-black/40"
                        aria-label="Close navigation menu"
                    >
                        <X size={20} className="stroke-[2.2]" />
                    </button>
                </div>

                {/* Central Navigation Links */}
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center gap-5 sm:gap-6 px-6 py-4 overflow-y-auto hide-scrollbar">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-serif text-lg sm:text-xl text-white hover:text-gold-400 active:text-gold-300 transition-colors uppercase tracking-[0.22em] font-medium active:scale-95 py-1 text-center drop-shadow-md"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Bottom Action Section */}
                <div className="relative z-10 px-6 pt-4 pb-7 border-t border-white/10 text-center shrink-0 bg-navy-950/80 backdrop-blur-md">
                    <p className="text-[10px] tracking-[0.25em] text-gold-400/90 font-mono uppercase mb-3">
                        GRAND FOREST <span className="text-white font-serif font-bold">PRIVÉ</span>
                    </p>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            modalState.open("NeoLiv Grand Forest Privé - Mobile Menu Enquiry");
                        }}
                        className="w-full bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-95 transition-all cursor-pointer"
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
        </>
    );
};
