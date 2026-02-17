'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShippingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Hero animation
        const hero = document.querySelector('.shipping-hero');
        if (hero) {
          gsap.set(hero, { opacity: 0, y: 30 });
          gsap.to(hero, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }

        // Content sections
        const sections = document.querySelectorAll('.shipping-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.shipping-content', start: 'top 80%' }
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero Section */}
      <section className="shipping-hero bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <h1 className="text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
            Shipping <span className="italic font-serif text-emerald-400">Information</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl">
            Fast, discreet, and reliable shipping to your doorstep.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="shipping-content py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Shipping Methods */}
          <div className="shipping-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Shipping Methods</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Standard Shipping</h3>
                <p className="text-stone-600 mb-4">Our most popular option, arriving in 3-5 business days.</p>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free shipping on orders over $100</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>$10 flat rate for orders under $100</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Discreet, unmarked packaging</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-stone-200 pt-8">
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Express Shipping</h3>
                <p className="text-stone-600 mb-4">Get your order faster with guaranteed 1-2 business day delivery.</p>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>$25 flat rate for all orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>1-2 business day guaranteed delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time tracking included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Process */}
          <div className="shipping-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">How Our Shipping Process Works</h2>
            
            <div className="space-y-6">
              {[
                { num: 1, title: 'Order Placed', desc: 'Your order is confirmed and sent to our fulfillment team.' },
                { num: 2, title: 'Processing', desc: 'Your items are carefully selected and packaged with care.' },
                { num: 3, title: 'Quality Check', desc: 'Every order is inspected to ensure accuracy and quality.' },
                { num: 4, title: 'Shipped', desc: 'Your package is handed off to our shipping partner.' },
                { num: 5, title: 'In Transit', desc: 'Track your package in real-time with your tracking number.' },
                { num: 6, title: 'Delivered', desc: 'Your order arrives safely at your doorstep.' }
              ].map((step) => (
                <div key={step.num} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-600">
                      <span className="text-emerald-700 font-bold text-lg">{step.num}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-stone-900 mb-1">{step.title}</h3>
                    <p className="text-stone-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking & Insurance */}
          <div className="shipping-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Tracking & Insurance</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Real-Time Tracking</h3>
                <p className="text-stone-600">Every order includes a tracking number. You'll receive an email with tracking information as soon as your package ships. Track your order in real-time to know exactly when it will arrive.</p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Package Insurance</h3>
                <p className="text-stone-600 mb-4">All orders are automatically insured against loss or damage during transit. If your package is damaged or lost:</p>
                <ol className="space-y-2 text-stone-600 list-decimal list-inside">
                  <li>Contact us immediately with photos of damage</li>
                  <li>We'll file a claim with the carrier</li>
                  <li>Once approved, we'll send a replacement or refund</li>
                </ol>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="shipping-section bg-emerald-50 rounded-xl border border-emerald-200 p-10">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Do you ship internationally?</h3>
                <p className="text-stone-600">Currently, we only ship within the United States. International shipping may be available in the future.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">What if my order doesn't arrive?</h3>
                <p className="text-stone-600">Contact us immediately if your order doesn't arrive within the promised timeframe. We'll investigate with the carrier and either send a replacement or process a refund.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Can I change my shipping address?</h3>
                <p className="text-stone-600">Contact us immediately after placing your order. If we haven't shipped yet, we can update your address. Once shipped, you'll need to contact the carrier or we can redirect the package.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">How is the packaging?</h3>
                <p className="text-stone-600">We use discreet, unmarked packaging. Your products arrive safely in plain boxes with no branding that identifies the contents. Perfect for privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-4xl font-light mb-6">Ready to Order?</h2>
          <p className="text-lg text-emerald-200 mb-8">Browse our collection and enjoy fast, discreet shipping.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Shop Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}