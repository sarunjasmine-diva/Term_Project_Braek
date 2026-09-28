import React, { useState } from 'react';
import { Check, Sparkles, Building2, Coffee, ShieldCheck, Send, ArrowRight } from 'lucide-react';
import { BearCupIllustration } from './BrandIllustrations';

export const CorporateScreen: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<'mini' | 'live' | 'executive'>('mini');
  const [headcount, setHeadcount] = useState<number>(30);
  const [addCoffeeCambro, setAddCoffeeCambro] = useState<boolean>(true);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pricing calculation
  const packagePrices = {
    mini: { unit: 6.50, name: 'Mini Açai Cups Catering Box', desc: 'Individually sealed 180ml cups with granola & fresh fruits' },
    live: { unit: 12.00, name: 'Live Interactive Açai Bar', desc: 'Staffed live station with customized toppings bar for your team' },
    executive: { unit: 16.00, name: 'Executive Bowl & Coffee Set', desc: 'Large premium bowls paired with fresh bottled Cold Brew / Matcha' }
  };

  const unitRate = packagePrices[selectedPackage].unit;
  const cambroPrice = addCoffeeCambro ? Math.ceil(headcount / 15) * 48 : 0;
  const subtotal = headcount * unitRate + cambroPrice;
  const deliveryFee = headcount >= 50 ? 0 : 25;
  const estimatedTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#b19ec8]/35 via-amber-50/40 to-neutral-50/50 pt-14 pb-12 px-4 sm:px-6 lg:px-8 border-b border-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <BearCupIllustration className="w-24 h-24" />
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7c6696] mb-2 px-3 py-1 rounded-full bg-purple-100">
            Corporate Wellness &amp; Events
          </span>

          <h1 className="font-brand-title text-4xl sm:text-5xl text-gray-900 mb-3">
            Infuse Your Team with Açai Enjoyment
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            Elevate the collective spirit with our delicious açai offerings brought directly to your office, seminar, campus gathering, or brand activation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Calculator & Packages */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Choose Package */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-xs">
              <h3 className="font-brand-title text-xl text-gray-900 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-purple-700" />
                1. Select Catering Format
              </h3>

              <div className="space-y-3">
                {(['mini', 'live', 'executive'] as const).map((key) => {
                  const pkg = packagePrices[key];
                  const isSelected = selectedPackage === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/60 ring-2 ring-[#b19ec8]/40 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {pkg.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {pkg.desc}
                          </p>
                        </div>
                        <span className="font-bold text-purple-900 text-sm ml-4 whitespace-nowrap">
                          S${pkg.unit.toFixed(2)} / pax
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Headcount Slider */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-brand-title text-xl text-gray-900">
                  2. Headcount
                </h3>
                <span className="font-bold text-purple-900 text-lg bg-purple-100 px-3 py-0.5 rounded-full">
                  {headcount} Pax
                </span>
              </div>

              <input
                type="range"
                min="15"
                max="250"
                step="5"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7c6696]"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-medium">
                <span>15 pax (Min)</span>
                <span>50 pax (Free Delivery)</span>
                <span>150+ pax</span>
                <span>250 pax</span>
              </div>
            </div>

            {/* Step 3: Coffee Add-on */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Add Specialty Coffee Beverage Station
                    </h4>
                    <p className="text-xs text-gray-500">
                      Thermal Cambro dispenser with oat milk, single origin beans &amp; cups (S$48 / 15 cups)
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={addCoffeeCambro}
                  onChange={(e) => setAddCoffeeCambro(e.target.checked)}
                  className="w-5 h-5 rounded text-[#7c6696] focus:ring-purple-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>GeBIZ &amp; E-Invoicing</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Organic Açai</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>CBD On-Time Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Summary & Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-200/80 shadow-md sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7 stroke-[3]" />
                  </div>
                  <h3 className="font-brand-title text-2xl text-gray-900 mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                    Thank you, <strong>{contactName}</strong>! Our corporate team from Fei Mao Food Services Pte. Ltd. will send a formal quote &amp; menu spec to <strong>{email}</strong> within 3 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Edit / New Estimate
                  </button>
                </div>
              ) : (
                <>
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      Estimated Cost Calculator
                    </span>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xs text-gray-500">
                        {packagePrices[selectedPackage].name} ({headcount} pax)
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        S${(headcount * unitRate).toFixed(2)}
                      </span>
                    </div>

                    {addCoffeeCambro && (
                      <div className="flex justify-between items-baseline text-xs text-gray-500 mt-1">
                        <span>Specialty Coffee Cambros</span>
                        <span className="font-semibold text-gray-900">
                          S${cambroPrice.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline text-xs text-gray-500 mt-1">
                      <span>Singapore CBD Delivery</span>
                      <span className="font-semibold text-gray-900">
                        {deliveryFee === 0 ? 'FREE (≥50 pax)' : `S$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline border-t border-dashed border-gray-200 pt-3 mt-3">
                      <span className="font-bold text-gray-900 text-sm">
                        Estimated Total:
                      </span>
                      <span className="font-brand-title text-2xl text-purple-950 font-bold">
                        ~S${estimatedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Booking Request Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">
                        Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. DBS Bank / SMU Society"
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+65 9123 4567"
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">
                        Delivery Address / Venue in Singapore
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Marina Bay Financial Centre Tower 2, Level 18"
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">
                        Special Requests / Dietary Needs
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Nut allergies, vegan, live station setup timing..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 mt-2 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5 mr-2" />
                      Request Formal Quotation
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
