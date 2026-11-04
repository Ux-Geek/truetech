import React, { useState, useMemo } from "react";
import "./LegendaryLanding.css";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: string;
  badge?: string;
};

type Category = {
  name: string;
  icon: React.ReactNode;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const asset = (name: string) => `/assets/${name}`;

const formatPrice = (amount: number) =>
  `₦ ${amount.toLocaleString("en-NG")}`;

// Linear SVG Category Icons (No enclosure, pure crisp strokes)
const CategoryIcons = {
  FlashDeals: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  NewGoods: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <path d="M12 2l2.4 6.6L21 9.8l-5.4 4.8 1.6 7.2L12 18l-5.2 3.8 1.6-7.2L3 9.8l6.6-1.2L12 2z" />
    </svg>
  ),
  TVs: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Audio: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Gaming: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
      <rect x="2" y="6" width="20" height="12" rx="6" />
    </svg>
  ),
  Laptops: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
      <path d="M7 16h10" />
    </svg>
  ),
  Solar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  Phones: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Power: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <rect x="2" y="7" width="18" height="11" rx="2" />
      <line x1="22" y1="11" x2="22" y2="14" />
      <path d="M10 10l-2 3h4l-2 3" />
    </svg>
  ),
  Accessories: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
      <rect x="5" y="7" width="14" height="10" rx="4" />
      <polyline points="12 2 12 7" />
      <polyline points="12 17 12 22" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
};

const categories: Category[] = [
  { name: "Flash Deals", icon: <CategoryIcons.FlashDeals /> },
  { name: "New Goods", icon: <CategoryIcons.NewGoods /> },
  { name: "TVs", icon: <CategoryIcons.TVs /> },
  { name: "Audio", icon: <CategoryIcons.Audio /> },
  { name: "Gaming", icon: <CategoryIcons.Gaming /> },
  { name: "Laptops", icon: <CategoryIcons.Laptops /> },
  { name: "Solar", icon: <CategoryIcons.Solar /> },
  { name: "Phones", icon: <CategoryIcons.Phones /> },
  { name: "Power", icon: <CategoryIcons.Power /> },
  { name: "Wearables & Accessories", icon: <CategoryIcons.Accessories /> },
];

const allProducts: Product[] = [
  {
    id: "tt-1",
    name: "TrueTech Pro Wireless Earbuds 2",
    image: asset("itel-earbuds.png"),
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviews: "1K+",
    badge: "NEW",
  },
  {
    id: "tt-2",
    name: "TrueTech MagSafe PowerCore 10K",
    image: asset("product-powerbank.jpg"),
    price: 18500,
    oldPrice: 24000,
    rating: 4.9,
    reviews: "2.4K",
    badge: "HOT",
  },
  {
    id: "tt-3",
    name: "TrueTech Ultra Titanium Smartwatch",
    image: asset("product-smartwatch.jpg"),
    price: 78000,
    oldPrice: 92000,
    rating: 4.7,
    reviews: "850",
    badge: "NEW",
  },
  {
    id: "tt-4",
    name: "TrueTech ANC Studio Headphones Pro",
    image: asset("product-headphones.jpg"),
    price: 32000,
    oldPrice: 42000,
    rating: 4.9,
    reviews: "1.2K",
  },
  {
    id: "tt-5",
    name: "TrueTech Dual Port 65W GaN Charger",
    image: asset("product-powerbank.jpg"),
    price: 14500,
    oldPrice: 19000,
    rating: 4.6,
    reviews: "780",
    badge: "SALE",
  },
  {
    id: "tt-6",
    name: "TrueTech Cyber Chrono Smartwatch",
    image: asset("product-smartwatch.jpg"),
    price: 84000,
    oldPrice: 98000,
    rating: 4.8,
    reviews: "620",
    badge: "HOT",
  },
  {
    id: "tt-7",
    name: "TrueTech Air Pro Active Earbuds",
    image: asset("itel-earbuds.png"),
    price: 26000,
    oldPrice: 32000,
    rating: 4.9,
    reviews: "1.4K",
    badge: "NEW",
  },
  {
    id: "tt-8",
    name: "TrueTech HyperCharge 20,000mAh Battery",
    image: asset("product-powerbank.jpg"),
    price: 21000,
    oldPrice: 26000,
    rating: 4.7,
    reviews: "1.8K",
  },
  {
    id: "tt-9",
    name: "TrueTech Wireless Studio Headset V2",
    image: asset("product-headphones.jpg"),
    price: 35000,
    oldPrice: 45000,
    rating: 4.8,
    reviews: "950",
    badge: "SALE",
  },
  {
    id: "tt-10",
    name: "TrueTech MagSafe Compact Ring Charger",
    image: asset("product-powerbank.jpg"),
    price: 12000,
    oldPrice: 16000,
    rating: 4.5,
    reviews: "430",
  },
];

