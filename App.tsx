import React, { Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { FloatingCTA } from './components/FloatingCTA';
import { CinematicShowcase } from './components/CinematicShowcase';
import { AboutNeoLiv } from './components/AboutNeoLiv';
import { EnquiryModal } from './components/EnquiryModal';
import { usePresentationScroll } from './lib/scroll-presentation';
// Lazy Load heavier components
const CuratedLifestyle = lazy(() => import('./components/CuratedLifestyle').then(m => ({ default: m.CuratedLifestyle })));
const Amenities = lazy(() => import('./components/Amenities').then(m => ({ default: m.Amenities })));
const Location = lazy(() => import('./components/Location').then(m => ({ default: m.Location })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const GrandPriveAdvantage = lazy(() => import('./components/GrandPriveAdvantage').then(m => ({ default: m.GrandPriveAdvantage })));
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactForm = lazy(() => import('./components/ContactForm').then(m => ({ default: m.ContactForm })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function App() {
  usePresentationScroll();
  return (
    <>
      <main className="w-full min-h-screen bg-transparent selection:bg-gold-400 selection:text-navy-900 pointer-events-auto">
        {/* Section 1: Header & Navigation */}
        <Navbar />

        {/* Section 2: Hero Section (100dvh Full Viewport) */}
        <div id="home" className="relative w-full h-screen h-[100dvh] overflow-hidden">
          <Hero />
        </div>

        {/* Content Layer: Stable Document Flow with Suspense Lazy Loading */}
        <div className="relative z-10 bg-navy-900">
          {/* Cinematic Background Showcase (100dvh Full Viewport) */}
          <div id="Cinematic" className="relative w-full h-screen h-[100dvh] overflow-hidden">
            <CinematicShowcase />
          </div>

          {/* Section 02 & 03: Project Introduction & Project Highlights */}
          <div id="Overview"><AboutNeoLiv /></div>
          
          <Suspense fallback={<div className="h-20 bg-navy-950" />}>
            {/* Section 04: Nature & Lifestyle */}
            <div id="Lifestyle"><CuratedLifestyle /></div>

            {/* Section 05: Location & Connectivity */}
            <div id="Location"><Location /></div>

            {/* Section 06: Curated Amenities & Section 07: Club Experience */}
            <div id="Amenities"><Amenities /></div>

            {/* Section 08 & 12: Architectural Vision & Gallery */}
            <div id="Gallery"><Gallery /></div>

            {/* Section 09: Grand Privé Advantage & Section 10: Investment Opportunity */}
            <div id="Pricing"><GrandPriveAdvantage /></div>

            {/* Section 11: Developer Profile: About NeoLiv */}
            <div id="AboutUs"><AboutUs /></div>

            {/* Section 13: Frequently Asked Questions */}
            <div id="FAQ"><FAQSection /></div>

            {/* Section 14: Lead Capture / Enquiry Section */}
            <div id="Contact"><ContactForm /></div>

            {/* Section 15: Compliance, Footer & Sticky UX */}
            <Footer />
          </Suspense>
          <FloatingCTA />
        </div>
        <EnquiryModal />
      </main>
    </>
  );
}

export default App;