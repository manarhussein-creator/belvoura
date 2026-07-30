import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductColor } from '../types';
import {
  X,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Ruler,
  ChevronRight,
  ChevronLeft,
  Edit3,
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    t,
    language,
    selectedProductForModal,
    setSelectedProductForModal,
    setEditingProductForModal,
    addToCart,
    formatPrice,
    getLocalizedProductTitle,
    getLocalizedProductDesc,
    getLocalizedColorName,
    getLocalizedBadge,
    getLocalizedCraftsmanship,
    setIsCheckoutOpen,
  } = useShop();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { nameEn: 'Standard', nameAr: 'افتراضي', nameFr: 'Standard', hex: '#3B2A23' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '38');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'craftsmanship' | 'care' | 'reviews'>('craftsmanship');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);

  const title = getLocalizedProductTitle(product);
  const desc = getLocalizedProductDesc(product);
  const badge = getLocalizedBadge(product);
  const craftsmanship = getLocalizedCraftsmanship(product);

  const images = [product.image, product.secondaryImage].filter(Boolean) as string[];

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProductForModal(null);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 end-4 z-20 p-2 bg-[#3B2A23] text-[#E7D6C6] rounded-full hover:bg-[#5A3E36] transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Side */}
          <div className="p-6 bg-[#E7D6C6] flex flex-col justify-between">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src={currentImage}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
              {badge && (
                <div className="absolute top-3 start-3 bg-[#3B2A23] text-[#E7D6C6] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A97]" />
                  <span>{badge}</span>
                </div>
              )}
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(img)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      currentImage === img ? 'border-[#3B2A23] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Title */}
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A97]">
                Maison BELVOURA • {product.category}
              </div>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#3B2A23] mt-1">
                {title}
              </h1>

              {/* Price */}
              <div className="mt-2 text-xl font-semibold text-[#3B2A23]">
                {formatPrice(product.priceUSD)}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-[#5A3E36] leading-relaxed font-light">
                {desc}
              </p>

              <hr className="my-5 border-[#3B2A23]/10" />

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#3B2A23] mb-2">
                  <span>{t('selectColor')}:</span>
                  <span className="font-normal text-[#5A3E36]">
                    {getLocalizedColorName(selectedColor)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center ${
                        selectedColor.hex === color.hex
                          ? 'border-[#3B2A23] scale-110 shadow-md'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={getLocalizedColorName(color)}
                    >
                      {selectedColor.hex === color.hex && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#3B2A23] mb-2">
                  <span>{t('selectSize')}:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#C49A97] hover:underline flex items-center gap-1 text-[11px] font-normal"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t('sizeGuide')}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 px-3 py-1.5 rounded text-xs font-medium transition-all border ${
                        selectedSize === size
                          ? 'bg-[#3B2A23] text-[#E7D6C6] border-[#3B2A23] shadow'
                          : 'border-[#3B2A23]/20 text-[#3B2A23] hover:border-[#3B2A23]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3B2A23]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#3B2A23]/20 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#3B2A23] hover:bg-[#E7D6C6]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-[#3B2A23]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#3B2A23] hover:bg-[#E7D6C6]"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-[#A68A7D] italic">
                  {product.stock > 0 ? t('inStock') : t('outOfStock')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#3B2A23]/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C49A97]" />
                  <span>{t('addToCart')}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#C49A97] text-[#3B2A23] hover:bg-[#b08784] transition-colors rounded text-xs uppercase font-bold tracking-widest"
                >
                  {t('buyNow')}
                </button>
              </div>

              <button
                onClick={() => {
                  const p = product;
                  setSelectedProductForModal(null);
                  setEditingProductForModal(p);
                }}
                className="w-full py-2.5 px-4 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#3B2A23] hover:text-[#E7D6C6] transition-colors rounded text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C49A97]" />
                <span>تعديل هذا المنتج (Edit Creation Details)</span>
              </button>

              {/* Value props */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#5A3E36] text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#C49A97] mb-1" />
                  <span>Express Courier</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#C49A97] mb-1" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#C49A97] mb-1" />
                  <span>Complimentary Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion / Info Tabs */}
        <div className="border-t border-[#3B2A23]/10 bg-[#E7D6C6] p-6">
          <div className="flex border-b border-[#3B2A23]/10 pb-3 gap-6">
            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`text-xs uppercase tracking-wider font-semibold pb-2 transition-colors border-b-2 ${
                activeTab === 'craftsmanship'
                  ? 'border-[#3B2A23] text-[#3B2A23]'
                  : 'border-transparent text-[#5A3E36]'
              }`}
            >
              {t('craftsmanshipTitle')}
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`text-xs uppercase tracking-wider font-semibold pb-2 transition-colors border-b-2 ${
                activeTab === 'care'
                  ? 'border-[#3B2A23] text-[#3B2A23]'
                  : 'border-transparent text-[#5A3E36]'
              }`}
            >
              {t('careInstructions')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs uppercase tracking-wider font-semibold pb-2 transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#3B2A23] text-[#3B2A23]'
                  : 'border-transparent text-[#5A3E36]'
              }`}
            >
              {t('reviewsTitle')} (5.0 ★)
            </button>
          </div>

          <div className="pt-4 text-xs text-[#5A3E36] leading-relaxed">
            {activeTab === 'craftsmanship' && (
              <p>{craftsmanship || 'Handcrafted by Italian artisans with traditional welted leather techniques.'}</p>
            )}
            {activeTab === 'care' && (
              <p>Store in the provided BELVOURA breathable flannel dustbag. Apply natural cream conditioner every quarter to preserve calfskin suppleness.</p>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#3B2A23]">Princess Reem K.</span>
                  <span className="text-[10px] text-[#A68A7D]">— Riyadh</span>
                </div>
                <p className="italic">
                  " Absolute perfection in both stitching and comfort. The leather feels softer than any Paris luxury brand I've worn."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
