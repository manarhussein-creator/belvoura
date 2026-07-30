import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { CategoryBanner } from './components/CategoryBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { EditProductModal } from './components/EditProductModal';
import { BoutiqueConfigModal } from './components/BoutiqueConfigModal';
import { SiteTextEditorModal } from './components/SiteTextEditorModal';
import { AddProductModal } from './components/AddProductModal';
import { AdminPanel } from './components/AdminPanel';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useShop();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E7D6C6] text-[#3B2A23] selection:bg-[#C49A97] selection:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <BrandStory />
            <CategoryBanner />
            <ProductCatalog />
            <ContactSection />
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <CategoryBanner />
            <ProductCatalog />
          </>
        )}

        {activeTab === 'about' && (
          <>
            <BrandStory />
            <CategoryBanner />
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <ContactSection />
          </>
        )}

        {activeTab === 'admin' && (
          <>
            <AdminPanel />
          </>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <EditProductModal />
      <BoutiqueConfigModal />
      <SiteTextEditorModal />
      <AddProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
