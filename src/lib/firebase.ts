import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product, Order, BoutiqueConfig, Language } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Collection References
export const PRODUCTS_COLLECTION = 'products';
export const ORDERS_COLLECTION = 'orders';
export const CONFIG_COLLECTION = 'config';

// Firebase Helper Functions for Products
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(
    productsRef,
    (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Product);
      });
      callback(items);
    },
    (error) => {
      console.warn('Firestore Products subscription error:', error);
    }
  );
};

export const saveProductToFirebase = async (product: Product) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
    await setDoc(docRef, product, { merge: true });
  } catch (err) {
    console.error('Failed to save product to Firebase:', err);
  }
};

export const deleteProductFromFirebase = async (id: string) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Failed to delete product from Firebase:', err);
  }
};

export const seedInitialProductsToFirebase = async (initialProducts: Product[]) => {
  try {
    const batch = writeBatch(db);
    initialProducts.forEach((p) => {
      const docRef = doc(db, PRODUCTS_COLLECTION, p.id);
      batch.set(docRef, p, { merge: true });
    });
    await batch.commit();
  } catch (err) {
    console.error('Failed to seed initial products to Firebase:', err);
  }
};

// Firebase Helper Functions for Orders
export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  return onSnapshot(
    ordersRef,
    (snapshot) => {
      const items: Order[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Order);
      });
      // Sort orders by newest first if date is available
      items.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      callback(items);
    },
    (error) => {
      console.warn('Firestore Orders subscription error:', error);
    }
  );
};

export const saveOrderToFirebase = async (order: Order) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(docRef, order, { merge: true });
  } catch (err) {
    console.error('Failed to save order to Firebase:', err);
  }
};

// Firebase Helper Functions for Boutique Config
export const subscribeToBoutiqueConfig = (callback: (config: BoutiqueConfig) => void) => {
  const docRef = doc(db, CONFIG_COLLECTION, 'boutique');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as BoutiqueConfig);
      }
    },
    (error) => {
      console.warn('Firestore BoutiqueConfig subscription error:', error);
    }
  );
};

export const saveBoutiqueConfigToFirebase = async (config: BoutiqueConfig) => {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, 'boutique');
    await setDoc(docRef, config, { merge: true });
  } catch (err) {
    console.error('Failed to save boutique config to Firebase:', err);
  }
};

// Firebase Helper Functions for Translations
export const subscribeToTranslations = (
  callback: (translations: Record<Language, Record<string, string>>) => void
) => {
  const docRef = doc(db, CONFIG_COLLECTION, 'translations');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as Record<Language, Record<string, string>>);
      }
    },
    (error) => {
      console.warn('Firestore Translations subscription error:', error);
    }
  );
};

export const saveTranslationsToFirebase = async (
  translations: Record<Language, Record<string, string>>
) => {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, 'translations');
    await setDoc(docRef, translations, { merge: true });
  } catch (err) {
    console.error('Failed to save translations to Firebase:', err);
  }
};
