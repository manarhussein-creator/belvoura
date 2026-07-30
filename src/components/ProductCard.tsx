import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Eye, Sparkles, Edit3 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    t,
    formatPrice,
    getLocalizedProductTitle,
    getLocalizedBadge,
    getLocalizedColorName,
    setSelectedProductForModal,
    setEditingProductForModal,
    addToCart,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || {
    nameEn: 'Standard', nameAr: 'افتراضي', nameFr: 'Standard', hex: '#3B2A23'
  });
  const [isHovered, setIsHovered] = useState(false);

  const title = getLocalizedProductTitle(product);
  const badge = getLocalizedBadge(product);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || '38';
    addToCart(product, selectedColor, defaultSize, 1);
  };

  const handleEditProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProductForModal(product);
  };

  return (
    <div
      onClick={() => setSelectedProductForModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-[#F7EFE9] rounded-xl overflow-hidden border border-[#3B2A23]/10 hover:border-[#3B2A23]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#E7D6C6]">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge & Quick Edit Button */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-none">
          {badge ? (
            <div className="bg-[#3B2A23] text-[#E7D6C6] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm shadow-md flex items-center gap-1 pointer-events-auto">
              <Sparkles className="w-3 h-3 text-[#C49A97]" />
              <span>{badge}</span>
            </div>
          ) : <div />}

          <button
            onClick={handleEditProduct}
            className="p-1.5 bg-[#3B2A23]/80 hover:bg-[#3B2A23] text-[#C49A97] hover:text-white rounded-full shadow-md backdrop-blur transition-all pointer-events-auto"
            title="تعديل هذا المنتج (Edit Product)"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick View Hover Actions */}
        <div className="absolute inset-0 bg-[#3B2A23]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="p-3 bg-white text-[#3B2A23] rounded-full shadow-lg hover:bg-[#3B2A23] hover:text-[#E7D6C6] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-3 bg-[#3B2A23] text-[#E7D6C6] rounded-full shadow-lg hover:bg-[#5A3E36] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  title={getLocalizedColorName(color)}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor.hex === color.hex
                      ? 'ring-2 ring-[#3B2A23] ring-offset-1 scale-110'
                      : 'border-[#3B2A23]/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[10px] text-[#5A3E36] ms-1">
                {getLocalizedColorName(selectedColor)}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif-luxury text-lg font-medium text-[#3B2A23] group-hover:text-[#5A3E36] transition-colors line-clamp-1">
            {title}
          </h3>
        </div>

        {/* Footer info: Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-[#3B2A23]/10">
          <div className="font-semibold text-sm text-[#3B2A23]">
            {formatPrice(product.priceUSD)}
          </div>

          <button
            onClick={handleQuickAdd}
            className="text-xs uppercase font-semibold text-[#3B2A23] hover:text-[#C49A97] tracking-wider transition-colors flex items-center gap-1"
          >
            <span>{t('addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
