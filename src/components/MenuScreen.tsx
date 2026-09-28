import React, { useState } from 'react';
import { Plus, Search, Sparkles, Filter, Check, ArrowRight } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { InteractiveBowlStudio } from './InteractiveBowlStudio';

interface MenuScreenProps {
  onAddToCart: (item: CartItem) => void;
  onOpenCustomBowl?: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'bowls', label: 'Signature Bowls' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'beverages', label: 'Smoothies & Coolers' },
    { id: 'bites', label: 'Healthy Bites' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (item: MenuItem) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      details: item.category === 'bowls' ? 'Regular Bowl • Standard Toppings' : undefined,
    });
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf8f2] pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#b19ec8]/30 via-[#b19ec8]/10 to-transparent pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7c6696] mb-2 px-3 py-1 rounded-full bg-purple-100/60">
            Açai &amp; Specialty Coffee
          </span>
          <h1 className="font-brand-title text-4xl sm:text-5xl text-gray-900 mb-3">
            Interactive Menu &amp; Bowl Studio
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            Compose your own bowls dynamically or choose from our kitchen signature creations! Track your ingredients, capacity limits, and nutritional benefits in real time.
          </p>
        </div>
      </section>

      {/* REQUIREMENT 2: EMBEDDED INTERACTIVE BOWL STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <InteractiveBowlStudio onAddToCart={onAddToCart} />
      </section>

      {/* Ready-to-Order Menu Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="border-t border-gray-200 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h2 className="font-brand-title text-2xl sm:text-3xl text-gray-900">
                Signature House Selections
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Handcrafted recipes perfected by our baristas and nutritionists
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full pt-4 pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700"
                        >
                          {t}
                        </span>
                      ))}
                      {item.calories && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                          {item.calories}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-gray-900 text-base">
                      S${item.price.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="font-brand-title text-xl text-gray-900 group-hover:text-purple-900 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 capitalize">
                    {item.category === 'bowls' ? 'Signature Recipe' : item.category}
                  </span>

                  <button
                    onClick={() => handleAddItem(item)}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                      addedItemId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 shadow-xs'
                    }`}
                  >
                    {addedItemId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Quick Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No items found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-purple-700 underline font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
