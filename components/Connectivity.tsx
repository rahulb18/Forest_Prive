import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { AmenityCategory } from '../types';
import { Plane, GraduationCap, HeartPulse, MapPin } from 'lucide-react';

const connectivityData: AmenityCategory[] = [
  {
    category: "Connectivity",
    items: [
      { title: "Delhi–Mumbai Industrial Corridor", distance: "Adjacent" },
      { title: "Upcoming Metro Station", distance: "5 mins" },
      { title: "FNG Expressway", distance: "10 mins" },
      { title: "Faridabad Railway Station", distance: "15 mins" },
    ]
  },
  {
    category: "Schools & Education",
    items: [
      { title: "Delhi Public School", distance: "Short Drive" },
      { title: "Modern School", distance: "Nearby" },
      { title: "Amity International", distance: "Easy Access" },
    ]
  },
  {
    category: "Hospitals",
    items: [
      { title: "Amrita Hospital", distance: "10 mins" },
      { title: "Fortis Escorts", distance: "15 mins" },
      { title: "Asian Hospital", distance: "Nearby" },
    ]
  }
];

export const Connectivity: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Schools & Education': return <GraduationCap className="text-gold-400 mb-4 transition-transform duration-500 group-hover:scale-110" size={40} strokeWidth={1} />;
      case 'Hospitals': return <HeartPulse className="text-gold-400 mb-4 transition-transform duration-500 group-hover:scale-110" size={40} strokeWidth={1} />;
      default: return <Plane className="text-gold-400 mb-4 transition-transform duration-500 group-hover:scale-110" size={40} strokeWidth={1} />;
    }
  };

  return (
    <section className="min-h-screen py-16 md:py-12 md:h-screen bg-navy-900 text-white border-t border-navy-800/50 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <RevealOnScroll variant="up" duration={1000}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-4 tracking-tight uppercase text-gold-400">Proximity <span className="text-white">& Access</span></h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4 md:mb-6"></div>
            <p className="font-sans text-gray-400 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Ideally located at the heart of Faridabad's growing infrastructure, ensuring you're never far from the essentials that matter.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {connectivityData.map((category, idx) => (
            <RevealOnScroll key={idx} delay={idx * 150} variant="up" duration={800}>
              <div
                className="group bg-navy-800/40 md:backdrop-blur-sm p-5 md:p-6 lg:p-8 border border-white/10 hover:border-gold-400/40 hover:bg-navy-800/60 transition-[transform,border-color,background-color,shadow] duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-gold-400/10 relative overflow-hidden cursor-crosshair h-full flex flex-col"
                onMouseEnter={() => setActiveCategory(category.category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-400 to-gold-400/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                <div className="flex flex-col items-center mb-4 md:mb-5 lg:mb-6 relative z-10">
                  {getIcon(category.category)}
                  <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-white tracking-wide">{category.category}</h3>
                </div>

                <ul className="space-y-2 md:space-y-3 relative z-10 flex-1">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-[11px] md:text-xs lg:text-sm border-b border-white/5 pb-2 last:border-0 group/item transition-all duration-300">
                      <span className="font-sans font-light text-gray-400 group-hover/item:text-gray-200 transition-colors duration-300">{item.title}</span>
                      <span className="font-mono text-gold-400 text-[10px] md:text-xs ml-3 md:ml-4 whitespace-nowrap opacity-60 group-hover/item:opacity-100 transition-opacity duration-300">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};