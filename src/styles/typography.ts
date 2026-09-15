/**
 * NeoLiv Grand Forest Privé — Typography Design System
 * 
 * Single Source of Truth for typography tokens, scales, and font definitions.
 * 
 * Heading Font: Cormorant Garamond
 * - Strictly for: Hero headline, Section headlines, Large editorial titles
 * 
 * Body Font: Outfit
 * - Strictly for: Paragraphs, Buttons, Forms, Labels, Navigation, Amenities, Footer
 * 
 * Tabular Numbers: Outfit with tabular lining numerals
 * - Strictly for: All statistics, numbers, counters, dates, phone numbers, baselines
 */

export const TYPOGRAPHY_FONTS = {
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
  numeric: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

export const TYPOGRAPHY_SCALE = {
  /** Hero headline */
  heroDisplay: "font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide leading-[1.12] sm:leading-[1.1]",
  
  /** Section primary headline */
  sectionHeading: "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-normal",
  
  /** Card or sub-feature heading */
  cardHeading: "font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-snug",
  
  /** Editorial quote / callout */
  quote: "font-serif text-lg sm:text-xl lg:text-2xl font-light italic leading-relaxed",
  
  /** Eyebrow section tag / badge */
  eyebrowLabel: "font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.35em] font-semibold text-gold-400",
  
  /** Hero subtext / lead narrative paragraph */
  bodyLarge: "font-sans text-base sm:text-lg lg:text-xl font-light leading-relaxed",
  
  /** Standard section body paragraph */
  bodyRegular: "font-sans text-sm sm:text-base font-light leading-relaxed",
  
  /** Secondary microcopy / disclaimers / card footnotes */
  bodySmall: "font-sans text-xs sm:text-sm font-light leading-relaxed",
  
  /** Meta tags / badge labels / timestamps */
  caption: "font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium",
  
  /** Action buttons / CTA labels */
  buttonLabel: "font-sans text-xs uppercase tracking-[0.2em] font-semibold",
  
  /** Input fields, form labels, selects */
  formLabel: "font-sans text-xs sm:text-sm font-medium tracking-wide",
  
  /** Universal numeric token ensuring strict single-baseline tabular alignment */
  numeric: "font-sans [font-variant-numeric:tabular-nums] tracking-tight font-medium",
  
  /** Quantitative highlight stats (e.g., 65+, 2.5, 99) */
  statValue: "font-sans [font-variant-numeric:tabular-nums] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
} as const;

export default {
  fonts: TYPOGRAPHY_FONTS,
  scale: TYPOGRAPHY_SCALE,
};
