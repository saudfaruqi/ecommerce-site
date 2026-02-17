'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import logo from '../src/logo.png';

export default function Header() {
  const { getItemCount, fetchCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-primary-100">
      <nav className="container-custom py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
          <Image src={logo} alt="StrainsNotName Logo" className="h-14 w-14" />
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <Link
            href="/cart"
            className="relative flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 group"
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="font-semibold hidden sm:inline">Cart</span>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4 flex flex-col space-y-3 pt-4 border-t border-primary-100">
          <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}