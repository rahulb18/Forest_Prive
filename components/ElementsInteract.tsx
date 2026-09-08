import React, { useState } from 'react';
import { ElementItem } from '../types';
import { Sun, Wind, Droplets, Trees } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const elements: ElementItem[] = [
  {
    id: 'development',
    title: 'THE EXPANSE',
    description: '65+ Acres of proposed development in Khopoli, strategically positioned between Mumbai and Pune.',
    image: 'assets/projects/neoliv/constru/2.webp',
    icon: 'Trees'
  },
  {
    id: 'lifestyle',
    title: 'THE PRIVÉ',
    description: '9 acres with 2.5 Acres of Private club & lifestyle, offering a perfect blend of nature and luxury.',
    image: 'assets/projects/neoliv/constru/3.webp',
    icon: 'Droplets'
  },
  {
    id: 'gymkhana',
    title: 'THE CLUB',
    description: '25,000 Sqft Master Gymkhana Membership, providing world-class fitness and recreation facilities.',
    image: 'assets/projects/neoliv/constru/12.webp',
    icon: 'Sun'
  },
  {
    id: 'amenities',
    title: 'THE WORLD',
    description: '30+ World Class Amenities designed to offer a complete and fulfilling lifestyle community.',
    image: 'assets/projects/neoliv/constru/7.webp',
    icon: 'Wind'
  }
];

export const ElementsInteract: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getElementColor = (id: string) => {
    switch (id) {
      case 'development': return { primary: 'text-gold-400', bg: 'from-gold-400/20', border: 'border-gold-400/30' };
      case 'lifestyle': return { primary: 'text-gold-400', bg: 'from-gold-400/20', border: 'border-gold-400/30' };
      case 'gymkhana': return { primary: 'text-gold-400', bg: 'from-gold-400/20', border: 'border-gold-400/30' };
      case 'amenities': return { primary: 'text-gold-400', bg: 'from-gold-400/20', border: 'border-gold-400/30' };
      default: return { primary: 'text-gold-400', bg: 'from-gold-400/20', border: 'border-gold-400/30' };
    }
  };

  const renderIcon = (iconName: string) => {
    const props = { size: 32, strokeWidth: 1.5, className: "transition-all duration-300" };

    switch (iconName) {
      case 'Sun': return <Sun {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'Trees': return <Trees {...props} />;
      default: return null;
    }
  };

  return (
    <section id="Highlights" className="min-h-screen py-16 md:py-12 md:h-screen relative overflow-hidden flex items-center" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      backgroundColor: '#0f172a'
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">

        {/* Section Header */}
        <RevealOnScroll variant="up">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-block mb-3">
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-light">Project Highlights</span>
              <div className="h-px w-full bg-gold-400 mt-2"></div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 leading-tight uppercase tracking-tight">
              A Master-Planned<br />
              <span className="text-gold-400">Lifestyle Community</span>
            </h2>
            <p className="font-sans text-gray-400 text-xs md:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed font-light">
              Discover the unique features that make NeoLiv Grand Forest Prive the perfect blend of nature, connectivity, and world-class lifestyle.
            </p>
          </div>
        </RevealOnScroll>

        {/* Elements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {elements.map((element, index) => {
            const colors = getElementColor(element.id);
            const isHovered = hoveredIndex === index;

            return (
              <RevealOnScroll key={element.id} delay={index * 100} variant="up" duration={800}>
                <div
                  className="group relative h-[240px] md:h-[280px] lg:h-[350px] rounded-lg overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={element.image}
                      alt={element.title}
                      className={`w-full h-full object-cover transition-all duration-[4s] ease-out ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-navy-900/90 transition-opacity duration-700 ${isHovered ? 'opacity-90' : 'opacity-95'
                      }`}></div>
                    <div className="absolute inset-0 bg-navy-900/40"></div>
                  </div>

                  {/* Border */}
                  <div className={`absolute inset-0 border-2 ${colors.border} transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-3 md:p-4 lg:p-6">

                    {/* Icon */}
                    <div className={`${colors.primary} transition-all duration-500 ${isHovered ? 'transform scale-110 translate-y-0' : 'translate-y-2'
                      }`}>
                      {renderIcon(element.icon)}
                    </div>

                    {/* Text Content */}
                    <div>
                      <div className="mb-1 md:mb-2">
                        <div className={`h-px w-8 md:w-12 bg-gradient-to-r ${colors.bg.replace('from-', 'from-').replace('/20', '')} to-transparent mb-2 md:mb-3 transition-all duration-700 ${isHovered ? 'w-12 md:w-16' : 'w-8 md:w-12'
                          }`}></div>
                      </div>

                      <h3 className={`font-serif text-lg md:text-xl lg:text-2xl xl:text-3xl mb-1 md:mb-2 tracking-wide transition-all duration-500 ${isHovered ? colors.primary : 'text-white'
                        }`}>
                        {element.title}
                      </h3>

                      <p className={`font-sans text-gray-300 text-[10px] md:text-xs lg:text-sm leading-relaxed font-light transition-all duration-700 line-clamp-2 md:line-clamp-3 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'
                        }`}>
                        {element.description}
                      </p>
                    </div>

                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${colors.border} transition-all duration-700 ${isHovered ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'
                    }`}></div>
                  <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 ${colors.border} transition-all duration-700 ${isHovered ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-4 translate-y-4'
                    }`}></div>

                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};
