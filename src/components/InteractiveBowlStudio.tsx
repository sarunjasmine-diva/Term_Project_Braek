import React, { useState } from 'react';
import { Sparkles, Plus, Check, RotateCcw, Flame, Info, ShoppingBag } from 'lucide-react';
import { BowlVisualizer } from './BowlVisualizer';
import { CartItem } from '../types';

interface InteractiveBowlStudioProps {
  onAddToCart: (item: CartItem) => void;
  compact?: boolean;
}

const PRESETS = [
  {
    name: 'The Classic Braek',
    tag: 'Best Seller',
    size: 'Regular' as const,
    base: 'Pure Brazilian Açai',
    granola: 'Artisanal Honey Almond Granola',
    fruits: ['Strawberries', 'Blueberries', 'Banana Slices'],
    superfoods: ['Chia Seeds'],
    drizzle: 'Speculoos Cookie Butter',
    price: 9.90,
    calories: '340 kcal'
  },
  {
    name: 'Tropical Haven',
    tag: 'Refreshing',
    size: 'Regular' as const,
    base: 'Açai & Pink Pitaya Swirl',
    granola: 'Nut-Free Coconut Oat Crisp',
    fruits: ['Alphonso Mango', 'Kiwi Slices', 'Passionfruit Pulp'],
    superfoods: ['Toasted Coconut Ribbons', 'Chia Seeds'],
    drizzle: 'Organic Raw Honey',
    price: 10.90,
    calories: '310 kcal'
  },
  {
    name: 'Nutty Indulgence',
    tag: 'High Protein',
    size: 'Large' as const,
    base: 'Pure Brazilian Açai',
    granola: 'Cocoa Hazelnut Crunch',
    fruits: ['Banana Slices', 'Strawberries'],
    superfoods: ['Cacao Nibs', 'Roasted Almond Flakes'],
    drizzle: '100% Creamy Almond Butter',
    price: 12.50,
    calories: '420 kcal'
  },
  {
    name: 'Matcha Zen Bowl',
    tag: 'Antioxidant Superfood',
    size: 'Regular' as const,
    base: 'Açai + Matcha Chia Layer',
    granola: 'Artisanal Honey Almond Granola',
    fruits: ['Blueberries', 'Kiwi Slices'],
    superfoods: ['Goji Berries', 'Chia Seeds'],
    drizzle: 'Speculoos Cookie Butter',
    price: 11.90,
    calories: '295 kcal'
  }
];

const SIZE_CONFIGS = {
  Regular: { price: 9.90, maxFruits: 3, maxSuperfoods: 2, maxDrizzles: 1, volume: '350ml' },
  Large: { price: 12.50, maxFruits: 4, maxSuperfoods: 3, maxDrizzles: 2, volume: '500ml' },
  Superbraek: { price: 15.50, maxFruits: 5, maxSuperfoods: 4, maxDrizzles: 2, volume: '650ml' }
};

const BASE_OPTIONS = [
  { id: 'acai', name: 'Pure Brazilian Açai', desc: 'Zero added sugar, 100% wild harvested' },
  { id: 'pitaya', name: 'Açai & Pink Pitaya Swirl', desc: 'Vibrant pink dragonfruit antioxidant swirl' },
  { id: 'matcha', name: 'Açai + Matcha Chia Layer', desc: 'Ceremonial Uji matcha chia pudding layered base' }
];

const GRANOLA_OPTIONS = [
  'Artisanal Honey Almond Granola',
  'Cocoa Hazelnut Crunch',
  'Nut-Free Coconut Oat Crisp',
  'No Granola'
];

const FRUIT_OPTIONS = [
  { name: 'Strawberries', emoji: '🍓' },
  { name: 'Blueberries', emoji: '🫐' },
  { name: 'Banana Slices', emoji: '🍌' },
  { name: 'Alphonso Mango', emoji: '🥭' },
  { name: 'Kiwi Slices', emoji: '🥝' },
  { name: 'Passionfruit Pulp', emoji: '✨' }
];

const SUPERFOOD_OPTIONS = [
  { name: 'Chia Seeds', icon: '🌱' },
  { name: 'Cacao Nibs', icon: '🍫' },
  { name: 'Roasted Almond Flakes', icon: '🥜' },
  { name: 'Goji Berries', icon: '🍒' },
  { name: 'Toasted Coconut Ribbons', icon: '🥥' }
];

const DRIZZLE_OPTIONS = [
  { name: 'Speculoos Cookie Butter', tag: 'Top Pick' },
  { name: '100% Creamy Almond Butter', tag: 'Protein' },
  { name: 'Roasted Peanut Butter', tag: 'Classic' },
  { name: 'Decadent Dark Cocoa Fudge', tag: 'Indulgent' },
  { name: 'Organic Raw Honey', tag: 'Natural' }
];

