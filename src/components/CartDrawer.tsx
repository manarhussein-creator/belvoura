import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Gift,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Truck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    t,
    language,
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    getLocalizedProductTitle,
    getLocalizedColorName,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  const subtotalUSD = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  const giftWrapFeeUSD = giftWrap ? 25 : 0;
  const totalUSD = subtotalUSD + giftWrapFeeUSD;

  const freeShippingThresholdUSD = 500;
  const progressPercent = Math.min(100, (subtotalUSD / freeShippingThresholdUSD) * 100);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#231B17]/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 end-0 max-w-full flex ps-10">
        <div className="w-screen max-w-md bg-[#F7EFE9] border-s border-[#3B2A23]/20 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-[#3B2A23] text-[#E7D6C6] flex items-center justify-between border-b border-[#E7D6C6]/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C49A97]" />
              <h2 className="font-serif-luxury text-xl font-medium tracking-wide">
                {t('cartTitle')}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#E7D6C6] hover:text-white transition-colors rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#E7D6C6] px-6 py-3 border-b border-[#3B2A23]/10">
            <div className="flex items-center justify-between text-xs text-[#3B2A23] font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C49A97]" />
                {subtotalUSD >= freeShippingThresholdUSD
                  ? 'Complimentary Luxury Express Shipping Unlocked!'
                  : `Add ${formatPrice(freeShippingThresholdUSD - subtotalUSD)} for Free Shipping`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3B2A23] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-[#A68A7D] mx-auto opacity-50" />
                <h3 className="font-serif-luxury text-xl text-[#3B2A23]">
                  {t('cartEmpty')}
                </h3>
                <p className="text-xs text-[#5A3E36] max-w-xs mx-auto">
                  {t('cartEmptySub')}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#3B2A23] text-[#E7D6C6] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#5A3E36] transition-colors"
                >
                  {t('continueShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const title = getLocalizedProductTitle(item.product);
                const colorName = getLocalizedColorName(item.selectedColor);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white border border-[#3B2A23]/10 rounded-lg shadow-sm"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded overflow-hidden bg-[#E7D6C6] shrink-0">
                      <img
                        src={item.product.image}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-luxury text-sm font-medium text-[#3B2A23] line-clamp-1">
                            {title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#A68A7D] hover:text-red-700 transition-colors p-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#5A3E36] mt-0.5 flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-[#3B2A23]/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{colorName}</span>
                          <span>•</span>
                          <span>Size {item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Quantity & Item Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#3B2A23]/10">
                        <div className="flex items-center border border-[#3B2A23]/20 rounded bg-[#F7EFE9]">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-0.5 text-xs text-[#3B2A23]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-[#3B2A23]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 text-xs text-[#3B2A23]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-bold text-xs text-[#3B2A23]">
                          {formatPrice(item.product.priceUSD * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Gift Wrapping Option */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#E7D6C6] rounded-lg border border-[#3B2A23]/15 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#3B2A23]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#3B2A23] rounded cursor-pointer"
                  />
                  <Gift className="w-4 h-4 text-[#C49A97]" />
                  <span>{t('giftWrap')} (+{formatPrice(25)})</span>
                </label>

                {giftWrap && (
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder={t('giftMessagePlaceholder')}
                    rows={2}
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#E7D6C6] border-t border-[#3B2A23]/15 space-y-4">
              <div className="space-y-1.5 text-xs text-[#5A3E36]">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-[#3B2A23]">
                    {formatPrice(subtotalUSD)}
                  </span>
                </div>

                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Signature Velvet Box</span>
                    <span className="font-semibold text-[#3B2A23]">
                      {formatPrice(25)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span className="font-semibold text-emerald-800">
                    {t('complimentaryShipping')}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#3B2A23] pt-2 border-t border-[#3B2A23]/15">
                  <span>Total</span>
                  <span>{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg group"
              >
                <span>{t('proceedToCheckout')}</span>
                {language === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 text-[#C49A97] group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#C49A97] group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
