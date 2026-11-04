import React, { useState } from 'react';
import { X, Check, ShoppingBag, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const formatPrice = (amount: number) => `₦ ${amount.toLocaleString()}`;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image & Badges */}
          <div className="bg-gray-50 p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-72 w-full object-contain"
            />
          </div>

          {/* Right: Details & Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span className="text-emerald-600">In Stock (Nigeria Hub)</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="text-sm font-bold text-gray-800 ml-1">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-black tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {product.description ||
                  'Crafted for high performance, maximum durability, and seamless connectivity.'}
              </p>

              {/* Features list */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity and CTA */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-gray-600 hover:text-black"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-sm tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-gray-600 hover:text-black"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart (
                      {formatPrice(product.price * quantity)})
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-500" /> Fast Delivery
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" /> 1-Yr Warranty
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-500" /> 7-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
