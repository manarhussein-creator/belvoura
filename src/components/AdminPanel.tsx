import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Category, ProductColor } from '../types';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  Check,
  X,
  Sparkles,
  RotateCcw,
  FileText,
  Sliders,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    t,
    language,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultProducts,
    setEditingProductForModal,
    orders,
    formatPrice,
    setIsAddProductOpen,
    setIsSiteTextEditorOpen,
    setIsBoutiqueConfigOpen,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'orders'>('products');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Form State for Adding/Editing Product
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleFr: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionFr: '',
    priceUSD: 850,
    category: 'shoes' as Category,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
    stock: 10,
    sizesStr: '35, 36, 37, 38, 39, 40, 41',
    badgeEn: 'New Edition',
    badgeAr: 'إصدار جديد',
    badgeFr: 'Nouvelle Édition',
  });

  const totalRevenueUSD = orders.reduce((acc, o) => acc + o.totalUSD, 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const sizes = formData.sizesStr.split(',').map((s) => s.trim());
    const colors: ProductColor[] = [
      { nameEn: 'Espresso', nameAr: 'إسبريسو', nameFr: 'Espresso', hex: '#3B2A23' },
      { nameEn: 'Dusty Rose', nameAr: 'وردي', nameFr: 'Rose', hex: '#C49A97' },
      { nameEn: 'Cream', nameAr: 'عاجي', nameFr: 'Crème', hex: '#E7D6C6' },
    ];

    if (editingProductId) {
      updateProduct(editingProductId, {
        titleEn: formData.titleEn,
        titleAr: formData.titleAr,
        titleFr: formData.titleFr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        descriptionFr: formData.descriptionFr,
        priceUSD: Number(formData.priceUSD),
        category: formData.category,
        image: formData.image,
        stock: Number(formData.stock),
        sizes,
      });
      setEditingProductId(null);
    } else {
      addProduct({
        titleEn: formData.titleEn || 'BELVOURA Bespoke Creation',
        titleAr: formData.titleAr || 'تصميم بيلفورا الحصري',
        titleFr: formData.titleFr || 'Création Sur Mesure BELVOURA',
        descriptionEn: formData.descriptionEn || 'Exquisite handcrafted leather creation.',
        descriptionAr: formData.descriptionAr || 'قطعة جلدية فاخرة مصنوعة يدوياً.',
        descriptionFr: formData.descriptionFr || 'Création en cuir faite à la main.',
        priceUSD: Number(formData.priceUSD),
        category: formData.category,
        image: formData.image,
        badgeEn: formData.badgeEn,
        badgeAr: formData.badgeAr,
        badgeFr: formData.badgeFr,
        colors,
        sizes,
        stock: Number(formData.stock),
        featured: true,
      });
    }

    setActiveTab('products');
    resetForm();
  };

  const startEditing = (p: Product) => {
    setEditingProductId(p.id);
    setFormData({
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      titleFr: p.titleFr,
      descriptionEn: p.descriptionEn,
      descriptionAr: p.descriptionAr,
      descriptionFr: p.descriptionFr,
      priceUSD: p.priceUSD,
      category: p.category,
      image: p.image,
      stock: p.stock,
      sizesStr: p.sizes.join(', '),
      badgeEn: p.badgeEn || '',
      badgeAr: p.badgeAr || '',
      badgeFr: p.badgeFr || '',
    });
    setActiveTab('add');
  };

  const resetForm = () => {
    setFormData({
      titleEn: '',
      titleAr: '',
      titleFr: '',
      descriptionEn: '',
      descriptionAr: '',
      descriptionFr: '',
      priceUSD: 850,
      category: 'shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
      stock: 10,
      sizesStr: '35, 36, 37, 38, 39, 40, 41',
      badgeEn: 'New Edition',
      badgeAr: 'إصدار جديد',
      badgeFr: 'Nouvelle Édition',
    });
    setEditingProductId(null);
  };

  return (
    <section className="py-16 bg-[#E7D6C6] text-[#3B2A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#3B2A23] text-[#E7D6C6] rounded-2xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#C49A97] tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Maison Executive Dashboard</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-light">
              {t('adminTitle')}
            </h2>
            <p className="text-xs text-[#E7D6C6]/70 mt-1">{t('adminSub')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSiteTextEditorOpen(true)}
              className="px-4 py-3 border border-[#C49A97]/40 text-[#E7D6C6] hover:bg-[#C49A97]/20 transition-colors rounded text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5"
              title="محرر نصوص المتجر بالكامل"
            >
              <FileText className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>تعديل نصوص المتجر</span>
            </button>

            <button
              onClick={() => setIsBoutiqueConfigOpen(true)}
              className="px-4 py-3 border border-[#C49A97]/40 text-[#E7D6C6] hover:bg-[#C49A97]/20 transition-colors rounded text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5"
              title="تعديل روابط التواصل والأيقونات"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>الأيقونات والتواصل</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('هل تريد استعادة جميع المنتجات الافتراضية؟ (Restore initial products catalog?)')) {
                  resetToDefaultProducts();
                }
              }}
              className="px-4 py-3 border border-[#C49A97]/40 text-[#E7D6C6] hover:bg-[#C49A97]/20 transition-colors rounded text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5"
              title="استعادة الكتالوج الاصلي"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C49A97]" />
              <span>استعادة الكتالوج</span>
            </button>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-6 py-3 bg-[#C49A97] text-[#3B2A23] hover:bg-white transition-colors rounded text-xs uppercase font-bold tracking-widest flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{t('tabAddProduct')}</span>
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-5 bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#3B2A23] text-[#C49A97] rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#5A3E36] uppercase tracking-wider font-semibold">
                {t('totalRevenue')}
              </div>
              <div className="font-serif-luxury text-2xl font-bold text-[#3B2A23]">
                {formatPrice(totalRevenueUSD)}
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#3B2A23] text-[#C49A97] rounded-lg">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#5A3E36] uppercase tracking-wider font-semibold">
                {t('totalOrders')}
              </div>
              <div className="font-serif-luxury text-2xl font-bold text-[#3B2A23]">
                {orders.length}
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#3B2A23] text-[#C49A97] rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#5A3E36] uppercase tracking-wider font-semibold">
                {t('activeProducts')}
              </div>
              <div className="font-serif-luxury text-2xl font-bold text-[#3B2A23]">
                {products.length}
              </div>
            </div>
          </div>
        </div>

        {/* CMS Tabs */}
        <div className="flex border-b border-[#3B2A23]/20 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs uppercase font-bold tracking-widest transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#5A3E36]'
            }`}
          >
            {t('tabProducts')} ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-xs uppercase font-bold tracking-widest transition-colors border-b-2 ${
              activeTab === 'add'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#5A3E36]'
            }`}
          >
            {editingProductId ? 'Edit Product' : t('tabAddProduct')}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs uppercase font-bold tracking-widest transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#3B2A23] text-[#3B2A23]'
                : 'border-transparent text-[#5A3E36]'
            }`}
          >
            {t('tabOrders')} ({orders.length})
          </button>
        </div>

        {/* TAB 1: Product List */}
        {activeTab === 'products' && (
          <div className="bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse text-xs">
                <thead>
                  <tr className="bg-[#3B2A23] text-[#E7D6C6] uppercase tracking-wider text-[11px]">
                    <th className="p-4 text-start">{t('colImage')}</th>
                    <th className="p-4 text-start">{t('colTitle')}</th>
                    <th className="p-4 text-start">{t('colCategory')}</th>
                    <th className="p-4 text-start">{t('colPrice')}</th>
                    <th className="p-4 text-start">{t('colStock')}</th>
                    <th className="p-4 text-center">{t('colActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3B2A23]/10">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#E7D6C6]/50 transition-colors">
                      <td className="p-4">
                        <img
                          src={p.image}
                          alt={p.titleEn}
                          className="w-12 h-12 object-cover rounded border border-[#3B2A23]/20"
                        />
                      </td>
                      <td className="p-4 font-bold text-[#3B2A23]">
                        <div>{p.titleEn}</div>
                        <div className="text-[10px] text-[#A68A7D] font-normal">{p.titleAr}</div>
                      </td>
                      <td className="p-4 uppercase text-[#5A3E36] font-semibold">{p.category}</td>
                      <td className="p-4 font-bold text-[#3B2A23]">
                        {formatPrice(p.priceUSD)}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-[#E7D6C6] font-bold text-[#3B2A23]">
                          {p.stock} pcs
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingProductForModal(p)}
                            className="p-2 bg-[#3B2A23] text-[#C49A97] hover:text-white hover:bg-[#5A3E36] rounded transition-colors"
                            title="تعديل هذا المنتج"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-[#3B2A23] hover:text-red-700 hover:bg-white rounded transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Add / Edit Product Form */}
        {activeTab === 'add' && (
          <form
            onSubmit={handleSaveProduct}
            className="bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6"
          >
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
              {editingProductId ? 'Edit Product Details' : t('addProductTitle')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('titleEnLabel')}
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="e.g., L’Élégance Stiletto"
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('titleArLabel')}
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="مثال: حذاء إليجانس الفاخر"
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('titleFrLabel')}
                </label>
                <input
                  type="text"
                  value={formData.titleFr}
                  onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                  placeholder="Ex: Escarpin L'Élégance Soie"
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23] focus:outline-none focus:border-[#3B2A23]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('descEnLabel')}
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  rows={2}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('descArLabel')}
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={2}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('descFrLabel')}
                </label>
                <textarea
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  rows={2}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  {t('priceUSDLabel')}
                </label>
                <input
                  type="number"
                  value={formData.priceUSD}
                  onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs font-bold text-[#3B2A23]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23]"
                >
                  <option value="shoes">Shoes (أحذية فاخرة)</option>
                  <option value="boots">Boots (أحذية البوت - قصيرة وطويلة)</option>
                  <option value="slippers">Slippers (السليبر والسلايدز)</option>
                  <option value="sneakers">Sneakers (الكوتشيات والأحذية الرياضية)</option>
                  <option value="bags">Bags (حقائب جلود)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2A23] mb-1">
                  Available Sizes
                </label>
                <input
                  type="text"
                  value={formData.sizesStr}
                  onChange={(e) => setFormData({ ...formData, sizesStr: e.target.value })}
                  className="w-full bg-white border border-[#3B2A23]/20 rounded p-2.5 text-xs text-[#3B2A23]"
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#3B2A23]/10">
              <label className="block text-xs font-bold text-[#3B2A23]">
                صورة المنتج (Product Image)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                <label className="border-2 border-dashed border-[#3B2A23]/30 hover:border-[#3B2A23] rounded-xl p-4 bg-[#F7EFE9]/60 hover:bg-[#E7D6C6]/60 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[100px] relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="p-2 bg-[#3B2A23] text-[#E7D6C6] rounded-full mb-1.5 group-hover:scale-110 transition-transform">
                    <Upload className="w-4 h-4 text-[#C49A97]" />
                  </div>
                  <span className="text-xs font-bold text-[#3B2A23]">
                    اضغط هنا لتحديد واختيار صورة من جهازك
                  </span>
                  <span className="text-[10px] text-[#A68A7D]">
                    رفع مباشر من الكمبيوتر أو المحمول
                  </span>
                </label>

                <div className="border border-[#3B2A23]/20 rounded-xl p-2 bg-[#F7EFE9] flex items-center justify-center min-h-[100px]">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-h-24 object-contain rounded border border-[#3B2A23]/10"
                    />
                  ) : (
                    <span className="text-xs text-[#A68A7D]">لم يتم تحديد صورة</span>
                  )}
                </div>
              </div>

              <details className="text-[11px] text-[#A68A7D]">
                <summary className="cursor-pointer font-semibold text-[#3B2A23] hover:underline">
                  أو أدخل رابط صورة إلكتروني (Image URL)
                </summary>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#F7EFE9] border border-[#3B2A23]/20 rounded p-2 text-xs text-[#3B2A23] mt-2"
                />
              </details>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#3B2A23]/10">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 border border-[#3B2A23]/30 text-[#3B2A23] hover:bg-[#E7D6C6] rounded text-xs font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#3B2A23] text-[#E7D6C6] hover:bg-[#5A3E36] transition-colors rounded text-xs font-bold uppercase tracking-widest shadow-lg"
              >
                {t('saveProduct')}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Client Orders */}
        {activeTab === 'orders' && (
          <div className="bg-[#F7EFE9] border border-[#3B2A23]/15 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B2A23]">
              Bespoke Client Orders Log ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <p className="text-xs text-[#5A3E36] py-8 text-center">
                No orders recorded in system yet. Place an order in shop to preview live tracking.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 bg-white border border-[#3B2A23]/10 rounded-xl shadow-sm space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-bold text-[#3B2A23]">{o.id} • {o.date}</span>
                      <span className="bg-[#3B2A23] text-[#E7D6C6] px-2 py-0.5 rounded font-bold text-[10px]">
                        {o.status}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Client: {o.shippingAddress.fullName} ({o.shippingAddress.city}, {o.shippingAddress.country})</span>
                      <span className="font-bold text-[#3B2A23]">{formatPrice(o.totalUSD)}</span>
                    </div>

                    <div className="text-[11px] text-[#5A3E36]">
                      Items: {o.items.map((i) => `${i.quantity}x ${i.product.titleEn} (EU ${i.selectedSize})`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
