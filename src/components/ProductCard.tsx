import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  const formatPrice = (amount: number) => `₦ ${amount.toLocaleString()}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    }
  };

  const handleCardClick = () => {
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col w-full transition-transform duration-300 hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* ── Image Container ──────────────────────── */}
      <div className="relative bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 aspect-square flex items-center justify-center overflow-hidden group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider z-10 shadow-sm ${
              product.badge === 'HOT' ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick View */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Quick view"
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black hover:text-white hover:scale-110 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Product Image */}
        {imageLoaded ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageLoaded(false)}
            referrerPolicy="no-referrer"
            className="object-contain max-h-[70%] w-auto transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4 text-center rounded-xl">
            <ShoppingBag className="w-10 h-10 stroke-1 text-blue-500/50 mb-2" />
            <span className="text-[10px] font-medium text-gray-500 line-clamp-2">{product.name}</span>
          </div>
        )}

        {/* Rating pill — bottom-left inside image card */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-800 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
          <span>{product.rating.toFixed(1)}</span>
          <svg className="w-3.5 h-3.5 fill-emerald-500 shrink-0" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-400 font-normal text-[11px]">({product.reviewCount})</span>
        </div>

        {/* Add to cart button — bottom-right inside image card */}
        {onAddToCart && (
          <button
            type="button"
            onClick={handleAddToCart}
            className={`absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold shadow-sm transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-600 text-white opacity-100'
                : 'bg-blue-600 text-white hover:bg-blue-700 opacity-0 group-hover:opacity-100 hover:scale-105'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* ── Product Info ─────────────────────────── */}
      <div className="mt-2.5 flex flex-col gap-0.5 px-0.5">
        <h3 className="text-gray-800 font-medium text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-bold text-black tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
