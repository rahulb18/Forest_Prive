import React from 'react';

export const Banner: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden bg-navy-900 pt-20">
            <div className="container mx-auto px-4">
                {/* Desktop Image */}
                <div className="hidden md:block w-full">
                    <img
                        src="assets/projects/neoliv/1.webp"
                        alt="NeoLiv Banner"
                        className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                    />
                </div>

                {/* Mobile Image */}
                <div className="block md:hidden w-full px-2">
                    <img
                        src="assets/projects/neoliv/m1.webp"
                        alt="NeoLiv Banner Mobile"
                        className="w-full h-auto object-cover rounded-lg shadow-xl"
                    />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </section>
    );
};
