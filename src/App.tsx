/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import { MenuScreen } from './components/MenuScreen';
import { EventsScreen } from './components/EventsScreen';
import { CorporateScreen } from './components/CorporateScreen';
import { CustomerPortal } from './components/CustomerPortal';
import { CustomBowlModal } from './components/CustomBowlModal';
import { ContactModal } from './components/ContactModal';
import { MissionModal } from './components/MissionModal';
import { CartDrawer } from './components/CartDrawer';
import { ProfNoteBox } from './components/ProfNoteBox';
import { EVENTS_DATA } from './data/menuData';
import {
  INITIAL_CUSTOMER,
  INITIAL_ORDERS,
  INITIAL_DISCOUNTS
} from './data/customerData';
import {
  CartItem,
  CafeEvent,
  CustomerProfile,
  CustomerOrder,
  CustomerDiscount
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'menu' | 'customer' | 'events' | 'corporate'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isCustomBowlOpen, setIsCustomBowlOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<CafeEvent | null>(null);

  // Customer Account & Loyalty States
  const [customer, setCustomer] = useState<CustomerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('braek_customer');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER;
    } catch {
      return INITIAL_CUSTOMER;
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('braek_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [discounts, setDiscounts] = useState<CustomerDiscount[]>(() => {
    try {
      const saved = localStorage.getItem('braek_discounts');
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
    } catch {
      return INITIAL_DISCOUNTS;
    }
  });

  const [activeDiscountCode, setActiveDiscountCode] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    if (customer) {
      localStorage.setItem('braek_customer', JSON.stringify(customer));
    }
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('braek_orders', JSON.stringify(orders));
  }, [orders]);

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

  // When checkout completes: accumulate points, update bowls purchased & orders
  const handleOrderSuccess = (purchasedItems: CartItem[], total: number) => {
    // Count how many bowls were in this purchase
    const bowlsInOrder = purchasedItems.reduce((count, item) => {
      const isBowl =
        item.isCustomBowl ||
        item.name.toLowerCase().includes('bowl') ||
        item.name.toLowerCase().includes('braek') ||
        item.name.toLowerCase().includes('haven') ||
        item.name.toLowerCase().includes('nutty');
      return count + (isBowl ? item.quantity : 0);
    }, 0);

    const pointsEarned = Math.round(total * 10);
    const newOrderId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: CustomerOrder = {
      id: newOrderId,
      date: 'Just now • Ready for pickup',
      items: purchasedItems.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        details: i.details,
      })),
      total,
      pointsEarned,
      bowlsCount: bowlsInOrder,
      status: 'Ready for Pickup',
    };

    setOrders((prev) => [newOrder, ...prev]);

    if (customer) {
      const updatedBowls = customer.bowlsPurchased + Math.max(1, bowlsInOrder);
      const updatedPoints = customer.points + pointsEarned;
      let newTier = customer.tier;
      if (updatedBowls >= 10) newTier = 'VIP Master Braeker';
      else if (updatedBowls >= 7) newTier = 'Braek Connoisseur';
      else if (updatedBowls >= 3) newTier = 'Açai Enthusiast';

      setCustomer({
        ...customer,
        bowlsPurchased: updatedBowls,
        points: updatedPoints,
        tier: newTier,
      });

      // Unlock discounts if stages reached
      if (updatedBowls >= 7) {
        setDiscounts((prev) =>
          prev.map((d) => (d.code === 'FREECOFFEE' ? { ...d, status: 'active' } : d))
        );
      }
      if (updatedBowls >= 10) {
        setDiscounts((prev) =>
          prev.map((d) => (d.code === 'FREESUPER' ? { ...d, status: 'active' } : d))
        );
      }
    }
  };

  const handleUpdateBowlsCount = (newCount: number) => {
    if (customer) {
      let newTier = customer.tier;
      if (newCount >= 10) newTier = 'VIP Master Braeker';
      else if (newCount >= 7) newTier = 'Braek Connoisseur';
      else if (newCount >= 3) newTier = 'Açai Enthusiast';
      else newTier = 'Lilac Seedling';

      setCustomer({
        ...customer,
        bowlsPurchased: newCount,
        tier: newTier,
      });

      // Update discount unlocked status based on simulated stage
      setDiscounts((prev) =>
        prev.map((d) => {
          if (d.code === 'FREECOFFEE') {
            return { ...d, status: newCount >= 7 ? 'active' : 'locked' };
          }
          if (d.code === 'FREESUPER') {
            return { ...d, status: newCount >= 10 ? 'active' : 'locked' };
          }
          return d;
        })
      );
    }
  };

  const handleLogin = (email: string, name: string) => {
    setCustomer({
      ...INITIAL_CUSTOMER,
      email,
      name,
    });
  };

  const handleLogout = () => {
    setCustomer(null);
  };

  const handleApplyDiscountToCart = (code: string) => {
    setActiveDiscountCode(code);
    setIsCartOpen(true);
  };

  const handleReorder = (items: CartItem[]) => {
    items.forEach((item) => handleAddToCart(item));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSelectEventFromHome = (event: CafeEvent) => {
    setSelectedEventForModal(event);
    setCurrentTab('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans selection:bg-yellow-200 relative">
      {/* Ideation Note in Upper Right Corner for Prof. Roh */}
      <ProfNoteBox />

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
        customer={customer}
      />

      {/* Main Content Area based on selected Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* Hero Section with Mission Box repositioned to the TOP */}
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
              onViewCustomerPortal={() => {
                setCurrentTab('customer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              bowlsCount={customer?.bowlsPurchased ?? 2}
            />

            {/* Events Section */}
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

        {currentTab === 'customer' && (
          <CustomerPortal
            customer={customer}
            orders={orders}
            discounts={discounts}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onUpdateBowlsCount={handleUpdateBowlsCount}
            onApplyDiscountToCart={handleApplyDiscountToCart}
            onReorder={handleReorder}
            onBackToHome={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
        onClose={() => {
          setIsCartOpen(false);
          setActiveDiscountCode(null);
        }}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        initialDiscountCode={activeDiscountCode}
      />
    </div>
  );
}
