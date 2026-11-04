import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Check,
  ArrowRight,
  ShieldCheck,
  Send,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { QuickViewModal } from './QuickViewModal';
import {
  featuredProducts,
  trendingProducts,
  allProducts,
  categories,
  brandPartners,
  customerReviews,
  HERO_IMAGE,
  PROMO_IMAGE,
} from '../data/products';

export const TrueTechLandingPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, it) => acc + it.quantity, 0),
    [cartItems]
  );

  const displayedFeatured = useMemo(() => {
    return featuredProducts.filter((product) => {
      const matchCat = !selectedCategory || product.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const displayedTrending = useMemo(() => {
    return trendingProducts.filter((product) => {
      const matchCat = !selectedCategory || product.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName));
    const section = document.getElementById('featured-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* ── Header ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/60 text-white px-5 sm:px-8 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,.5)] group-hover:scale-125 transition-transform" />
          <span className="text-lg font-extrabold tracking-widest">
            TRUE<span className="text-blue-500">TECH</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-gray-400">
          {[
            ['Home', 'featured-section'],
            ['Categories', 'categories-section'],
            ['Deals', 'deals-section'],
            ['Reviews', 'reviews-section'],
            ['Support', 'footer-section'],
          ].map(([label, target]) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          {isSearchActive ? (
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search gear…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-28 sm:w-36"
              />
              <button
                onClick={() => { setIsSearchActive(false); setSearchQuery(''); }}
                className="text-gray-500 hover:text-white text-xs ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchActive(true)}
              className="p-2 text-gray-500 hover:text-white rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => scrollTo('featured-section')}
            className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all active:scale-95"
          >
            Shop Now
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 px-6 py-4 flex flex-col gap-3 text-sm text-gray-300 z-40 relative">
          {[
            ['Home', 'featured-section'],
            ['Categories', 'categories-section'],
            ['Deals', 'deals-section'],
            ['Reviews', 'reviews-section'],
            ['Support', 'footer-section'],
          ].map(([label, target]) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="text-left hover:text-blue-400 transition-colors py-1"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[420px] sm:min-h-[500px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-2xl">
            Power meets <br className="hidden sm:block" />
            <span className="text-blue-500">precision.</span>
          </h1>
          <p className="mt-5 text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed">
            Next-gen gadgets and premium accessories crafted for modern life — genuine warranty, instant dispatch nationwide.
          </p>
          <div className="mt-8">
            <button
              onClick={() => scrollTo('featured-section')}
              className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95 group"
            >
              Shop now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Category Icons ─────────────────────────── */}
      <section id="categories-section" className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl border transition-all select-none ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-gray-100 shadow-sm hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400">{cat.itemCount} items</span>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="text-gray-500">
              Filtered by: <strong className="text-gray-700">{selectedCategory}</strong>
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 underline hover:text-blue-800 font-semibold"
            >
              Clear
            </button>
          </div>
        )}
      </section>

      {/* ── Featured Releases ──────────────────────── */}
      <section id="featured-section" className="py-8 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Featured Releases</h2>
            <p className="text-gray-400 text-sm mt-0.5">Upgrade your everyday setup</p>
          </div>
          <button
            onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
            className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {displayedFeatured.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 text-sm">No items found.</p>
            <button
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-blue-600 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedFeatured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Mid Promo Banner ───────────────────────── */}
      <section id="deals-section" className="my-10 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 md:w-1/2 z-10">
              <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40 inline-block mb-4">
                Weekly Special
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                All the stuff<br />you love.
              </h2>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-sm">
                Get up to 30% off selected TrueTech premium gear this week.
              </p>
              <button
                onClick={() => scrollTo('featured-section')}
                className="mt-6 bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all active:scale-95"
              >
                Shop Sale
              </button>
            </div>
            <div className="md:w-1/2 p-4 md:p-0">
              <img
                src={PROMO_IMAGE}
                alt="Promo Gear"
                className="rounded-2xl md:rounded-none md:rounded-r-3xl object-cover w-full h-64 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Logos ────────────────────────────── */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold tracking-[.2em] text-gray-400 uppercase mb-4">
            Official Partners & Genuine Warranty
          </p>
          <div className="flex justify-between items-center gap-8 overflow-x-auto py-2 opacity-60 hover:opacity-100 transition-opacity">
            {brandPartners.map((b, i) => (
              <div key={i} className="flex flex-col items-center shrink-0 cursor-pointer group">
                <span className="text-sm font-black tracking-[.15em] text-gray-700 group-hover:text-blue-600 transition-colors">
                  {b.name}
                </span>
                <span className="text-[9px] font-normal text-gray-400 mt-0.5">
                  {b.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────── */}
      <section id="reviews-section" className="py-14 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-lg mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            10,000+ satisfied tech lovers across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <h4 className="font-semibold text-sm text-gray-900 mb-1.5">{rev.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">"{rev.quote}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  {rev.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h5 className="font-semibold text-xs text-gray-900 truncate">{rev.author}</h5>
                    <ShieldCheck className="w-3 h-3 text-blue-500 shrink-0" />
                  </div>
                  <p className="text-[10px] text-gray-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Accessories ───────────────────── */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Trending Accessories
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">High-demand essentials this season</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Accessories');
              scrollTo('featured-section');
            }}
            className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedTrending.map((product) => (
            <ProductCard
              key={`trending-${product.id}`}
              product={{ ...product, badge: undefined }}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
            <Send className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Never Miss a Drop</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md">
            Subscribe for exclusive early access to launches and flash sales.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-all shrink-0 active:scale-95"
            >
              Join
            </button>
          </form>

          {newsletterSubscribed && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Welcome! Check your inbox for a 10% coupon.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer id="footer-section" className="bg-black text-gray-500 py-14 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-lg font-bold mb-3 tracking-wider">
              TRUE<span className="text-blue-500">TECH</span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Your destination for modern tech, premium accessories, and gadget innovation in Nigeria.
            </p>
            <div className="text-[11px] text-gray-600 space-y-0.5">
              <div>Lekki Peninsula & Victoria Island, Lagos</div>
              <div>Hotline: +234 800-TRUETECH</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-xs">
              {['Audio', 'Accessories', 'Wearables', 'Gaming'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-xs">
              {['Track Order', 'Warranty & Returns', 'Delivery Info', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Follow Us</h4>
            <p className="text-xs text-gray-600 mb-3">@truetech.ng</p>
            <div className="flex gap-2 text-[10px]">
              {['Instagram', 'Twitter/X', 'YouTube'].map((s) => (
                <span key={s} className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-900 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-700 gap-3">
          <div>© {new Date().getFullYear()} TrueTech. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-500">Privacy</a>
            <a href="#" className="hover:text-gray-500">Terms</a>
            <a href="#" className="hover:text-gray-500">Security</a>
          </div>
        </div>
      </footer>

      {/* ── Drawers / Modals ───────────────────────── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />
    </div>
  );
};

export default TrueTechLandingPage;
