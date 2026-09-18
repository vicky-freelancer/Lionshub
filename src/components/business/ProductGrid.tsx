import React from 'react';
import { ShoppingBag, Tag, ExternalLink } from 'lucide-react';
import { BusinessProduct } from '../../types/business';

interface ProductGridProps {
  products?: BusinessProduct[];
  onEnquireProduct?: (productName: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products = [], onEnquireProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-sm text-neutral-500">
        No retail products cataloged yet for this business.
      </div>
    );
  }

  return (
    <div id="products-catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product, index) => {
        const displayImage =
          product.image_url ||
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';

        return (
          <div
            key={product.id || index}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Photo */}
              <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                <img
                  src={displayImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.price !== undefined && product.price > 0 && (
                  <div className="absolute bottom-2.5 right-2.5 bg-neutral-900/85 backdrop-blur-md text-emerald-400 font-bold text-xs px-2.5 py-1 rounded-lg border border-neutral-700/50 shadow-sm">
                    ${Number(product.price).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h4 className="font-semibold text-neutral-900 text-sm mb-1 line-clamp-1">{product.name}</h4>
                {product.description && (
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Action Footer */}
            {onEnquireProduct && (
              <div className="p-3 pt-0">
                <button
                  type="button"
                  onClick={() => onEnquireProduct(product.name)}
                  className="w-full py-2 px-3 rounded-xl bg-neutral-100 hover:bg-emerald-600 hover:text-white text-neutral-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Enquire for this item</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
