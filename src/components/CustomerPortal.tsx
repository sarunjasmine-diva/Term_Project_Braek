import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Award,
  Tag,
  Clock,
  Sparkles,
  QrCode,
  LogOut,
  ChevronRight,
  Check,
  Gift,
  ArrowRight,
  Flame,
  Plus,
  Minus
} from 'lucide-react';
import { CustomerProfile, CustomerOrder, CustomerDiscount, RewardStage, CartItem } from '../types';
import { getRewardsProgressWording, REWARD_STAGES } from '../data/customerData';

interface CustomerPortalProps {
  customer: CustomerProfile | null;
  orders: CustomerOrder[];
  discounts: CustomerDiscount[];
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
  onUpdateBowlsCount: (newCount: number) => void;
  onApplyDiscountToCart: (code: string) => void;
  onReorder: (items: CartItem[]) => void;
  onBackToHome?: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  customer,
  orders,
  discounts,
  onLogin,
  onLogout,
  onUpdateBowlsCount,
  onApplyDiscountToCart,
  onReorder,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'rewards' | 'orders' | 'discounts'>('rewards');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // If not logged in, show sleek login screen
  if (!customer) {
    return (
      <div className="min-h-screen bg-[#faf8f2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-purple-100 shadow-xl">
          <div className="text-center mb-6">
            <span className="logo-font text-4xl font-bold tracking-tight text-black flex items-center justify-center">
              br<span className="text-[#8e75ab] font-serif font-normal italic">æ</span>k<span className="text-black font-serif">.</span>
            </span>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">
              Member Sanctuary &amp; Rewards
            </p>
            <h2 className="font-brand-title text-2xl text-gray-900 mt-4">
              Sign In to Your Account
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Track your açai bowls, view discounts, and collect tier rewards!
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(loginEmail || 'sarunjasmine@gmail.com', 'Jasmine Sarun');
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="sarunjasmine@gmail.com"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Sign In to Rewards
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 block mb-2">
              For instant preview:
            </span>
            <button
              onClick={() => onLogin('sarunjasmine@gmail.com', 'Jasmine Sarun')}
              className="w-full py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs border border-purple-200 transition-colors cursor-pointer"
            >
              🚀 1-Click Demo Login (Jasmine Sarun • 2 Bowls)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Wording logic for the Progress Bar based on bowls purchased
  const wording = getRewardsProgressWording(customer.bowlsPurchased);
  const totalStages = 10;
  const progressPercent = Math.min(100, (customer.bowlsPurchased / totalStages) * 100);

  const handleCopyCode = (code: string) => {
    onApplyDiscountToCart(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f2] pb-24">
      {/* Top Profile Header */}
      <section className="bg-gradient-to-b from-[#b19ec8]/35 via-amber-50/40 to-[#faf8f2] pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-purple-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center space-x-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-200 to-amber-100 flex items-center justify-center text-purple-900 font-bold text-2xl border-4 border-white shadow-md flex-shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-brand-title text-2xl sm:text-3xl text-gray-900">
                    {customer.name}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {customer.tier}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {customer.email} • Member since {customer.memberSince}
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-3 mt-3">
                  <span className="text-xs font-bold text-gray-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                    {customer.points} Wellness Points
                  </span>
                  <span className="text-xs text-purple-800 font-medium bg-purple-50 px-3 py-1 rounded-full">
                    🥣 {customer.bowlsPurchased} Bowls Enjoyed
                  </span>
                </div>
              </div>
            </div>

            {/* In-Store Barcode / Quick Actions */}
            <div className="flex flex-col items-center md:items-end space-y-3">
              <div className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-2xl flex items-center space-x-3">
                <QrCode className="w-7 h-7 text-gray-800" />
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">
                    Store Scan Pass
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-800">
                    {customer.memberQrCode}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-8 flex justify-center space-x-2 border-b border-gray-200 pb-3">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'rewards'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Rewards &amp; Progress Bar</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'orders'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('discounts')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'discounts'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Active Discounts &amp; Vouchers ({discounts.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: REWARDS & MULTI-STAGE PROGRESS BAR */}
        {activeTab === 'rewards' && (
          <div className="space-y-8">
            {/* REQUIREMENT 4: DYNAMIC PROGRESS BAR WITH STAGES */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                    Açai Milestone Journey
                  </span>
                  {/* Dynamic wording according to user requirement */}
                  <h3 className="font-brand-title text-2xl sm:text-3xl text-gray-900 mt-2">
                    {wording.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                    {wording.subtext}
                  </p>
                </div>

                {/* Interactive Simulator Controller */}
                <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/80 flex items-center space-x-3 text-xs self-start md:self-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-800 block">
                      Bowl Simulator
                    </span>
                    <span className="text-gray-600 font-medium">
                      Test Stage Wording:
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onUpdateBowlsCount(Math.max(0, customer.bowlsPurchased - 1))}
                      disabled={customer.bowlsPurchased <= 0}
                      className="w-7 h-7 rounded-lg bg-white border border-purple-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                      title="Decrease Bowl Count"
                    >
                      <Minus className="w-3 h-3 text-gray-700" />
                    </button>
                    <span className="font-bold text-purple-950 w-6 text-center text-sm">
                      {customer.bowlsPurchased}
                    </span>
                    <button
                      onClick={() => onUpdateBowlsCount(Math.min(12, customer.bowlsPurchased + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-purple-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                      title="Add Simulated Bowl"
                    >
                      <Plus className="w-3 h-3 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar Track with Visual Milestones */}
              <div className="relative pt-6 pb-4">
                {/* Background track */}
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#b19ec8] via-[#7c6696] to-[#fef08a] transition-all duration-500 rounded-full shadow-inner"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* 4 Milestone Stage Points */}
                <div className="grid grid-cols-4 mt-4 gap-2 text-center">
                  {REWARD_STAGES.map((stg) => {
                    const isPassed = customer.bowlsPurchased >= stg.bowlsRequired;
                    const isNextTarget = customer.bowlsPurchased < stg.bowlsRequired &&
                      (stg.stage === 1 || customer.bowlsPurchased >= (REWARD_STAGES[stg.stage - 2]?.bowlsRequired || 0));

                    return (
                      <div key={stg.stage} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                            isPassed
                              ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                              : isNextTarget
                              ? 'bg-purple-600 text-white ring-4 ring-purple-100 animate-pulse'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : stg.stage}
                        </div>
                        <span className="font-bold text-gray-900 text-xs mt-2">
                          {stg.bowlsRequired} Bowl{stg.bowlsRequired > 1 ? 's' : ''}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium mt-0.5 line-clamp-1">
                          {stg.perkBadge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick stage toggle buttons for instant testing */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-gray-400 text-[11px]">
                  Jump to specific progress stage:
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateBowlsCount(1)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                      customer.bowlsPurchased <= 2
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Start (1-2 Bowls)
                  </button>
                  <button
                    onClick={() => onUpdateBowlsCount(5)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                      customer.bowlsPurchased >= 3 && customer.bowlsPurchased < 8
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Midway (5 Bowls)
                  </button>
                  <button
                    onClick={() => onUpdateBowlsCount(9)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                      customer.bowlsPurchased >= 8
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Almost There (9 Bowls)
                  </button>
                </div>
              </div>
            </div>

            {/* Stages Detail Cards */}
            <div>
              <h3 className="font-brand-title text-xl text-gray-900 mb-4 flex items-center">
                <Gift className="w-5 h-5 text-purple-700 mr-2" />
                Rewards to be Collected at Different Stages
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REWARD_STAGES.map((stg) => {
                  const isUnlocked = customer.bowlsPurchased >= stg.bowlsRequired;
                  return (
                    <div
                      key={stg.stage}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                        isUnlocked
                          ? 'bg-white border-emerald-200 shadow-sm'
                          : 'bg-white/60 border-gray-200 opacity-80'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isUnlocked
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {isUnlocked ? 'Unlocked & Active' : `Requires ${stg.bowlsRequired} Bowls`}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            Stage {stg.stage}
                          </span>
                        </div>

                        <h4 className="font-brand-title text-lg text-gray-900">
                          {stg.title}
                        </h4>

                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {stg.rewardDescription}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        {isUnlocked ? (
                          <span className="text-emerald-700 font-bold flex items-center">
                            <Check className="w-4 h-4 mr-1 text-emerald-600" />
                            Ready to Redeem at Counter
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            {stg.bowlsRequired - customer.bowlsPurchased} more bowl{stg.bowlsRequired - customer.bowlsPurchased > 1 ? 's' : ''} needed
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-purple-800">
                          {stg.perkBadge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-brand-title text-xl text-gray-900">
                Your Previous Orders
              </h3>
              <span className="text-xs text-gray-500">
                Ordered at Li Ka Shing Library #B1-25
              </span>
            </div>

            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {ord.id}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{ord.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {ord.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 pt-1">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>
                          <strong>{it.quantity}x</strong> {it.name}{' '}
                          {it.details && (
                            <span className="text-gray-400 block text-[11px] sm:inline">
                              ({it.details})
                            </span>
                          )}
                        </span>
                        <span className="font-semibold">
                          S${(it.price * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 pt-2 text-[11px] text-gray-500 border-t border-gray-100">
                    <span>
                      Earned: <strong>+{ord.pointsEarned} pts</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Bowls Counted: <strong>+{ord.bowlsCount}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                  <div className="text-left md:text-right mb-2">
                    <span className="text-gray-400 text-[10px] block">
                      Total Paid
                    </span>
                    <span className="font-brand-title text-xl text-gray-900 font-bold">
                      S${ord.total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const reorderItems: CartItem[] = ord.items.map((item, idx) => ({
                        id: `reorder-${ord.id}-${idx}`,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        details: item.details
                      }));
                      onReorder(reorderItems);
                    }}
                    className="px-4 py-2 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    Reorder Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DISCOUNTS & VOUCHERS */}
        {activeTab === 'discounts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-brand-title text-xl text-gray-900">
                Discounts &amp; Promotional Vouchers
              </h3>
              <span className="text-xs text-gray-500">
                Apply directly to your order bag
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discounts.map((disc) => {
                const isActive = disc.status === 'active';
                return (
                  <div
                    key={disc.id}
                    className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                      isActive ? 'border-purple-200 shadow-sm' : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono font-bold text-xs bg-purple-100 text-purple-900 px-3 py-1 rounded-lg">
                          {disc.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {disc.status}
                        </span>
                      </div>

                      <h4 className="font-brand-title text-lg text-gray-900">
                        {disc.title}
                      </h4>

                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {disc.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">
                        {disc.expiry}
                      </span>

                      {isActive ? (
                        <button
                          onClick={() => handleCopyCode(disc.code)}
                          className="px-4 py-1.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                        >
                          {copiedCode === disc.code ? 'Applied!' : 'Apply to Bag'}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic">
                          Locked (Reach Stage)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
