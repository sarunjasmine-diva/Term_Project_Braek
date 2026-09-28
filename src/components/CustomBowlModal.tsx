import React, { useState } from 'react';
import { X, Check, Sparkles, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CustomBowlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const SIZES = [
  { name: 'Regular', price: 9.90, desc: '350ml • 1 Granola + 3 Fruits + 2 Superfoods + 1 Drizzle' },
  { name: 'Large', price: 12.50, desc: '500ml • 1 Granola + 4 Fruits + 3 Superfoods + 2 Drizzles' },
  { name: 'Superbraek', price: 15.50, desc: '650ml • Double Base + Unlimited Crunch + 2 Drizzles' }
] as const;

const BASES = [
  { id: 'classic', name: 'Classic Pure Organic Açai', desc: 'Thick Brazilian wild-harvested açai with zero added sugar', color: 'bg-purple-900' },
  { id: 'pitaya-swirl', name: 'Açai & Pink Pitaya Swirl', desc: 'Vibrant blend of dragonfruit & açai antioxidant booster', color: 'bg-pink-700' },
  { id: 'matcha-layer', name: 'Açai + Matcha Chia Layer', desc: 'Japanese Uji matcha chia pudding layered with dark açai', color: 'bg-emerald-800' }
];

const GRANOLAS = ['Artisanal Honey Almond Granola', 'Cocoa Hazelnut Crunch', 'Nut-Free Coconut Oat Crisp', 'No Granola (Extra Fruit)'];

const FRUITS = [
  { name: 'Strawberries', icon: '🍓' },
  { name: 'Blueberries', icon: '🫐' },
  { name: 'Bananas', icon: '🍌' },
  { name: 'Alphonso Mango', icon: '🥭' },
  { name: 'Kiwi Slices', icon: '🥝' },
  { name: 'Passionfruit Pulp', icon: '✨' }
];

const SUPERFOODS = [
  'Chia Seeds',
  'Cacao Nibs',
  'Roasted Almond Flakes',
  'Goji Berries',
  'Toasted Coconut Ribbons',
  'Hemp Hearts'
];

const DRIZZLES = [
  'Speculoos Cookie Butter',
  '100% Creamy Almond Butter',
  'Roasted Peanut Butter',
  'Decadent Dark Cocoa Fudge',
  'Organic Raw Honey'
];

export const CustomBowlModal: React.FC<CustomBowlModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [size, setSize] = useState<'Regular' | 'Large' | 'Superbraek'>('Regular');
  const [base, setBase] = useState('Classic Pure Organic Açai');
  const [granola, setGranola] = useState('Artisanal Honey Almond Granola');
  const [selectedFruits, setSelectedFruits] = useState<string[]>(['Strawberries', 'Blueberries', 'Bananas']);
  const [selectedSuperfoods, setSelectedSuperfoods] = useState<string[]>(['Chia Seeds', 'Cacao Nibs']);
  const [drizzle, setDrizzle] = useState('Speculoos Cookie Butter');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const currentSizeObj = SIZES.find(s => s.name === size) || SIZES[0];
  const maxFruits = size === 'Regular' ? 3 : size === 'Large' ? 4 : 5;
  const maxSuperfoods = size === 'Regular' ? 2 : size === 'Large' ? 3 : 4;

  const toggleFruit = (name: string) => {
    if (selectedFruits.includes(name)) {
      setSelectedFruits(selectedFruits.filter(f => f !== name));
    } else {
      if (selectedFruits.length < maxFruits) {
        setSelectedFruits([...selectedFruits, name]);
      }
    }
  };

  const toggleSuperfood = (item: string) => {
    if (selectedSuperfoods.includes(item)) {
      setSelectedSuperfoods(selectedSuperfoods.filter(s => s !== item));
    } else {
      if (selectedSuperfoods.length < maxSuperfoods) {
        setSelectedSuperfoods([...selectedSuperfoods, item]);
      }
    }
  };

  const handleAdd = () => {
    const summary = `${size} • ${base.split(' ')[0]} base • ${granola.split(' ')[0]} • Fruits: ${selectedFruits.join(', ')} • ${selectedSuperfoods.join(', ')} • ${drizzle}`;
    onAddToCart({
      id: `custom-bowl-${Date.now()}`,
      name: `Custom Açai Bowl (${size})`,
      price: currentSizeObj.price,
      quantity: 1,
      details: summary + (instructions ? ` (Note: ${instructions})` : ''),
      isCustomBowl: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-amber-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#fef08a] flex items-center justify-center text-gray-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-purple-800" />
            </div>
            <div>
              <h3 className="font-brand-title text-xl text-gray-900">
                Build-Your-Own Açai Bowl
              </h3>
              <p className="text-xs text-gray-500">
                Freshly hand-crafted at Li Ka Shing Library #B1-25
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Visual Bowl Layering Preview */}
          <div className="bg-[#b19ec8]/20 p-4 rounded-2xl border border-purple-200/60 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#4d1c52] shadow-md flex items-center justify-center relative overflow-hidden flex-shrink-0 ring-4 ring-white">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="text-2xl select-none z-10">
                {selectedFruits[0] === 'Strawberries' ? '🍓' : selectedFruits[0] === 'Blueberries' ? '🫐' : '🍌'}
              </span>
              <div className="absolute bottom-1 text-[8px] font-bold text-white tracking-widest uppercase bg-black/40 px-1 rounded">
                {size}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="font-bold text-gray-900 flex items-center justify-between">
                <span>{size} Bowl Preview</span>
                <span className="text-purple-800 font-bold text-sm">
                  S${currentSizeObj.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mt-1 line-clamp-2">
                <strong>Base:</strong> {base} • <strong>Granola:</strong> {granola} • <strong>Drizzle:</strong> {drizzle}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedFruits.map(f => (
                  <span key={f} className="bg-white/80 px-2 py-0.5 rounded-full text-[11px] font-medium text-gray-700 shadow-2xs">
                    {f}
                  </span>
                ))}
                {selectedSuperfoods.map(s => (
                  <span key={s} className="bg-purple-100/90 px-2 py-0.5 rounded-full text-[11px] font-medium text-purple-800">
                    +{s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 1: Size */}
          <div>
            <label className="font-semibold text-gray-900 block mb-2 text-xs uppercase tracking-wider text-purple-900">
              1. Choose Your Bowl Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SIZES.map(s => (
                <button
                  key={s.name}
                  onClick={() => setSize(s.name)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    size === s.name
                      ? 'border-[#7c6696] bg-purple-50/70 shadow-xs ring-2 ring-[#b19ec8]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900">{s.name}</span>
                    <span className="font-semibold text-purple-900 text-xs">
                      S${s.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Base */}
          <div>
            <label className="font-semibold text-gray-900 block mb-2 text-xs uppercase tracking-wider text-purple-900">
              2. Select Your Base
            </label>
            <div className="space-y-2">
              {BASES.map(b => (
                <label
                  key={b.id}
                  onClick={() => setBase(b.name)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    base === b.name
                      ? 'border-[#7c6696] bg-purple-50/70'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      base === b.name
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {base === b.name && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Granola */}
          <div>
            <label className="font-semibold text-gray-900 block mb-2 text-xs uppercase tracking-wider text-purple-900">
              3. Crunchy Granola
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GRANOLAS.map(g => (
                <button
                  key={g}
                  onClick={() => setGranola(g)}
                  className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    granola === g
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{g}</span>
                  {granola === g && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Fresh Fruits */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-900 text-xs uppercase tracking-wider text-purple-900">
                4. Fresh Fruits ({selectedFruits.length}/{maxFruits})
              </label>
              <span className="text-[11px] text-gray-500">Pick up to {maxFruits}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FRUITS.map(f => {
                const isSelected = selectedFruits.includes(f.name);
                return (
                  <button
                    key={f.name}
                    onClick={() => toggleFruit(f.name)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold ring-1 ring-purple-400'
                        : selectedFruits.length >= maxFruits
                        ? 'opacity-50 border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="text-base">{f.icon}</span>
                    <span className="truncate">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Superfoods */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-900 text-xs uppercase tracking-wider text-purple-900">
                5. Superfood Boosts ({selectedSuperfoods.length}/{maxSuperfoods})
              </label>
              <span className="text-[11px] text-gray-500">Pick up to {maxSuperfoods}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUPERFOODS.map(item => {
                const isSelected = selectedSuperfoods.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleSuperfood(item)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold ring-1 ring-purple-400'
                        : selectedSuperfoods.length >= maxSuperfoods
                        ? 'opacity-50 border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="truncate">{item}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-purple-700 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 6: Drizzle */}
          <div>
            <label className="font-semibold text-gray-900 block mb-2 text-xs uppercase tracking-wider text-purple-900">
              6. Signature Drizzle
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DRIZZLES.map(d => (
                <button
                  key={d}
                  onClick={() => setDrizzle(d)}
                  className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    drizzle === d
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{d}</span>
                  {drizzle === d && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="font-medium text-gray-700 block mb-1 text-xs">
              Special Instructions (Allergies, extra crunchy, side sauce, etc.)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Please put granola on the side"
              className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block">Total Price</span>
            <span className="text-xl font-bold text-gray-900">
              S${currentSizeObj.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add to Bag • S${currentSizeObj.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};
