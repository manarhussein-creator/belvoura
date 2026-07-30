import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Language, CurrencyCode } from '../types';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Instagram,
  Phone,
  Sliders,
  FileText,
  Plus,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrencyCode,
    t,
    cart,
    setIsCartOpen,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    formatPrice,
    boutiqueConfig,
    setIsBoutiqueConfigOpen,
    setIsSiteTextEditorOpen,
    setIsAddProductOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmountUSD = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية (RTL)', flag: '🇸🇦' },
    { code: 'en', label: 'English (LTR)', flag: '🇬🇧' },
    { code: 'fr', label: 'Français (LTR)', flag: '🇫🇷' },
  ];

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'SAR', 'AED', 'EGP'];

  const handleNavClick = (tab: 'home' | 'shop' | 'about' | 'contact' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'shop') {
      window.scrollTo({ top: 700, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#E7D6C6]/95 backdrop-blur-md border-b border-[#3B2A23]/10 transition-all duration-300">
      {/* Top Announcement Bar */}
      {t('freeShippingNotice') && (
        <div className="bg-[#3B2A23] text-[#E7D6C6] text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-center sm:text-start font-light tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A97] shrink-0" />
              <span>{t('freeShippingNotice')}</span>
            </div>

          <div className="flex items-center gap-4">
            {/* Quick Active Social Icons */}
            <div className="hidden md:flex items-center gap-3 border-e border-[#E7D6C6]/20 pe-4">
              <a
                href={`https://wa.me/${boutiqueConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px]"
                title="WhatsApp VIP Concierge"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              <a
                href={boutiqueConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors flex items-center gap-1 text-[11px]"
                title="Instagram Official"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-300" />
                <span className="hidden lg:inline">Instagram</span>
              </a>

              <button
                onClick={() => setIsBoutiqueConfigOpen(true)}
                className="hover:text-[#C49A97] transition-colors p-1 px-2 rounded bg-[#E7D6C6]/10 text-[10px] uppercase font-bold flex items-center gap-1"
                title="تعديل الأيقونات والروابط (Edit Icons & Links)"
              >
                <Sliders className="w-3 h-3 text-[#C49A97]" />
                <span>الأيقونات</span>
              </button>

              <button
                onClick={() => setIsSiteTextEditorOpen(true)}
                className="hover:text-[#C49A97] transition-colors p-1 px-2 rounded bg-[#E7D6C6]/10 text-[10px] uppercase font-bold flex items-center gap-1"
                title="تعديل نصوص وكلام الموقع بالكامل (Edit All Site Copy)"
              >
                <FileText className="w-3 h-3 text-[#C49A97]" />
                <span>تعديل الكلام</span>
              </button>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="hover:bg-white text-[#3B2A23] bg-[#C49A97] transition-colors p-1 px-2.5 rounded text-[10px] uppercase font-bold flex items-center gap-1 shadow-sm"
                title="إضافة منتج جديد للكتالوج (+ Add New Product)"
              >
                <Plus className="w-3 h-3" />
                <span>+ قطعة جديدة</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 hover:text-[#C49A97] transition-colors py-0.5 px-2 rounded border border-[#E7D6C6]/20 text-[11px]"
              >
                <Globe className="w-3 h-3" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-1 end-0 bg-[#3B2A23] text-[#E7D6C6] border border-[#A68A7D]/30 shadow-xl rounded-md py-1 w-36 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#5A3E36] transition-colors ${
                        language === lang.code ? 'font-bold text-[#C49A97]' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-[#C49A97] transition-colors py-0.5 px-2 rounded border border-[#E7D6C6]/20 text-[11px]"
              >
                <span className="font-semibold">{currency.code}</span>
                <span>({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full mt-1 end-0 bg-[#3B2A23] text-[#E7D6C6] border border-[#A68A7D]/30 shadow-xl rounded-md py-1 w-28 z-50">
                  {currencies.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrencyCode(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-1.5 text-xs hover:bg-[#5A3E36] transition-colors ${
                        currency.code === code ? 'font-bold text-[#C49A97]' : ''
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3B2A23] hover:text-[#C49A97] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                activeTab === 'home'
                  ? 'text-[#3B2A23] border-b-2 border-[#3B2A23] pb-1'
                  : 'text-[#5A3E36]/80 hover:text-[#3B2A23]'
              }`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                activeTab === 'shop'
                  ? 'text-[#3B2A23] border-b-2 border-[#3B2A23] pb-1'
                  : 'text-[#5A3E36]/80 hover:text-[#3B2A23]'
              }`}
            >
              {t('navShop')}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                activeTab === 'about'
                  ? 'text-[#3B2A23] border-b-2 border-[#3B2A23] pb-1'
                  : 'text-[#5A3E36]/80 hover:text-[#3B2A23]'
              }`}
            >
              {t('navAbout')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                activeTab === 'contact'
                  ? 'text-[#3B2A23] border-b-2 border-[#3B2A23] pb-1'
                  : 'text-[#5A3E36]/80 hover:text-[#3B2A23]'
              }`}
            >
              {t('navContact')}
            </button>
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex-1 flex justify-center md:flex-initial">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-center focus:outline-none"
            >
              <div className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.2em] font-bold text-[#3B2A23] uppercase group-hover:text-[#5A3E36] transition-colors">
                BELVOURA
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#A68A7D] font-light -mt-1 hidden sm:block">
                HAUTE CHAUSSERIE & MAROQUINERIE
              </div>
            </button>
          </div>

          {/* Right Actions (Search, Admin, Cart) */}
          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#3B2A23] hover:text-[#C49A97] transition-colors rounded-full"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute top-full end-0 mt-2 w-72 sm:w-80 bg-[#F7EFE9] border border-[#3B2A23]/15 shadow-2xl rounded-lg p-3 z-50">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (activeTab !== 'shop') setActiveTab('shop');
                      }}
                      placeholder={t('searchPlaceholder')}
                      className="w-full bg-white border border-[#3B2A23]/20 rounded-md py-2 ps-3 pe-8 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute end-2 top-2.5 text-xs text-[#5A3E36] hover:text-[#3B2A23]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin CMS Dashboard Toggle */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden lg:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#3B2A23] text-[#E7D6C6] border-[#3B2A23]'
                  : 'border-[#3B2A23]/30 text-[#3B2A23] hover:border-[#3B2A23]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>{t('navAdmin')}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded-full flex items-center justify-center group"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -end-1 bg-[#C49A97] text-[#3B2A23] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#E7D6C6]">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7EFE9] border-b border-[#3B2A23]/10 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-start text-sm uppercase tracking-wider py-1.5 ${
                activeTab === 'home' ? 'font-bold text-[#3B2A23]' : 'text-[#5A3E36]'
              }`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-start text-sm uppercase tracking-wider py-1.5 ${
                activeTab === 'shop' ? 'font-bold text-[#3B2A23]' : 'text-[#5A3E36]'
              }`}
            >
              {t('navShop')}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-start text-sm uppercase tracking-wider py-1.5 ${
                activeTab === 'about' ? 'font-bold text-[#3B2A23]' : 'text-[#5A3E36]'
              }`}
            >
              {t('navAbout')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-start text-sm uppercase tracking-wider py-1.5 ${
                activeTab === 'contact' ? 'font-bold text-[#3B2A23]' : 'text-[#5A3E36]'
              }`}
            >
              {t('navContact')}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-start text-sm uppercase tracking-wider py-1.5 flex items-center gap-2 ${
                activeTab === 'admin' ? 'font-bold text-[#3B2A23]' : 'text-[#5A3E36]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C49A97]" />
              <span>{t('navAdmin')}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
