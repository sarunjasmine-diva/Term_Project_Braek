import React from 'react';
import {
  AcaiBowlIllustration,
  BearApronIllustration,
  BearCupIllustration,
} from './BrandIllustrations';

interface HeroSectionProps {
  onViewMenu: () => void;
  onViewMission: () => void;
  onViewCorporate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewMenu,
  onViewMission,
  onViewCorporate,
}) => {
  return (
    <section
      className="relative bg-[#b19ec8] pt-16 sm:pt-20 pb-28 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-purpose="hero-banner"
    >
      <div className="max-w-5xl mx-auto text-center relative z-20">
        {/* Large Display Heading */}
        <h1 className="font-brand-title text-6xl sm:text-7xl md:text-8xl text-[#fff799] tracking-normal font-normal mb-5 drop-shadow-sm select-none">
          braek.
        </h1>

        {/* Brand Mission Statement */}
        <p className="max-w-3xl mx-auto text-white text-base sm:text-lg md:text-[1.05rem] font-normal leading-relaxed tracking-normal opacity-95">
          At bræk., escape chaos in a nurturing space. Foster connections, spark
          conversations. Every visit promises unexpected happiness. Committed to
          a holistic journey, delivering quality and heartfelt attention.
        </p>

        {/* Feature Cards Container */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto text-left sm:text-center">
          {/* Card 1: Menu */}
          <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20">
            <div className="mb-6 cursor-pointer" onClick={onViewMenu}>
              <AcaiBowlIllustration />
            </div>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-3">
              Menu
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              Explore our tempting menu at Bræk! Dive into wholesome acai bowls,
              savor quality coffee, and choose from delightful beverages.
            </p>

            <button
              onClick={onViewMenu}
              className="mt-auto px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              View Menu
            </button>
          </article>

          {/* Card 2: Mission */}
          <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20">
            <div className="mb-6 cursor-pointer" onClick={onViewMission}>
              <BearApronIllustration />
            </div>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-3">
              Mission
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              At Bræk, people power our fun! Swing by for a 'bræk' from the
              daily grind and dive into our delightful vibes and treats!
            </p>

            <div className="mt-auto py-2.5">
              <button
                onClick={onViewMission}
                className="inline-block text-xs uppercase tracking-wider text-purple-700 font-semibold px-4 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                Community &amp; Smiles
              </button>
            </div>
          </article>

          {/* Card 3: Corporate */}
          <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20">
            <div className="mb-6 cursor-pointer" onClick={onViewCorporate}>
              <BearCupIllustration />
            </div>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-3">
              Corporate
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              Infuse your team with acai enjoyment! Elevate the collective
              spirit with our delicious acai offerings brought directly to you
            </p>

            <button
              onClick={onViewCorporate}
              className="mt-auto px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Corporate Events
            </button>
          </article>
        </div>
      </div>

      {/* Organic Wave Bottom Accents */}
      <div aria-hidden="true" className="hero-wave-left" />
      <div aria-hidden="true" className="hero-wave-right" />
    </section>
  );
};
