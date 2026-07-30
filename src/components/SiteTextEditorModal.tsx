import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Language } from '../types';
import {
  X,
  Save,
  Check,
  FileText,
  RotateCcw,
  Sparkles,
  Type,
  Layout,
  Globe,
} from 'lucide-react';

export const SiteTextEditorModal: React.FC = () => {
  const {
    t,
    language,
    getTranslationForLang,
    isSiteTextEditorOpen,
    setIsSiteTextEditorOpen,
    updateBatchTranslations,
    resetTranslations,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'hero' | 'brand' | 'features' | 'story' | 'categories' | 'contact'>('brand');
  const [editLang, setEditLang] = useState<Language>('ar');
  const [applyToAllLanguages, setApplyToAllLanguages] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Editable key-values for current editing language
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fill current fields based on getTranslationForLang for editLang
    setFields({
      brandName: getTranslationForLang(editLang, 'brandName'),
      brandTagline: getTranslationForLang(editLang, 'brandTagline'),
      freeShippingNotice: getTranslationForLang(editLang, 'freeShippingNotice'),
      navHome: getTranslationForLang(editLang, 'navHome'),
      navShop: getTranslationForLang(editLang, 'navShop'),
      navAbout: getTranslationForLang(editLang, 'navAbout'),
      navContact: getTranslationForLang(editLang, 'navContact'),
      heroEyebrow: getTranslationForLang(editLang, 'heroEyebrow'),
      heroTitle: getTranslationForLang(editLang, 'heroTitle'),
      heroSubtitle: getTranslationForLang(editLang, 'heroSubtitle'),
      heroCta: getTranslationForLang(editLang, 'heroCta'),
      heroSecondaryCta: getTranslationForLang(editLang, 'heroSecondaryCta'),
      feature1Title: getTranslationForLang(editLang, 'feature1Title'),
      feature1Desc: getTranslationForLang(editLang, 'feature1Desc'),
      feature2Title: getTranslationForLang(editLang, 'feature2Title'),
      feature2Desc: getTranslationForLang(editLang, 'feature2Desc'),
      feature3Title: getTranslationForLang(editLang, 'feature3Title'),
      feature3Desc: getTranslationForLang(editLang, 'feature3Desc'),
      quoteText: getTranslationForLang(editLang, 'quoteText'),
      quoteAuthor: getTranslationForLang(editLang, 'quoteAuthor'),
      storyEyebrow: getTranslationForLang(editLang, 'storyEyebrow'),
      storyHeading: getTranslationForLang(editLang, 'storyHeading'),
      storyParagraph1: getTranslationForLang(editLang, 'storyParagraph1'),
      storyParagraph2: getTranslationForLang(editLang, 'storyParagraph2'),
      stat1Value: getTranslationForLang(editLang, 'stat1Value'),
      stat1Label: getTranslationForLang(editLang, 'stat1Label'),
      stat2Value: getTranslationForLang(editLang, 'stat2Value'),
      stat2Label: getTranslationForLang(editLang, 'stat2Label'),
      catalogEyebrow: getTranslationForLang(editLang, 'catalogEyebrow'),
      catShoes: getTranslationForLang(editLang, 'catShoes'),
      catBoots: getTranslationForLang(editLang, 'catBoots'),
      catBags: getTranslationForLang(editLang, 'catBags'),
      contactHeading: getTranslationForLang(editLang, 'contactHeading'),
      contactSub: getTranslationForLang(editLang, 'contactSub'),
      newsletterTitle: getTranslationForLang(editLang, 'newsletterTitle'),
      newsletterDesc: getTranslationForLang(editLang, 'newsletterDesc'),
      rights: getTranslationForLang(editLang, 'rights'),
    });
  }, [isSiteTextEditorOpen, editLang]);

  if (!isSiteTextEditorOpen) return null;

  const handleChange = (key: string, val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBatchTranslations(editLang, fields);

    if (applyToAllLanguages) {
      updateBatchTranslations('ar', fields);
      updateBatchTranslations('en', fields);
      updateBatchTranslations('fr', fields);
    }

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsSiteTextEditorOpen(false);
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('هل تريد استعادة جميع نصوص وشعارات الموقع الافتراضية؟')) {
      resetTranslations();
      setIsSiteTextEditorOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#3B2A23] text-[#E7D6C6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C49A97] text-[#3B2A23] rounded-lg">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C49A97] tracking-widest block">
                Visual Copy Manager • محرر كل نصوص وإعلانات المتجر
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-light">
                {language === 'ar' ? 'تعديل كلام ونصوص المتجر بالكامل' : 'Edit All Website Copy & Headlines'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsSiteTextEditorOpen(false)}
            className="p-2 text-[#E7D6C6] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Language picker & Section tabs */}
        <div className="bg-[#E7D6C6] px-6 py-3 border-b border-[#3B2A23]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#3B2A23]" />
            <span className="text-xs font-bold text-[#3B2A23]">اللغة المراد تعديلها:</span>
            <div className="flex bg-white rounded p-0.5 border border-[#3B2A23]/20">
              <button
                type="button"
                onClick={() => setEditLang('ar')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  editLang === 'ar' ? 'bg-[#3B2A23] text-[#E7D6C6]' : 'text-[#3B2A23]'
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setEditLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  editLang === 'en' ? 'bg-[#3B2A23] text-[#E7D6C6]' : 'text-[#3B2A23]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setEditLang('fr')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  editLang === 'fr' ? 'bg-[#3B2A23] text-[#E7D6C6]' : 'text-[#3B2A23]'
                }`}
              >
                Français
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-[#5A3E36] hover:text-red-700 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة النصوص الافتراضية</span>
          </button>
        </div>

        {/* Category Sub-Tabs */}
        <div className="flex border-b border-[#3B2A23]/10 bg-white px-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'brand'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            الهيدر والشعار والإعلانات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'hero'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            واجهة الصفحة الرئيسية (Hero)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'features'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            مميزات وركائز الدار (Features)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('story')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'story'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            قصة ورؤية الدار (Maison Story)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            أسماء الأقسام والتصنيفات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'contact'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#3B2A23]/60 hover:text-[#3B2A23]'
            }`}
          >
            التواصل والنشرة والفوتر
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
          {successMsg && (
            <div className="p-4 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>تم تحديث نصوص المتجر بنجاح! Saved site text copy successfully.</span>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#3B2A23]">
                      اسم العلامة / الدار (Brand Name)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleChange('brandName', '')}
                      className="text-[10px] text-red-600 font-bold hover:underline"
                    >
                      مسح (Clear)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fields.brandName || ''}
                    onChange={(e) => handleChange('brandName', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#3B2A23]">
                      شعار الدار التوضيحي (Brand Subtitle / Tagline)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleChange('brandTagline', '')}
                      className="text-[10px] text-red-600 font-bold hover:underline"
                    >
                      مسح (Clear)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fields.brandTagline || ''}
                    onChange={(e) => handleChange('brandTagline', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#3B2A23]">
                      إعلان الشريط الشريطي العلوي (Top Header Announcement)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleChange('freeShippingNotice', '')}
                      className="text-[10px] text-red-600 font-bold hover:underline"
                    >
                      مسح (Clear)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fields.freeShippingNotice || ''}
                    onChange={(e) => handleChange('freeShippingNotice', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-3">
                <h4 className="text-xs font-bold text-[#3B2A23] border-b pb-1">أسماء القائمة الرئيسية بالهيدر (Navigation Labels)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">زر الرئيسية</label>
                    <input
                      type="text"
                      value={fields.navHome || ''}
                      onChange={(e) => handleChange('navHome', e.target.value)}
                      className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">زر المجموعة / الكتالوج</label>
                    <input
                      type="text"
                      value={fields.navShop || ''}
                      onChange={(e) => handleChange('navShop', e.target.value)}
                      className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">زر قصة الدار</label>
                    <input
                      type="text"
                      value={fields.navAbout || ''}
                      onChange={(e) => handleChange('navAbout', e.target.value)}
                      className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">زر التواصل والحجز</label>
                    <input
                      type="text"
                      value={fields.navContact || ''}
                      onChange={(e) => handleChange('navContact', e.target.value)}
                      className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    العنوان الفرعي العلوي للواجهة (Hero Eyebrow / Badge)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('heroEyebrow', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.heroEyebrow || ''}
                  onChange={(e) => handleChange('heroEyebrow', e.target.value)}
                  placeholder="مثلاً: صُنع يدوي • دار بيلفورا"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    العنوان الرئيسي الكبير بالواجهة (Main Hero Title)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('heroTitle', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.heroTitle || ''}
                  onChange={(e) => handleChange('heroTitle', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-sm font-serif-luxury text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    الوصف والفقرة الرئيسية بالواجهة (Hero Subtitle / Description)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('heroSubtitle', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <textarea
                  value={fields.heroSubtitle || ''}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#3B2A23]">
                      نص زر التسوق الرئيسي (Main CTA Button)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleChange('heroCta', '')}
                      className="text-[10px] text-red-600 font-bold hover:underline"
                    >
                      مسح (Clear)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fields.heroCta || ''}
                    onChange={(e) => handleChange('heroCta', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#3B2A23]">
                      نص زر قصة الدار (Secondary Button)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleChange('heroSecondaryCta', '')}
                      className="text-[10px] text-red-600 font-bold hover:underline"
                    >
                      مسح (Clear)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fields.heroSecondaryCta || ''}
                    onChange={(e) => handleChange('heroSecondaryCta', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-4">
              <h3 className="text-xs font-bold uppercase text-[#3B2A23] border-b pb-2">
                بطاقات ومميزات الدار الثلاث بالصفحة الرئيسية
              </h3>

              <div className="space-y-3 p-3 bg-[#F7EFE9] rounded-lg border border-[#3B2A23]/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3B2A23]">الميزة الأولى (Feature 1)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('feature1Title', ''); handleChange('feature1Desc', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الميزة الأولى
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="عنوان الميزة الأولى (مثلاً: صنع يدوي)..."
                  value={fields.feature1Title || ''}
                  onChange={(e) => handleChange('feature1Title', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
                <input
                  type="text"
                  placeholder="وصف وشرح الميزة الأولى..."
                  value={fields.feature1Desc || ''}
                  onChange={(e) => handleChange('feature1Desc', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div className="space-y-3 p-3 bg-[#F7EFE9] rounded-lg border border-[#3B2A23]/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3B2A23]">الميزة الثانية (Feature 2)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('feature2Title', ''); handleChange('feature2Desc', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الميزة الثانية
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="عنوان الميزة الثانية (مثلاً: جلد طبيعي 100%)..."
                  value={fields.feature2Title || ''}
                  onChange={(e) => handleChange('feature2Title', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
                <input
                  type="text"
                  placeholder="وصف وشرح الميزة الثانية..."
                  value={fields.feature2Desc || ''}
                  onChange={(e) => handleChange('feature2Desc', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div className="space-y-3 p-3 bg-[#F7EFE9] rounded-lg border border-[#3B2A23]/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3B2A23]">الميزة الثالثة (Feature 3)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('feature3Title', ''); handleChange('feature3Desc', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الميزة الثالثة
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="عنوان الميزة الثالثة (مثلاً: شحن فاخر)..."
                  value={fields.feature3Title || ''}
                  onChange={(e) => handleChange('feature3Title', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
                <input
                  type="text"
                  placeholder="وصف وشرح الميزة الثالثة..."
                  value={fields.feature3Desc || ''}
                  onChange={(e) => handleChange('feature3Desc', e.target.value)}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    الشعار والوسام العلوي لقصة الدار (Story Eyebrow Badge)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('storyEyebrow', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.storyEyebrow || ''}
                  onChange={(e) => handleChange('storyEyebrow', e.target.value)}
                  placeholder="مثلاً: الموروث والحرفية • Savoir-Faire"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
              </div>

              <div className="space-y-3 p-3 bg-[#F7EFE9] rounded-lg border border-[#3B2A23]/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3B2A23]">المقولة الرئيسية في كارت القصة (Quote)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('quoteText', ''); handleChange('quoteAuthor', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح المقولة
                  </button>
                </div>
                <textarea
                  value={fields.quoteText || ''}
                  onChange={(e) => handleChange('quoteText', e.target.value)}
                  rows={2}
                  placeholder="أدخلي المقولة الفاخرة..."
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
                <input
                  type="text"
                  value={fields.quoteAuthor || ''}
                  onChange={(e) => handleChange('quoteAuthor', e.target.value)}
                  placeholder="اسم القائل..."
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    عنوان قصة الدار الرئيسي (Story Heading)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('storyHeading', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح العنوان
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.storyHeading || ''}
                  onChange={(e) => handleChange('storyHeading', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    الفقرة الأولى من قصة الدار (Story Paragraph 1)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('storyParagraph1', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الفقرة 1
                  </button>
                </div>
                <textarea
                  value={fields.storyParagraph1 || ''}
                  onChange={(e) => handleChange('storyParagraph1', e.target.value)}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    الفقرة الثانية من قصة الدار (Story Paragraph 2)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('storyParagraph2', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الفقرة 2
                  </button>
                </div>
                <textarea
                  value={fields.storyParagraph2 || ''}
                  onChange={(e) => handleChange('storyParagraph2', e.target.value)}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              {/* Stats Edition */}
              <div className="pt-2 border-t border-[#3B2A23]/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3B2A23]">الإحصائية الأولى (مثال: 30+ ساعة)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('stat1Value', ''); handleChange('stat1Label', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الإحصائية 1
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="الرقم/القيمة (30+)"
                    value={fields.stat1Value || ''}
                    onChange={(e) => handleChange('stat1Value', e.target.value)}
                    className="bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                  />
                  <input
                    type="text"
                    placeholder="العنوان/الوصف (ساعة من العمل اليدوي)"
                    value={fields.stat1Label || ''}
                    onChange={(e) => handleChange('stat1Label', e.target.value)}
                    className="bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-[#3B2A23]">الإحصائية الثانية (مثال: 100% جلود إيطالية)</span>
                  <button
                    type="button"
                    onClick={() => { handleChange('stat2Value', ''); handleChange('stat2Label', ''); }}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح الإحصائية 2
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="الرقم/القيمة (100%)"
                    value={fields.stat2Value || ''}
                    onChange={(e) => handleChange('stat2Value', e.target.value)}
                    className="bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                  />
                  <input
                    type="text"
                    placeholder="العنوان/الوصف (جلد إيطالي طازج)"
                    value={fields.stat2Label || ''}
                    onChange={(e) => handleChange('stat2Label', e.target.value)}
                    className="bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    عنوان شريط الكتالوج العلوي (Catalog Eyebrow Badge)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('catalogEyebrow', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.catalogEyebrow || ''}
                  onChange={(e) => handleChange('catalogEyebrow', e.target.value)}
                  placeholder="مثلاً: التشكيلة الحصرية • Couture"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  عنوان قسم الأحذية (Shoes Category Name)
                </label>
                <input
                  type="text"
                  value={fields.catShoes || ''}
                  onChange={(e) => handleChange('catShoes', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  عنوان قسم أحذية البوت (Boots Category Name)
                </label>
                <input
                  type="text"
                  value={fields.catBoots || ''}
                  onChange={(e) => handleChange('catBoots', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  عنوان قسم الحقائب (Bags Category Name)
                </label>
                <input
                  type="text"
                  value={fields.catBags || ''}
                  onChange={(e) => handleChange('catBags', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-white p-4 rounded-xl border border-[#3B2A23]/10 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    عنوان قسم التواصل وخدمة العملاء (Contact Section Heading)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('contactHeading', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.contactHeading || ''}
                  onChange={(e) => handleChange('contactHeading', e.target.value)}
                  placeholder="أدخلي العنوان الذي تفضلينه..."
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#3B2A23]">
                    شرح ووصف قسم خدمة العملاء (Contact Section Description)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('contactSub', '')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    مسح (Clear)
                  </button>
                </div>
                <input
                  type="text"
                  value={fields.contactSub || ''}
                  onChange={(e) => handleChange('contactSub', e.target.value)}
                  placeholder="أدخلي الوصف برغبتكِ..."
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                    عنوان النشرة البريدية (Newsletter Title)
                  </label>
                  <input
                    type="text"
                    value={fields.newsletterTitle || ''}
                    onChange={(e) => handleChange('newsletterTitle', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                    وصف النشرة البريدية (Newsletter Desc)
                  </label>
                  <input
                    type="text"
                    value={fields.newsletterDesc || ''}
                    onChange={(e) => handleChange('newsletterDesc', e.target.value)}
                    className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  حقوق الملكية بالفوتر (Footer Copyright Rights)
                </label>
                <input
                  type="text"
                  value={fields.rights || ''}
                  onChange={(e) => handleChange('rights', e.target.value)}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#3B2A23]/15 space-y-3">
            <div className="flex items-center gap-2 bg-[#E7D6C6]/50 p-2.5 rounded-lg border border-[#3B2A23]/10">
              <input
                type="checkbox"
                id="applyToAllLanguages"
                checked={applyToAllLanguages}
                onChange={(e) => setApplyToAllLanguages(e.target.checked)}
                className="w-4 h-4 accent-[#3B2A23] rounded cursor-pointer"
              />
              <label htmlFor="applyToAllLanguages" className="text-xs font-bold text-[#3B2A23] cursor-pointer">
                تنسيخ وتطبيق هذا النص العربي على اللغات الأخرى (English & Français) — اتركها غير مفعّلة للحفاظ على الترجمة الإنجليزية والفرنسية
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-3 text-red-700 hover:text-red-900 text-xs font-bold flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط النصوص للافتراضي</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSiteTextEditorOpen(false)}
                  className="py-2.5 px-5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] rounded text-xs font-bold uppercase tracking-wider"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="py-2.5 px-8 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#C49A97]" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
