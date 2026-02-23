import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collectionsConfig } from '../config';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!collectionsConfig.headline && collectionsConfig.collections.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stack = stackRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || !stack || cards.length === 0) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Stacking cards: each card pins and the NEXT card slides up over it
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // last card doesn't need pinning

      // Pin this card in place while the next card scrolls up to cover it
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        endTrigger: cards[i + 1],
        end: 'top top',
        pin: true,
        pinSpacing: false,
      });
      triggersRef.current.push(trigger);

      // Slight scale-down + dim as the next card covers this one
      const dimTrigger = ScrollTrigger.create({
        trigger: cards[i + 1],
        start: 'top bottom',
        end: 'top top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(card, {
            scale: 1 - p * 0.05,
            filter: `brightness(${1 - p * 0.3})`,
          });
        },
      });
      triggersRef.current.push(dimTrigger);
    });

    // Text reveal inside each card
    cards.forEach((card) => {
      const textEls = card.querySelectorAll('.coll-text-el');
      textEls.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 30 });
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(el, {
              opacity: 1, y: 0, duration: 0.7,
              delay: 0.15 + i * 0.08, ease: 'power3.out',
            });
          },
        });
        triggersRef.current.push(trigger);
      });
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full bg-[#E85A24] grain-overlay"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto pt-24 lg:pt-32 pb-8 px-6 lg:px-16">
        <p className="reveal-header mos-label text-white/70 mb-4">
          {collectionsConfig.label}
        </p>
        <h2 className="reveal-header mos-headline text-white text-4xl md:text-5xl lg:text-6xl">
          {collectionsConfig.headline}
        </h2>
      </div>

      {/* Stacking Cards Container */}
      <div ref={stackRef} className="relative">
        {collectionsConfig.collections.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="relative w-full min-h-screen bg-[#E85A24] will-change-transform"
            style={{ zIndex: index + 1 }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24 flex items-center min-h-screen">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full ${
                  index % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image — 7 cols */}
                <div
                  className={`lg:col-span-7 overflow-hidden rounded-2xl ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '16/10' }}
                  />
                </div>

                {/* Text — 5 cols */}
                <div
                  className={`lg:col-span-5 ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}
                >
                  <p className="coll-text-el mos-label text-white/50 mb-3">
                    {item.year}
                  </p>
                  <h3 className="coll-text-el mos-headline text-white text-2xl md:text-3xl lg:text-4xl mb-4">
                    {item.title}
                  </h3>
                  <p className="coll-text-el mos-body text-white/70 mb-8 max-w-md text-sm lg:text-base">
                    {item.description}
                  </p>
                  {collectionsConfig.ctaText && (
                    <button className="coll-text-el btn-outline flex items-center gap-2 text-sm group">
                      {collectionsConfig.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
