import React from 'react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import shoePumpRose from '../assets/images/shoe_pump_rose_1785221962475.jpg';
import bootTaupeSuede from '../assets/images/boot_taupe_suede_1785221990711.jpg';
import bagToteEspresso from '../assets/images/bag_tote_espresso_1785221975825.jpg';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const CategoryBanner: React.FC = () => {
  const { t, language, setSelectedCategory, setActiveTab } = useShop();

  const categories: { id: Category; nameKey: string; image: string; count: string }[] = [
    {
      id: 'shoes',
      nameKey: 'catShoes',
      image: shoePumpRose,
      count: 'Bespoke Pumps',
    },
    {
      id: 'boots',
      nameKey: 'catBoots',
      image: bootTaupeSuede,
      count: 'Ankle & Knee High',
    },
    {
      id: 'slippers',
      nameKey: 'catSlippers',
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      count: 'Silk & Leather Slides',
    },
    {
      id: 'sneakers',
      nameKey: 'catSneakers',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      count: 'Couture Sneakers',
    },
    {
      id: 'bags',
      nameKey: 'catBags',
      image: bagToteEspresso,
      count: 'Leather Icons',
    },
  ];

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    const catalogElement = document.getElementById('shop-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#E7D6C6] text-[#3B2A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#3B2A23] uppercase tracking-wider">
            {language === 'ar' ? 'التصنيفات الرئيسية' : language === 'fr' ? 'Univers de la Maison' : 'Maison Universes'}
          </h2>
          <div className="w-12 h-0.5 bg-[#C49A97] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-xl text-start focus:outline-none border border-[#3B2A23]/10"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={t(cat.nameKey)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#231B17]/85 via-[#3B2A23]/30 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-[#E7D6C6] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49A97] font-semibold">
                  {cat.count}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mt-1 group-hover:text-white transition-colors">
                  {t(cat.nameKey)}
                </h3>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#E7D6C6] group-hover:text-[#C49A97] transition-colors">
                  <span>{t('heroCta')}</span>
                  {language === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
