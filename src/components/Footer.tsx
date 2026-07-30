import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle,
  Sliders,
  Phone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    t,
    language,
    setActiveTab,
    setSelectedCategory,
    boutiqueConfig,
    setIsBoutiqueConfigOpen,
  } = useShop();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (tab: 'home' | 'shop' | 'about' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: 'shoes' | 'boots' | 'bags') => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    const catalogElement = document.getElementById('shop-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#3B2A23] text-[#E7D6C6] pt-16 pb-12 border-t border-[#E7D6C6]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Header */}
        <div className="bg-[#231B17] border border-[#E7D6C6]/15 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C49A97] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>VIP Private Circle</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-4xl font-light text-[#E7D6C6]">
            {t('newsletterTitle')}
          </h3>

          <p className="text-xs sm:text-sm text-[#E7D6C6]/70 mt-2 max-w-xl mx-auto font-light">
            {t('newsletterDesc')}
          </p>

          {subscribed ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#C49A97] font-bold">
              <CheckCircle className="w-5 h-5" />
              <span>Welcome to Maison BELVOURA Private Circle. Your 10% voucher code is BELVOURA-VIP10</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-[#3B2A23] border border-[#E7D6C6]/20 rounded px-4 py-3 text-xs text-[#E7D6C6] placeholder-[#E7D6C6]/50 focus:outline-none focus:border-[#C49A97]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#E7D6C6] text-[#3B2A23] hover:bg-white transition-colors rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('subscribeBtn')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-[#E7D6C6]/10 text-xs">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#E7D6C6] uppercase">
              BELVOURA
            </div>
            <p className="text-[#E7D6C6]/70 leading-relaxed font-light">
              {t('brandTagline')}
            </p>
            {/* Social Icons & Active Contact */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[#C49A97]">
              <a
                href={boutiqueConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors p-2 bg-[#231B17] rounded-full"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={boutiqueConfig.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors p-2 bg-[#231B17] rounded-full font-bold text-[10px] w-8 h-8 flex items-center justify-center"
                title="TikTok"
              >
                ♬
              </a>

              <a
                href={boutiqueConfig.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors p-2 bg-[#231B17] rounded-full"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${boutiqueConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors p-2 bg-[#231B17] rounded-full text-emerald-400"
                title="WhatsApp VIP Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBoutiqueConfigOpen(true)}
                className="p-2 bg-[#E7D6C6]/10 text-[#C49A97] hover:text-white rounded-full transition-colors flex items-center gap-1 text-[10px]"
                title="تعديل الأيقونات والروابط"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C49A97]">
              Navigation
            </h4>
            <ul className="space-y-2 text-[#E7D6C6]/80">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white">
                  {t('navShop')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white">
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white">
                  {t('navContact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C49A97]">
              Collections
            </h4>
            <ul className="space-y-2 text-[#E7D6C6]/80">
              <li>
                <button onClick={() => handleCategoryNav('shoes')} className="hover:text-white">
                  {t('catShoes')}
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('boots')} className="hover:text-white">
                  {t('catBoots')}
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('bags')} className="hover:text-white">
                  {t('catBags')}
                </button>
              </li>
            </ul>
          </div>

          {/* Boutiques & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-[#C49A97]">
              {language === 'ar' ? 'خدمة العملاء والعنوان' : 'Customer Care & Boutique'}
            </h4>
            <div className="space-y-2 text-[#E7D6C6]/80 text-xs">
              {boutiqueConfig.phone && <div>📞 {boutiqueConfig.phone}</div>}
              {boutiqueConfig.whatsapp && <div>💬 واتساب: +{boutiqueConfig.whatsapp}</div>}
              {(boutiqueConfig.addressAr || boutiqueConfig.addressEn) && (
                <div>📍 {language === 'ar' ? boutiqueConfig.addressAr : boutiqueConfig.addressEn}</div>
              )}
              {boutiqueConfig.email && <div>✉️ {boutiqueConfig.email}</div>}
              {!boutiqueConfig.phone && !boutiqueConfig.addressAr && !boutiqueConfig.whatsapp && (
                <button
                  onClick={() => setIsBoutiqueConfigOpen(true)}
                  className="text-[#C49A97] underline font-bold"
                >
                  انقري هنا لإضافة بيانات المعرض وخدمة العملاء
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#E7D6C6]/10 text-center text-[11px] text-[#E7D6C6]/60 font-light flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>{t('rights')}</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#cookies" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
