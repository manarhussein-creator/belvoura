import React from 'react';
import { useShop } from '../context/ShopContext';
import { Quote, Sparkles, HeartHandshake, Compass } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { t, language } = useShop();

  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-[#F7EFE9] text-[#3B2A23] relative overflow-hidden">
      {/* Decorative background monogram subtle pattern */}
      <div className="absolute top-0 end-0 p-12 opacity-5 pointer-events-none text-9xl font-serif-luxury text-[#3B2A23]">
        B
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote Hero Card */}
        {t('quoteText') && (
          <div className="max-w-4xl mx-auto text-center relative bg-[#E7D6C6] border border-[#3B2A23]/15 rounded-2xl p-8 sm:p-14 shadow-2xl space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#3B2A23] text-[#E7D6C6] flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-[#C49A97]" />
            </div>

            {/* Primary Quote */}
            <blockquote className="font-arabic-editorial text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug sm:leading-relaxed text-[#3B2A23] px-2 sm:px-6">
              "{t('quoteText')}"
            </blockquote>

            {t('quoteAuthor') && (
              <div className="pt-2">
                <div className="text-xs uppercase tracking-[0.25em] font-bold text-[#A68A7D]">
                  — {t('quoteAuthor')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Story Columns */}
        <div className={`${t('quoteText') ? 'mt-20' : 'mt-0'} grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          <div className="space-y-6">
            {t('storyEyebrow') && (
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C49A97]">
                <Sparkles className="w-4 h-4" />
                <span>{t('storyEyebrow')}</span>
              </div>
            )}

            {t('storyHeading') && (
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#3B2A23] leading-tight">
                {t('storyHeading')}
              </h2>
            )}

            {t('storyParagraph1') && (
              <p className="text-sm sm:text-base text-[#5A3E36] leading-relaxed font-light">
                {t('storyParagraph1')}
              </p>
            )}

            {t('storyParagraph2') && (
              <p className="text-sm sm:text-base text-[#5A3E36] leading-relaxed font-light">
                {t('storyParagraph2')}
              </p>
            )}

            {(t('stat1Value') || t('stat2Value')) && (
              <div className="pt-2 grid grid-cols-2 gap-6 border-t border-[#3B2A23]/10">
                {t('stat1Value') && (
                  <div>
                    <div className="font-serif-luxury text-3xl font-bold text-[#3B2A23]">{t('stat1Value')}</div>
                    <div className="text-xs text-[#5A3E36] mt-1">{t('stat1Label')}</div>
                  </div>
                )}
                {t('stat2Value') && (
                  <div>
                    <div className="font-serif-luxury text-3xl font-bold text-[#3B2A23]">{t('stat2Value')}</div>
                    <div className="text-xs text-[#5A3E36] mt-1">{t('stat2Label')}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visual Atelier Showcase */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#E7D6C6]">
              <img
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=1000"
                alt="BELVOURA Atelier Craftsman"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A23]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 start-6 end-6 text-[#E7D6C6] p-4 bg-[#3B2A23]/60 backdrop-blur-md rounded-lg border border-[#E7D6C6]/20">
                <div className="text-xs uppercase tracking-widest font-semibold text-[#C49A97]">Atelier Florence</div>
                <div className="text-sm font-serif-luxury mt-0.5">Master Artisan Hand-stitching BELVOURA Leather</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
