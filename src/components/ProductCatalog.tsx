import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Category } from '../types';
import { SlidersHorizontal, Search, RefreshCw, Sparkles } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    t,
    language,
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    getLocalizedProductTitle,
    getLocalizedProductDesc,
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  const categories: { id: Category; labelKey: string }[] = [
    { id: 'all', labelKey: 'allCategories' },
    { id: 'shoes', labelKey: 'catShoes' },
    { id: 'boots', labelKey: 'catBoots' },
    { id: 'slippers', labelKey: 'catSlippers' },
    { id: 'sneakers', labelKey: 'catSneakers' },
    { id: 'bags', labelKey: 'catBags' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category check
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleEn = (product.titleEn || '').toLowerCase();
        const titleAr = (product.titleAr || '').toLowerCase();
        const titleFr = (product.titleFr || '').toLowerCase();
        const descEn = (product.descriptionEn || '').toLowerCase();
        const descAr = (product.descriptionAr || '').toLowerCase();
        const descFr = (product.descriptionFr || '').toLowerCase();

        return (
          titleEn.includes(q) ||
          titleAr.includes(q) ||
          titleFr.includes(q) ||
          descEn.includes(q) ||
          descAr.includes(q) ||
          descFr.includes(q)
        );
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    if (sortBy === 'price-low') {
      copy.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-high') {
      copy.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'newest') {
      copy.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      // featured
      copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return copy;
  }, [filteredProducts, sortBy]);

  return (
    <section id="shop-catalog" className="py-16 sm:py-24 bg-[#E7D6C6] text-[#3B2A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {t('catalogEyebrow') && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C49A97] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('catalogEyebrow')}</span>
              </div>
            )}
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-wide text-[#3B2A23]">
              {t('navShop')}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#3B2A23] text-[#E7D6C6] border-[#3B2A23] font-semibold shadow-md'
                    : 'border-[#3B2A23]/20 text-[#3B2A23] hover:border-[#3B2A23]'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls & Search Summary Bar */}
        <div className="bg-[#F7EFE9] border border-[#3B2A23]/10 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#5A3E36]" />
            <span className="text-xs uppercase font-medium tracking-wider text-[#5A3E36]">
              {sortedProducts.length} {t('allCategories')}
            </span>

            {searchQuery && (
              <div className="flex items-center gap-1.5 bg-[#E7D6C6] text-xs px-2.5 py-1 rounded-full border border-[#3B2A23]/20">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#3B2A23] hover:text-red-700 font-bold ms-1"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs text-[#5A3E36] font-medium whitespace-nowrap">
              {t('sortBy')}:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#3B2A23]/20 rounded-md py-1.5 px-3 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23] cursor-pointer"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price-low">{t('sortPriceLow')}</option>
              <option value="price-high">{t('sortPriceHigh')}</option>
              <option value="newest">{t('sortNewest')}</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F7EFE9] border border-[#3B2A23]/10 rounded-2xl p-8 space-y-4">
            <Search className="w-12 h-12 text-[#A68A7D] mx-auto" />
            <h3 className="font-serif-luxury text-2xl text-[#3B2A23]">
              {t('noProductsFound')}
            </h3>
            <p className="text-xs text-[#5A3E36]">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2A23] text-[#E7D6C6] rounded-md text-xs uppercase tracking-widest hover:bg-[#5A3E36] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('clearFilters')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
