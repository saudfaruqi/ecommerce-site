'use client';

import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts(
          selectedCategory ? { category: selectedCategory } : {}
        );
        setProducts(allProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(allProducts.map((p: any) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Animate products when they change
  useEffect(() => {
    if (loading) return;

    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const productCards = document.querySelectorAll('.product-card-item');
        if (productCards.length > 0) {
          gsap.set(productCards, { opacity: 0, y: 30, scale: 0.95 });
          gsap.to(productCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, [products, loading]);

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero Section */}
      <section className="min-h-[50vh] bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-20 w-full">
          <div className="max-w-3xl">
            <h1 className="hero-title text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
              Our <span className="italic font-serif text-emerald-400">Premium</span> Collection
            </h1>
            <p className="hero-subtitle text-xl text-emerald-200 max-w-2xl">
              Hand-selected, lab-tested cannabis strains from master cultivators. Every product represents excellence in quality and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-emerald-600"></div>
                <span className="text-emerald-600 text-sm tracking-widest uppercase font-semibold">Filter</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === ''
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-white text-stone-900 border border-stone-200 hover:border-emerald-600 hover:text-emerald-600'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-white text-stone-900 border border-stone-200 hover:border-emerald-600 hover:text-emerald-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
                </div>
                <p className="text-stone-600 text-lg">Loading products...</p>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <div key={product.id} className="product-card-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <svg className="w-20 h-20 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-stone-600 text-lg font-medium">No products found</p>
                <p className="text-stone-500 mt-2">Try selecting a different category</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Can't find what you're looking for?</h2>
          <p className="text-xl text-emerald-200 mb-10 max-w-2xl mx-auto">
            Contact us for special requests or recommendations tailored to your needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}