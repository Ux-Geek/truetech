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
  isNew?: boolean;
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

const products: Product[] = Array.from(
  { length: 15 },
  (_, index) => ({
    id: `itel-${index + 1}`,
    name: "Legendary Gadget Item 2 Pro",
    image: asset("itel-earbuds.png"),
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviews: "1K+",
    isNew: true,
  })
);

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        {product.isNew && (
          <span className="product-badge">NEW</span>
        )}

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <div className="product-rating">
          <span>{product.rating.toFixed(1)}</span>
          <span className="rating-star">★</span>
          <span className="rating-count">
            ({product.reviews})
          </span>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="product-pricing">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && (
            <del>{formatPrice(product.oldPrice)}</del>
          )}
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
      </div>

      <div className="product-grid">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
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
          LEGENDARY
        </a>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#categories">Categories</a>
          <a href="#best-sellers">Best Sellers</a>
          <a href="#brands">Brands</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            aria-label="Search"
            className="icon-button"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Shopping bag"
            className="icon-button"
          >
            <BagIcon />
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
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7"
      width="22" height="22">
      <circle cx="10.8" cy="10.8" r="7" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7"
      width="22" height="22">
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
    <section
      className="categories-section container"
      id="categories"
    >
      <div className="category-grid">
        {categories.map((category) => (
          <a
            href="#best-sellers"
            className="category-item"
            key={category.name}
          >
            <div className="category-image">
              <img
                src={category.image}
                alt=""
                loading="lazy"
              />
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
  { name: "LGND", image: asset("brand-lgnd.png") },
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
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
            />
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
      "They kept things simple and we've remodelled half of our objects in 6 months.",
    author: "Chris Jones",
    role: "Founder & Company",
  },
  {
    id: 2,
    quote:
      "They kept things simple and we've remodelled half of our objects in 6 months.",
    author: "Chris Jones",
    role: "Founder & Company",
  },
];

function ReviewsSection() {
  const [page, setPage] = useState(0);

  return (
    <section
      className="reviews-section container"
      id="reviews"
    >
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
              <span className="quote-mark">"</span>
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
          Join Legendary Club
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
            {submitted ? "Submitted" : "Join the club"}
          </button>
        </form>

        <p>
          * Get exclusive rewards and offers.
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
          <h2>LEGENDARY</h2>
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
            <a href="mailto:support@example.com">
              Contact
            </a>
            <a href="#reviews">Reviews</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        © {new Date().getFullYear()} Legendary Gadget.
        All rights reserved.
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
          <ProductSection
            title="Best Sellers"
            items={products}
          />
        </div>
        <ShowcaseBanner />
        <BrandsSection />
        <ReviewsSection />
        <ProductSection
          title="Best Sellers"
          items={products}
        />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

