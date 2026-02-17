'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const imageParallaxRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
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
              y: 100,
              opacity: 0,
              rotateX: -20,
              stagger: 0.1,
              duration: 1.2,
              ease: 'power3.out',
              transformOrigin: '0% 50%'
            });
          }
        }

        // ===== HERO DESCRIPTIONS =====
        const heroDescs = document.querySelectorAll('.hero-desc');
        if (heroDescs.length > 0) {
          gsap.set(heroDescs, { y: 30, opacity: 0 });
          gsap.to(heroDescs, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.6,
            ease: 'power2.out'
          });
        }

        // ===== PARALLAX IMAGE =====
        if (imageParallaxRef.current) {
          gsap.to(imageParallaxRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: imageParallaxRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        }

        // ===== MISSION TEXT REVEAL =====
        const missionTexts = document.querySelectorAll('.mission-text');
        if (missionTexts.length > 0 && missionRef.current) {
          gsap.set(missionTexts, { y: 50, opacity: 0 });
          gsap.to(missionTexts, {
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 70%',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            once: true
          });
        }

        // ===== VALUES BENTO BOXES =====
        const valueBoxes = document.querySelectorAll('.value-box');
        if (valueBoxes.length > 0 && valuesRef.current) {
          gsap.set(valueBoxes, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });
          gsap.to(valueBoxes, {
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 75%',
            },
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.inOut'
          });
        }

        // ===== TIMELINE ITEMS =====
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length > 0) {
          timelineItems.forEach((item: any, i) => {
            gsap.set(item, { 
              x: i % 2 === 0 ? -100 : 100,
              opacity: 0
            });
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
              },
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out'
            });
          });
        }

        // ===== SCALE REVEALS (STATS) =====
        const scaleReveals = document.querySelectorAll('.scale-reveal');
        if (scaleReveals.length > 0) {
          gsap.set(scaleReveals, { scale: 0.8, opacity: 0 });
          gsap.to(scaleReveals, {
            scrollTrigger: {
              trigger: '.stats-section',
              start: 'top 80%',
            },
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }

        // ===== EXPERTISE LIST ITEMS =====
        const expertiseItems = document.querySelectorAll('.expertise-item');
        if (expertiseItems.length > 0) {
          gsap.set(expertiseItems, { x: -30, opacity: 0 });
          gsap.to(expertiseItems, {
            scrollTrigger: {
              trigger: '.expertise-list',
              start: 'top 80%',
            },
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }

        // ===== STATS COUNTER =====
        const statCounters = document.querySelectorAll('.stat-counter');
        if (statCounters.length > 0) {
          let statsAnimated = false;
          ScrollTrigger.create({
            trigger: '.stats-section',
            start: 'top 80%',
            onEnter: () => {
              if (!statsAnimated) {
                statCounters.forEach((counter: any) => {
                  const target = parseInt(counter.dataset.value || '0');
                  const obj = { value: 0 };
                  
                  gsap.to(obj, {
                    value: target,
                    duration: 2,
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

        // Refresh ScrollTrigger after all animations registered
        ScrollTrigger.refresh();

      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-50">
      {/* Hero */}
      <section ref={heroRef} className="min-h-[80vh] bg-emerald-950 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }} className="w-full h-full"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-20 w-full">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-emerald-400"></div>
              <span className="text-emerald-400 text-sm tracking-widest uppercase font-mono">About Us</span>
            </div>
            
            <h1 className="hero-title text-[clamp(2.5rem,10vw,9rem)] leading-[0.9] font-light text-stone-50 mb-12" style={{ perspective: '1000px' }}>
              Redefining<br/>
              <span className="italic font-serif text-emerald-400">Cannabis</span><br/>
              Culture
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <p className="hero-desc text-xl text-stone-300 leading-relaxed">
                We're building a cannabis company that doesn't compromise on quality, transparency, or sustainability. Every decision we make is guided by these principles.
              </p>
              <p className="hero-desc text-lg text-stone-400 leading-relaxed">
                Founded by a team of cannabis advocates, cultivators, and wellness professionals, StrainsNotName emerged from a simple belief: consumers deserve better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width parallax image */}
      <section className="relative h-[70vh] overflow-hidden">
        <div ref={imageParallaxRef} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600"
            alt="Cannabis cultivation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="max-w-4xl mx-auto">
            <div className="h-px w-16 bg-emerald-600 mb-8 mx-auto"></div>
            <h2 className="mission-text text-center text-5xl lg:text-6xl font-light text-stone-900 mb-12 leading-tight">
              Our mission is to democratize access to <span className="italic font-serif text-emerald-700">premium cannabis</span>
            </h2>
            <p className="mission-text text-center text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
              For too long, the cannabis industry has been plagued by inconsistency, lack of transparency, and products that fail to meet basic quality standards. We're changing that by setting a new benchmark for excellence in every aspect of our business.
            </p>
          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section ref={valuesRef} className="py-32 bg-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="mb-20">
            <div className="h-px w-16 bg-emerald-600 mb-6"></div>
            <h2 className="text-5xl font-light text-stone-900">
              What Drives <span className="italic font-serif text-emerald-700">Everything We Do</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large card */}
            <div className="value-box md:col-span-8 bg-emerald-900 text-stone-50 p-12 lg:p-16">
              <div className="max-w-2xl">
                <h3 className="text-4xl font-light mb-6">Uncompromising Quality</h3>
                <p className="text-xl text-stone-300 leading-relaxed mb-8">
                  Every product undergoes rigorous third-party testing. We publish full certificates of analysis, including cannabinoid profiles, terpene content, and safety screenings.
                </p>
                <p className="text-lg text-stone-400 leading-relaxed">
                  Our standards exceed regulatory requirements because we believe you deserve more than the bare minimum.
                </p>
              </div>
            </div>

            {/* Small card */}
            <div className="value-box md:col-span-4 bg-white p-10 border border-stone-200">
              <div className="text-6xl mb-6">🔬</div>
              <h3 className="text-2xl font-light text-stone-900 mb-4">100% Lab Verified</h3>
              <p className="text-stone-600">
                Third-party testing isn't optional—it's mandatory for every single batch.
              </p>
            </div>

            {/* Medium cards */}
            <div className="value-box md:col-span-5 bg-white p-10 border border-stone-200">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-3xl font-light text-stone-900 mb-6">Sustainable Practices</h3>
              <p className="text-lg text-stone-600 leading-relaxed">
                We work exclusively with cultivators who prioritize regenerative agriculture, avoiding synthetic pesticides.
              </p>
            </div>

            <div className="value-box md:col-span-7 bg-emerald-50 p-12">
              <h3 className="text-3xl font-light text-stone-900 mb-6">Complete Transparency</h3>
              <ul className="space-y-4 text-stone-700 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1 text-2xl">→</span>
                  <span>Full traceability from seed to sale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1 text-2xl">→</span>
                  <span>Published lab results for every product</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1 text-2xl">→</span>
                  <span>Direct relationships with cultivators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-32 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="h-px w-16 bg-emerald-600 mb-6 mx-auto"></div>
              <h2 className="text-5xl font-light text-stone-900">
                The <span className="italic font-serif text-emerald-700">Journey</span>
              </h2>
            </div>

            <div className="space-y-16">
              {[
                {
                  year: '2022',
                  title: 'The Beginning',
                  desc: 'Three friends with a shared frustration: why was it so difficult to find consistently high-quality cannabis? We decided to build the company we wished existed.'
                },
                {
                  year: '2023',
                  title: 'Building Partnerships',
                  desc: 'We spent months visiting farms, meeting cultivators, and establishing relationships with those who shared our commitment to quality and sustainability.'
                },
                {
                  year: '2024',
                  title: 'Launch',
                  desc: 'StrainsNotName officially opened to the public. Our curated selection of lab-tested, premium products quickly gained a loyal following.'
                },
                {
                  year: 'Today',
                  title: 'Growing Community',
                  desc: 'Over 5,000 customers trust us for their cannabis needs. But we\'re just getting started—our vision is to set the industry standard.'
                }
              ].map((milestone, i) => (
                <div key={i} className="timeline-item grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-3">
                    <div className="text-5xl font-light text-emerald-600">{milestone.year}</div>
                  </div>
                  <div className="col-span-9 border-l-2 border-emerald-200 pl-8">
                    <h3 className="text-2xl font-light text-stone-900 mb-4">{milestone.title}</h3>
                    <p className="text-lg text-stone-600 leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-32 bg-emerald-950 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-px w-12 bg-emerald-400 mb-6"></div>
              <h2 className="text-5xl font-light mb-8 leading-tight">
                Built by<br/>
                <span className="italic font-serif text-emerald-400">Cannabis Experts</span>
              </h2>
              <p className="text-xl text-stone-300 leading-relaxed mb-6">
                Our team brings decades of combined experience in cannabis cultivation, extraction, retail, and wellness consultation.
              </p>
            </div>

            <div className="bg-white/5 p-12 border border-white/10">
              <h3 className="text-2xl font-light mb-8 text-emerald-400">Our Expertise</h3>
              <div className="expertise-list space-y-6">
                {[
                  'Organic cultivation & regenerative agriculture',
                  'Cannabinoid science & pharmacology',
                  'Extraction & concentrate production',
                  'Regulatory compliance & quality assurance',
                  'Patient consultation & wellness guidance'
                ].map((expertise, i) => (
                  <div key={i} className="expertise-item flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span className="text-stone-300">{expertise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section py-32 bg-stone-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 5000, label: 'Happy Customers', suffix: '+' },
              { value: 100, label: 'Lab Tested', suffix: '%' },
              { value: 50, label: 'Premium Strains', suffix: '+' },
              { value: 24, label: 'Support', suffix: '/7' }
            ].map((stat, i) => (
              <div key={i} className="scale-reveal">
                <div className="text-6xl font-light text-emerald-600 mb-4">
                  <span className="stat-counter" data-value={stat.value}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-stone-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-emerald-900 text-stone-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full text-center">
          <h2 className="text-6xl font-light mb-8 leading-tight">
            Join Our<br/>
            <span className="italic font-serif text-emerald-400">Community</span>
          </h2>
          <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
            Experience cannabis the way it should be: pure, transparent, and expertly curated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-3 bg-emerald-500 text-emerald-950 px-10 py-5 font-medium hover:bg-emerald-400 transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-3 border-2 border-stone-700 text-stone-50 px-10 py-5 font-medium hover:border-emerald-400 hover:text-emerald-400 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}