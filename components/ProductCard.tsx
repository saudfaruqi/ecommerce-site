'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    thc?: string;
    type?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const [adding, setAdding] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current as any;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(imageRef.current, {
        x: (x - rect.width / 2) * 0.1,
        y: (y - rect.height / 2) * 0.1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock < 1) return;
    
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      
      // Animation for success
      const btn = e.currentTarget as HTMLElement;
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
      
      alert('Added to cart!');
    } catch (error) {
      alert('Error adding to cart');
    } finally {
      setAdding(false);
    }
  };

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock < 1;

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        ref={cardRef}
        className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-emerald-200"
      >
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-stone-100">
          <div ref={imageRef} className="w-full h-full">
            <Image
              src={product.image_url || 'https://via.placeholder.com/400x400?text=Product'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.type && (
              <span className="bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold text-stone-900 uppercase tracking-wider rounded">
                {product.type}
              </span>
            )}
            {product.thc && (
              <span className="bg-emerald-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                THC {product.thc}
              </span>
            )}
          </div>

          {/* Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            </div>
          )}

          {/* Low Stock Badge */}
          {isLowStock && !isOutOfStock && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Only {product.stock} left!
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category */}
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-light text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-stone-600 text-sm mb-4 flex-1 line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <div>
              <span className="text-3xl font-light text-emerald-700">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding || isOutOfStock}
              className="group/btn inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 disabled:bg-stone-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {adding ? 'Adding...' : isOutOfStock ? 'Out' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}