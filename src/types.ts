export type Language = 'ar' | 'en' | 'fr';

export type CurrencyCode = 'USD' | 'EUR' | 'SAR' | 'AED' | 'EGP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // exchange rate relative to USD
}

export type Category = 'all' | 'shoes' | 'boots' | 'slippers' | 'sneakers' | 'bags';

export interface ProductColor {
  nameEn: string;
  nameAr: string;
  nameFr: string;
  hex: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionFr: string;
  priceUSD: number;
  category: Category;
  image: string;
  secondaryImage?: string;
  badgeEn?: string;
  badgeAr?: string;
  badgeFr?: string;
  colors: ProductColor[];
  sizes: string[]; // e.g., ['35', '36', '37', '38', '39', '40', '41']
  stock: number;
  featured?: boolean;
  isNewArrival?: boolean;
  craftsmanshipNotesEn?: string;
  craftsmanshipNotesAr?: string;
  craftsmanshipNotesFr?: string;
}

export interface CartItem {
  id: string; // unique ID combining product id + selected color + selected size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  notes?: string;
}

export type PaymentMethod = 'card' | 'apple_pay' | 'tamara' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotalUSD: number;
  shippingUSD: number;
  totalUSD: number;
  currency: CurrencyCode;
  currencyRate: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: 'Crafting' | 'Dispatched' | 'In Transit' | 'Delivered';
  giftWrap: boolean;
  giftMessage?: string;
}

export interface BoutiqueConfig {
  whatsapp: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
  customerServiceTextAr: string;
  customerServiceTextEn: string;
  purchasingInfoTextAr: string;
  purchasingInfoTextEn: string;
}
