import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

const RERA_NUMBERS = [
  "PP1270002502553",
  "PP1270002502551",
  "PP1270002502087",
  "PP1270002502595"
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 pt-14 sm:pt-16 pb-28 md:pb-24 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden text-white">
      {/* Subtle brand pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grain"></div>

      <div className="container mx-auto flex flex-col items-center relative z-10 max-w-5xl">
        
        {/* Brand & Developer Header */}
        <div className="mb-8 sm:mb-10 flex flex-col items-center text-center">
          <p className="text-gold-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-2 font-semibold">
            Developed by North Bliss Properties Pvt. Ltd.
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-none tracking-[0.2em] uppercase font-bold">
            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
          </h2>
          <p className="text-gray-400 text-[10px] sm:text-xs tracking-widest uppercase mt-2.5 font-light">
            Premium • Nature-led • Plotted Living
          </p>
        </div>

        {/* MahaRERA Registration Block */}
        <div className="w-full bg-navy-900/90 border border-gold-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-10 sm:mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-3.5 sm:pb-4 mb-3.5 sm:mb-4">
            <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>MahaRERA Registered Projects</span>
            </div>
            <a
              href="https://maharera.maharashtra.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-[11px] sm:text-xs font-mono tracking-wider transition-colors"
            >
              Visit MahaRERA Official Portal
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-center">
            {RERA_NUMBERS.map((num, i) => (
              <div key={i} className="bg-navy-950/80 border border-white/5 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg">
                <span className="text-gray-400 block text-[8.5px] sm:text-[9px] uppercase tracking-wider mb-0.5">Phase 0{i + 1}</span>
                <strong className="text-white font-mono text-[11px] sm:text-xs md:text-sm tracking-wider">{num}</strong>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-[9.5px] sm:text-[10px] text-center mt-3.5 sm:mt-4 leading-relaxed font-light">
            The project has been registered via MahaRERA registration numbers detailed above and is available on the website <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gold-400 underline hover:text-gold-300">https://maharera.maharashtra.gov.in/</a> under registered projects.
          </p>
        </div>

        {/* Statutory Disclaimers */}
        <div className="text-gray-400 text-[10px] md:text-[11px] text-center font-light mb-12 leading-relaxed tracking-wider space-y-4 max-w-4xl border-b border-white/5 pb-10">
          <p>
            <strong className="text-white font-medium">Statutory Property Disclaimer:</strong> All information, images, renders, artistic impressions, plans, and specifications depicted on this website are indicative and for representational purposes only. Final specifications and deliverables shall strictly conform to the agreement for sale entered into between the promoter (North Bliss Properties Pvt. Ltd.) and the purchaser.
          </p>
          <p>
            <strong className="text-white font-medium">Pricing & Inventory Revisions:</strong> Prices, payment schemes, and inventory availability mentioned (including Privé Price ₹5,299/sq. ft.* and Launch Price ₹5,999/sq. ft.*) are subject to revision without prior notice at the sole discretion of the developer. Government taxes, stamp duty, registration charges, and other statutory levies are additional.
          </p>
          <p>
            <strong className="text-white font-medium">Artistic Impression Disclaimer:</strong> Visual representations including architectural renders, landscapes, interior concepts, and club facilities represent artistic impressions and may differ from the actual completed development.
          </p>
          <p className="text-gray-400 text-[9px]">
            Privacy & Authorization: By submitting your contact details on this website, you authorize Grand Forest Privé and NeoLiv to contact you via phone call, SMS, or WhatsApp regarding project updates, overriding any national or international DND registration.
          </p>
        </div>

        <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase text-center font-mono">
          © {new Date().getFullYear()} NeoLiv Grand Forest Privé. Developed by North Bliss Properties Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};