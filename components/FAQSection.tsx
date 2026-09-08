import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "What is Grand Forest Privé?",
        answer: "Grand Forest Privé is positioned as a premium integrated township offering green, low-density living with mountain views, planned infrastructure, lifestyle amenities and access to two exclusive clubs."
    },
    {
        question: "What inventory is available?",
        answer: "The opportunity document states that inventory is available from 1,500 sq. ft. onwards*."
    },
    {
        question: "How far is Grand Forest Privé from Navi Mumbai International Airport?",
        answer: "The project document states approximately 45 minutes from Navi Mumbai International Airport (NMIA)."
    },
    {
        question: "How far is the Mumbai–Pune Expressway?",
        answer: "The document states approximately 7 minutes from the Mumbai–Pune Expressway."
    },
    {
        question: "What amenities are offered?",
        answer: "The project highlights a jogging/walking track, forest maze, multiplay court, bonfire deck, pet park, reflexology park, butterfly garden, amphitheatre, kids' play area, splash pond, Happy Street and Herb & Fragrance Circle."
    },
    {
        question: "Does the development have a clubhouse?",
        answer: "The opportunity document states that residents will have access to two exclusive clubs."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section id="FAQ" className="py-16 md:py-28 bg-navy-900 text-white relative overflow-hidden border-t border-white/5">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl relative z-10">
                <RevealOnScroll variant="up">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="inline-block text-gold-400 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold mb-3">
                            Frequently Asked Questions
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 leading-tight">
                            Frequently Asked <span className="text-gold-400 italic">Questions.</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
                    </div>
                </RevealOnScroll>

                {/* Accordion List */}
                <div className="space-y-3 sm:space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <RevealOnScroll key={idx} delay={idx * 30} variant="up">
                                <div
                                    className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                                        isOpen
                                            ? 'bg-navy-950 border-gold-400/40 shadow-xl'
                                            : 'bg-navy-950/60 border-white/10 hover:border-gold-400/20'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleItem(idx)}
                                        className="w-full py-4 sm:py-5 px-4 sm:px-6 md:px-8 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer min-h-[52px]"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <span className="font-mono text-[11px] sm:text-xs text-gold-400 font-bold shrink-0">
                                                0{idx + 1}
                                            </span>
                                            <h3 className="font-serif text-sm sm:text-base md:text-lg text-white font-medium tracking-wide leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                            isOpen ? 'bg-gold-400 text-navy-950' : 'bg-white/5 text-gray-400'
                                        }`}>
                                            {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 pt-2 border-t border-white/5 text-gray-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