// Linear Icon SVGs for Header & Actions
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4.5 4.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16l-1 13H5L4 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-visual">
        {product.badge && (
          <span
            className={`product-badge ${
              product.badge === "HOT"
                ? "badge-black"
                : product.badge === "SALE"
                ? "badge-sale"
                : "badge-blue"
            }`}
          >
            {product.badge}
          </span>
        )}

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = asset("itel-earbuds.png");
          }}
        />

        <div className="product-rating">
          <span className="rating-value">{product.rating.toFixed(1)}</span>
          <span className="rating-star">★</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`quick-add-btn ${justAdded ? "added" : ""}`}
          aria-label="Add to cart"
          title="Add to cart"
        >
          {justAdded ? "✓" : "+"}
        </button>
      </div>

      <div className="product-info">
        <h3 title={product.name}>{product.name}</h3>

        <div className="product-pricing">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  title,
  items,
  onAddToCart,
}: {
  title: string;
  items: Product[];
  onAddToCart: (product: Product) => void;
}) {
  return (
    <section className="product-section container">
      <div className="section-heading">
        <h2>{title}</h2>
        <a href="#best-sellers" className="view-all-link">
          View all <span>→</span>
        </a>
      </div>

      {items.length === 0 ? (
        <div className="empty-search-state">
          <p>No products found matching your search.</p>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Interactive Header with working Search & Cart
function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
}: {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="/" className="site-logo">
          TRUE<span className="logo-accent">TECH</span>
        </a>

        {/* Working Expandable Search Bar in Header */}
        {isSearchOpen ? (
          <div className="header-search-active">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="search-inline-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="search-clear-btn"
                title="Clear query"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={onToggleSearch}
              className="icon-button"
              title="Close search"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <nav className={menuOpen ? "nav open" : "nav"}>
            <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
            <a href="#best-sellers" onClick={() => setMenuOpen(false)}>Best Sellers</a>
            <a href="#brands" onClick={() => setMenuOpen(false)}>Brands</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          </nav>
        )}

        <div className="header-actions">
          {!isSearchOpen && (
            <button
              type="button"
              aria-label="Search"
              className="icon-button"
              onClick={onToggleSearch}
              title="Search products"
            >
              <SearchIcon />
            </button>
          )}

          <button
            type="button"
            aria-label="Shopping bag"
            className="icon-button cart-button"
            onClick={onOpenCart}
            title="Open cart"
          >
            <BagIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// Slide-Over Cart Drawer
function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.product.price * it.quantity, 0),
    [items]
  );

  const totalCount = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items]
  );

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <BagIcon />
            <h2>Your Cart ({totalCount})</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="icon-button"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <BagIcon />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add genuine tech gadgets to your cart and enjoy express dispatch across Nigeria.</p>
              <button
                type="button"
                className="cart-shop-now-btn"
                onClick={onClose}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="cart-item-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <span className="cart-item-price">
                      {formatPrice(product.price)}
                    </span>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        className="remove-item-btn"
                        title="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="cart-shipping-notice">
              ✓ Free nationwide delivery included for orders above ₦ 30,000
            </p>
            <button
              type="button"
              className="checkout-btn"
              onClick={() => alert(`Order ready! Total: ${formatPrice(subtotal)}.\nProceeding to TrueTech secure payment gateway.`)}
            >
              Checkout Now ({formatPrice(subtotal)})
            </button>
            <button
              type="button"
              className="continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero container">
      <img
        src={asset("hero-tech.jpg")}
        alt="Laptop, smartphone and wireless earbuds"
        className="hero-background"
      />

      <div className="hero-content">
        <h1>
          Tech for
          <br />
          a <span>brighter</span> day.
        </h1>

        <a href="#best-sellers" className="hero-cta">
          Shop Now
        </a>
      </div>
    </section>
  );
}

