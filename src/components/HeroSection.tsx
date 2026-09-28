import React from 'react';
import {
  AcaiBowlIllustration,
  BearApronIllustration,
  BearCupIllustration,
} from './BrandIllustrations';
import { Sparkles, ArrowRight, Award, Heart, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onViewMenu: () => void;
  onViewMission: () => void;
  onViewCorporate: () => void;
  onViewCustomerPortal: () => void;
  bowlsCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewMenu,
  onViewMission,
  onViewCorporate,
  onViewCustomerPortal,
  bowlsCount = 2,
}) => {
  return (
    <section
      className="relative bg-[#b19ec8] pt-10 sm:pt-14 pb-28 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      data-purpose="hero-banner"
    >
      <div className="max-w-5xl mx-auto relative z-20">
        {/* REQUIREMENT 1: PROMINENT TOP MISSION BOX */}
        <div
          data-purpose="top-mission-box"
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-purple-100/80 mb-10 transition-all hover:shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Mascot in Apron Graphic */}
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              onClick={onViewMission}
              title="Click to view our story"
            >
              <BearApronIllustration className="w-28 h-28 sm:w-32 sm:h-32" />
            </div>

            {/* Mission Text Box */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-800 bg-purple-100/90 px-3 py-1 rounded-full flex items-center">
                  <Heart className="w-3 h-3 text-purple-700 mr-1" />
                  Our Mission &amp; Space
                </span>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full flex items-center">
                  <Leaf className="w-3 h-3 text-emerald-600 mr-1" />
                  100% Wild Organic Açai
                </span>
              </div>

              <h2 className="font-brand-title text-2xl sm:text-3xl text-gray-900 mb-2">
                At bræk., escape chaos in a nurturing space.
              </h2>

              {/* Text Box Narrative */}
              <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/70 text-gray-700 text-xs sm:text-sm leading-relaxed">
                <p>
                  Foster connections, spark conversations. Every visit promises unexpected happiness. Committed to a holistic journey, delivering quality and heartfelt attention.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={onViewMission}
                  className="inline-flex items-center text-xs uppercase tracking-wider text-purple-800 hover:text-purple-950 font-bold underline underline-offset-4 cursor-pointer"
                >
                  <span>Community &amp; Smiles Story</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span className="text-xs text-gray-500 font-medium">
                  Li Ka Shing Library, #B1-25, Singapore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Display Heading in Pastel Yellow */}
        <div className="text-center mb-10">
          <h1 className="font-brand-title text-6xl sm:text-7xl md:text-8xl text-[#fff799] tracking-normal font-normal drop-shadow-sm select-none">
            braek.
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mt-2 font-medium">
            Escape the Chaos, Embrace the Braek.
          </p>
        </div>

        {/* Feature Cards Container: Menu, Rewards, Corporate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto text-left sm:text-center">
          {/* Card 1: Interactive Menu & Customizer */}
          <article className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20">
            <div className="mb-5 cursor-pointer" onClick={onViewMenu}>
              <AcaiBowlIllustration />
            </div>

            <div className="flex items-center space-x-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                Interactive Composer
              </span>
            </div>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-2">
              Menu &amp; Bowl Studio
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
              Compose your own açai bowl in real-time! See your ingredients, fruit limits, and toppings come alive.
            </p>

            <button
              onClick={onViewMenu}
              className="mt-auto px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 text-xs uppercase font-bold tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Compose Bowl →
            </button>
          </article>

          {/* Card 2: Customer Area & Rewards */}
          <article className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20 border-2 border-purple-100">
            <div
              className="w-36 h-36 flex items-center justify-center mb-5 cursor-pointer"
              onClick={onViewCustomerPortal}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-100 to-amber-50 flex items-center justify-center text-[#7c6696] ring-8 ring-purple-50 shadow-inner">
                <Award className="w-12 h-12 stroke-[1.5]" />
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-2">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full">
                Member Area &amp; Stages
              </span>
            </div>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-2">
              Rewards Sanctuary
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
              Log in to track your order history, view discounts, and watch your multi-stage bowl progress bar unlock rewards!
            </p>

            <button
              onClick={onViewCustomerPortal}
              className="mt-auto px-6 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs uppercase font-bold tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Member Portal ({bowlsCount} Bowls) →
            </button>
          </article>

          {/* Card 3: Corporate */}
          <article className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative z-20">
            <div className="mb-5 cursor-pointer" onClick={onViewCorporate}>
              <BearCupIllustration />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full mb-2">
              Team Catering
            </span>

            <h3 className="font-brand-title text-3xl text-gray-900 mb-2">
              Corporate
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
              Infuse your team with açai enjoyment! Elevate the collective spirit with our delicious catering brought to you.
            </p>

            <button
              onClick={onViewCorporate}
              className="mt-auto px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 text-xs uppercase font-bold tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
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
