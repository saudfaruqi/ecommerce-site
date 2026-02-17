'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';


// ─────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger, SplitText);

const products = [
  {
    id: 1,
    name: 'Jamaican Dream',
    type: 'Sativa',
    price: 44.00,
    thc: '22%',
    description: 'Uplifting tropical flavors with energizing effects',
    image: "/jamaican-dream.webp",
    slug: 'jamaican-dream',
    effects: ['Creative', 'Energetic', 'Focused']
  },
  {
    id: 2,
    name: 'Colombian OG',
    type: 'Hybrid',
    price: 25.00,
    thc: '20%',
    description: 'Balanced hybrid with earthy, pine notes',
    image: "/colombian-OG.webp",
    slug: 'colombian-og',
    effects: ['Relaxed', 'Happy', 'Euphoric']
  },
  {
    id: 3,
    name: 'El Patron',
    type: 'Hybrid Sativa',
    price: 30.00,
    thc: '24%',
    description: 'Sativa-dominant with citrus and spice profile',
    image: "/El-Patron.webp",
    slug: 'el-patron',
    effects: ['Uplifted', 'Creative', 'Social']
  },
  {
    id: 4,
    name: 'Purple Kush',
    type: 'Indica',
    price: 38.00,
    thc: '19%',
    description: 'Deep relaxation with sweet grape undertones',
    image: "/indica-bg.webp",
    slug: 'purple-kush',
    effects: ['Relaxed', 'Sleepy', 'Peaceful']
  }
];

const categories = [
  { name: 'Clones & Teens', icon: '🌱', count: 15, desc: 'Healthy genetics ready to grow',  image: "/Clones-Teens.webp" },
  { name: 'Flowers',        icon: '🌸', count: 32, desc: 'Premium dried flower strains',     image: "/Flowers.webp" },
  { name: 'Concentrates',   icon: '💎', count: 18, desc: 'Pure extracts and oils',           image: "/Concentrates.webp" },
  { name: 'Soil',           icon: '🪴', count: 8,  desc: 'Organic growing medium',           image: "/Soil.webp" }
];

const features = [
  {
    icon: '🔬',
    title: 'Lab Tested',
    description: 'Every batch tested for potency, purity, and safety by independent third-party laboratories'
  },
  {
    icon: '🌱',
    title: 'Organic Growth',
    description: 'Cultivated using sustainable, pesticide-free methods that prioritize plant and soil health'
  },
  {
    icon: '📊',
    title: 'Full Transparency',
    description: 'Complete COA reports available for every product with detailed cannabinoid and terpene profiles'
  },
  {
    icon: '🚚',
    title: 'Discreet Delivery',
    description: 'Fast, secure shipping in unmarked packaging with real-time tracking and insurance'
  }
];

const faqs = [
  {
    question: 'How do I choose the right strain?',
    answer: 'Our strain guide categorizes products by type (Sativa, Indica, Hybrid) and effects. We also offer personalized recommendations based on your preferences. Consider your desired effects, tolerance level, and THC percentage when choosing.'
  },
  {
    question: 'What testing do you perform?',
    answer: 'Every batch undergoes rigorous third-party lab testing including potency analysis, terpene profiling, residual solvent screening, and microbial testing. Full Certificate of Analysis (COA) reports are available for every product.'
  },
  {
    question: 'How should I store my products?',
    answer: 'Store in a cool, dark, and dry place away from direct sunlight. Keep containers sealed and maintain temperatures between 60-70°F for optimal freshness. Properly stored products can maintain quality for several months.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We stand behind the quality of our products. If you receive a damaged or defective product, we offer full replacement or refund within 30 days of purchase. Contact our support team with photos of the issue.'
  },
  {
    question: 'Do you offer medical consultations?',
    answer: 'While we cannot provide medical advice, we offer detailed product information and educational resources. We recommend consulting with your healthcare provider about cannabis use for specific medical conditions.'
  }
];

