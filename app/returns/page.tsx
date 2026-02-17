'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReturnsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const hero = document.querySelector('.returns-hero');
        if (hero) {
          gsap.set(hero, { opacity: 0, y: 30 });
          gsap.to(hero, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }

        const sections = document.querySelectorAll('.returns-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.returns-content', start: 'top 80%' }
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
      <section className="returns-hero bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <h1 className="text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
            Returns & <span className="italic font-serif text-emerald-400">Refunds</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl">
            100% satisfaction guaranteed. Easy returns and hassle-free refunds.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="returns-content py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Return Policy */}
          <div className="returns-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Our Return Policy</h2>
            
            <div className="space-y-6">
              <p className="text-lg text-stone-600">
                We stand behind the quality of our products. If you're not completely satisfied with your purchase, we offer easy returns and full refunds within 30 days of purchase.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="font-semibold text-stone-900 mb-2">30-Day Money Back Guarantee</h3>
                <p className="text-stone-600">If you're not satisfied for any reason, we'll refund your full purchase price within 30 days of receipt.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-4">Return Conditions</h3>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Product must be in original, unopened condition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Return must be initiated within 30 days of delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Original packaging and documentation must be included</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Item must not show signs of use or damage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Return */}
          <div className="returns-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">How to Return an Item</h2>
            
            <div className="space-y-6">
              {[
                { num: 1, title: 'Contact Us', desc: 'Email support@strainnotname.com with your order number and reason for return.' },
                { num: 2, title: 'Get Return Label', desc: 'We\'ll provide you with a prepaid return shipping label.' },
                { num: 3, title: 'Pack Item', desc: 'Securely pack your item in original packaging with all documentation.' },
                { num: 4, title: 'Ship It Back', desc: 'Use the prepaid label to ship the package back to us.' },
                { num: 5, title: 'Processing', desc: 'Once received, we inspect the item and process your refund.' },
                { num: 6, title: 'Refund Issued', desc: 'Full refund is issued to your original payment method within 5-7 business days.' }
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

          {/* Damaged Items */}
          <div className="returns-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Damaged or Defective Items</h2>
            
            <p className="text-stone-600 mb-6">
              If your order arrives damaged or defective, please contact us immediately. We'll make it right.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-stone-900">What to do:</h3>
              <ol className="space-y-3 text-stone-600 list-decimal list-inside">
                <li>Take clear photos of the damage or defect</li>
                <li>Email photos to support@strainnotname.com within 48 hours of delivery</li>
                <li>We'll issue a replacement or refund immediately</li>
                <li>No return shipping required for damaged items</li>
              </ol>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="returns-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Refund Timeline</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-lg font-semibold text-emerald-700">1-3 days</span>
                </div>
                <div>
                  <p className="font-medium text-stone-900">Inspection</p>
                  <p className="text-sm text-stone-600">We inspect your returned item for condition</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-lg font-semibold text-emerald-700">Approved</span>
                </div>
                <div>
                  <p className="font-medium text-stone-900">Refund Processing</p>
                  <p className="text-sm text-stone-600">Refund is processed and sent to your payment method</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-lg font-semibold text-emerald-700">5-7 days</span>
                </div>
                <div>
                  <p className="font-medium text-stone-900">Credit Posted</p>
                  <p className="text-sm text-stone-600">Refund appears in your account (varies by bank)</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="returns-section bg-emerald-50 rounded-xl border border-emerald-200 p-10">
            <h2 className="text-3xl font-light text-stone-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">What if the item has been opened?</h3>
                <p className="text-stone-600">Unfortunately, we cannot accept returns on opened items for health and safety reasons. Please check that items are to your satisfaction before opening.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Do I have to pay for return shipping?</h3>
                <p className="text-stone-600">No! We provide a prepaid return shipping label. The only exception is for damaged items—we'll provide a replacement at no cost with no return required.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Can I return items after 30 days?</h3>
                <p className="text-stone-600">Our standard return window is 30 days. After that, we cannot accept returns. If you have special circumstances, please contact support to discuss options.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">How will the refund be issued?</h3>
                <p className="text-stone-600">Refunds are issued to your original payment method. If you paid with a credit card, it appears as a credit on your statement. If you paid with another method, refunds are issued via that same method.</p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">What about shipping costs?</h3>
                <p className="text-stone-600">We refund the full purchase price including shipping. The only cost is your return shipping, which we cover with the prepaid label.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-4xl font-light mb-6">Still Have Questions?</h2>
          <p className="text-lg text-emerald-200 mb-8">Our support team is here to help.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Contact Support
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}