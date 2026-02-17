'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/lib/store';
import { createPaymentIntent, createOrder } from '@/lib/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ clientSecret, orderData, setOrderData }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, total, fetchCart } = useCartStore();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitBtnRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        const order = await createOrder({
          customer_name: orderData.name,
          customer_email: orderData.email,
          customer_phone: orderData.phone,
          shipping_address: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zip}, ${orderData.country}`,
          items: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          stripe_payment_id: paymentIntent.id,
        });

        await fetchCart();
        router.push(`/checkout/success?order_id=${order.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-element-container">
        <PaymentElement />
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <button
        ref={submitBtnRef}
        type="submit"
        disabled={!stripe || processing}
        className="submit-payment-btn w-full mt-8 bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 disabled:bg-stone-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 group"
      >
        {processing ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </>
        ) : (
          <>
            Complete Purchase
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { items, total, loading, fetchCart } = useCartStore();
  const [clientSecret, setClientSecret] = useState('');
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      router.push('/cart');
      return;
    }

    if (total > 0 && !clientSecret) {
      createPaymentIntent(total)
        .then((data) => setClientSecret(data.client_secret))
        .catch((err) => console.error('Error creating payment intent:', err));
    }
  }, [items, total, loading, router, clientSecret]);

  // Animate on page load
  useEffect(() => {
    if (loading || items.length === 0) return;

    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Animate form sections
        const formSections = document.querySelectorAll('.form-section');
        if (formSections.length > 0) {
          gsap.set(formSections, { opacity: 0, y: 30 });
          gsap.to(formSections, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
          });
        }

        // Animate summary
        const summary = document.querySelector('.order-summary-card');
        if (summary) {
          gsap.set(summary, { opacity: 0, scale: 0.95, y: 20 });
          gsap.to(summary, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out'
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, [items, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    return (
      orderData.name &&
      orderData.email &&
      orderData.address &&
      orderData.city &&
      orderData.state &&
      orderData.zip
    );
  };

  if (loading) {
    return (
      <div ref={containerRef} className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-emerald-600"></div>
          </div>
          <p className="text-stone-600 text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

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
          <h1 className="text-5xl lg:text-6xl font-light text-stone-50">
            Secure Checkout
          </h1>
          <p className="text-lg text-emerald-200 mt-3">
            Complete your purchase securely
          </p>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="form-section bg-white rounded-xl shadow-sm border border-stone-100 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-stone-900">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={orderData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orderData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={orderData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={orderData.city}
                      onChange={handleInputChange}
                      placeholder="Los Angeles"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      State <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={orderData.state}
                      onChange={handleInputChange}
                      placeholder="CA"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      ZIP Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={orderData.zip}
                      onChange={handleInputChange}
                      placeholder="90001"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-900 mb-3">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={orderData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section bg-white rounded-xl shadow-sm border border-stone-100 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-stone-900">Payment Method</h2>
                </div>
                
                {clientSecret && isFormValid() ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      clientSecret={clientSecret}
                      orderData={orderData}
                      setOrderData={setOrderData}
                    />
                  </Elements>
                ) : (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-900 flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span>Please complete the shipping information above to proceed with payment.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="order-summary-card bg-white rounded-xl shadow-lg border border-stone-100 p-8 sticky top-24">
                <h2 className="text-2xl font-light text-stone-900 mb-8">
                  Order <span className="font-serif italic text-emerald-700">Summary</span>
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-8 pb-8 border-b border-stone-200 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-stone-600">
                        {item.product.name}<br/>
                        <span className="text-xs text-stone-500">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-stone-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-4 mb-8 pb-8 border-b-2 border-emerald-600">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-semibold text-stone-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-sm text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Tax</span>
                    <span className="text-sm text-stone-500">Calculated</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-stone-900">Total</span>
                    <span className="text-3xl font-light text-emerald-700">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 text-center text-sm text-stone-600">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Discreet packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}