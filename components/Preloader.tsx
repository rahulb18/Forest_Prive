import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
    progress?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, progress: externalProgress }) => {
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (externalProgress !== undefined) {
            setProgress(prev => Math.max(prev, externalProgress));
            if (externalProgress >= 100) {
                setTimeout(() => {
                    setIsFinished(true);
                    setTimeout(onComplete, 1000);
                }, 500);
            }
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsFinished(true);
                        setTimeout(onComplete, 1000);
                    }, 500);
                    return 100;
                }
                // Random increments for a more natural feel
                const increment = Math.floor(Math.random() * 15) + 5;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete, externalProgress]);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[1000] bg-navy-950 flex flex-col items-center justify-center overflow-hidden will-change-transform"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

                    {/* Logo & Branding */}
                    <div className="relative mb-10 sm:mb-12 text-center px-4">
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <img 
                                src="assets/logo.png" 
                                alt="NeoLiv Logo" 
                                className="h-9 sm:h-12 w-auto mb-5 mx-auto brightness-110" 
                            />
                            <div className="w-12 h-px bg-gold-400/50 mb-3" />
                            <h2 className="font-serif text-lg sm:text-2xl tracking-[0.22em] text-white uppercase font-bold leading-none whitespace-nowrap">
                                GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                            </h2>
                            <p className="text-[9px] sm:text-[10.5px] text-gray-400 uppercase tracking-[0.3em] font-light mt-2.5">
                                Premium • Nature-Led • Plotted Living
                            </p>
                        </motion.div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="w-64 relative">
                        {/* Progress Bar */}
                        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>
                        
                        {/* Percentage */}
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-[9px] text-gray-400 uppercase tracking-[0.25em] font-medium">Initialising Experience</div>
                            <div className="text-gold-400 font-sans font-bold text-xl sm:text-2xl tracking-tight [font-variant-numeric:lining-nums]">
                                {progress}<span className="text-xs font-semibold ml-0.5 text-gold-300">%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
