import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  CurrencyCode,
  CurrencyConfig,
  Product,
  CartItem,
  Order,
  Category,
  ProductColor,
  BoutiqueConfig,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { translations } from '../i18n/translations';
import {
  subscribeToProducts,
  saveProductToFirebase,
  deleteProductFromFirebase,
  seedInitialProductsToFirebase,
  subscribeToOrders,
  saveOrderToFirebase,
  subscribeToBoutiqueConfig,
  saveBoutiqueConfigToFirebase,
  subscribeToTranslations,
  saveTranslationsToFirebase,
} from '../lib/firebase';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75 },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67 },
  EGP: { code: 'EGP', symbol: 'ج.م', rate: 49.0 },
};

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  t: (key: string) => string;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaultProducts: () => void;
  editingProductForModal: Product | null;
  setEditingProductForModal: (product: Product | null) => void;
  boutiqueConfig: BoutiqueConfig;
  updateBoutiqueConfig: (config: Partial<BoutiqueConfig>) => void;
  isBoutiqueConfigOpen: boolean;
  setIsBoutiqueConfigOpen: (open: boolean) => void;
  customTranslations: Record<Language, Record<string, string>>;
  getTranslationForLang: (lang: Language, key: string) => string;
  updateTranslation: (lang: Language, key: string, value: string) => void;
  updateBatchTranslations: (lang: Language, keyValues: Record<string, string>) => void;
  resetTranslations: () => void;
  isSiteTextEditorOpen: boolean;
  setIsSiteTextEditorOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  activeTab: 'home' | 'shop' | 'about' | 'contact' | 'admin';
  setActiveTab: (tab: 'home' | 'shop' | 'about' | 'contact' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  formatPrice: (amountInUSD: number) => string;
  getLocalizedProductTitle: (product: Product) => string;
  getLocalizedProductDesc: (product: Product) => string;
  getLocalizedColorName: (color: ProductColor) => string;
  getLocalizedBadge: (product: Product) => string | undefined;
  getLocalizedCraftsmanship: (product: Product) => string | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('belvoura_lang');
    return (saved as Language) || 'ar';
  });

  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('belvoura_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('belvoura_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('belvoura_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('belvoura_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [editingProductForModal, setEditingProductForModal] = useState<Product | null>(null);
  const [isBoutiqueConfigOpen, setIsBoutiqueConfigOpen] = useState(false);
  const [boutiqueConfig, setBoutiqueConfigState] = useState<BoutiqueConfig>(() => {
    const saved = localStorage.getItem('belvoura_boutique_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      whatsapp: '',
      instagram: '',
      tiktok: '',
      facebook: '',
      phone: '',
      email: '',
      addressAr: '',
      addressEn: '',
      customerServiceTextAr: '',
      customerServiceTextEn: '',
      purchasingInfoTextAr: '',
      purchasingInfoTextEn: '',
    };
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'contact' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  // Sync dir attribute on html tag according to language (RTL for ar, LTR for en/fr)
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('belvoura_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('belvoura_currency', currencyCode);
  }, [currencyCode]);

  useEffect(() => {
    localStorage.setItem('belvoura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('belvoura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('belvoura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('belvoura_boutique_config', JSON.stringify(boutiqueConfig));
  }, [boutiqueConfig]);

  // Firebase Real-time Subscriptions
  useEffect(() => {
    const unsubscribeProducts = subscribeToProducts((fbProducts) => {
      const savedLocal = localStorage.getItem('belvoura_products');
      let localProducts: Product[] = [];
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          if (Array.isArray(parsed)) {
            localProducts = parsed;
          }
        } catch (e) {
          /* ignore */
        }
      }

      if (fbProducts && fbProducts.length > 0) {
        // If there are local products that are missing from Firebase, sync them up
        if (localProducts.length > 0) {
          const fbIds = new Set(fbProducts.map((p) => p.id));
          const missingLocals = localProducts.filter((p) => !fbIds.has(p.id));
          if (missingLocals.length > 0) {
            const combined = [...fbProducts, ...missingLocals];
            seedInitialProductsToFirebase(combined);
            setProducts(combined);
            return;
          }
        }
        setProducts(fbProducts);
      } else {
        // If Firebase is completely empty, seed with local products or default
        const productsToSeed = localProducts.length > 0 ? localProducts : INITIAL_PRODUCTS;
        seedInitialProductsToFirebase(productsToSeed);
        setProducts(productsToSeed);
      }
    });

    const unsubscribeOrders = subscribeToOrders((fbOrders) => {
      if (fbOrders) {
        setOrders(fbOrders);
      }
    });

    const unsubscribeBoutique = subscribeToBoutiqueConfig((fbBoutique) => {
      if (fbBoutique) {
        setBoutiqueConfigState(fbBoutique);
      }
    });

    const unsubscribeTranslations = subscribeToTranslations((fbTranslations) => {
      if (fbTranslations) {
        setCustomTranslations(fbTranslations);
      }
    });

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
      unsubscribeBoutique();
      unsubscribeTranslations();
    };
  }, []);

  const updateBoutiqueConfig = (newConfig: Partial<BoutiqueConfig>) => {
    setBoutiqueConfigState((prev) => {
      const merged = { ...prev, ...newConfig };
      saveBoutiqueConfigToFirebase(merged);
      return merged;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrencyCodeState(code);
  };

  const [isSiteTextEditorOpen, setIsSiteTextEditorOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [customTranslations, setCustomTranslations] = useState<Record<Language, Record<string, string>>>(() => {
    const saved = localStorage.getItem('belvoura_custom_translations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return { ar: {}, en: {}, fr: {} };
  });

  useEffect(() => {
    localStorage.setItem('belvoura_custom_translations', JSON.stringify(customTranslations));
  }, [customTranslations]);

  const updateTranslation = (lang: Language, key: string, value: string) => {
    setCustomTranslations((prev) => {
      const merged = {
        ...prev,
        [lang]: {
          ...(prev[lang] || {}),
          [key]: value,
        },
      };
      saveTranslationsToFirebase(merged);
      return merged;
    });
  };

  const updateBatchTranslations = (lang: Language, keyValues: Record<string, string>) => {
    setCustomTranslations((prev) => {
      const merged = {
        ...prev,
        [lang]: {
          ...(prev[lang] || {}),
          ...keyValues,
        },
      };
      saveTranslationsToFirebase(merged);
      return merged;
    });
  };

  const resetTranslations = () => {
    const emptyTrans = { ar: {}, en: {}, fr: {} };
    setCustomTranslations(emptyTrans);
    saveTranslationsToFirebase(emptyTrans);
    localStorage.removeItem('belvoura_custom_translations');
  };

  const getTranslationForLang = (lang: Language, key: string): string => {
    if (customTranslations[lang]?.[key] !== undefined) {
      return customTranslations[lang][key];
    }
    if (translations[lang]?.[key] !== undefined) {
      return translations[lang][key];
    }
    return '';
  };

  const t = (key: string): string => {
    const val = customTranslations[language]?.[key];
    if (val !== undefined && val.trim() !== '') return val;

    const defaultVal = translations[language]?.[key];
    if (defaultVal !== undefined && defaultVal.trim() !== '') return defaultVal;

    return translations.en?.[key] || key;
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `bel-${Date.now().toString().slice(-4)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    saveProductToFirebase(newProduct);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedProduct = { ...p, ...updated };
          saveProductToFirebase(updatedProduct);
          return updatedProduct;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    deleteProductFromFirebase(id);
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    seedInitialProductsToFirebase(INITIAL_PRODUCTS);
    localStorage.removeItem('belvoura_products');
  };

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const cartItemId = `${product.id}-${color.hex.replace('#', '')}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    saveOrderToFirebase(newOrder);
    setLastOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * currency.rate;
    if (language === 'ar') {
      return `${Math.round(converted).toLocaleString('ar-SA')} ${currency.symbol}`;
    }
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  const getLocalizedProductTitle = (product: Product) => {
    if (language === 'ar') return product.titleAr || product.titleEn;
    if (language === 'fr') return product.titleFr || product.titleEn;
    return product.titleEn;
  };

  const getLocalizedProductDesc = (product: Product) => {
    if (language === 'ar') return product.descriptionAr || product.descriptionEn;
    if (language === 'fr') return product.descriptionFr || product.descriptionEn;
    return product.descriptionEn;
  };

  const getLocalizedColorName = (color: ProductColor) => {
    if (language === 'ar') return color.nameAr || color.nameEn;
    if (language === 'fr') return color.nameFr || color.nameEn;
    return color.nameEn;
  };

  const getLocalizedBadge = (product: Product) => {
    if (language === 'ar') return product.badgeAr || product.badgeEn;
    if (language === 'fr') return product.badgeFr || product.badgeEn;
    return product.badgeEn;
  };

  const getLocalizedCraftsmanship = (product: Product) => {
    if (language === 'ar') return product.craftsmanshipNotesAr || product.craftsmanshipNotesEn;
    if (language === 'fr') return product.craftsmanshipNotesFr || product.craftsmanshipNotesEn;
    return product.craftsmanshipNotesEn;
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrencyCode,
        t,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
        editingProductForModal,
        setEditingProductForModal,
        boutiqueConfig,
        updateBoutiqueConfig,
        isBoutiqueConfigOpen,
        setIsBoutiqueConfigOpen,
        customTranslations,
        getTranslationForLang,
        updateTranslation,
        updateBatchTranslations,
        resetTranslations,
        isSiteTextEditorOpen,
        setIsSiteTextEditorOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        orders,
        addOrder,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        giftWrap,
        setGiftWrap,
        giftMessage,
        setGiftMessage,
        formatPrice,
        getLocalizedProductTitle,
        getLocalizedProductDesc,
        getLocalizedColorName,
        getLocalizedBadge,
        getLocalizedCraftsmanship,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
