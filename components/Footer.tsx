import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

const RERA_PROJECTS = [
  {
    phase: "Phase 01",
    number: "PP1270002502553",
    qr: "assets/qr-phase-1.png",
  },
  {
    phase: "Phase 02",
    number: "PP1270002502551",
    qr: "assets/qr-phase-2.png",
  },
  {
    phase: "Phase 03",
    number: "PP1270002502087",
    qr: "assets/qr-phase-3.png",
  },
  {
    phase: "Phase 04",
    number: "PP1270002502595",
    qr: "assets/qr-phase-4.png",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 pt-14 sm:pt-16 pb-36 md:pb-20 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden text-white">
      {/* Subtle brand pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grain"></div>

      <div className="container mx-auto flex flex-col items-center relative z-10 max-w-6xl">
        
        {/* Brand & Developer Header */}
        <div className="mb-8 sm:mb-10 flex flex-col items-center text-center">
          <p className="eyebrow-label text-gold-400 font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-2 font-semibold">
            Developed by North Bliss Properties Pvt. Ltd.
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-none tracking-[0.2em] uppercase font-bold">
            GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
          </h2>
          <p className="body-small font-sans text-gray-400 text-[10px] sm:text-xs tracking-widest uppercase mt-2.5 font-light">
            Premium • Nature-led • Plotted Living
          </p>
        </div>

        {/* MahaRERA Registration Block with QR Codes */}
        <div className="w-full bg-navy-900/90 border border-gold-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-10 sm:mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-3.5 sm:pb-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-gold-400 font-sans font-semibold text-xs md:text-sm uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>MahaRERA Registered Projects & Official QR Codes</span>
            </div>
            <a
              href="https://maharera.maharashtra.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-[11px] sm:text-xs font-sans tracking-wider transition-colors"
            >
              Visit MahaRERA Official Portal
              <ExternalLink size={12} />
            </a>
          </div>

          {/* 4 Phase Cards: QR code + Phase name + Registration Number */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            {RERA_PROJECTS.map((item, i) => (
              <div
                key={i}
                className="bg-navy-950/80 border border-white/10 hover:border-gold-400/40 p-3 sm:p-4 rounded-xl flex flex-col items-center justify-between transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  <span className="text-gray-300 font-sans text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold">
                    {item.phase}
                  </span>
                </div>
                
                {/* QR Code with crisp white backing for instant camera scanability */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={item.qr}
                    alt={`MahaRERA QR Code - ${item.phase} (${item.number})`}
                    width={95}
                    height={95}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="w-full">
                  <strong className="numeric font-sans text-white text-[10.5px] sm:text-xs md:text-sm tracking-wider font-semibold block leading-tight">
                    {item.number}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <p className="body-small font-sans text-gray-400 text-[9.5px] sm:text-[10px] text-center mt-3.5 sm:mt-4 leading-relaxed font-light">
            The project has been registered via MahaRERA registration numbers detailed above and is available on the website <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gold-400 underline hover:text-gold-300">https://maharera.maharashtra.gov.in/</a> under registered projects.
          </p>
        </div>

        {/* Statutory Disclaimers */}
        <div className="body-small font-sans text-gray-400 text-[10px] md:text-[11px] text-center font-light mb-12 leading-relaxed tracking-wider space-y-4 max-w-4xl border-b border-white/5 pb-10">
          <p>
            <strong className="text-white font-medium">Statutory Property Disclaimer:</strong> All information, images, renders, artistic impressions, plans, and specifications depicted on this website are indicative and for representational purposes only. Final specifications and deliverables shall strictly conform to the agreement for sale entered into between the promoter (North Bliss Properties Pvt. Ltd.) and the purchaser.
          </p>
          <p>
            <strong className="text-white font-medium">Pricing & Inventory Revisions:</strong> Prices, payment schemes, and inventory availability mentioned (including Privé Price <span className="numeric">₹5,299</span>/sq. ft.* and Launch Price <span className="numeric">₹5,999</span>/sq. ft.*) are subject to revision without prior notice at the sole discretion of the developer. Government taxes, stamp duty, registration charges, and other statutory levies are additional.
          </p>
          <p>
            <strong className="text-white font-medium">Artistic Impression Disclaimer:</strong> Visual representations including architectural renders, landscapes, interior concepts, and club facilities represent artistic impressions and may differ from the actual completed development.
          </p>
          <p className="text-gray-400 text-[9px]">
            Privacy & Authorization: By submitting your contact details on this website, you authorize Grand Forest Privé and NeoLiv to contact you via phone call, SMS, or WhatsApp regarding project updates, overriding any national or international DND registration.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3 text-gray-400 text-[10px] md:text-[11px] tracking-wider uppercase text-center font-sans">
          <p className="whitespace-normal md:whitespace-nowrap">
            © <span className="numeric">{new Date().getFullYear()}</span> NeoLiv Grand Forest Privé. Developed by North Bliss Properties Pvt. Ltd.
          </p>
          <span className="hidden md:inline text-white/30">•</span>
          <p className="whitespace-normal md:whitespace-nowrap">
            Digitally Marketed by{" "}
            <a
              href="https://propstory.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors font-medium underline underline-offset-4 inline-flex items-center gap-1"
            >
              Propstory
              <ExternalLink size={10} className="opacity-70" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};