// Category Section with Linear Icons (No box enclosure)
function CategorySection({
  onSelectCategory,
}: {
  onSelectCategory: (name: string) => void;
}) {
  return (
    <section className="categories-section container" id="categories">
      <div className="category-grid">
        {categories.map((category) => (
          <button
            type="button"
            className="category-item"
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
          >
            <div className="category-linear-icon">
              {category.icon}
            </div>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ShowcaseBanner() {
  return (
    <section className="showcase-banner container">
      <img
        src={asset("showcase-tech.jpg")}
        alt="Collection of phones, laptops, headphones and power banks"
        loading="lazy"
      />
      <div className="showcase-copy">
        <h2>
          All the stuff
          <br />
          you love
        </h2>
        <a href="#best-sellers">Shop Now</a>
      </div>
    </section>
  );
}

const brands = [
  { name: "itel", image: asset("brand-itel.png") },
  { name: "Samsung", image: asset("brand-samsung.png") },
  { name: "Apple", image: asset("brand-lgnd.png") },
  { name: "Oraimo", image: asset("brand-oraimo.png") },
  { name: "Lenovo", image: asset("brand-lenovo.png") },
];

function BrandsSection() {
  return (
    <section className="brands-section container" id="brands">
      <h2>Our Brands</h2>
      <div className="brand-grid">
        {brands.map((brand) => (
          <div className="brand-item" key={brand.name}>
            <img src={brand.image} alt={brand.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

const reviews = [
  {
    id: 1,
    quote:
      "TrueTech delivered in under 24 hours in Lagos. The sound clarity and build of their gadgets is unbeatable.",
    author: "Chris Jones",
    role: "Verified Buyer",
  },
  {
    id: 2,
    quote:
      "Original products, great Naira pricing and quick customer support. My go-to tech store in Nigeria.",
    author: "Amina Bello",
    role: "Tech Enthusiast",
  },
];

function ReviewsSection() {
  const [page, setPage] = useState(0);

  return (
    <section className="reviews-section container" id="reviews">
      <div className="section-heading reviews-heading">
        <h2>Reviews</h2>
        <div className="review-controls">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => setPage(Math.max(0, page - 1))}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => setPage((page + 1) % 2)}
          >
            →
          </button>
        </div>
      </div>

      <div className="review-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.id}>
            <div className="review-text">
              <span className="quote-mark">”</span>
              <p>{review.quote}</p>
              <div className="review-author">
                <strong>{review.author}</strong>
                <span>{review.role}</span>
              </div>
            </div>
            <div className="review-media" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="newsletter container">
      <img
        src={asset("newsletter-headphones.jpg")}
        alt="Person enjoying music through headphones"
        loading="lazy"
      />

      <div className="newsletter-content">
        <h2>
          Join TrueTech Club
          <br />
          where you win points, ...
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email address"
          />
          <button type="submit">
            {submitted ? "Subscribed!" : "Join the club"}
          </button>
        </form>

        <p>
          * Get exclusive rewards and discounts.
          <br />
          * Be first to hear about new drops.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div>
          <h2>
            TRUE<span className="footer-logo-accent">TECH</span>
          </h2>
          <p>Tech for a brighter day.</p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <a href="#categories">Categories</a>
            <a href="#best-sellers">Shop</a>
            <a href="#brands">Brands</a>
          </div>
          <div>
            <h3>Support</h3>
            <a href="mailto:support@truetech.ng">Contact</a>
            <a href="#reviews">Reviews</a>
            <a href="#">Warranty</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        © {new Date().getFullYear()} TrueTech Gadgets. All rights reserved.
      </div>
    </footer>
  );
}

export default function LegendaryLanding() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: allProducts[0], quantity: 1 },
    { product: allProducts[1], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Filtered products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, it) => acc + it.quantity, 0),
    [cartItems]
  );

  const handleCategorySelect = (categoryName: string) => {
    setSearchQuery(categoryName.replace(" & Accessories", ""));
    setIsSearchOpen(true);
    const target = document.getElementById("best-sellers");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => {
          setIsSearchOpen(!isSearchOpen);
          if (isSearchOpen) setSearchQuery("");
        }}
      />
      <main>
        <Hero />

        <CategorySection onSelectCategory={handleCategorySelect} />

        <div id="best-sellers">
          {searchQuery && (
            <div className="search-status-bar container">
              <span>
                Showing results for <strong>"{searchQuery}"</strong> ({filteredProducts.length} items)
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
              >
                Clear search ✕
              </button>
            </div>
          )}

          <ProductSection
            title={searchQuery ? `Search Results (${filteredProducts.length})` : "Best Sellers"}
            items={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ShowcaseBanner />
        <BrandsSection />
        <ReviewsSection />

        <ProductSection
          title="Trending Gear"
          items={filteredProducts.slice(0, 5)}
          onAddToCart={handleAddToCart}
        />

        <Newsletter />
      </main>
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
      />
    </>
  );
}
