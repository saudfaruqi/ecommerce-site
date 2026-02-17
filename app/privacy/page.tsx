'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const hero = document.querySelector('.privacy-hero');
        if (hero) {
          gsap.set(hero, { opacity: 0, y: 30 });
          gsap.to(hero, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }

        const sections = document.querySelectorAll('.privacy-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.privacy-content', start: 'top 80%' }
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
      <section className="privacy-hero bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <h1 className="text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
            Privacy <span className="italic font-serif text-emerald-400">Policy</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-emerald-300 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Introduction */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Introduction</h2>
            <p className="text-stone-600 leading-relaxed">
              StrainNotName ("we," "us," "our," or "Company") operates the website and related services. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal information. This Privacy Policy explains our practices and your rights.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Personal Information</h3>
                <p className="text-stone-600 mb-3">We collect information you voluntarily provide when:</p>
                <ul className="space-y-2 text-stone-600 list-disc list-inside">
                  <li>Creating an account or placing an order</li>
                  <li>Contacting us with questions or feedback</li>
                  <li>Subscribing to newsletters or communications</li>
                  <li>Participating in surveys or promotions</li>
                </ul>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Information Collected Automatically</h3>
                <p className="text-stone-600 mb-3">We automatically collect certain information when you visit our website:</p>
                <ul className="space-y-2 text-stone-600 list-disc list-inside">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website and search terms</li>
                  <li>Device information and operating system</li>
                </ul>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Payment Information</h3>
                <p className="text-stone-600">Payment processing is handled securely by Stripe. We do not directly collect or store credit card information. All payments are encrypted and comply with PCI DSS standards.</p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">How We Use Your Information</h2>
            
            <p className="text-stone-600 mb-6">We use the information we collect for:</p>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Processing and fulfilling your orders</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Communicating with you about orders and updates</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalizing your experience</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Improving our website and services</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Detecting and preventing fraud or abuse</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Complying with legal obligations</span>
              </li>
            </ul>
          </div>

          {/* Data Protection */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Data Protection & Security</h2>
            
            <p className="text-stone-600 mb-6">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction:
            </p>

            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                </svg>
                <span>SSL encryption for all data transmission</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure password storage with hashing</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                </svg>
                <span>Regular security audits and monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 01-1.414 1.414l-4-4z" clipRule="evenodd" />
                </svg>
                <span>Limited access to personal information</span>
              </li>
            </ul>

            <p className="text-stone-600 mt-6">
              While we strive to protect your information, no security system is completely secure. We cannot guarantee absolute security of your data.
            </p>
          </div>

          {/* Cookies & Tracking */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Cookies & Tracking Technologies</h2>
            
            <p className="text-stone-600 mb-4">
              Our website uses cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings.
            </p>

            <div className="bg-stone-50 rounded-lg p-6">
              <p className="text-sm text-stone-600">
                <strong>Types of cookies we use:</strong> Essential cookies (required for functionality), Analytical cookies (usage tracking), and Marketing cookies (personalized ads).
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="privacy-section bg-emerald-50 rounded-xl border border-emerald-200 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Your Privacy Rights</h2>
            
            <p className="text-stone-600 mb-6">
              You have the right to:
            </p>

            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Access the personal information we hold about you</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Request correction of inaccurate information</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Request deletion of your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Opt-out of marketing communications</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Data portability in a standard format</span>
              </li>
            </ul>

            <p className="text-stone-600 mt-6">
              To exercise any of these rights, contact us at privacy@strainnotname.com with your request and verification of identity.
            </p>
          </div>

          {/* Contact Us */}
          <div className="privacy-section bg-white rounded-xl shadow-sm border border-stone-100 p-10">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Contact Us</h2>
            
            <p className="text-stone-600 mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>

            <div className="bg-stone-50 rounded-lg p-6 space-y-3">
              <div>
                <p className="font-semibold text-stone-900">Email:</p>
                <p className="text-stone-600">privacy@strainnotname.com</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Mailing Address:</p>
                <p className="text-stone-600">123 Cannabis Street<br/>Los Angeles, CA 90001<br/>United States</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-4xl font-light mb-6">Your Privacy Matters</h2>
          <p className="text-lg text-emerald-200 mb-8">We're committed to protecting your personal information and maintaining your trust.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Contact Our Privacy Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}