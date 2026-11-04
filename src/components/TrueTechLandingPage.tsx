import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Star,
  ExternalLink,
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
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { ...featuredProducts[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick view state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter & search states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, it) => acc + it.quantity, 0),
    [cartItems]
  );

  // Filtered products calculation
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
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-xs shadow-blue-500/50 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-extrabold tracking-wider text-white">
              TRUE<span className="text-blue-500">TECH</span>
            </span>
          </a>
        </div>

        {/* Navigation Links Zone */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#featured-section" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="#categories-section" className="hover:text-blue-400 transition-colors">
            Categories
          </a>
          <a href="#deals-section" className="hover:text-blue-400 transition-colors">
            Deals
          </a>
          <a href="#reviews-section" className="hover:text-blue-400 transition-colors">
            Reviews
          </a>
          <a href="#footer-section" className="hover:text-blue-400 transition-colors">
            Support
          </a>
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3">
          {/* Quick Search Bar */}
          <div className="relative">
            {isSearchActive ? (
              <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-28 sm:w-40"
                />
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-white text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchActive(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                title="Search products"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-scale-in">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              const el = document.getElementById('featured-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-500/25 active:scale-95"
          >
            Shop Now
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-black text-white py-16 sm:py-24 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        {/* Ambient Electric Blue Glow Backdrops */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl z-10 mb-10 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>2026 Next-Gen Hardware Release</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Tech for a <span className="text-blue-500">brighter</span> day.
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
            Discover the next generation of sleek gadgets and high-performance accessories crafted for modern life. Genuine warranty, instant dispatch nationwide.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('featured-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 group active:scale-95"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('deals-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 font-medium px-6 py-3 rounded-xl transition-all"
            >
              Limited Deals
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-10 pt-8 border-t border-gray-800/80 grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-xl font-bold text-white tabular-nums">48-Hr</div>
              <div className="text-gray-400 mt-0.5">Nationwide Express</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">1-Year</div>
              <div className="text-gray-400 mt-0.5">TrueTech Guarantee</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">10,000+</div>
              <div className="text-gray-400 mt-0.5">Satisfied Buyers</div>
            </div>
          </div>
        </div>

        {/* Hero Product Media */}
        <div className="relative w-full md:w-1/2 flex justify-center z-10">
          <div className="relative max-w-lg w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
            <img
              src={HERO_IMAGE}
              alt="TrueTech Next-Gen Devices"
              className="relative rounded-2xl shadow-2xl border border-gray-800 object-cover w-full aspect-16/10"
            />
          </div>
        </div>
      </section>

      {/* 3. Category Icons Grid */}
      <section id="categories-section" className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 text-center">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer group select-none ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-gray-100 shadow-xs hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'
                  }`}
                >
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  {cat.itemCount} items
                </span>
              </div>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="text-gray-600">
              Filtered by: <strong>{selectedCategory}</strong>
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 underline hover:text-blue-800 font-semibold"
            >
              Clear Filter
            </button>
          </div>
        )}
      </section>

      {/* 4. Product Grid Section 1 (Featured Releases) */}
      <section id="featured-section" className="py-10 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Featured Releases
            </h2>
            <p className="text-gray-500 text-sm mt-1">Upgrade your everyday setup</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {displayedFeatured.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm">No items found matching your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-blue-600 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
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

      {/* 5. Mid Banner Section */}
      <section id="deals-section" className="my-12 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between border border-gray-800 shadow-xl">
          <div className="max-w-md z-10 mb-8 md:mb-0">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-900/40 px-3 py-1 rounded-full border border-blue-800/40 inline-block mb-3">
              Weekly Special Promo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              All the stuff you love.
            </h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Get up to 30% off selected TrueTech premium gear this week. Use code{' '}
              <span className="text-white font-mono font-semibold bg-gray-800 px-2 py-0.5 rounded">
                TRUETECH10
              </span>{' '}
              at checkout for extra discounts.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-md active:scale-95"
              >
                Shop Sale
              </button>
              <span className="text-xs text-gray-400">Offer valid while stock lasts</span>
            </div>
          </div>

          <div className="relative z-10 max-w-sm w-full">
            <img
              src={PROMO_IMAGE}
              alt="Promo Desk Gear"
              className="rounded-xl shadow-2xl object-cover w-full aspect-16/10 border border-gray-800"
            />
          </div>
        </div>
      </section>

      {/* 6. Brand Logos Bar */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Official Distribution & Genuine Warranty Partners
            </span>
          </div>
          <div className="flex justify-between items-center opacity-70 hover:opacity-100 transition-all gap-8 overflow-x-auto text-sm font-black tracking-widest text-gray-700 py-2">
            {brandPartners.map((b, i) => (
              <div key={i} className="flex flex-col items-center shrink-0">
                <span className="text-base tracking-widest hover:text-blue-600 transition-colors cursor-pointer">
                  {b.name}
                </span>
                <span className="text-[10px] font-normal tracking-normal text-gray-400">
                  {b.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Reviews / Testimonials Section */}
      <section id="reviews-section" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Over 10,000 satisfied tech lovers across Nigeria and West Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <h4 className="font-semibold text-sm text-gray-900 mb-2">{rev.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                  {rev.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-semibold text-xs text-gray-900 truncate">{rev.author}</h5>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Product Grid Section 2 (Trending Accessories) */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Trending Accessories
            </h2>
            <p className="text-gray-500 text-sm mt-1">High-demand essentials this season</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Accessories');
              const el = document.getElementById('featured-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            <span>Explore Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
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

      {/* 9. Bottom CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
            <Send className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Never Miss a Drop</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-md">
            Subscribe to get exclusive early access to tech launches, price cuts, and flash sales.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all shrink-0 active:scale-95 shadow-md shadow-blue-500/20"
            >
              Join
            </button>
          </form>

          {newsletterSubscribed && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Welcome to TrueTech Insider! Check your inbox for your 10% coupon.</span>
            </div>
          )}
        </div>
      </section>

      {/* 10. Big Black Footer */}
      <footer id="footer-section" className="bg-black text-gray-400 py-16 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-xl font-bold mb-4 tracking-wider">
              TRUE<span className="text-blue-500">TECH</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Your destination for modern tech, premium accessories, and gadget innovation in Nigeria.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Lekki Peninsula & Victoria Island, Lagos</div>
              <div>Hotline: +234 800-TRUETECH</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Shop Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('Audio')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Headphones & Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Accessories')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Power Banks & MagSafe
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Wearables')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Smartwatches & Bands
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Gaming')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Gaming Keyboards & Desks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Customer Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#featured-section" className="hover:text-blue-400 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#featured-section" className="hover:text-blue-400 transition-colors">
                  Warranty & Returns
                </a>
              </li>
              <li>
                <a href="#featured-section" className="hover:text-blue-400 transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#featured-section" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Follow TrueTech</h4>
            <p className="text-sm text-gray-500 mb-3">@truetech.ng</p>
            <div className="flex gap-3 text-xs text-gray-400">
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-md">
                Instagram
              </span>
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-md">
                Twitter/X
              </span>
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-md">
                YouTube
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-4">
          <div>
            © {new Date().getFullYear()} TrueTech. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Security</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />
    </div>
  );
};

export default TrueTechLandingPage;
