import React, { Suspense, lazy } from 'react';
import { VisualStorySections } from './components/VisualStorySections';
import { Navbar } from './components/Navbar';
import { FloatingCTA } from './components/FloatingCTA';
import { AboutNeoLiv } from './components/AboutNeoLiv';
import { EnquiryModal } from './components/EnquiryModal';

// Lazy Load subsequent detailed sections
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
  return (
    <>
      <main className="w-full min-h-screen bg-navy-950 selection:bg-gold-400 selection:text-navy-900 pointer-events-auto">
        {/* Floating Top Navigation Header */}
        <Navbar />

        {/* Visual Story Slides: Dedicated Full-Screen Editorial Sections (NeoLiv Signature Style) */}
        <VisualStorySections />

        {/* Detailed Section: Project Overview & Masterplan (Dedicated Client Render: Masterplan.jpg) */}
        <div id="Overview">
          <AboutNeoLiv />
        </div>
        
        <Suspense fallback={<div className="h-20 bg-navy-950" />}>
          {/* Detailed Section: Curated Lifestyle & Sports */}
          <div id="Lifestyle">
            <CuratedLifestyle />
          </div>

          {/* Detailed Section: Curated Amenities & Club Experience */}
          <div id="Amenities">
            <Amenities />
          </div>

          {/* Detailed Section: Location & Regional Connectivity */}
          <div id="Location">
            <Location />
          </div>

          {/* Detailed Section: Architectural Masterpiece Gallery (All 7 Client Renders) */}
          <div id="Gallery">
            <Gallery />
          </div>

          {/* Detailed Section: Grand Privé Advantage & Investment Opportunity */}
          <div id="Pricing">
            <GrandPriveAdvantage />
          </div>

          {/* Detailed Section: Developer Profile: About NeoLiv */}
          <div id="AboutUs">
            <AboutUs />
          </div>

          {/* Detailed Section: Frequently Asked Questions */}
          <div id="FAQ">
            <FAQSection />
          </div>

          {/* Detailed Section: Lead Capture / Enquiry Section */}
          <div id="Contact">
            <ContactForm />
          </div>

          {/* Compliance, Footer & Brand Details */}
          <Footer />
        </Suspense>

        {/* Universal Sticky Desktop Tabs & Mobile Bottom Bar */}
        <FloatingCTA />

        {/* Universal Enquiry Modal Dialog */}
        <EnquiryModal />
      </main>
    </>
  );
}

export default App;