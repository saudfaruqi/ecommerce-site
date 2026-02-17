'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../src/logo.png';

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-emerald-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="group flex items-center mb-2">
            <Image src={logo} alt="StrainsNotName Logo" className="h-20 w-20" />
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Your trusted source for premium, lab-tested cannabis products cultivated with uncompromising quality standards.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 flex items-center space-x-2">
              <span className="text-emerald-600">→</span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/lab-results" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Lab Results
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 flex items-center space-x-2">
              <span className="text-emerald-600">→</span>
              <span>Support</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4 flex items-center space-x-2">
              <span className="text-emerald-600">→</span>
              <span>Contact</span>
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <a href="mailto:info@StrainsNotName.com" className="hover:text-emerald-600 transition-colors font-medium">
                  info@StrainsNotName.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span>
                <a href="tel:+15551234567" className="hover:text-emerald-600 transition-colors font-medium">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>🕐</span>
                <span>Mon-Fri 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} StrainsNotName. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badge Bar */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 border-t border-emerald-100 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">✓</span>
              <span className="font-medium">Lab Tested & Verified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="font-medium">Secure & Discreet</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📦</span>
              <span className="font-medium">Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}