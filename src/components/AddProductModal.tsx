import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Category, ProductColor } from '../types';
import {
  X,
  Plus,
  Check,
  Image as ImageIcon,
  Sparkles,
  DollarSign,
  Package,
  Upload,
  Palette,
  Trash2,
} from 'lucide-react';

const PRESET_NEW_IMAGES = [
  {
    name: 'حذاء كعب عالي زهر أنيق (Rose Silk Stiletto)',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'حذاء أسود فاخر (Espresso Black Stiletto)',
    url: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'بوت جلدي قصير (Taupe Suede Ankle Boot)',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'حقيبة جلد طبيعي (Luxury Espresso Leather Tote)',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'حقيبة سهرة زهرية (Rose Gold Evening Clutch)',
    url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000',
  },
];

const DEFAULT_COLORS: ProductColor[] = [
  { nameEn: 'Powder Rose', nameAr: 'وردي ناعم', nameFr: 'Rose Poudré', hex: '#E2BDC0' },
  { nameEn: 'Espresso Black', nameAr: 'أسود فاخر', nameFr: 'Noir Expresso', hex: '#231B17' },
  { nameEn: 'Tuscan Tan', nameAr: 'بني ناعم', nameFr: 'Marron Caramel', hex: '#A8795A' },
  { nameEn: 'Champagne Gold', nameAr: 'ذهبي شامبين', nameFr: 'Or Champagne', hex: '#D4AF37' },
];

