'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CartPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { items, total, loading, fetchCart, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Animate on page load
  useEffect(() => {
    if (loading || items.length === 0) return;

    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Animate cart items
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length > 0) {
          gsap.set(cartItems, { opacity: 0, y: 30 });
          gsap.to(cartItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });
        }

        // Animate summary card
        const summary = document.querySelector('.order-summary');
        if (summary) {
          gsap.set(summary, { opacity: 0, scale: 0.95, y: 20 });
          gsap.to(summary, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, [items, loading]);

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      alert('Error updating quantity');
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      alert('Error removing item');
    }
  };

  if (loading) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
          </div>
          <p className="text-stone-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div ref={containerRef} className="bg-stone-50">
        {/* Empty State */}
        <section className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="text-center max-w-lg px-4">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-light text-stone-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-stone-600 mb-12">
              Explore our premium cannabis collection and add items to your cart.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              Browse Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const subtotal = total;
  const shipping = 0; // Calculate based on your logic
  const tax = 0; // Calculate based on your logic
  const cartTotal = subtotal + shipping + tax;

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden py-16">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <h1 className="hero-title text-5xl lg:text-6xl font-light text-stone-50">
            Shopping Cart
          </h1>
          <p className="hero-subtitle text-lg text-emerald-200 mt-3">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="cart-item bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative h-40 w-40 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={item.product.image_url || 'https://via.placeholder.com/400x400?text=Product'}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-2xl font-light text-stone-900 hover:text-emerald-700 transition-colors mb-2"
                        >
                          {item.product.name}
                        </Link>

                        <p className="text-stone-600 text-base mb-4 line-clamp-2">
                          {'No description available.'}
                        </p>

                        <div className="flex items-baseline gap-3 mb-6">
                          <span className="text-2xl font-light text-emerald-700">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-stone-500">
                            ${item.product.price.toFixed(2)} each
                          </span>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-6">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center rounded hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center font-semibold text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="w-10 h-10 flex items-center justify-center rounded hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors group/remove ml-auto"
                          >
                            <svg className="w-5 h-5 group-hover/remove:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="order-summary bg-white rounded-xl shadow-lg border border-stone-100 p-8 sticky top-24">
                <h2 className="text-2xl font-light text-stone-900 mb-8">
                  Order <span className="font-serif italic text-emerald-700">Summary</span>
                </h2>

                {/* Summary Items */}
                <div className="space-y-4 mb-8 pb-8 border-b border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-semibold text-stone-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-sm text-stone-500">
                      Calculated at checkout
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Tax</span>
                    <span className="text-sm text-stone-500">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8 pb-8 border-b-2 border-emerald-600">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-stone-900">Total</span>
                    <span className="text-3xl font-light text-emerald-700">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 mb-4 flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Trust Badges */}
                <div className="space-y-3 text-center text-sm text-stone-600">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Discreet packaging</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Fast delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-4xl font-light mb-6">Looking for more?</h2>
          <p className="text-lg text-emerald-200 mb-8 max-w-2xl mx-auto">
            Explore our full collection of premium cannabis strains.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Browse All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}