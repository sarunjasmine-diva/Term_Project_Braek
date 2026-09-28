import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'menu' | 'events' | 'corporate';
  setCurrentTab: (tab: 'home' | 'menu' | 'events' | 'corporate') => void;
  onOpenContact: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenContact,
  onOpenCart,
  cartCount,
}) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 transition-all duration-200">
      {/* Top Utility & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Slogan */}
        <div className="flex items-baseline space-x-6 sm:space-x-8">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex flex-col group text-left cursor-pointer focus:outline-none"
            aria-label="bræk. Home"
          >
            <span className="logo-font text-3xl sm:text-4xl font-bold tracking-tight text-black flex items-center">
              br<span className="text-[#8e75ab] font-serif font-normal italic">æ</span>k<span className="text-black font-serif">.</span>
            </span>
            <span className="text-[9px] tracking-widest uppercase font-semibold text-gray-500 -mt-1 pl-0.5">
              Açai &amp; Coffee
            </span>
          </button>

          {/* Tagline */}
          <span className="hidden md:inline-block font-brand-title text-base sm:text-lg text-black font-medium tracking-tight border-l border-gray-200 pl-6">
            Escape the Chaos, Embrace the Braek.
          </span>
        </div>

        {/* Action Buttons: Cart + Contact Us */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8e75ab] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-medium text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Secondary Navigation Menu */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-1 border-t border-gray-50 flex items-center space-x-8 text-sm font-normal text-gray-600">
        <button
          onClick={() => setCurrentTab('home')}
          className={`cursor-pointer transition-colors pb-0.5 ${
            currentTab === 'home'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setCurrentTab('menu')}
          className={`cursor-pointer transition-colors pb-0.5 ${
            currentTab === 'menu'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Menu
        </button>

        <button
          onClick={() => setCurrentTab('events')}
          className={`cursor-pointer transition-colors pb-0.5 ${
            currentTab === 'events'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setCurrentTab('corporate')}
          className={`cursor-pointer transition-colors pb-0.5 ${
            currentTab === 'corporate'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Corporate Orders
        </button>
      </nav>
    </header>
  );
};
