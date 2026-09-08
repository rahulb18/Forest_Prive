import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, FileText, Send } from 'lucide-react';
import { EnquiryModal } from './EnquiryModal';

export const FloatingCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Enquire Now");

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Show sticky elements after user scrolls past 200px
                    setIsVisible(window.scrollY > 200);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openEnquiry = (title = "Enquire Now") => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* DESKTOP: Best-in-Class Vertically Sticky Edge CTAs (Lodha/DLF Style) */}
            <div className={`hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[200] flex-col gap-2 transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
            }`}>
                {/* 1. Vertically Sticky: Enquire Now */}
                <button
                    onClick={() => openEnquiry("Enquire Now")}
                    className="group relative flex flex-col items-center justify-center bg-gradient-to-b from-amber-400 via-gold-400 to-amber-500 text-navy-950 py-4 px-2 rounded-l-lg shadow-[-4px_0_25px_rgba(212,175,55,0.4)] hover:-translate-x-1.5 transition-all duration-300 cursor-pointer border-l-2 border-y border-amber-200/70"
                    title="Enquire Now"
                >
                    <Send size={13} className="text-navy-950 transform rotate-[-45deg] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase font-bold tracking-[0.25em] text-navy-950 select-none py-1">
                        Enquire Now
                    </span>
                </button>

                {/* 2. Vertically Sticky: Download Brochure */}
                <button
                    onClick={() => openEnquiry("Download Brochure")}
                    className="group relative flex flex-col items-center justify-center bg-navy-950/95 hover:bg-navy-900 text-gold-400 hover:text-white py-4 px-2 rounded-l-lg shadow-[-4px_0_25px_rgba(0,0,0,0.6)] hover:-translate-x-1.5 transition-all duration-300 cursor-pointer border-l-2 border-y border-gold-400/40 backdrop-blur-md"
                    title="Download Brochure"
                >
                    <FileText size={13} className="text-gold-400 group-hover:scale-110 transition-transform mb-2" />
                    <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase font-semibold tracking-[0.25em] text-gold-400 group-hover:text-white select-none py-1 transition-colors">
                        Brochure
                    </span>
                </button>
            </div>

            {/* MOBILE: App-Style Floating Bottom Dock */}
            <div className={`md:hidden fixed bottom-3 left-3 right-3 z-[250] bg-navy-950/92 backdrop-blur-xl border border-gold-400/30 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] p-1.5 flex items-center justify-between gap-1.5 transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
            }`}>
                {/* 1. Call Now */}
                <a
                    href="tel:+919820000000"
                    className="flex-1 py-2.5 px-2 flex items-center justify-center gap-1.5 rounded-xl text-gray-200 hover:text-gold-400 active:bg-white/10 transition-all font-medium text-[10px] uppercase tracking-wider"
                >
                    <Phone size={13} className="text-gold-400" />
                    <span>Call Now</span>
                </a>

                <div className="w-px h-6 bg-white/15" />

                {/* 2. WhatsApp */}
                <a
                    href="https://wa.me/919820000000?text=Hi%2C%20I%20am%20interested%20in%20Grand%20Forest%20Priv%C3%A9."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-2 flex items-center justify-center gap-1.5 rounded-xl text-gray-200 hover:text-emerald-400 active:bg-white/10 transition-all font-medium text-[10px] uppercase tracking-wider"
                >
                    <MessageCircle size={13} className="text-emerald-400" />
                    <span>WhatsApp</span>
                </a>

                <div className="w-px h-6 bg-white/15" />

                {/* 3. Enquire */}
                <button
                    onClick={() => openEnquiry("Enquire Now")}
                    className="flex-1 py-2.5 px-2 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 text-navy-950 font-bold shadow-md active:scale-95 transition-all text-[10px] uppercase tracking-wider cursor-pointer"
                >
                    <Send size={12} className="text-navy-950" />
                    <span>Enquire</span>
                </button>
            </div>

            {/* MODAL - Mounted independently */}
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            />
        </>
    );
};
