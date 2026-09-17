import React from "react";
import { RevealOnScroll } from "./RevealOnScroll";
import {
  Mountain,
  Trees,
  ShieldCheck,
  Milestone,
  Compass,
  Sparkles,
  Building2,
  ArrowRight,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    highlight: "360°",
    label: "Mountain Views",
    icon: Mountain,
  },
  {
    highlight: "Low-Density",
    label: "Living",
    icon: Sparkles,
  },
  {
    highlight: "Two Exclusive",
    label: "Clubs",
    icon: Building2,
  },
  {
    highlight: "Wide",
    label: "Roads",
    icon: Milestone,
  },
  {
    highlight: "Premium",
    label: "Integrated Township",
    icon: Compass,
  },
  {
    highlight: "Green",
    label: "Living",
    icon: Trees,
  },
  {
    highlight: "Grade-A Ready",
    label: "Infrastructure Ecosystem",
    icon: ShieldCheck,
  },
];

export const AboutNeoLiv: React.FC = () => {
  return (
    <section
      id="Overview"
      className="story-snap-slide pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16 bg-navy-950 text-white relative overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* Environmental Landscape Backdrop (Direct visual grounding in the mountain & nature landscape) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="assets/client/Masterplan.jpg"
          alt="NeoLiv Grand Forest Privé Masterplan"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/90 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.95)_100%)]" />
        <div className="absolute inset-0 bg-grain opacity-[0.03]" />
      </div>

      {/* Subtle Luxury Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-gold-400/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: The Vision & Living Philosophy (The Story) */}
          <div className="lg:col-span-6 xl:col-span-6 text-left">
            <RevealOnScroll variant="up">
              {/* Eyebrow */}
              <span className="eyebrow-label inline-block text-gold-400 font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.35em] font-semibold mb-3 sm:mb-4">
                Privé Has Arrived
              </span>

              {/* Main Headline */}
              <h2 className="section-heading font-serif text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-white font-medium leading-[1.15] mb-4 sm:mb-6">
                Not Simply a Place to Own — <br className="hidden sm:inline" />
                <span className="text-gold-400 italic">A World to Belong To.</span>
              </h2>

              {/* Lead Philosophy Quote Callout */}
              <div className="border-l-2 border-gold-400/60 pl-5 mb-6">
                <p className="font-serif text-lg sm:text-xl lg:text-2xl text-gray-100 font-light leading-relaxed italic drop-shadow-sm">
                  “Grand Forest Privé is envisioned for those who seek something
                  increasingly rare — space, stillness and an intimate relationship
                  with nature.”
                </p>
              </div>

              {/* Narrative Paragraphs */}
              <div className="body-large font-sans space-y-4 text-gray-300/90 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
                <p>
                  Here, mornings begin beneath green canopies. Afternoons unfold at
                  leisure. Evenings invite you outdoors. And weekends no longer
                  feel like an escape from life.
                </p>
                <p className="text-white/95 font-normal">
                  They become life itself.
                </p>
              </div>

              {/* CTA Button (Desktop View) */}
              <div className="hidden lg:block">
                <a
                  href="#Lifestyle"
                  className="inline-flex items-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
                >
                  <span>Discover Privé</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Project Highlights (The Living Pillars / Evidence) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <RevealOnScroll variant="up" delay={150}>
              <div className="rounded-3xl bg-navy-900/80 border border-gold-400/25 backdrop-blur-xl p-4 sm:p-6 xl:p-7 shadow-2xl relative overflow-hidden">
                {/* Subtle inner glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

                {/* Highlights Header */}
                <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                  <p className="eyebrow-label text-gold-400 font-sans font-semibold tracking-[0.3em] text-[9px] sm:text-xs uppercase mb-1">
                    A Rare Sense of Space
                  </p>
                  <h3 className="card-heading font-serif text-lg sm:text-2xl text-white font-medium tracking-wide leading-tight">
                    The Finest Green Gated Living.{" "}
                    <span className="text-gold-400 italic">
                      Designed Around You.
                    </span>
                  </h3>
                  <p className="body-small font-sans text-gray-300/85 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                    Thoughtfully planned amidst an expansive natural setting, Grand Forest Privé brings together privacy, openness and community in considered balance.
                  </p>
                </div>

                {/* 7 Pillars Matrix: 2-Column on Mobile & Desktop for Glanceable Dashboard View */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3">
                  {HIGHLIGHTS.slice(0, 6).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 p-2 sm:p-3 xl:p-3.5 rounded-xl bg-navy-950/80 border border-white/5 hover:border-gold-400/40 hover:bg-navy-950 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300 shrink-0">
                          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="numeric font-sans font-semibold text-xs sm:text-sm xl:text-base text-white tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                            {item.highlight}
                          </div>
                          <div className="font-sans text-[10px] sm:text-xs text-gray-300/90 font-normal leading-snug mt-0.5">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Pillar (Spans full width across 2 columns) */}
                  {HIGHLIGHTS.slice(6, 7).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="col-span-2 flex items-center gap-2.5 sm:gap-3 p-2 sm:p-3 xl:p-3.5 rounded-xl bg-navy-950/80 border border-white/5 hover:border-gold-400/40 hover:bg-navy-950 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300 shrink-0">
                          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="numeric font-sans font-semibold text-xs sm:text-sm xl:text-base text-white tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                            {item.highlight}
                          </div>
                          <div className="font-sans text-[10px] sm:text-xs text-gray-300/90 font-normal leading-snug mt-0.5">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RevealOnScroll>

            {/* CTA Button (Mobile View - Direct Flow after Highlights) */}
            <div className="mt-6 mb-4 text-center lg:hidden">
              <a
                href="#Lifestyle"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
              >
                <span>Discover Privé</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
