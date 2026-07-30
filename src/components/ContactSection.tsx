import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Sliders,
  FileText,
  ShoppingBag,
  Headphones,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const {
    t,
    language,
    boutiqueConfig,
    setIsBoutiqueConfigOpen,
    setIsSiteTextEditorOpen,
  } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    boutique: 'VIP Service',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const addressText = language === 'ar' ? boutiqueConfig.addressAr : boutiqueConfig.addressEn;
  const customerServiceText = language === 'ar' ? boutiqueConfig.customerServiceTextAr : boutiqueConfig.customerServiceTextEn;
  const purchasingText = language === 'ar' ? boutiqueConfig.purchasingInfoTextAr : boutiqueConfig.purchasingInfoTextEn;

  return (
    <section id="contact-section" className="py-20 sm:py-28 bg-[#F7EFE9] text-[#3B2A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C49A97] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Concierge & Customer Service</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#3B2A23]">
            {t('contactHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A3E36] mt-3 font-light">
            {t('contactSub')}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsBoutiqueConfigOpen(true)}
              className="px-4 py-2 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded-full text-xs font-bold flex items-center gap-2 shadow"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>تعديل/مسح كلام خدمة العملاء والشراء</span>
            </button>
            <button
              onClick={() => setIsSiteTextEditorOpen(true)}
              className="px-4 py-2 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] transition-colors rounded-full text-xs font-bold flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>تعديل العناوين والنصوص</span>
            </button>
          </div>
        </div>

        {/* Dynamic Contact & Purchase Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Customer Service */}
          <div className="p-6 bg-[#E7D6C6] rounded-2xl border border-[#3B2A23]/15 shadow-md space-y-3 relative group">
            <div className="w-10 h-10 bg-[#3B2A23] text-[#C49A97] rounded-full flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
              {language === 'ar' ? 'خدمة العملاء والاستفسارات' : 'Customer Care'}
            </h3>
            <p className="text-xs text-[#5A3E36] leading-relaxed">
              {customerServiceText || (language === 'ar' ? 'انقري على زر "تعديل الكلام" بالأعلى لإضافة نص خدمة العملاء الخاص بكِ برغبتكِ.' : 'Click "Edit Copy" button above to add your custom customer service details.')}
            </p>
            <div className="pt-2 text-xs text-[#3B2A23] space-y-1 font-semibold">
              {boutiqueConfig.phone && (
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#C49A97]" /> {boutiqueConfig.phone}</div>
              )}
              {boutiqueConfig.email && (
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#C49A97]" /> {boutiqueConfig.email}</div>
              )}
            </div>
          </div>

          {/* Card 2: Purchasing & Delivery Info */}
          <div className="p-6 bg-[#E7D6C6] rounded-2xl border border-[#3B2A23]/15 shadow-md space-y-3 relative group">
            <div className="w-10 h-10 bg-[#3B2A23] text-[#C49A97] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
              {language === 'ar' ? 'معلومات الشراء والتوصيل' : 'Purchasing & Delivery'}
            </h3>
            <p className="text-xs text-[#5A3E36] leading-relaxed">
              {purchasingText || (language === 'ar' ? 'انقري على زر "تعديل الكلام" بالأعلى لكتابة سياسة الشراء والتوصيل والدفع الخاصة بكِ.' : 'Click "Edit Copy" button above to customize your purchasing & shipping policies.')}
            </p>
            <div className="pt-2 text-xs text-[#3B2A23] space-y-1 font-semibold">
              {boutiqueConfig.whatsapp && (
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>طلب مباشر عبر الواتساب: +{boutiqueConfig.whatsapp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Address & Boutique Locations */}
          <div className="p-6 bg-[#E7D6C6] rounded-2xl border border-[#3B2A23]/15 shadow-md space-y-3 relative group">
            <div className="w-10 h-10 bg-[#3B2A23] text-[#C49A97] rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
              {language === 'ar' ? 'عنوان المعرض / البوتيك' : 'Boutique Location'}
            </h3>
            <p className="text-xs text-[#5A3E36] leading-relaxed">
              {addressText || (language === 'ar' ? 'أضيفي عنوان معرضكِ أو متجر الإلكتروني برغبتكِ.' : 'Add your store or boutique address freely.')}
            </p>
            <div className="pt-2 text-xs text-[#3B2A23] space-y-1 font-semibold">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C49A97]" />
                <span>{language === 'ar' ? 'استقبال الطلبات متوفر يومياً' : 'Orders received daily'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Private Styling Request Form */}
        <div className="max-w-2xl mx-auto bg-[#E7D6C6] border border-[#3B2A23]/20 rounded-2xl p-8 shadow-xl">
          <h3 className="font-serif-luxury text-2xl font-bold text-[#3B2A23] mb-2 text-center">
            Book a Private Styling Consultation
          </h3>
          <p className="text-xs text-[#5A3E36] text-center mb-6">
            Our master concierges will curate a personalized selection of shoes and leathercrafts for your private viewing.
          </p>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C49A97] mx-auto" />
              <h4 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
                Appointment Request Received
              </h4>
              <p className="text-xs text-[#5A3E36]">
                Our concierge manager will contact you via WhatsApp or Email within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3B2A23] mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3B2A23] mb-1">Email or WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3B2A23] mb-1">Preferred Boutique Location</label>
                <select
                  value={formData.boutique}
                  onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-[#3B2A23]"
                >
                  <option value="Riyadh Flagship">Riyadh Boutique (Centria Mall)</option>
                  <option value="Dubai Boutique">Dubai Boutique (Fashion Avenue)</option>
                  <option value="Paris Boutique">Paris Boutique (Place Vendôme)</option>
                  <option value="Virtual Concierge">Virtual Online VIP Stylist</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#3B2A23] mb-1">Special Preferences or Fitting Requests</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-[#3B2A23]"
                  placeholder="Mention preferred sizes, colors, or specific shoe/bag models..."
                />
              </div>

              <a
                href={`https://wa.me/${boutiqueConfig.whatsapp}?text=${encodeURIComponent(
                  'Hello BELVOURA Concierge, I would like to inquire about private styling and products.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-800 text-white hover:bg-emerald-900 transition-colors rounded uppercase font-bold tracking-widest text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>تواصل مباشر عبر الواتساب (Instant WhatsApp VIP)</span>
              </a>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded uppercase font-bold tracking-widest text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#C49A97]" />
                <span>Submit Private Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
