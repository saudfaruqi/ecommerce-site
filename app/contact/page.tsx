'use client';

import { useState, useEffect, useRef } from 'react';
import { submitContactForm } from '@/lib/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // ===== HERO TITLE ANIMATION =====
        const heroTitle = document.querySelector('.contact-hero-title');
        if (heroTitle) {
          gsap.set(heroTitle, { opacity: 0, y: 40 });
          gsap.to(heroTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
          });
        }

        // ===== HERO SUBTITLE =====
        const heroSubtitle = document.querySelector('.contact-hero-subtitle');
        if (heroSubtitle) {
          gsap.set(heroSubtitle, { opacity: 0, y: 30 });
          gsap.to(heroSubtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.4
          });
        }

        // ===== CONTACT INFO CARDS =====
        const infoItems = document.querySelectorAll('.contact-info-item');
        if (infoItems.length > 0) {
          gsap.set(infoItems, { opacity: 0, y: 40 });
          gsap.to(infoItems, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: '.contact-info-section',
              start: 'top 80%'
            }
          });
        }

        // ===== FORM CARD =====
        const formCard = document.querySelector('.contact-form-card');
        if (formCard) {
          gsap.set(formCard, { opacity: 0, scale: 0.95, y: 30 });
          gsap.to(formCard, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: formCard,
              start: 'top 80%'
            }
          });
        }

        // ===== FORM INPUTS - STAGGER =====
        const formInputs = document.querySelectorAll('.form-group');
        if (formInputs.length > 0) {
          gsap.set(formInputs, { opacity: 0, x: -20 });
          gsap.to(formInputs, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: '.contact-form-card',
              start: 'top 75%'
            }
          });
        }

        // ===== SUBMIT BUTTON =====
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
          gsap.set(submitBtn, { opacity: 0, y: 20 });
          gsap.to(submitBtn, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.8
          });

          // Hover effect
          submitBtn.addEventListener('mouseover', () => {
            gsap.to(submitBtn, {
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          submitBtn.addEventListener('mouseout', () => {
            gsap.to(submitBtn, {
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.15)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 relative overflow-hidden flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-20 w-full text-center">
          <h1 className="contact-hero-title text-6xl lg:text-7xl font-light text-stone-50 mb-6 leading-tight">
            Let's Talk
          </h1>
          <p className="contact-hero-subtitle text-2xl text-emerald-300 max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 contact-info-section">
            {/* Email */}
            <div className="contact-info-item bg-white rounded-xl p-8 shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Email</h3>
                  <p className="text-stone-600">info@strainnotname.com</p>
                  <p className="text-sm text-stone-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-info-item bg-white rounded-xl p-8 shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Phone</h3>
                  <p className="text-stone-600">(555) 123-4567</p>
                  <p className="text-sm text-stone-500 mt-1">Monday - Friday, 9AM - 6PM</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-item bg-white rounded-xl p-8 shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Location</h3>
                  <p className="text-stone-600">123 Cannabis Street</p>
                  <p className="text-stone-600">Los Angeles, CA 90001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card max-w-2xl mx-auto bg-white rounded-2xl p-12 shadow-lg border border-stone-100">
            {submitted ? (
              <div className="text-center py-16">
                <div className="mb-6 flex justify-center">
                  <div className="relative w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-4xl font-light text-stone-900 mb-4">Thank You!</h3>
                <p className="text-xl text-stone-600 mb-8 max-w-md">
                  We've received your message and will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-900 mb-3">
                      Full Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-3">
                      Email Address <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-stone-900 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50"
                    />
                  </div>
                </div>

                <div className="mb-8 form-group">
                  <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-3">
                    Message <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-stone-50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-btn w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg shadow-emerald-600/20 disabled:bg-stone-400 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-center text-sm text-stone-500 mt-6">
                  We respect your privacy. Your information will only be used to respond to your inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 to-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Still have questions?</h2>
          <p className="text-xl text-emerald-200 mb-10 max-w-2xl mx-auto">
            Check out our FAQ or browse our products to learn more about what we offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-emerald-950 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors"
            >
              Browse Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center gap-2 border-2 border-emerald-400 text-stone-50 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-900/30 transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}