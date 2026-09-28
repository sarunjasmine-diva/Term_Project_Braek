import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Check, Clock, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess?: (items: CartItem[], total: number) => void;
  initialDiscountCode?: string | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  initialDiscountCode,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [pickupTime, setPickupTime] = useState('15 mins');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Automatically apply promo if passed from Member area
  useEffect(() => {
    if (initialDiscountCode) {
      setPromoCode(initialDiscountCode);
      const code = initialDiscountCode.trim().toUpperCase();
      if (code === 'SMU10' || code === 'BRAEK' || code === 'STUDENT') {
        setAppliedDiscount(0.1);
        setPromoError('');
      } else if (code === 'BRAEK3OFF') {
        setAppliedDiscount(0.2); // ~approx
        setPromoError('');
      }
    }
  }, [initialDiscountCode]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const total = Math.max(0, subtotal - discountAmount);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SMU10' || code === 'BRAEK' || code === 'STUDENT') {
      setAppliedDiscount(0.1); // 10% off
      setPromoError('');
    } else if (code === 'BRAEK3OFF') {
      setAppliedDiscount(0.2); // ~S$3 off
      setPromoError('');
    } else if (code === 'FREECOFFEE' || code === 'FREESUPER') {
      setAppliedDiscount(0.25);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "SMU10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(newId);
      setOrderComplete(true);

      if (onOrderSuccess) {
        onOrderSuccess(items, total);
      }
    }, 1000);
  };

  const handleResetOrder = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-purple-50/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#7c6696]" />
              <h3 className="font-brand-title text-xl text-gray-900">
                Your Order Bag
              </h3>
              <span className="text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {orderComplete ? (
            <div className="p-8 text-center flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-brand-title text-2xl text-gray-900 mb-1">
                Order Received!
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Your bowl is being handcrafted with love. Wellness points &amp; bowl count have been added to your member account!
              </p>

              <div className="bg-[#b19ec8]/15 border border-purple-200/80 rounded-2xl p-5 w-full text-left space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-purple-200/50 pb-2">
                  <span className="text-xs text-gray-500">Pickup Token</span>
                  <span className="font-brand-title text-xl font-bold text-purple-950">
                    {orderId}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-[#7c6696]" />
                  <span>Estimated Ready: <strong>{pickupTime}</strong></span>
                </div>
                <div className="flex items-center text-xs text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-[#7c6696]" />
                  <span>Collect at: <strong>SMU Li Ka Shing Library #B1-25</strong></span>
                </div>
              </div>

              <button
                onClick={handleResetOrder}
                className="w-full py-3 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <ShoppingBag className="w-12 h-12 stroke-1 text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-600">Your bag is empty</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Explore our wholesome menu to compose fresh açai bowls, smoothies, and artisan coffee!
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Item List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{item.name}</span>
                        <span>S${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      {item.details && (
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                          {item.details}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="font-semibold text-gray-800 text-xs w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Pickup timing */}
              <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 text-xs">
                <label className="font-bold text-gray-800 flex items-center mb-1.5">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                  Pickup Timing at #B1-25
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none"
                >
                  <option value="15 mins">Ready in ~15 mins (Standard)</option>
                  <option value="30 mins">Ready in ~30 mins</option>
                  <option value="45 mins">Ready in ~45 mins</option>
                  <option value="Later today">Schedule for later today</option>
                </select>
              </div>

              {/* Promo code */}
              <div className="text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. SMU10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-400 text-xs uppercase"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl font-medium text-xs hover:bg-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-emerald-700 font-medium text-[11px] mt-1.5 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" /> Discount voucher applied!
                  </p>
                )}
                {promoError && (
                  <p className="text-red-500 text-[11px] mt-1.5">{promoError}</p>
                )}
              </div>
            </div>
          )}

          {/* Footer Subtotal & Action */}
          {!orderComplete && items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/70 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>S${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-S${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-sm border-t border-gray-200 pt-2">
                  <span>Total Amount</span>
                  <span>S${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isCheckingOut ? 'Preparing Order...' : `Pre-Order for Pickup • S$${total.toFixed(2)}`}
              </button>

              <p className="text-[10px] text-center text-gray-400">
                Pay upon pickup at SMU Li Ka Shing Library #B1-25 (PayNow / Cards accepted)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