export const AddProductModal: React.FC = () => {
  const {
    language,
    isAddProductOpen,
    setIsAddProductOpen,
    addProduct,
    formatPrice,
  } = useShop();

  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    titleFr: '',
    descriptionAr: '',
    descriptionEn: '',
    descriptionFr: '',
    priceUSD: 850,
    category: 'shoes' as Category,
    image: PRESET_NEW_IMAGES[0].url,
    secondaryImage: '',
    stock: 12,
    sizesStr: '35, 36, 37, 38, 39, 40, 41',
    badgeAr: 'إصدار جديد',
    badgeEn: 'New Arrival',
    badgeFr: 'Nouveauté',
    craftsmanshipNotesAr: 'مصنوع يدوياً في إيطاليا من أفخم الجلود الطبيعية الناعمة.',
    craftsmanshipNotesEn: 'Handcrafted in Italy using supple calfskin and rose silk linings.',
    craftsmanshipNotesFr: 'Fabriqué à la main en Italie à partir de cuirs nobles.',
    colors: DEFAULT_COLORS as ProductColor[],
  });

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Custom Color state
  const [newColorAr, setNewColorAr] = useState('');
  const [newColorEn, setNewColorEn] = useState('');
  const [newColorHex, setNewColorHex] = useState('#3B2A23');

  const handlePrimaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الصورة كبير، يرجى اختيار صورة أقل من 10 ميجابايت');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecondaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الصورة كبير، يرجى اختيار صورة أقل من 10 ميجابايت');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, secondaryImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColorAr.trim() && !newColorEn.trim()) {
      alert('يرجى إدخال اسم اللون');
      return;
    }
    const colorToAdd: ProductColor = {
      nameAr: newColorAr.trim() || 'لون جديد',
      nameEn: newColorEn.trim() || 'New Color',
      nameFr: newColorEn.trim() || 'Nouveau',
      hex: newColorHex,
    };
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, colorToAdd],
    }));
    setNewColorAr('');
    setNewColorEn('');
  };

  const handleAddPresetColor = (preset: { nameAr: string; nameEn: string; hex: string }) => {
    if (formData.colors.some((c) => c.hex.toLowerCase() === preset.hex.toLowerCase())) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          nameAr: preset.nameAr,
          nameEn: preset.nameEn,
          nameFr: preset.nameEn,
          hex: preset.hex,
        },
      ],
    }));
  };

  const handleRemoveColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, idx) => idx !== index),
    }));
  };

  if (!isAddProductOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sizes = formData.sizesStr.split(',').map((s) => s.trim()).filter(Boolean);

    addProduct({
      titleAr: formData.titleAr || formData.titleEn,
      titleEn: formData.titleEn || formData.titleAr,
      titleFr: formData.titleFr || formData.titleEn,
      descriptionAr: formData.descriptionAr || formData.descriptionEn,
      descriptionEn: formData.descriptionEn || formData.descriptionAr,
      descriptionFr: formData.descriptionFr || formData.descriptionEn,
      priceUSD: Number(formData.priceUSD),
      category: formData.category,
      image: formData.image,
      secondaryImage: formData.secondaryImage || formData.image,
      colors: formData.colors.length > 0 ? formData.colors : DEFAULT_COLORS,
      sizes,
      stock: Number(formData.stock),
      badgeAr: formData.badgeAr,
      badgeEn: formData.badgeEn,
      badgeFr: formData.badgeFr,
      craftsmanshipNotesAr: formData.craftsmanshipNotesAr,
      craftsmanshipNotesEn: formData.craftsmanshipNotesEn,
      craftsmanshipNotesFr: formData.craftsmanshipNotesFr,
      featured: true,
      isNewArrival: true,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsAddProductOpen(false);
      // Reset form
      setFormData({
        titleAr: '',
        titleEn: '',
        titleFr: '',
        descriptionAr: '',
        descriptionEn: '',
        descriptionFr: '',
        priceUSD: 850,
        category: 'shoes',
        image: PRESET_NEW_IMAGES[0].url,
        secondaryImage: '',
        stock: 12,
        sizesStr: '35, 36, 37, 38, 39, 40, 41',
        badgeAr: 'إصدار جديد',
        badgeEn: 'New Arrival',
        badgeFr: 'Nouveauté',
        craftsmanshipNotesAr: 'مصنوع يدوياً في إيطاليا من أفخم الجلود الطبيعية الناعمة.',
        craftsmanshipNotesEn: 'Handcrafted in Italy using supple calfskin and rose silk linings.',
        craftsmanshipNotesFr: 'Fabriqué à la main en Italie à partir de cuirs nobles.',
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#3B2A23] text-[#E7D6C6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C49A97] text-[#3B2A23] rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C49A97] tracking-widest block">
                Add New Creation • إضافة قطعة فاخرة جديدة
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-light">
                {language === 'ar' ? 'إضافة تصميم جديد لكتالوج المعرض' : 'Add New Product To Catalog'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAddProductOpen(false)}
            className="p-2 text-[#E7D6C6] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          {successMsg && (
            <div className="p-4 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>تمت إضافة القطعة الجديدة بنجاح وظهرت في المتجر! Added successfully.</span>
            </div>
          )}

          {/* Titles */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C49A97]" />
              <span>أسماء التصميم (Product Names)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  الاسم بالعربية (Arabic Name) *
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="مثال: حذاء إسكاربان زهر إيطالي"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  English Name
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="e.g. Escarpin Rose Silk Pump"
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                />
              </div>
            </div>
          </div>

          {/* Category & Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                الفئة والتصنيف (Category)
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] font-semibold"
              >
                <option value="shoes">Shoes (أحذية فاخرة)</option>
                <option value="boots">Boots (أحذية البوت - قصيرة وطويلة)</option>
                <option value="slippers">Slippers (السليبر والسلايدز)</option>
                <option value="sneakers">Sneakers (الكوتشيات والأحذية الرياضية)</option>
                <option value="bags">Bags (حقائب جلود)</option>
              </select>
            </div>

            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                السعر بالدولار ($ Price USD) *
              </label>
              <input
                type="number"
                value={formData.priceUSD}
                onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-sm font-bold text-[#3B2A23]"
                required
              />
              <div className="mt-1 text-[11px] text-[#5A3E36] font-semibold">
                السعر بالعملة الحالية: <span className="text-[#3B2A23] font-bold">{formatPrice(formData.priceUSD)}</span>
              </div>
            </div>

            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                المخزون المتوفر (Stock)
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs font-bold text-[#3B2A23]"
              />
            </div>
          </div>

          {/* Images Section (Primary + Secondary Hover Image) */}
          <div className="space-y-4 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div className="flex justify-between items-center flex-wrap gap-2 border-b border-[#3B2A23]/10 pb-2">
              <label className="text-xs font-bold text-[#3B2A23] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#C49A97]" />
                <span>صور القطعة (الصورة الرئيسية والصورة الثانية)</span>
              </label>

              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="text-[11px] text-[#C49A97] font-semibold hover:underline"
              >
                {showImagePicker ? 'إخفاء المعرض المجهز' : 'اختيار صورة جاهزة من المعرض'}
              </button>
            </div>

            {/* Grid for Primary Image and Secondary Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Image Uploader */}
              <div className="space-y-2 bg-[#F7EFE9] p-3 rounded-xl border border-[#3B2A23]/15">
                <span className="text-[11px] font-bold text-[#3B2A23] block">
                  1. الصورة الرئيسية (Main Product Image) *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                  <label className="border-2 border-dashed border-[#3B2A23]/30 hover:border-[#3B2A23] rounded-lg p-3 bg-white/70 hover:bg-white transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[90px] group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePrimaryUpload}
                      className="hidden"
                    />
                    <Upload className="w-4 h-4 text-[#C49A97] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#3B2A23]">
                      اختيار من الجهاز
                    </span>
                    <span className="text-[9px] text-[#A68A7D]">رئيسية</span>
                  </label>

                  <div className="border border-[#3B2A23]/20 rounded-lg p-1 bg-white h-24 flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Primary Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-[10px] text-[#A68A7D]">لا توجد صورة رئيسية</span>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-1.5 text-[11px] text-[#3B2A23]"
                  placeholder="أو ضع رابط URL مباشر للصورة الرئيسية..."
                />
              </div>

              {/* Secondary Image Uploader */}
              <div className="space-y-2 bg-[#F7EFE9] p-3 rounded-xl border border-[#3B2A23]/15">
                <span className="text-[11px] font-bold text-[#3B2A23] block">
                  2. الصورة الثانية / التفاعلية (Secondary Hover Image)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                  <label className="border-2 border-dashed border-[#3B2A23]/30 hover:border-[#3B2A23] rounded-lg p-3 bg-white/70 hover:bg-white transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[90px] group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSecondaryUpload}
                      className="hidden"
                    />
                    <Upload className="w-4 h-4 text-[#C49A97] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#3B2A23]">
                      اختيار الصورة الثانية
                    </span>
                    <span className="text-[9px] text-[#A68A7D]">تظهر عند التمرير</span>
                  </label>

                  <div className="border border-[#3B2A23]/20 rounded-lg p-1 bg-white h-24 flex items-center justify-center overflow-hidden">
                    {formData.secondaryImage ? (
                      <img
                        src={formData.secondaryImage}
                        alt="Secondary Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-[10px] text-[#A68A7D]">لا توجد صورة ثانية</span>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.secondaryImage}
                  onChange={(e) => setFormData({ ...formData, secondaryImage: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-1.5 text-[11px] text-[#3B2A23]"
                  placeholder="أو ضع رابط URL مباشر للصورة الثانية..."
                />
              </div>
            </div>

            {showImagePicker && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-gray-100">
                {PRESET_NEW_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: preset.url });
                      setShowImagePicker(false);
                    }}
                    className="p-1.5 border border-[#3B2A23]/20 hover:border-[#3B2A23] rounded text-start bg-[#F7EFE9] text-[10px]"
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-14 object-cover rounded mb-1" />
                    <span className="line-clamp-1 font-semibold text-[#3B2A23]">{preset.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Management Section */}
          <div className="space-y-4 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div className="flex items-center justify-between border-b border-[#3B2A23]/10 pb-2">
              <label className="text-xs font-bold text-[#3B2A23] flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#C49A97]" />
                <span>إدارة الألوان المتاحة للقطعة (Available Colors)</span>
              </label>
              <span className="text-[10px] bg-[#E7D6C6] text-[#3B2A23] px-2 py-0.5 rounded font-bold">
                {formData.colors.length} ألوان مضافة
              </span>
            </div>

            {/* Current Active Colors list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#3B2A23] block">
                الألوان المحددة لهذه القطعة:
              </span>

              {formData.colors.length === 0 ? (
                <div className="p-3 bg-[#F7EFE9] text-[#A68A7D] text-xs rounded border border-dashed border-[#3B2A23]/20 text-center">
                  لم يتم إضافة أي لون حتى الآن. أضيفي الألوان أدناه.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-full pl-3 pr-1 py-1 text-xs font-semibold text-[#3B2A23] shadow-sm"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.nameAr}</span>
                      <span className="text-[10px] text-[#A68A7D] font-mono">({color.nameEn})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors ml-1"
                        title="حذف هذا اللون"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form to add a custom color */}
            <div className="p-3 bg-[#F7EFE9] rounded-xl border border-[#3B2A23]/15 space-y-3">
              <span className="text-[11px] font-bold text-[#3B2A23] block">
                إضافة لون مخصص جديد (Add Custom Color):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
                <div>
                  <label className="block text-[10px] font-bold text-[#3B2A23] mb-1">
                    اسم اللون بالعربية *
                  </label>
                  <input
                    type="text"
                    value={newColorAr}
                    onChange={(e) => setNewColorAr(e.target.value)}
                    placeholder="مثال: أسود كلاسيك"
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-1.5 text-xs text-[#3B2A23]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#3B2A23] mb-1">
                    English Name
                  </label>
                  <input
                    type="text"
                    value={newColorEn}
                    onChange={(e) => setNewColorEn(e.target.value)}
                    placeholder="e.g. Classic Black"
                    className="w-full bg-white border border-[#3B2A23]/20 rounded p-1.5 text-xs text-[#3B2A23]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#3B2A23] mb-1">
                    درجة اللون (Color Picker)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-9 h-8 border border-[#3B2A23]/20 rounded cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="flex-1 bg-white border border-[#3B2A23]/20 rounded p-1.5 text-xs font-mono text-[#3B2A23]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddCustomColor}
                  className="w-full py-2 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C49A97]" />
                  <span>إضافة اللون</span>
                </button>
              </div>

              {/* Quick Preset Colors */}
              <div className="pt-2 border-t border-[#3B2A23]/10">
                <span className="text-[10px] font-bold text-[#A68A7D] block mb-1.5">
                  أو اختاري سريعاً من ألوان الجلود الجاهزة والمميزة:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { nameAr: 'أسود ملكي', nameEn: 'Royal Black', hex: '#231B17' },
                    { nameAr: 'بني إسبريسو', nameEn: 'Espresso Brown', hex: '#3B2A23' },
                    { nameAr: 'وردي مغبر', nameEn: 'Dusty Rose', hex: '#C49A97' },
                    { nameAr: 'عاجي كريمي', nameEn: 'Ivory Cream', hex: '#E7D6C6' },
                    { nameAr: 'توب دافئ', nameEn: 'Warm Taupe', hex: '#A68A7D' },
                    { nameAr: 'أبيض عاجي', nameEn: 'Pure White', hex: '#FFFFFF' },
                    { nameAr: 'أحمر عنابي', nameEn: 'Burgundy', hex: '#800020' },
                    { nameAr: 'كحلي داكن', nameEn: 'Navy Blue', hex: '#000080' },
                    { nameAr: 'أخضر زيتي', nameEn: 'Olive Green', hex: '#556B2F' },
                    { nameAr: 'ذهبي شامبانيا', nameEn: 'Champagne Gold', hex: '#D4AF37' },
                    { nameAr: 'فضي لامع', nameEn: 'Silver', hex: '#C0C0C0' },
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleAddPresetColor(preset)}
                      className="px-2.5 py-1 bg-white hover:bg-[#E7D6C6] border border-[#3B2A23]/20 rounded-full text-[10px] font-semibold text-[#3B2A23] flex items-center gap-1.5 transition-colors"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span>+ {preset.nameAr}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Badge & Sizes */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <div>
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                وصف القطعة والخامات بالعربية
              </label>
              <textarea
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                rows={2}
                placeholder="أدخلي وصفًا جذابًا يشرح تفاصيل الجلد وحرفية الصنع..."
                className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  المقاسات المتاحة (Sizes)
                </label>
                <input
                  type="text"
                  value={formData.sizesStr}
                  onChange={(e) => setFormData({ ...formData, sizesStr: e.target.value })}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                  placeholder="35, 36, 37, 38, 39, 40, 41"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                  شارة القطعة (Badge text e.g., إصدار جديد)
                </label>
                <input
                  type="text"
                  value={formData.badgeAr}
                  onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value })}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#3B2A23]/15">
            <button
              type="button"
              onClick={() => setIsAddProductOpen(false)}
              className="py-2.5 px-5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] rounded text-xs font-bold uppercase tracking-wider"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="py-3 px-8 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C49A97]" />
              <span>إضافة القطعة فوراً للمتجر</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
