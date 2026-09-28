import React from 'react';
import { X, Heart, Leaf, Coffee, Smile } from 'lucide-react';
import { BearApronIllustration } from './BrandIllustrations';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu: () => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Graphic */}
        <div className="bg-[#b19ec8]/30 pt-8 pb-6 px-6 text-center relative border-b border-purple-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-white/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-28 h-28 mx-auto mb-2">
            <BearApronIllustration className="w-28 h-28" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#7c6696] px-3 py-1 rounded-full bg-white/70">
            Our Mission &amp; Story
          </span>
          <h3 className="font-brand-title text-3xl text-gray-900 mt-2">
            Give Me a Bræk.
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-sm text-gray-600 leading-relaxed">
          <p>
            In a fast-paced city where productivity is constantly measured in output and speed, <strong>bræk.</strong> was born out of a simple belief: <em>taking a pause is not a luxury, it is a human necessity.</em>
          </p>

          <p>
            Nestled inside the Li Ka Shing Library at SMU (#B1-25), we built a cozy haven for students, faculty, and city workers alike to slow down their breathing, reconnect with friends, and recharge with nutritious fuel.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs mb-1">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Wild Amazonian Açai</span>
              </div>
              <p className="text-[11px] text-gray-600">
                100% organic, hand-harvested in Brazil with no fillers or refined sugar syrups.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
              <div className="flex items-center space-x-2 text-purple-900 font-bold text-xs mb-1">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Nurturing Space</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Warm lighting, mindful acoustics, and heartfelt hospitality to recharge your spirit.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs mb-1">
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Community Smiles</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Free exam wellness shots, sip &amp; paint nights, and campus society support.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
              <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs mb-1">
                <Coffee className="w-4 h-4 text-amber-700" />
                <span>Artisan Coffee</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Fair-trade single-origin espresso and Japanese ceremonial matcha.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Fei Mao Food Services Pte. Ltd.
            </span>
            <button
              onClick={() => {
                onClose();
                onExploreMenu();
              }}
              className="px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Explore Our Treats →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