export default function Home() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Separate effect for GSAP animations - wait for DOM to be ready
  useEffect(() => {
    // Wait for next frame to ensure DOM is fully rendered
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // ===== PAGE ENTRANCE =====
        // Only fade in the main container, not the whole body
        if (containerRef.current) {
          gsap.set(containerRef.current, { opacity: 0 });
          gsap.to(containerRef.current, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
        }

        // ===== HERO TITLE ANIMATION =====
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
          gsap.set(heroTitle, { clearProps: 'all' });
          const splitText = new SplitText(heroTitle, { 
            type: 'lines', 
            linesClass: 'split-line'
          });

          if (splitText.lines.length > 0) {
            gsap.from(splitText.lines, {
              y: 120,
              opacity: 0,
              rotateX: -25,
              stagger: 0.12,
              duration: 1.4,
              ease: 'power4.out',
              transformOrigin: '0% 50%',
              delay: 0.2
            });
          }
        }

        // ===== HERO ELEMENTS CASCADE =====
        const heroButtons = document.querySelectorAll('.hero-badge');
        const heroDesc = document.querySelector('.hero-desc');
        const heroScroll = document.querySelector('.hero-scroll');

        const tl = gsap.timeline({ delay: 0.8 });
        if (heroButtons.length > 0) tl.from(heroButtons, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, 0);
        if (heroDesc) tl.from(heroDesc, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
        if (heroScroll) tl.from(heroScroll, { opacity: 0, y: -20, duration: 0.8, ease: 'power2.out' }, '-=0.2');

        // ===== ANIMATED GRID BACKGROUND =====
        const gridLines = document.querySelectorAll('.grid-line');
        if (gridLines.length > 0 && heroRef.current) {
          gsap.to(gridLines, {
            yPercent: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        }

        // ===== STATS COUNTER ANIMATION =====
        const statsSection = document.querySelector('.stats-section');
        const statValues = document.querySelectorAll('.stat-value');
        
        if (statsSection && statValues.length > 0) {
          let statsAnimated = false;
          
          ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 75%',
            onEnter: () => {
              if (!statsAnimated) {
                statValues.forEach((counter) => {
                  const target = parseInt(counter.getAttribute('data-value') || '0');
                  const obj = { value: 0 };
                  
                  gsap.to(obj, {
                    value: target,
                    duration: 2.5,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                      counter.textContent = Math.floor(obj.value).toString();
                    }
                  });
                });
                statsAnimated = true;
              }
            },
            once: true
          });
        }

        // ===== SCROLL REVEAL ANIMATIONS =====

        // Featured products - Set initial state, then animate from scroll
        const productCards = document.querySelectorAll('.product-card');
        const productsGrid = document.querySelector('.products-grid');
        if (productCards.length > 0 && productsGrid) {
          gsap.set(productCards, { y: 80, opacity: 0, scale: 0.95 });
          gsap.to(productCards, {
            scrollTrigger: {
              trigger: productsGrid,
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }

        // Strain type cards - Set initial state, then animate from scroll
        const strainCards = document.querySelectorAll('.strain-card');
        const strainTypes = document.querySelector('.strain-types');
        if (strainCards.length > 0 && strainTypes) {
          gsap.set(strainCards, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
          gsap.to(strainCards, {
            scrollTrigger: {
              trigger: strainTypes,
              start: 'top 75%',
            },
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.inOut'
          });
        }

        // Category items - Set initial state, then animate from scroll
        const categoryItems = document.querySelectorAll('.category-item');
        const categoriesSection = document.querySelector('.categories-section');
        if (categoryItems.length > 0 && categoriesSection) {
          gsap.set(categoryItems, { y: 60, opacity: 0, rotateY: -15 });
          gsap.to(categoryItems, {
            scrollTrigger: {
              trigger: categoriesSection,
              start: 'top 70%',
            },
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)'
          });
        }

        // Feature cards - Set initial state, then animate from scroll
        const featureCards = document.querySelectorAll('.feature-card');
        const featuresGrid = document.querySelector('.features-grid');
        if (featureCards.length > 0 && featuresGrid) {
          gsap.set(featureCards, { y: 50, opacity: 0 });
          gsap.to(featureCards, {
            scrollTrigger: {
              trigger: featuresGrid,
              start: 'top 75%',
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }

        // Parallax images
        const parallaxImages = document.querySelectorAll('.parallax-image');
        parallaxImages.forEach((img: any) => {
          gsap.to(img, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        });

        // Text reveals - Set initial state, then animate from scroll
        const revealTexts = document.querySelectorAll('.reveal-text');
        revealTexts.forEach((text: any) => {
          gsap.set(text, { y: 60, opacity: 0 });
          gsap.to(text, {
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
          });
        });

        // Scale reveals - Set initial state, then animate from scroll
        const scaleReveals = document.querySelectorAll('.scale-reveal');
        scaleReveals.forEach((img: any) => {
          gsap.set(img, { scale: 1.3, opacity: 0 });
          gsap.to(img, {
            scrollTrigger: {
              trigger: img,
              start: 'top 80%',
            },
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out'
          });
        });

        // Split section animations - Set initial state, then animate from scroll
        const splitContent = document.querySelector('.split-content');
        const splitImage = document.querySelector('.split-image');
        const splitSection = document.querySelector('.split-section');

        if (splitContent && splitSection) {
          gsap.set(splitContent, { x: -80, opacity: 0 });
          gsap.to(splitContent, {
            scrollTrigger: {
              trigger: splitSection,
              start: 'top 70%',
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          });
        }

        if (splitImage && splitSection) {
          gsap.set(splitImage, { x: 80, opacity: 0 });
          gsap.to(splitImage, {
            scrollTrigger: {
              trigger: splitSection,
              start: 'top 70%',
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          });
        }

        // Process steps - Set initial state, then animate from scroll
        const processSteps = document.querySelectorAll('.process-step');
        if (processSteps.length > 0) {
          gsap.set(processSteps, { y: 50, opacity: 0 });
          gsap.to(processSteps, {
            scrollTrigger: {
              trigger: '.split-section',
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: (index) => index * 0.1,
            ease: 'power2.out'
          });
        }

        // Resource cards - Set initial state, then animate from scroll
        const resourceCards = document.querySelectorAll('.resource-card');
        const resourcesSection = document.querySelector('.resources-section');
        if (resourceCards.length > 0 && resourcesSection) {
          gsap.set(resourceCards, { y: 60, opacity: 0 });
          gsap.to(resourceCards, {
            scrollTrigger: {
              trigger: resourcesSection,
              start: 'top 75%',
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
          });
        }

        // FAQ items - Set initial state, then animate from scroll
        const faqItems = document.querySelectorAll('.faq-item');
        const faqSection = document.querySelector('.faq-section');
        if (faqItems.length > 0 && faqSection) {
          gsap.set(faqItems, { x: -40, opacity: 0 });
          gsap.to(faqItems, {
            scrollTrigger: {
              trigger: faqSection,
              start: 'top 75%',
            },
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out'
          });
        }

        // CRUCIAL: Refresh ScrollTrigger after all animations are registered
        ScrollTrigger.refresh();

      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, []); // Run only once on mount

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen relative bg-emerald-950 overflow-hidden flex items-center">
        {/* ── LOCAL IMAGE: imgStrains as hero background ── */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/strains-hero.webp"
            alt="Cannabis strains background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-emerald-950/60" />
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="grid-line absolute w-full h-px bg-emerald-500/50"
              style={{ top: `${i * 9}%` }}
            />
          ))}
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-32 w-full">
          <div className="max-w-6xl">
            
            <h1 className="hero-title text-[clamp(3rem,13vw,12rem)] leading-[0.85] font-light text-stone-50 mb-12" style={{ perspective: '1200px' }}>
              Pure<br/>
              <span className="italic font-serif text-emerald-400">Botanical</span><br/>
              Excellence
            </h1>

            <p className="hero-desc text-2xl text-stone-300 leading-relaxed max-w-2xl mb-12">
              Meticulously curated cannabis cultivars from master growers. Lab-tested, organic, and delivered with uncompromising quality standards.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                href="/products" 
                className="hero-badge inline-flex items-center gap-3 bg-emerald-500 text-emerald-950 px-10 py-5 font-semibold hover:bg-emerald-400 transition-colors text-lg"
              >
                Explore Collection
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/about" 
                className="hero-badge inline-flex items-center gap-3 border-2 border-stone-600 text-stone-50 px-10 py-5 font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-colors text-lg"
              >
                Our Story
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-stone-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">100% Lab Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Organic Growing</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Discreet Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-stone-400">
            <span className="text-sm uppercase tracking-widest">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-stone-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 bg-white border-b border-stone-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 5000, label: 'Happy Customers', suffix: '+' },
              { value: 100, label: 'Lab Tested', suffix: '%' },
              { value: 50, label: 'Premium Strains', suffix: '+' },
              { value: 24, label: 'Support Available', suffix: '/7' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-light text-emerald-700 mb-3">
                  <span className="stat-value" data-value={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-stone-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strain Types Education */}
      {/* ── LOCAL IMAGE: imgStrainsSection as background ── */}
      <section className="strain-types py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/strains-section.webp" alt="Strains section background" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-white/92" />
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-stone-900 mb-6">
              Cannabis <span className="italic font-serif text-emerald-700">Types Explained</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each strain offers unique effects. Find the one that matches your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Sativa */}
            <Link href="/products?type=sativa" className="strain-card group block">
              <div className="relative pb-6">
                <div className="absolute left-0 top-0 w-2 h-20 bg-gradient-to-b from-amber-400 to-orange-400 group-hover:h-full transition-all duration-500 rounded-full"></div>
                <div className="ml-8 space-y-4">
                  <div className="text-5xl">⚡</div>
                  <h3 className="text-2xl font-light text-stone-900">Sativa</h3>
                  <p className="text-stone-600 leading-relaxed">Energizing, uplifting, and cerebral effects perfect for daytime use.</p>
                  <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Indica */}
            <Link href="/products?type=indica" className="strain-card group block">
              <div className="relative pb-6">
                <div className="absolute left-0 top-0 w-2 h-20 bg-gradient-to-b from-purple-400 to-indigo-500 group-hover:h-full transition-all duration-500 rounded-full"></div>
                <div className="ml-8 space-y-4">
                  <div className="text-5xl">🌙</div>
                  <h3 className="text-2xl font-light text-stone-900">Indica</h3>
                  <p className="text-stone-600 leading-relaxed">Relaxing, calming, and body-focused effects ideal for evenings.</p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hybrid */}
            <Link href="/products?type=hybrid" className="strain-card group block">
              <div className="relative pb-6">
                <div className="absolute left-0 top-0 w-2 h-20 bg-gradient-to-b from-emerald-400 to-teal-500 group-hover:h-full transition-all duration-500 rounded-full"></div>
                <div className="ml-8 space-y-4">
                  <div className="text-5xl">🍃</div>
                  <h3 className="text-2xl font-light text-stone-900">Hybrid</h3>
                  <p className="text-stone-600 leading-relaxed">Balanced blend of both effects for versatile, flexible experiences.</p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-12 gap-16 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="sticky top-32">
                <div className="h-px w-16 bg-emerald-600 mb-6"></div>
                <h2 className="reveal-text text-5xl font-light mb-8 text-stone-900 leading-tight">
                  Featured<br/>
                  <span className="italic font-serif text-emerald-700">Cultivars</span>
                </h2>
                <p className="reveal-text text-lg text-stone-600 leading-relaxed mb-8">
                  Our signature strains, hand-selected for their exceptional terpene profiles, consistent potency, and outstanding effects. Each cultivar represents the pinnacle of craft cannabis.
                </p>
                <Link href="/products" className="reveal-text inline-flex items-center gap-2 text-emerald-700 font-semibold border-b-2 border-emerald-700 pb-1 hover:gap-3 transition-all">
                  View Full Collection
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <div className="products-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="product-card group block bg-stone-50 border border-stone-200 overflow-hidden hover:shadow-2xl hover:border-emerald-600 transition-all duration-500"
                  >
                    <div className="relative h-80 overflow-hidden bg-stone-100">
                      {/* ── LOCAL IMAGE: each product's static import ── */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-white/95 backdrop-blur-sm px-4 py-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
                          {product.type}
                        </span>
                        <span className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                          THC {product.thc}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-light text-stone-900 mb-2">{product.name}</h3>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.effects.map((effect, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                            {effect}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-baseline justify-between pt-4 border-t border-stone-200">
                        <span className="text-sm text-stone-500">from</span>
                        <span className="text-3xl font-light text-emerald-700">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section py-32 bg-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center mb-20">
            <div className="h-px w-16 bg-emerald-600 mb-6 mx-auto"></div>
            <h2 className="reveal-text text-5xl font-light text-stone-900 mb-6">
              Shop by <span className="italic font-serif text-emerald-700">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={`/products?category=${category.name}`}
                className="category-item group block relative overflow-hidden border-2 border-stone-200 hover:border-emerald-600 hover:shadow-xl transition-all duration-300"
              >
                {/* ── LOCAL IMAGE: category image fills the card top ── */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white text-3xl">{category.icon}</span>
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-light text-stone-900 mb-1">{category.name}</h3>
                  <p className="text-stone-600 text-sm mb-4">{category.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700 font-medium">{category.count} Products</span>
                    <svg className="w-5 h-5 text-emerald-700 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section - Process */}
      <section className="split-section py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="split-content">
              <div className="h-px w-16 bg-emerald-600 mb-6"></div>
              <h2 className="text-5xl font-light mb-8 text-stone-900 leading-tight">
                Craft Cultivation<br/>
                <span className="italic font-serif text-emerald-700">Meets Science</span>
              </h2>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Every strain in our collection represents months of careful cultivation, precise phenotype selection, and rigorous quality control. We work exclusively with master growers who share our obsession with perfection.
              </p>
              
              <div className="space-y-6 mb-8">
                {[
                  { title: 'Genetic Selection', desc: 'Premium genetics from renowned breeders worldwide' },
                  { title: 'Organic Cultivation', desc: 'Pesticide-free, living soil growing methods' },
                  { title: 'Lab Testing', desc: 'Full panel testing for every single batch' },
                  { title: 'Proper Curing', desc: 'Extended cure times for optimal terpene preservation' }
                ].map((item, i) => (
                  <div key={i} className="process-step flex items-start gap-4 pb-6 border-b border-stone-200 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">{item.title}</h4>
                      <p className="text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 transition-colors">
                Our Process
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* ── LOCAL IMAGE: imgJamaicanDream in split section ── */}
            <div className="split-image relative h-[600px] overflow-hidden">
              <div className="scale-reveal absolute inset-0">
                <Image
                  src="/jamaican-dream.webp"
                  alt="Cannabis cultivation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center mb-20">
            <div className="h-px w-16 bg-emerald-600 mb-6 mx-auto"></div>
            <h2 className="reveal-text text-5xl font-light text-stone-900 mb-6">
              Why Choose <span className="italic font-serif text-emerald-700">Us</span>
            </h2>
            <p className="reveal-text text-xl text-stone-600 max-w-3xl mx-auto">
              We've built our reputation on uncompromising quality standards and exceptional customer service
            </p>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="feature-card bg-white border border-stone-200 p-10 hover:shadow-xl hover:border-emerald-600 transition-all duration-300">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-light text-stone-900 mb-4">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Image Banner */}
      {/* ── LOCAL IMAGE: imgColombianOG ── */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="parallax-image absolute inset-0 scale-110">
          <Image
            src="/colombian-OG.webp"
            alt="Premium cannabis"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-950/50"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
            <div className="max-w-2xl text-white">
              <h2 className="reveal-text text-6xl font-light mb-6 leading-tight">
                Premium Genetics,<br/>
                <span className="italic font-serif text-emerald-400">Proven Results</span>
              </h2>
              <p className="reveal-text text-xl leading-relaxed mb-8">
                From seed selection to final cure, every step is meticulously controlled to ensure you receive cannabis of unparalleled quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section py-32 bg-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center mb-20">
            <div className="h-px w-16 bg-emerald-600 mb-6 mx-auto"></div>
            <h2 className="reveal-text text-5xl font-light text-stone-900 mb-6">
              Knowledge <span className="italic font-serif text-emerald-700">Center</span>
            </h2>
            <p className="reveal-text text-xl text-stone-600 max-w-3xl mx-auto">
              Access comprehensive information, lab reports, and cultivation data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Plant & Cultivation Data',
                desc: 'Detailed growing information, nutrient schedules, and harvest data for each strain',
                icon: '📊',
                link: '/resources/cultivation'
              },
              {
                title: 'Grower Talk',
                desc: 'Connect with our community of expert cultivators and share knowledge',
                icon: '💬',
                link: '/community'
              },
              {
                title: 'C.O.A Lab Testing',
                desc: 'Full certificates of analysis with cannabinoid profiles and safety screening',
                icon: '🔬',
                link: '/lab-results'
              }
            ].map((resource, i) => (
              <div key={i} className="resource-card bg-white border border-stone-200 p-10 hover:shadow-xl hover:border-emerald-600 transition-all duration-300">
                <div className="text-6xl mb-6">{resource.icon}</div>
                <h3 className="text-2xl font-light text-stone-900 mb-4">{resource.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{resource.desc}</p>
                <Link href={resource.link} className="inline-flex items-center gap-2 text-emerald-700 font-semibold group">
                  Learn More
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="h-px w-16 bg-emerald-600 mb-6"></div>
              <h2 className="reveal-text text-5xl font-light mb-8 text-stone-900 leading-tight">
                Frequently Asked<br/>
                <span className="italic font-serif text-emerald-700">Questions</span>
              </h2>
              <p className="reveal-text text-xl text-stone-600 leading-relaxed mb-8">
                Have questions? We've compiled answers to the most common inquiries about our products and services.
              </p>
              <Link href="/contact" className="reveal-text inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 transition-colors">
                Contact Support
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="faq-item bg-stone-50 border border-stone-200 overflow-hidden transition-all cursor-pointer"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 hover:bg-stone-100 transition-colors"
                  >
                    <span className="text-lg text-stone-900 font-medium text-left">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 text-emerald-700 transition-transform flex-shrink-0 ${expandedFAQ === i ? 'rotate-90' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {expandedFAQ === i && (
                    <div className="px-6 pb-6 border-t border-stone-200 bg-white">
                      <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full text-center">
          <h2 className="reveal-text text-6xl lg:text-7xl font-light mb-8 leading-tight">
            Begin Your<br/>
            <span className="italic font-serif text-emerald-700">Journey</span>
          </h2>
          <p className="reveal-text text-xl text-stone-600 mb-12 max-w-2xl mx-auto">
            Experience the difference that premium, craft-cultivated cannabis makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-12 py-6 font-semibold hover:bg-emerald-700 transition-colors text-lg"
            >
              Shop Collection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center gap-3 border-2 border-stone-300 text-stone-900 px-12 py-6 font-semibold hover:border-emerald-600 hover:text-emerald-700 transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}