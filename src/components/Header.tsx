import React from 'react';
import { ShoppingBag, User, Sparkles } from 'lucide-react';
import { CustomerProfile } from '../types';

interface HeaderProps {
  currentTab: 'home' | 'menu' | 'customer' | 'events' | 'corporate';
  setCurrentTab: (tab: 'home' | 'menu' | 'customer' | 'events' | 'corporate') => void;
  onOpenContact: () => void;
  onOpenCart: () => void;
  cartCount: number;
  customer: CustomerProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenContact,
  onOpenCart,
  cartCount,
  customer,
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

        {/* Action Buttons: Member Portal + Cart + Contact Us */}
        <div className="flex items-center space-x-3">
          {/* Customer Portal Shortcut */}
          <button
            onClick={() => setCurrentTab('customer')}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'customer'
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-purple-50/80 hover:bg-purple-100 text-purple-800'
            }`}
          >
            <User className="w-3.5 h-3.5 text-purple-700" />
            <span className="hidden sm:inline">
              {customer ? `${customer.name.split(' ')[0]} (${customer.bowlsPurchased} Bowls)` : 'Member Area'}
            </span>
          </button>

          {/* Cart Button */}
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

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Secondary Navigation Menu */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-1 border-t border-gray-50 flex items-center space-x-6 sm:space-x-8 text-sm font-normal text-gray-600 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setCurrentTab('home')}
          className={`cursor-pointer transition-colors pb-0.5 whitespace-nowrap ${
            currentTab === 'home'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setCurrentTab('menu')}
          className={`cursor-pointer transition-colors pb-0.5 whitespace-nowrap flex items-center space-x-1 ${
            currentTab === 'menu'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          <span>Compose &amp; Menu</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
        </button>

        <button
          onClick={() => setCurrentTab('customer')}
          className={`cursor-pointer transition-colors pb-0.5 whitespace-nowrap flex items-center space-x-1 ${
            currentTab === 'customer'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          <span>Customer Rewards</span>
          {customer && (
            <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 rounded-full">
              {customer.points}pts
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentTab('events')}
          className={`cursor-pointer transition-colors pb-0.5 whitespace-nowrap ${
            currentTab === 'events'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'hover:text-black'
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setCurrentTab('corporate')}
          className={`cursor-pointer transition-colors pb-0.5 whitespace-nowrap ${
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
