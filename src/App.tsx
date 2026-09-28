/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import { MenuScreen } from './components/MenuScreen';
import { EventsScreen } from './components/EventsScreen';
import { CorporateScreen } from './components/CorporateScreen';
import { CustomBowlModal } from './components/CustomBowlModal';
import { ContactModal } from './components/ContactModal';
import { MissionModal } from './components/MissionModal';
import { CartDrawer } from './components/CartDrawer';
import { EVENTS_DATA } from './data/menuData';
import { CartItem, CafeEvent } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'menu' | 'events' | 'corporate'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isCustomBowlOpen, setIsCustomBowlOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<CafeEvent | null>(null);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.details === item.details);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSelectEventFromHome = (event: CafeEvent) => {
    setSelectedEventForModal(event);
    setCurrentTab('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans selection:bg-yellow-200">
      {/* Sticky Header with Navigation & Branding */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Area based on selected Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* Exact Hero Section from design */}
            <HeroSection
              onViewMenu={() => {
                setCurrentTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewMission={() => setIsMissionOpen(true)}
              onViewCorporate={() => {
                setCurrentTab('corporate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Exact Events Section from design */}
            <EventsSection
              onLearnMore={() => {
                setCurrentTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              featuredEvents={EVENTS_DATA}
              onSelectEvent={handleSelectEventFromHome}
            />
          </>
        )}

        {currentTab === 'menu' && (
          <MenuScreen
            onAddToCart={handleAddToCart}
            onOpenCustomBowl={() => setIsCustomBowlOpen(true)}
          />
        )}

        {currentTab === 'events' && (
          <EventsScreen
            onBackToHome={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedEventForModal={selectedEventForModal}
            onClearSelectedEvent={() => setSelectedEventForModal(null)}
          />
        )}

        {currentTab === 'corporate' && <CorporateScreen />}
      </main>

      {/* Persistent Footer with Operating Hours, Address, Socials & Legal */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Modals and Drawers */}
      <CustomBowlModal
        isOpen={isCustomBowlOpen}
        onClose={() => setIsCustomBowlOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <MissionModal
        isOpen={isMissionOpen}
        onClose={() => setIsMissionOpen(false)}
        onExploreMenu={() => {
          setCurrentTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
