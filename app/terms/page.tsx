'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TermsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const hero = document.querySelector('.terms-hero');
        if (hero) {
          gsap.set(hero, { opacity: 0, y: 30 });
          gsap.to(hero, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }

        const sections = document.querySelectorAll('.terms-section');
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 30 });
          gsap.to(sections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.terms-content', start: 'top 80%' }
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
      <section className="terms-hero bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <h1 className="text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
            Terms & <span className="italic font-serif text-emerald-400">Conditions</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-emerald-300 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="terms-content py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Acceptance of Terms */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-stone-600 leading-relaxed">
              By accessing and using StrainNotName's website and services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services. We reserve the right to modify these terms at any time. Your continued use of our website constitutes acceptance of any changes.
            </p>
          </div>

          {/* Use License */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">2. Use License</h2>
            <p className="text-stone-600 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on StrainNotName's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-stone-600 list-disc list-inside">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Use automated systems or services to scrape or extract data</li>
            </ul>
          </div>

          {/* Age Restrictions */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">3. Age Restrictions & Legal Compliance</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-stone-600 mb-2">
                <strong>You must be at least 21 years of age to purchase cannabis products.</strong>
              </p>
              <p className="text-stone-600">
                By using our website and making a purchase, you represent and warrant that you are of legal age in your jurisdiction to purchase and use cannabis products. We reserve the right to request age verification and cancel any order that appears to violate these restrictions.
              </p>
            </div>

            <div className="mt-6 space-y-4 text-stone-600">
              <p>
                Cannabis is controlled in many jurisdictions. It is your responsibility to:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Verify that cannabis products are legal in your jurisdiction</li>
                <li>Comply with all local, state, and federal laws</li>
                <li>Use products responsibly and safely</li>
              </ul>
            </div>
          </div>

          {/* Product Information */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">4. Product Information & Disclaimer</h2>
            <p className="text-stone-600 mb-4">
              While we strive for accuracy, we do not guarantee that product descriptions, pricing, or availability are completely accurate, current, or error-free. We reserve the right to:
            </p>
            <ul className="space-y-2 text-stone-600 list-disc list-inside mb-6">
              <li>Correct any inaccuracies or errors</li>
              <li>Refuse or cancel any order</li>
              <li>Discontinue products at any time</li>
              <li>Update product information without notice</li>
            </ul>

            <div className="bg-stone-50 rounded-lg p-6">
              <p className="text-sm text-stone-600">
                <strong>Disclaimer:</strong> Cannabis products are sold "as is." We do not make medical claims or recommendations. These products are not intended to diagnose, treat, cure, or prevent any disease. Please consult with a healthcare professional before use.
              </p>
            </div>
          </div>

          {/* Pricing & Payment */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">5. Pricing & Payment</h2>
            <p className="text-stone-600 mb-4">
              Prices are subject to change without notice. We reserve the right to adjust prices, apply taxes, and add shipping fees at checkout. Payment must be received before order processing. We accept major credit cards via Stripe, which handles all payment processing securely.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <p className="text-stone-600 text-sm">
                <strong>All sales are final.</strong> Refunds are available within 30 days for unopened, unused products in original packaging. See our Return Policy for details.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">6. Limitation of Liability</h2>
            <p className="text-stone-600 mb-4">
              To the fullest extent permitted by law, StrainNotName and its suppliers shall not be liable for any damages including lost profits, lost data, or other indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="space-y-2 text-stone-600 list-disc list-inside">
              <li>Use of or inability to use our website or services</li>
              <li>Product quality or defects</li>
              <li>Unauthorized access or data breaches</li>
              <li>Third-party services or products</li>
            </ul>

            <p className="text-stone-600 mt-4">
              Our total liability shall not exceed the amount paid by you, if any, for products or services.
            </p>
          </div>

          {/* User Conduct */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">7. User Conduct</h2>
            <p className="text-stone-600 mb-4">
              You agree not to use our website in any manner that:
            </p>
            <ul className="space-y-2 text-stone-600 list-disc list-inside">
              <li>Violates any applicable laws or regulations</li>
              <li>Infringes on intellectual property rights</li>
              <li>Transmits viruses, malware, or harmful code</li>
              <li>Harasses, threatens, or defames any person</li>
              <li>Attempts to gain unauthorized access</li>
              <li>Interferes with website operations</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">8. Intellectual Property Rights</h2>
            <p className="text-stone-600">
              All content on our website, including text, graphics, logos, images, and software, is the property of StrainNotName or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or transmit any content without our written permission.
            </p>
          </div>

          {/* Indemnification */}
          <div className="terms-section bg-stone-50 rounded-xl border border-stone-200 p-10 mb-8">
            <h2 className="text-3xl font-light text-stone-900 mb-6">9. Indemnification</h2>
            <p className="text-stone-600">
              You agree to indemnify and hold harmless StrainNotName and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our website or services, including claims related to misuse of products or violation of these terms.
            </p>
          </div>

          {/* Dispute Resolution */}
          <div className="terms-section bg-white rounded-xl shadow-sm border border-stone-100 p-10">
            <h2 className="text-3xl font-light text-stone-900 mb-6">10. Dispute Resolution & Governing Law</h2>
            <p className="text-stone-600 mb-4">
              These Terms & Conditions are governed by the laws of California, United States. Any disputes shall be resolved through good faith negotiation. If unresolved, disputes shall be subject to binding arbitration under the American Arbitration Association rules.
            </p>

            <p className="text-stone-600 text-sm mt-4">
              <strong>No Class Actions:</strong> You agree to bring disputes on an individual basis only, not as part of a class action or collective action.
            </p>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-4xl font-light mb-6">Questions About Our Terms?</h2>
          <p className="text-lg text-emerald-200 mb-8">Contact our legal team for clarification.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}