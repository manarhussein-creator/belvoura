import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/initialProducts';
import { Sparkles, ArrowRight, ArrowLeft, Shield, Award, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language, setActiveTab } = useShop();

  const handleShopClick = () => {
    setActiveTab('shop');
    const catalogElement = document.getElementById('shop-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    setActiveTab('about');
    const storyElement = document.getElementById('brand-story');
    if (storyElement) {
      storyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#3B2A23] text-[#E7D6C6]">
      {/* Background Editorial Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000">
        <img
          src={HERO_IMAGE}
          alt="BELVOURA Luxury Shoes and Handbags"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231B17] via-[#3B2A23]/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          {t('heroEyebrow') && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7D6C6]/10 border border-[#C49A97]/30 text-xs tracking-widest text-[#C49A97] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('heroEyebrow')}</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-[#E7D6C6]">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg font-light text-[#E7D6C6]/85 leading-relaxed max-w-2xl">
            {t('heroSubtitle')}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleShopClick}
              className="px-8 py-4 bg-[#E7D6C6] text-[#3B2A23] hover:bg-white transition-all font-medium text-xs tracking-widest uppercase rounded-sm shadow-xl flex items-center gap-3 group"
            >
              <span>{t('heroCta')}</span>
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#3B2A23]" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#3B2A23]" />
              )}
            </button>

            <button
              onClick={handleAboutClick}
              className="px-8 py-4 bg-transparent border border-[#E7D6C6]/40 text-[#E7D6C6] hover:bg-[#E7D6C6]/10 transition-all font-light text-xs tracking-widest uppercase rounded-sm"
            >
              {t('heroSecondaryCta')}
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        {(t('feature1Title') || t('feature2Title') || t('feature3Title')) && (
          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E7D6C6]/15">
            {t('feature1Title') && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#3B2A23]/50 border border-[#E7D6C6]/10 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-[#C49A97]/15 text-[#C49A97] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#E7D6C6] tracking-wider">
                    {t('feature1Title')}
                  </h3>
                  <p className="text-[11px] text-[#E7D6C6]/70 mt-0.5">
                    {t('feature1Desc')}
                  </p>
                </div>
              </div>
            )}

            {t('feature2Title') && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#3B2A23]/50 border border-[#E7D6C6]/10 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-[#C49A97]/15 text-[#C49A97] shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#E7D6C6] tracking-wider">
                    {t('feature2Title')}
                  </h3>
                  <p className="text-[11px] text-[#E7D6C6]/70 mt-0.5">
                    {t('feature2Desc')}
                  </p>
                </div>
              </div>
            )}

            {t('feature3Title') && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#3B2A23]/50 border border-[#E7D6C6]/10 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-[#C49A97]/15 text-[#C49A97] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#E7D6C6] tracking-wider">
                    {t('feature3Title')}
                  </h3>
                  <p className="text-[11px] text-[#E7D6C6]/70 mt-0.5">
                    {t('feature3Desc')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
