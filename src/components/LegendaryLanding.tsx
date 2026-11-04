import React, { useState } from "react";
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
  image: string;
};

const asset = (name: string) => `/assets/${name}`;

const formatPrice = (amount: number) =>
  `₦ ${amount.toLocaleString("en-NG")}`;

const categories: Category[] = [
  { name: "Flash Deals", image: asset("flash-deals.png") },
  { name: "New Goods", image: asset("new-goods.png") },
  { name: "TVs", image: asset("tvs.png") },
  { name: "Audio", image: asset("audio.png") },
  { name: "Gaming", image: asset("gaming.png") },
  { name: "Laptops", image: asset("laptops.png") },
  { name: "Solar", image: asset("solar.png") },
  { name: "Phones", image: asset("phones.png") },
  { name: "Power", image: asset("power.png") },
  {
    name: "Wearables & Accessories",
    image: asset("accessories.png"),
  },
];

const products: Product[] = [
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
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `tt-${index + 6}`,
    name: "TrueTech Gadget Item 2 Pro",
    image: asset("itel-earbuds.png"),
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviews: "1K+",
    badge: index % 3 === 0 ? "NEW" : index % 3 === 1 ? "HOT" : undefined,
  })),
];

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
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
            // graceful fallback
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
          onClick={handleQuickAdd}
          className={`quick-add-btn ${added ? "added" : ""}`}
          aria-label="Add to cart"
          title="Quick Add"
        >
          {added ? "✓" : "+"}
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
}: {
  title: string;
  items: Product[];
}) {
  return (
    <section className="product-section container">
      <div className="section-heading">
        <h2>{title}</h2>
        <a href="#best-sellers" className="view-all-link">
          View all <span>→</span>
        </a>
      </div>

      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="/" className="site-logo">
          TRUE<span className="logo-accent">TECH</span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#best-sellers" onClick={() => setMenuOpen(false)}>Best Sellers</a>
          <a href="#brands" onClick={() => setMenuOpen(false)}>Brands</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        </nav>

        <div className="header-actions">
          <button type="button" aria-label="Search" className="icon-button">
            <SearchIcon />
          </button>
          <button type="button" aria-label="Shopping bag" className="icon-button cart-button">
            <BagIcon />
            <span className="cart-badge">2</span>
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="20"
      height="20"
    >
      <circle cx="10.8" cy="10.8" r="7" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="20"
      height="20"
    >
      <path d="M4 8h16l-1 13H5L4 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
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

function CategorySection() {
  return (
    <section className="categories-section container" id="categories">
      <div className="category-grid">
        {categories.map((category) => (
          <a href="#best-sellers" className="category-item" key={category.name}>
            <div className="category-image">
              <img src={category.image} alt={category.name} loading="lazy" />
            </div>
            <span>{category.name}</span>
          </a>
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
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <div id="best-sellers">
          <ProductSection title="Best Sellers" items={products} />
        </div>
        <ShowcaseBanner />
        <BrandsSection />
        <ReviewsSection />
        <ProductSection title="Trending Gear" items={products} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
