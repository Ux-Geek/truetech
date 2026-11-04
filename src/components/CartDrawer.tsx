import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [orderRef, setOrderRef] = useState('');
  const [customer, setCustomer] = useState({
    name: 'Samsudeen Afolabi',
    phone: '+234 802 345 6789',
    email: 'samsudeenafolabi@gmail.com',
    address: '14 Victoria Island Tech Hub, Adeola Odeku',
    city: 'Lagos',
    state: 'Lagos State',
    paymentMethod: 'cod', // Cash on Delivery or Card
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3500;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => `₦ ${amount.toLocaleString()}`;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'TRUETECH10' || clean === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% discount applied successfully!', success: true });
    } else if (clean === 'TECH20') {
      setDiscountPercent(20);
      setPromoMessage({ text: 'VIP 20% discount applied!', success: true });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "TRUETECH10"', success: false });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `TT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);
    setCheckoutStep('success');
  };

  const handleFinishOrder = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('form');
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-black text-white">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wide">
                YOUR <span className="text-blue-500">CART</span>
              </span>
              <span className="bg-gray-800 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100/60 text-xs text-gray-700">
            {subtotal >= 50000 ? (
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <Truck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>You unlocked <strong>FREE nationwide delivery</strong>!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Add <strong>{formatPrice(50000 - subtotal)}</strong> more for FREE delivery</span>
                  <span className="text-blue-700 font-semibold">{Math.min(100, Math.round((subtotal / 50000) * 100))}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 50000) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                  <Truck className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="text-gray-900 font-semibold text-base mb-1">Your cart is empty</h4>
                <p className="text-gray-500 text-sm max-w-xs mb-6">
                  Explore TrueTech's premium headphones, smartwatches, and fast power banks.
                </p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-all bg-white shadow-2xs"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2 shrink-0 border border-gray-100"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-sm text-black tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              {/* Promo input */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. TRUETECH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-xs ${promoMessage.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {promoMessage.text}
                </p>
              )}

              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Promo Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (Nigeria Nationwide)</span>
                  <span className="font-medium text-gray-900 tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-gray-200">
                  <span>Total Due</span>
                  <span className="text-blue-600 tabular-nums">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-gray-400 text-xs pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Genuine Warranty
                </span>
                <span>•</span>
                <span>Pay on Delivery Supported</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {checkoutStep === 'form' ? (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">
                    TrueTech Express Checkout
                  </h3>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Delivery Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        City / LGA *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option>Lagos State</option>
                        <option>Abuja FCT</option>
                        <option>Rivers (Port Harcourt)</option>
                        <option>Oyo (Ibadan)</option>
                        <option>Enugu</option>
                        <option>Delta</option>
                        <option>Kano</option>
                        <option>Ogun</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Payment Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          customer.paymentMethod === 'cod'
                            ? 'border-blue-600 bg-blue-50/50 font-semibold text-blue-900 ring-1 ring-blue-500'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-gray-900 mb-0.5">Pay on Delivery</div>
                        <span>Cash or POS upon receipt</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: 'card' })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          customer.paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50/50 font-semibold text-blue-900 ring-1 ring-blue-500'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-gray-900 mb-0.5">Instant Card/Transfer</div>
                        <span>Secured via Nigerian Gateway</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1 text-xs text-gray-600 mt-4">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-medium text-gray-900">{items.reduce((a, b) => a + b.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-black pt-1 border-t border-gray-200">
                      <span>Total Amount:</span>
                      <span className="text-blue-600 tabular-nums">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm mt-2"
                  >
                    Confirm & Place Order ({formatPrice(grandTotal)})
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Order Confirmed!</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Thank you, <strong className="text-gray-800">{customer.name}</strong>.
                </p>
                <div className="my-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-left text-xs space-y-2">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Order Reference:</span>
                    <span className="text-blue-600 font-mono">{orderRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span className="text-gray-700">{customer.address}, {customer.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <span className="text-gray-700 uppercase">
                      {customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Direct Card/Transfer'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-black text-sm pt-2 border-t border-gray-200">
                    <span>Amount Payable:</span>
                    <span className="text-blue-600">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6">
                  A verification SMS & dispatch confirmation has been scheduled for <strong>{customer.phone}</strong>.
                </p>

                <button
                  onClick={handleFinishOrder}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Return to Store
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
