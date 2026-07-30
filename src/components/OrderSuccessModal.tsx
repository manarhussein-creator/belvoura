import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle,
  Package,
  Printer,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Truck,
  Calendar,
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const {
    t,
    language,
    lastOrder,
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    formatPrice,
    setActiveTab,
  } = useShop();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleBackHome = () => {
    setIsOrderSuccessOpen(false);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#3B2A23] text-[#E7D6C6] text-center relative">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="absolute top-4 end-4 p-1.5 text-[#E7D6C6] hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-[#C49A97] text-[#3B2A23] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49A97] font-semibold">
            Maison BELVOURA • Bespoke Order
          </span>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light mt-1">
            {t('orderConfirmedTitle')}
          </h2>

          <div className="mt-2 text-xs font-mono text-[#E7D6C6]/80 bg-black/20 inline-block px-3 py-1 rounded-full border border-white/10">
            {t('orderNumber')}: <span className="font-bold text-[#C49A97]">{lastOrder.id}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs sm:text-sm text-[#5A3E36] leading-relaxed text-center max-w-lg mx-auto font-light">
            {t('orderSuccessMsg')}
          </p>

          {/* Timeline Progress */}
          <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#3B2A23]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C49A97]" />
                {t('estimatedDelivery')}: <strong>3 to 5 Business Days</strong>
              </span>
              <span className="text-[10px] uppercase bg-[#3B2A23] text-[#E7D6C6] px-2 py-0.5 rounded">
                Status: {lastOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-center font-medium text-[#5A3E36]">
              <div className="space-y-1">
                <div className="w-6 h-6 mx-auto rounded-full bg-[#3B2A23] text-[#E7D6C6] flex items-center justify-center text-xs">✓</div>
                <span>Crafting</span>
              </div>
              <div className="space-y-1 opacity-60">
                <div className="w-6 h-6 mx-auto rounded-full bg-[#A68A7D] text-white flex items-center justify-center text-xs">2</div>
                <span>Inspection</span>
              </div>
              <div className="space-y-1 opacity-60">
                <div className="w-6 h-6 mx-auto rounded-full bg-[#A68A7D] text-white flex items-center justify-center text-xs">3</div>
                <span>Dispatched</span>
              </div>
              <div className="space-y-1 opacity-60">
                <div className="w-6 h-6 mx-auto rounded-full bg-[#A68A7D] text-white flex items-center justify-center text-xs">4</div>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-3 text-xs">
            <div className="font-bold text-[#3B2A23] border-b border-gray-100 pb-2">
              Order Receipt ({lastOrder.date})
            </div>

            {lastOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-1">
                <span>
                  {item.quantity}x {item.product.titleEn} (EU {item.selectedSize})
                </span>
                <span className="font-semibold text-[#3B2A23]">
                  {formatPrice(item.product.priceUSD * item.quantity)}
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-[#3B2A23]">
              <span>Total Paid</span>
              <span>{formatPrice(lastOrder.totalUSD)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#C49A97]" />
              <span>{t('printInvoice')}</span>
            </button>

            <button
              onClick={handleBackHome}
              className="flex-1 py-3 px-4 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>{t('backToHome')}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
