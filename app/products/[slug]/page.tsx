'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProduct } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef(null);
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(slug);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Animate on product load
  useEffect(() => {
    if (loading || !product) return;

    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Image entrance
        const image = document.querySelector('.product-image');
        if (image) {
          gsap.set(image, { opacity: 0, scale: 1.1 });
          gsap.to(image, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
          });
        }

        // Content entrance
        const content = document.querySelector('.product-content');
        if (content) {
          gsap.set(content, { opacity: 0, x: 40 });
          gsap.to(content, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
          });
        }

        // Info sections
        const sections = document.querySelectorAll('.product-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.product-details',
              start: 'top 80%'
            }
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, [loading, product]);

  const handleAddToCart = async () => {
    if (!product || product.stock < quantity) return;
    
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      
      // Success animation
      const btn = document.querySelector('.add-to-cart-btn') as HTMLElement;
      if (btn) {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      }
      
      alert('Added to cart!');
    } catch (error) {
      alert('Error adding to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
          </div>
          <p className="text-stone-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 text-center">
          <h1 className="text-4xl font-light text-stone-900 mb-6">Product not found</h1>
          <p className="text-xl text-stone-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <button
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock < 1;
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Back Button */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Product Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="product-image sticky top-20 h-96 lg:h-[600px] bg-stone-100 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image_url || 'https://via.placeholder.com/800x800?text=Product'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="product-content">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              {product.type && (
                <span className="bg-white border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700">
                  {product.type}
                </span>
              )}
              {product.category && (
                <span className="bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700">
                  {product.category}
                </span>
              )}
            </div>

            {/* Title & Price */}
            <h1 className="text-5xl lg:text-6xl font-light text-stone-900 mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-light text-emerald-700">
                ${product.price.toFixed(2)}
              </span>
              {product.thc && (
                <span className="text-lg text-stone-600">
                  THC {product.thc}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="product-section mb-8">
              {isOutOfStock ? (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-6 py-4 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg font-semibold text-red-600">Out of Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="text-lg font-semibold text-emerald-600">In Stock</span>
                    {isLowStock && (
                      <p className="text-sm text-orange-600 mt-1">Only {product.stock} left!</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="product-section mb-8">
                <label className="block text-sm font-semibold text-stone-900 mb-4">
                  Quantity
                </label>
                <div className="flex items-center gap-4 bg-white rounded-lg border border-stone-200 p-4 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-2xl font-light text-stone-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={adding || isOutOfStock}
              className="add-to-cart-btn w-full bg-emerald-600 text-white py-5 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg shadow-emerald-600/20 disabled:bg-stone-400 disabled:cursor-not-allowed disabled:shadow-none mb-4"
            >
              {adding ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding to Cart...
                </span>
              ) : isOutOfStock ? (
                'Out of Stock'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Cart
                </span>
              )}
            </button>

            {/* Trust Badges */}
            <div className="product-section grid grid-cols-2 gap-4 pt-6 border-t border-stone-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-stone-900">Lab Tested</p>
                  <p className="text-sm text-stone-600">Quality assured</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-stone-900">Discreet Shipping</p>
                  <p className="text-sm text-stone-600">Fast delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-stone-900">Secure Payment</p>
                  <p className="text-sm text-stone-600">Encrypted checkout</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-stone-900">24/7 Support</p>
                  <p className="text-sm text-stone-600">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="product-details bg-white border-t border-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <h2 className="text-3xl font-light text-stone-900 mb-12">
            About this <span className="italic font-serif text-emerald-700">Strain</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="product-section">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Quality Assurance</h3>
              <p className="text-stone-600 leading-relaxed">
                Every batch of our cannabis undergoes rigorous third-party lab testing. We provide complete certificates of analysis including cannabinoid profiles, terpene content, and safety screenings.
              </p>
            </div>

            <div className="product-section">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Sustainable Cultivation</h3>
              <p className="text-stone-600 leading-relaxed">
                Our products are cultivated using organic, pesticide-free methods. We work exclusively with growers who prioritize environmental sustainability and plant health.
              </p>
            </div>

            <div className="product-section">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Expert Selection</h3>
              <p className="text-stone-600 leading-relaxed">
                Each strain is hand-selected by our team of cultivation experts for exceptional terpene profiles, consistent potency, and outstanding effects.
              </p>
            </div>

            <div className="product-section">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Storage & Freshness</h3>
              <p className="text-stone-600 leading-relaxed">
                Products are stored in optimal conditions to maintain freshness and potency. Proper storage extends shelf life while preserving terpene complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-4xl font-light mb-6">Explore More Strains</h2>
          <p className="text-xl text-emerald-200 mb-10 max-w-2xl mx-auto">
            Discover other premium cultivars from our collection.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}