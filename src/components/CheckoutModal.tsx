import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, PaymentMethod, Order } from '../types';
import {
  X,
  CreditCard,
  Smartphone,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    t,
    language,
    currency,
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    giftWrap,
    giftMessage,
    addOrder,
    formatPrice,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Princess Reem Al-Khafaji',
    email: 'reem.alkhafaji@belvoura-vip.com',
    phone: '+966 50 123 4567',
    address: 'King Fahd Road, Villa 42',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    postalCode: '11564',
    notes: 'Please leave with private concierge.',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 8892',
    expiry: '09/28',
    cvv: '•••',
  });

  if (!isCheckoutOpen) return null;

  const subtotalUSD = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );
  const shippingUSD = 0; // Complimentary
  const giftWrapFeeUSD = giftWrap ? 25 : 0;
  const totalUSD = subtotalUSD + shippingUSD + giftWrapFeeUSD;

  const handleCompleteOrder = () => {
    const newOrder: Order = {
      id: `BEL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: cart,
      subtotalUSD,
      shippingUSD,
      totalUSD,
      currency: currency.code,
      currencyRate: currency.rate,
      shippingAddress: address,
      paymentMethod,
      status: 'Crafting',
      giftWrap,
      giftMessage,
    };

    addOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#3B2A23] text-[#E7D6C6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#C49A97]" />
            <h2 className="font-serif-luxury text-xl font-medium tracking-wide">
              {t('checkoutTitle')}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#E7D6C6] hover:text-white transition-colors rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Steps Progress */}
        <div className="bg-[#E7D6C6] px-6 py-3 border-b border-[#3B2A23]/10 flex items-center justify-around text-xs font-semibold uppercase tracking-wider text-[#3B2A23]">
          <div
            className={`flex items-center gap-2 ${
              step >= 1 ? 'text-[#3B2A23] font-bold' : 'opacity-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#3B2A23] text-[#E7D6C6] text-[10px] flex items-center justify-center">
              1
            </span>
            <span>{t('stepShipping')}</span>
          </div>

          <span className="text-[#A68A7D]">→</span>

          <div
            className={`flex items-center gap-2 ${
              step >= 2 ? 'text-[#3B2A23] font-bold' : 'opacity-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#3B2A23] text-[#E7D6C6] text-[10px] flex items-center justify-center">
              2
            </span>
            <span>{t('stepPayment')}</span>
          </div>

          <span className="text-[#A68A7D]">→</span>

          <div
            className={`flex items-center gap-2 ${
              step === 3 ? 'text-[#3B2A23] font-bold' : 'opacity-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#3B2A23] text-[#E7D6C6] text-[10px] flex items-center justify-center">
              3
            </span>
            <span>{t('stepReview')}</span>
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-[#3B2A23] border-b border-[#3B2A23]/10 pb-2">
                Bespoke Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) =>
                      setAddress({ ...address, email: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('country')}
                  </label>
                  <select
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  >
                    <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                    <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                    <option value="Kuwait">Kuwait (الكويت)</option>
                    <option value="Qatar">Qatar (قطر)</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('address')}
                  </label>
                  <input
                    type="text"
                    value={address.address}
                    onChange={(e) =>
                      setAddress({ ...address, address: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('city')}
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                    {t('postalCode')}
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-[#3B2A23] border-b border-[#3B2A23]/10 pb-2">
                Select Luxury Payment Gateway
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-white border-[#3B2A23] shadow-md'
                      : 'bg-[#E7D6C6] border-transparent hover:border-[#3B2A23]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#3B2A23]" />
                    <div>
                      <div className="text-xs font-bold text-[#3B2A23]">
                        {t('payWithCard')}
                      </div>
                      <div className="text-[10px] text-[#5A3E36]">
                        Encrypted 256-bit SSL Secure Transaction
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#3B2A23]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-white border-[#3B2A23] shadow-md'
                      : 'bg-[#E7D6C6] border-transparent hover:border-[#3B2A23]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#3B2A23]" />
                    <div>
                      <div className="text-xs font-bold text-[#3B2A23]">
                        {t('payWithApplePay')}
                      </div>
                      <div className="text-[10px] text-[#5A3E36]">
                        Instant biometric checkout
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'apple_pay'}
                    onChange={() => setPaymentMethod('apple_pay')}
                    className="accent-[#3B2A23]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('tamara')}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'tamara'
                      ? 'bg-white border-[#3B2A23] shadow-md'
                      : 'bg-[#E7D6C6] border-transparent hover:border-[#3B2A23]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#C49A97]" />
                    <div>
                      <div className="text-xs font-bold text-[#3B2A23]">
                        {t('payWithTamara')}
                      </div>
                      <div className="text-[10px] text-[#5A3E36]">
                        4 payments of {formatPrice(totalUSD / 4)} / month
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'tamara'}
                    onChange={() => setPaymentMethod('tamara')}
                    className="accent-[#3B2A23]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-white border-[#3B2A23] shadow-md'
                      : 'bg-[#E7D6C6] border-transparent hover:border-[#3B2A23]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#3B2A23]" />
                    <div>
                      <div className="text-xs font-bold text-[#3B2A23]">
                        {t('payWithCod')}
                      </div>
                      <div className="text-[10px] text-[#5A3E36]">
                        Pay concierge upon inspection
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#3B2A23]"
                  />
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] transition-colors rounded text-xs font-bold uppercase tracking-widest"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <span>Review Order</span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review & Final Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold text-[#3B2A23] border-b border-[#3B2A23]/10 pb-2">
                Order Review & Final Authorization
              </h3>

              {/* Summary Breakdown */}
              <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-3 text-xs text-[#5A3E36]">
                <div className="font-bold text-[#3B2A23] text-sm">Items in Bag: ({cart.length})</div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-none">
                    <span>
                      {item.quantity}x {item.product.titleEn} ({item.selectedSize})
                    </span>
                    <span className="font-semibold text-[#3B2A23]">
                      {formatPrice(item.product.priceUSD * item.quantity)}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="flex justify-between">
                  <span>Shipping Address</span>
                  <span className="font-semibold text-[#3B2A23]">
                    {address.fullName}, {address.city}, {address.country}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment Gateway</span>
                  <span className="font-semibold uppercase text-[#3B2A23]">
                    {paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#3B2A23] pt-2 border-t border-[#3B2A23]/20">
                  <span>Final Total</span>
                  <span>{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] transition-colors rounded text-xs font-bold uppercase tracking-widest"
                >
                  Back
                </button>

                <button
                  onClick={handleCompleteOrder}
                  className="px-8 py-4 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl"
                >
                  <ShieldCheck className="w-5 h-5 text-[#C49A97]" />
                  <span>{t('confirmOrder')} ({formatPrice(totalUSD)})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
