import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Save,
  Check,
  Sliders,
  Phone,
  MessageSquare,
  Instagram,
  Facebook,
  Mail,
  MapPin,
} from 'lucide-react';

export const BoutiqueConfigModal: React.FC = () => {
  const {
    language,
    boutiqueConfig,
    updateBoutiqueConfig,
    isBoutiqueConfigOpen,
    setIsBoutiqueConfigOpen,
  } = useShop();

  const [formData, setFormData] = useState({ ...boutiqueConfig });
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isBoutiqueConfigOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBoutiqueConfig(formData);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsBoutiqueConfigOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#3B2A23] text-[#E7D6C6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C49A97] text-[#3B2A23] rounded-lg">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C49A97] tracking-widest block">
                Social & Icon Manager • إعدادات الأيقونات والتواصل
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-light">
                {language === 'ar' ? 'تعديل أيقونات التواصل وواتساب' : 'Edit Contact & Social Icons'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsBoutiqueConfigOpen(false)}
            className="p-2 text-[#E7D6C6] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          {successMsg && (
            <div className="p-4 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>تم حفظ بيانات الأيقونات بنجاح! Saved social icons config.</span>
            </div>
          )}

          {/* WhatsApp & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="text-xs font-bold text-[#3B2A23] flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>رقم الواتساب المباشر (WhatsApp Number)</span>
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-mono text-[#3B2A23]"
                placeholder="201001234567"
                required
              />
              <span className="text-[10px] text-[#A68A7D] mt-1 block">
                أدخل الرقم بكود الدولة بدون رمز + (مثلاً: 201001234567 لمصر)
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="text-xs font-bold text-[#3B2A23] flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-[#C49A97]" />
                <span>رقم الهاتف المباشر (Phone Call)</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                placeholder="+20 100 123 4567"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23] border-b border-[#3B2A23]/10 pb-2">
              روابط التواصل الاجتماعي (Social Channels)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-[#3B2A23] flex items-center gap-2 mb-1">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>رابط إنستغرام (Instagram URL)</span>
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#3B2A23] flex items-center gap-2 mb-1">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>رابط فيسبوك (Facebook URL)</span>
                </label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#3B2A23] flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs">🎵</span>
                  <span>رابط تيك توك (TikTok URL)</span>
                </label>
                <input
                  type="text"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          </div>

          {/* Address & Email */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div className="flex justify-between items-center border-b border-[#3B2A23]/10 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23]">
                عنوان البوتيك والمعارض (Store Location & Address)
              </h3>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, addressAr: '', addressEn: '' })}
                className="text-[10px] text-red-600 font-bold hover:underline"
              >
                مسح العنوان (Clear)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#3B2A23] flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C49A97]" />
                  <span>العنوان بالعربية (أو اتركيه فارغاً)</span>
                </label>
                <input
                  type="text"
                  value={formData.addressAr}
                  onChange={(e) => setFormData({ ...formData, addressAr: e.target.value })}
                  placeholder="مثال: القاهرة / الرياض / أو عنوانك الخاص..."
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#3B2A23] flex items-center gap-1.5 mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#C49A97]" />
                  <span>البريد الإلكتروني (Email)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="concierge@belvoura.com"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          </div>

          {/* Customer Service Text */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div className="flex justify-between items-center border-b border-[#3B2A23]/10 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23]">
                تفاصيل ورسالة خدمة العملاء (Customer Service Copy)
              </h3>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, customerServiceTextAr: '', customerServiceTextEn: '' })}
                className="text-[10px] text-red-600 font-bold hover:underline"
              >
                مسح نص خدمة العملاء (Clear)
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                نص خدمة العملاء بالعربية (اكتبي أي تفاصيل تحبينها)
              </label>
              <textarea
                value={formData.customerServiceTextAr}
                onChange={(e) => setFormData({ ...formData, customerServiceTextAr: e.target.value })}
                rows={2}
                placeholder="أدخلي تفاصيل مواعيد ورسالة خدمة العملاء الخاصة بكِ..."
                className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
              />
            </div>
          </div>

          {/* Purchasing & Delivery Info */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div className="flex justify-between items-center border-b border-[#3B2A23]/10 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23]">
                تفاصيل الشراء والدفع والتوصيل (Purchasing & Delivery Info)
              </h3>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, purchasingInfoTextAr: '', purchasingInfoTextEn: '' })}
                className="text-[10px] text-red-600 font-bold hover:underline"
              >
                مسح تفاصيل الشراء (Clear)
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                نص الشراء والتوصيل بالعربية (مثلاً: طرق الدفع المتاحة، سياسة التوصيل والمعاينة)
              </label>
              <textarea
                value={formData.purchasingInfoTextAr}
                onChange={(e) => setFormData({ ...formData, purchasingInfoTextAr: e.target.value })}
                rows={2}
                placeholder="أدخلي معلومات الشراء الشحن التوصيل أو المعاينة بأسلوبك الخاص..."
                className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#3B2A23]/15">
            <button
              type="button"
              onClick={() => setIsBoutiqueConfigOpen(false)}
              className="py-2.5 px-5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] rounded text-xs font-bold uppercase tracking-wider"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="py-2.5 px-8 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 text-[#C49A97]" />
              <span>حفظ إعدادات الأيقونات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
