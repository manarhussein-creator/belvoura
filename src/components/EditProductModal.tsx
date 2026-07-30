import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Category, ProductColor } from '../types';
import {
  X,
  Save,
  Trash2,
  Image as ImageIcon,
  Check,
  Sparkles,
  Edit3,
  DollarSign,
  Package,
  Ruler,
  Palette,
  Upload,
  Plus,
} from 'lucide-react';

// Preset luxury images for quick picking if user wants to change product images easily
const PRESET_IMAGES = [
  {
    name: 'Escarpin Rose Silk Pump',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Espresso Leather Stiletto',
    url: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Taupe Suede Ankle Boot',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Espresso Tote Handbag',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Rose Gold Evening Clutch',
    url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000',
  },
];

export const EditProductModal: React.FC = () => {
  const {
    t,
    language,
    editingProductForModal,
    setEditingProductForModal,
    updateProduct,
    deleteProduct,
    formatPrice,
  } = useShop();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleFr: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionFr: '',
    priceUSD: 850,
    category: 'shoes' as Category,
    image: '',
    secondaryImage: '',
    stock: 10,
    sizesStr: '35, 36, 37, 38, 39, 40, 41',
    badgeEn: '',
    badgeAr: '',
    badgeFr: '',
    craftsmanshipNotesEn: '',
    craftsmanshipNotesAr: '',
    craftsmanshipNotesFr: '',
    colors: [] as ProductColor[],
  });

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // New color form state
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
    // Check if already added
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

  useEffect(() => {
    if (editingProductForModal) {
      const p = editingProductForModal;
      setFormData({
        titleEn: p.titleEn || '',
        titleAr: p.titleAr || '',
        titleFr: p.titleFr || '',
        descriptionEn: p.descriptionEn || '',
        descriptionAr: p.descriptionAr || '',
        descriptionFr: p.descriptionFr || '',
        priceUSD: p.priceUSD || 850,
        category: p.category || 'shoes',
        image: p.image || '',
        secondaryImage: p.secondaryImage || '',
        stock: p.stock ?? 10,
        sizesStr: p.sizes ? p.sizes.join(', ') : '35, 36, 37, 38, 39, 40, 41',
        badgeEn: p.badgeEn || '',
        badgeAr: p.badgeAr || '',
        badgeFr: p.badgeFr || '',
        craftsmanshipNotesEn: p.craftsmanshipNotesEn || '',
        craftsmanshipNotesAr: p.craftsmanshipNotesAr || '',
        craftsmanshipNotesFr: p.craftsmanshipNotesFr || '',
        colors: p.colors && p.colors.length > 0 ? [...p.colors] : [
          { nameEn: 'Espresso', nameAr: 'إسبريسو', nameFr: 'Espresso', hex: '#3B2A23' },
          { nameEn: 'Dusty Rose', nameAr: 'وردي', nameFr: 'Rose', hex: '#C49A97' },
        ],
      });
    }
  }, [editingProductForModal]);

  if (!editingProductForModal) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductForModal) return;

    const sizes = formData.sizesStr.split(',').map((s) => s.trim()).filter(Boolean);

    updateProduct(editingProductForModal.id, {
      titleEn: formData.titleEn,
      titleAr: formData.titleAr,
      titleFr: formData.titleFr,
      descriptionEn: formData.descriptionEn,
      descriptionAr: formData.descriptionAr,
      descriptionFr: formData.descriptionFr,
      priceUSD: Number(formData.priceUSD),
      category: formData.category,
      image: formData.image,
      secondaryImage: formData.secondaryImage,
      stock: Number(formData.stock),
      sizes,
      badgeEn: formData.badgeEn,
      badgeAr: formData.badgeAr,
      badgeFr: formData.badgeFr,
      craftsmanshipNotesEn: formData.craftsmanshipNotesEn,
      craftsmanshipNotesAr: formData.craftsmanshipNotesAr,
      craftsmanshipNotesFr: formData.craftsmanshipNotesFr,
      colors: formData.colors.length > 0 ? formData.colors : [
        { nameEn: 'Default', nameAr: 'افتراضي', nameFr: 'Par défaut', hex: '#3B2A23' }
      ],
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setEditingProductForModal(null);
    }, 800);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this creation from catalog?')) {
      deleteProduct(editingProductForModal.id);
      setEditingProductForModal(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F7EFE9] border border-[#3B2A23]/20 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#3B2A23] text-[#E7D6C6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C49A97] text-[#3B2A23] rounded-lg">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C49A97] tracking-widest block">
                Catalog Editing Mode • تعديل بيانات المنتج
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-light">
                {language === 'ar' ? 'تعديل تفاصيل القطعة والكلام' : 'Edit Product Details & Content'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setEditingProductForModal(null)}
            className="p-2 text-[#E7D6C6] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {successMsg && (
            <div className="p-4 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>تم حفظ التعديلات بنجاح! Saved successfully.</span>
            </div>
          )}

          {/* Titles Section */}
          <div className="space-y-3 bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C49A97]" />
              <span>Product Titles • أسماء القطعة حسب اللغة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  الاسم بالعربية (Arabic Title)
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  English Title
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  Titre en Français
                </label>
                <input
                  type="text"
                  value={formData.titleFr}
                  onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Descriptions Section */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2A23]">
              Descriptions • وصف القطعة وشرح الخامات
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  الوصف بالعربية
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  English Description
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3B2A23] mb-1">
                  Description en Français
                </label>
                <textarea
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  rows={3}
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>
          </div>

          {/* Price & Category & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                السعر بالدولار ($ Price USD)
              </label>
              <input
                type="number"
                value={formData.priceUSD}
                onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-sm font-bold text-[#3B2A23]"
                required
              />
              <div className="mt-2 text-[11px] text-[#5A3E36] font-semibold">
                السعر بالعملة الحالية: <span className="text-[#3B2A23] font-bold">{formatPrice(formData.priceUSD)}</span>
              </div>
            </div>

            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                الفئة (Category)
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
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
                المخزون المتاح (Stock)
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
                {showImagePicker ? 'إخفاء المعرض المجهز' : 'اختيار صورة جاهزة من المكتبة'}
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
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: preset.url });
                      setShowImagePicker(false);
                    }}
                    className="p-1 border border-[#3B2A23]/20 hover:border-[#3B2A23] rounded text-start bg-[#F7EFE9] text-[10px]"
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-12 object-cover rounded mb-1" />
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
                <span>إدارة الألوان المتاحة للقطعة (Available Colors Manager)</span>
              </label>
              <span className="text-[10px] bg-[#E7D6C6] text-[#3B2A23] px-2 py-0.5 rounded font-bold">
                {formData.colors.length} ألوان مضافة
              </span>
            </div>

            {/* Current Active Colors list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#3B2A23] block">
                الألوان المضافة حالياً لهذه القطعة:
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

          {/* Sizes & Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                المقاسات المتاحة (Sizes separated by comma)
              </label>
              <input
                type="text"
                value={formData.sizesStr}
                onChange={(e) => setFormData({ ...formData, sizesStr: e.target.value })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                placeholder="35, 36, 37, 38, 39, 40"
              />
            </div>

            <div className="bg-[#E7D6C6] p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23] mb-1">
                الشارة بالعربية (Badge Text e.g., إصدار جديد)
              </label>
              <input
                type="text"
                value={formData.badgeAr}
                onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value, badgeEn: e.target.value })}
                className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                placeholder="إصدار محدود / إصدار جديد"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#3B2A23]/15">
            <button
              type="button"
              onClick={handleDelete}
              className="py-2.5 px-4 bg-red-100 text-red-800 hover:bg-red-200 transition-colors rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Trash2 className="w-4 h-4" />
              <span>حذف القطعة (Delete Product)</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setEditingProductForModal(null)}
                className="py-2.5 px-5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] rounded text-xs font-bold uppercase tracking-wider flex-1 sm:flex-initial"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="py-3 px-8 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-initial"
              >
                <Save className="w-4 h-4 text-[#C49A97]" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
