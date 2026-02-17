'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import logo from '../src/logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { getItemCount, fetchCart } = useCartStore();
  const itemCount = getItemCount();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Track scroll for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Go to home">
              <Image
                src={logo}
                alt="StrainsNotName Logo"
                className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 group ${
                      active ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'
                    }`}
                  >
                    {label}
                    {/* Underline indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Right side: Cart + Hamburger ── */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Cart, ${itemCount} items`}
                className="relative flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 transition-colors duration-200 group"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] leading-none rounded-full h-4.5 w-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center font-bold shadow-md">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-stone-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {/* Animated burger lines */}
                <span
                  className={`block w-5 h-0.5 bg-stone-800 rounded transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-800 rounded transition-all duration-300 ${
                    menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-800 rounded transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-[3px]'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay + drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Go to home">
            <Image
              src={logo}
              alt="StrainsNotName Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          <ul className="space-y-1">
            {navLinks.map(({ href, label }, i) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-lg text-base font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-700'
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer footer: Cart CTA */}
        <div className="px-6 py-6 border-t border-stone-200">
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-4 rounded-lg font-semibold transition-colors duration-200"
          >
            <span className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              View Cart
            </span>
            {itemCount > 0 && (
              <span className="bg-white text-emerald-700 text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px] text-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}