export const InteractiveBowlStudio: React.FC<InteractiveBowlStudioProps> = ({
  onAddToCart,
  compact = false
}) => {
  const [size, setSize] = useState<'Regular' | 'Large' | 'Superbraek'>('Regular');
  const [base, setBase] = useState('Pure Brazilian Açai');
  const [granola, setGranola] = useState('Artisanal Honey Almond Granola');
  const [fruits, setFruits] = useState<string[]>(['Strawberries', 'Blueberries', 'Banana Slices']);
  const [superfoods, setSuperfoods] = useState<string[]>(['Chia Seeds']);
  const [drizzle, setDrizzle] = useState('Speculoos Cookie Butter');
  const [activeTab, setActiveTab] = useState<'fruits' | 'superfoods' | 'base' | 'granola' | 'drizzle'>('fruits');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentConfig = SIZE_CONFIGS[size];

  const handleToggleFruit = (item: string) => {
    if (fruits.includes(item)) {
      setFruits(fruits.filter(f => f !== item));
    } else {
      if (fruits.length < currentConfig.maxFruits) {
        setFruits([...fruits, item]);
      }
    }
  };

  const handleToggleSuperfood = (item: string) => {
    if (superfoods.includes(item)) {
      setSuperfoods(superfoods.filter(s => s !== item));
    } else {
      if (superfoods.length < currentConfig.maxSuperfoods) {
        setSuperfoods([...superfoods, item]);
      }
    }
  };

  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setSize(preset.size);
    setBase(preset.base);
    setGranola(preset.granola);
    setFruits(preset.fruits);
    setSuperfoods(preset.superfoods);
    setDrizzle(preset.drizzle);
  };

  const handleReset = () => {
    setSize('Regular');
    setBase('Pure Brazilian Açai');
    setGranola('Artisanal Honey Almond Granola');
    setFruits(['Banana Slices']);
    setSuperfoods(['Chia Seeds']);
    setDrizzle('Speculoos Cookie Butter');
  };

  const handleAddCustomToBag = () => {
    const summary = `${size} (${currentConfig.volume}) • ${base.split(' ')[0]} base • ${granola.split(' ')[0]} • Fruits: ${fruits.join(', ')} • ${superfoods.join(', ')} • ${drizzle}`;
    onAddToCart({
      id: `custom-composed-${Date.now()}`,
      name: `Custom Açai Bowl (${size})`,
      price: currentConfig.price,
      quantity: 1,
      details: summary,
      isCustomBowl: true
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
      {/* Studio Header Bar */}
      <div className="px-6 py-5 bg-gradient-to-r from-purple-50 via-amber-50/50 to-purple-50/30 border-b border-purple-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
              Live Interactive Composer
            </span>
          </div>
          <h2 className="font-brand-title text-2xl sm:text-3xl text-gray-900 mt-1">
            Compose Your Dream Açai Bowl
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Watch your bowl come to life in real-time as you select your fresh ingredients!
          </p>
        </div>

        {/* Preset Quick Loaders */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">Load Preset:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleLoadPreset(p)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 text-gray-700 transition-all cursor-pointer shadow-2xs"
            >
              {p.name.replace('The ', '')}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Reset Canvas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Visualizer + Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
        {/* Left Column: Live Visualizer & Capacity Meters */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-purple-50/40 via-amber-50/20 to-white rounded-3xl p-6 border border-purple-100/60 shadow-inner">
          {/* Bowl SVG Visualizer */}
          <BowlVisualizer
            base={base}
            granola={granola}
            fruits={fruits}
            superfoods={superfoods}
            drizzle={drizzle}
            size={size}
          />

          {/* Ingredient Slot Capacity Meters */}
          <div className="w-full mt-6 space-y-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs text-xs">
            {/* Fruits Capacity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-700 flex items-center">
                  🍓 Fresh Fruits Capacity:
                </span>
                <span className={`font-bold ${fruits.length === currentConfig.maxFruits ? 'text-emerald-600' : 'text-purple-700'}`}>
                  {fruits.length} / {currentConfig.maxFruits} max
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    fruits.length === currentConfig.maxFruits ? 'bg-emerald-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${(fruits.length / currentConfig.maxFruits) * 100}%` }}
                />
              </div>
              {fruits.length === currentConfig.maxFruits ? (
                <p className="text-[10px] text-emerald-700 font-medium mt-1">
                  ✓ Max fruits reached for {size} bowl
                </p>
              ) : (
                <p className="text-[10px] text-gray-400 mt-1">
                  Add {currentConfig.maxFruits - fruits.length} more fruit{currentConfig.maxFruits - fruits.length > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Superfoods Capacity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-700 flex items-center">
                  ✨ Superfoods Capacity:
                </span>
                <span className={`font-bold ${superfoods.length === currentConfig.maxSuperfoods ? 'text-emerald-600' : 'text-purple-700'}`}>
                  {superfoods.length} / {currentConfig.maxSuperfoods} max
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    superfoods.length === currentConfig.maxSuperfoods ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${(superfoods.length / currentConfig.maxSuperfoods) * 100}%` }}
                />
              </div>
            </div>

            {/* Calories & Info */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
              <span className="flex items-center font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-500 mr-1" />
                Est. ~{size === 'Regular' ? '340' : size === 'Large' ? '460' : '580'} kcal
              </span>
              <span className="text-gray-400">100% Organic &amp; Gluten-free options</span>
            </div>
          </div>
        </div>

        {/* Right Column: Ingredient Selection Interface */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Bowl Size */}
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-purple-900 mb-2 block">
              1. Choose Bowl Size &amp; Volume
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['Regular', 'Large', 'Superbraek'] as const).map((s) => {
                const cfg = SIZE_CONFIGS[s];
                const isSelected = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      // trim if exceeds new limits
                      if (fruits.length > cfg.maxFruits) setFruits(fruits.slice(0, cfg.maxFruits));
                      if (superfoods.length > cfg.maxSuperfoods) setSuperfoods(superfoods.slice(0, cfg.maxSuperfoods));
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300/60 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">{s}</span>
                      <span className="font-semibold text-purple-900 text-xs">
                        S${cfg.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {cfg.volume} • Up to {cfg.maxFruits} fruits
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Steps Navigation */}
          <div className="border-b border-gray-200 flex space-x-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('fruits')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'fruits'
                  ? 'border-purple-600 text-purple-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <span>Fresh Fruits</span>
              <span className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded-full">
                {fruits.length}/{currentConfig.maxFruits}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('superfoods')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'superfoods'
                  ? 'border-purple-600 text-purple-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <span>Superfoods</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full">
                {superfoods.length}/{currentConfig.maxSuperfoods}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('base')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'base'
                  ? 'border-purple-600 text-purple-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Açai Base
            </button>

            <button
              onClick={() => setActiveTab('granola')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'granola'
                  ? 'border-purple-600 text-purple-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Granola
            </button>

            <button
              onClick={() => setActiveTab('drizzle')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'drizzle'
                  ? 'border-purple-600 text-purple-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Drizzle
            </button>
          </div>

          {/* Tab Content 1: Fruits */}
          {activeTab === 'fruits' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  Select up to <strong>{currentConfig.maxFruits}</strong> fresh fruits:
                </span>
                <span className="text-purple-700 font-bold">
                  {fruits.length}/{currentConfig.maxFruits} selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FRUIT_OPTIONS.map((f) => {
                  const isSelected = fruits.includes(f.name);
                  const isLimitReached = !isSelected && fruits.length >= currentConfig.maxFruits;
                  return (
                    <button
                      key={f.name}
                      onClick={() => handleToggleFruit(f.name)}
                      disabled={isLimitReached}
                      className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-1 ring-purple-400'
                          : isLimitReached
                          ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{f.emoji}</span>
                        <span className="truncate">{f.name}</span>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-purple-700 stroke-[3]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content 2: Superfoods */}
          {activeTab === 'superfoods' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  Select up to <strong>{currentConfig.maxSuperfoods}</strong> superfoods:
                </span>
                <span className="text-purple-700 font-bold">
                  {superfoods.length}/{currentConfig.maxSuperfoods} selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SUPERFOOD_OPTIONS.map((s) => {
                  const isSelected = superfoods.includes(s.name);
                  const isLimitReached = !isSelected && superfoods.length >= currentConfig.maxSuperfoods;
                  return (
                    <button
                      key={s.name}
                      onClick={() => handleToggleSuperfood(s.name)}
                      disabled={isLimitReached}
                      className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-1 ring-purple-400'
                          : isLimitReached
                          ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{s.icon}</span>
                        <span className="truncate">{s.name}</span>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-purple-700 stroke-[3]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content 3: Base */}
          {activeTab === 'base' && (
            <div className="space-y-2.5">
              {BASE_OPTIONS.map((b) => {
                const isSelected = base === b.name;
                return (
                  <div
                    key={b.id}
                    onClick={() => setBase(b.name)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">{b.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{b.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab Content 4: Granola */}
          {activeTab === 'granola' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GRANOLA_OPTIONS.map((g) => {
                const isSelected = granola === g;
                return (
                  <button
                    key={g}
                    onClick={() => setGranola(g)}
                    className={`p-3 rounded-2xl border text-xs text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab Content 5: Drizzle */}
          {activeTab === 'drizzle' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DRIZZLE_OPTIONS.map((d) => {
                const isSelected = drizzle === d.name;
                return (
                  <button
                    key={d.name}
                    onClick={() => setDrizzle(d.name)}
                    className={`p-3 rounded-2xl border text-xs text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div>
                      <span>{d.name}</span>
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {d.tag}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-gray-400 block uppercase tracking-wider">
                Composed Bowl Price
              </span>
              <span className="font-brand-title text-3xl font-bold text-gray-900">
                S${currentConfig.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddCustomToBag}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-2 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 shadow-amber-200/50'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-purple-950" />
                  <span>Add Composed Bowl • S${currentConfig.price.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
