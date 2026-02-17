'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrder } from '@/lib/api';
import { gsap } from 'gsap';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const containerRef = useRef(null);
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(parseInt(orderId));
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  // Animate on success
  useEffect(() => {
    if (loading || !order) return;

    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Checkmark animation
        const checkmark = document.querySelector('.success-checkmark');
        if (checkmark) {
          gsap.set(checkmark, { scale: 0, opacity: 0 });
          gsap.to(checkmark, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 0.2
          });
        }

        // Title animation
        const title = document.querySelector('.success-title');
        if (title) {
          gsap.set(title, { opacity: 0, y: 20 });
          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
          });
        }

        // Content sections
        const sections = document.querySelectorAll('.success-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.6
          });
        }

        // Buttons
        const buttons = document.querySelectorAll('.success-btn');
        if (buttons.length > 0) {
          gsap.set(buttons, { opacity: 0, scale: 0.9 });
          gsap.to(buttons, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            delay: 1.2
          });
        }
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, [loading, order]);

  if (loading) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
          </div>
          <p className="text-stone-600 text-lg">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-lg px-4">
            <h1 className="text-4xl font-light text-stone-900 mb-6">Order not found</h1>
            <p className="text-xl text-stone-600 mb-8">
              We couldn't find your order. Please check the link and try again.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Return to Home
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-stone-50 to-transparent"></div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          {/* Success Checkmark */}
          <div className="mb-8 flex justify-center">
            <div className="success-checkmark w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="success-title text-6xl lg:text-7xl font-light text-stone-900 mb-6 leading-tight">
            Order <span className="font-serif italic text-emerald-700">Confirmed!</span>
          </h1>
          <p className="text-2xl text-stone-600 max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          {/* Order Details Card */}
          <div className="success-section bg-white rounded-2xl shadow-lg border border-stone-100 p-10 mb-8">
            <h2 className="text-2xl font-light text-stone-900 mb-8">Order Details</h2>
            
            <div className="space-y-6">
              {/* Order Number */}
              <div className="pb-6 border-b border-stone-100">
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
                  Order Number
                </p>
                <p className="text-3xl font-light text-emerald-700">
                  #{order.id}
                </p>
              </div>

              {/* Total Amount */}
              <div className="pb-6 border-b border-stone-100">
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
                  Total Amount
                </p>
                <p className="text-3xl font-light text-stone-900">
                  <span className="text-emerald-700">${order.total_amount.toFixed(2)}</span>
                </p>
              </div>

              {/* Status */}
              <div className="pb-6 border-b border-stone-100">
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
                  Status
                </p>
                <div className="inline-flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-lg font-medium text-stone-900 capitalize">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-3">
                  Shipping to
                </p>
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="font-semibold text-stone-900 mb-1">{order.customer_name}</p>
                  <p className="text-stone-600">{order.shipping_address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="success-section bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-emerald-900">
                <strong>Confirmation Email:</strong><br/>
                A detailed confirmation has been sent to <strong>{order.customer_email}</strong>
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="success-section bg-white rounded-2xl shadow-lg border border-stone-100 p-10 mb-12">
            <h3 className="text-2xl font-light text-stone-900 mb-8">What Happens Next?</h3>
            <div className="space-y-5">
              {[
                {
                  title: 'Processing',
                  desc: 'Your order is being processed and prepared for shipment'
                },
                {
                  title: 'Shipping Confirmation',
                  desc: "You'll receive tracking information when your order ships"
                },
                {
                  title: 'Fast Delivery',
                  desc: 'Your order will arrive in 3-5 business days'
                },
                {
                  title: 'Support Available',
                  desc: 'Need help? Our support team is available 24/7'
                }
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">{step.title}</h4>
                    <p className="text-stone-600 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="success-btn inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              Continue Shopping
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/"
              className="success-btn inline-flex items-center justify-center gap-2 border-2 border-stone-300 text-stone-900 px-10 py-4 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h2 className="text-3xl font-light text-stone-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'When will my order arrive?',
                a: 'Most orders arrive within 3-5 business days. You\'ll receive tracking information via email once your order ships.'
              },
              {
                q: 'How do I track my order?',
                a: 'You\'ll receive a shipping confirmation email with a tracking number. You can use this to track your package in real-time.'
              },
              {
                q: 'What if I need to modify my order?',
                a: 'Orders are processed immediately. If you need to make changes, please contact our support team as soon as possible.'
              },
              {
                q: 'Do you offer returns?',
                a: 'We stand behind our products. If you\'re not satisfied, contact our support team to discuss return options within 30 days.'
              }
            ].map((item, i) => (
              <div key={i} className="border-b border-stone-100 pb-6 last:border-0">
                <h3 className="font-semibold text-stone-900 mb-3">{item.q}</h3>
                <p className="text-stone-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-4xl font-light mb-6">Need Help?</h2>
          <p className="text-xl text-emerald-200 mb-8">
            Our customer support team is available 24/7 to assist you.
          </p>
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

// Fallback shown while the inner component resolves searchParams
function CheckoutSuccessFallback() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
        </div>
        <p className="text-stone-600 text-lg">Loading your order...</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}