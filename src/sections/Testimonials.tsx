import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!testimonialsConfig.quote) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const elements = content.querySelectorAll('.reveal-item');
    elements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#E85A24] grain-overlay py-20 lg:py-32 px-6 lg:px-16"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto text-center">
        {/* Quote Icon */}
        <div className="reveal-item flex justify-center mb-10">
          <Quote className="w-12 h-12 lg:w-16 lg:h-16 text-white/30" strokeWidth={1} />
        </div>

        {/* Quote Text */}
        <blockquote className="reveal-item mos-headline text-white text-xl md:text-2xl lg:text-3xl leading-relaxed mb-10">
          "{testimonialsConfig.quote}"
        </blockquote>

        {/* Author */}
        <div className="reveal-item flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6">
          {testimonialsConfig.authorImage && (
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white/30">
              <img
                src={testimonialsConfig.authorImage}
                alt={testimonialsConfig.authorName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <p className="mos-headline text-white text-base lg:text-lg">{testimonialsConfig.authorName}</p>
            <p className="mos-label text-white/60">
              {testimonialsConfig.authorTitle}
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="reveal-item mt-16 lg:mt-24 flex items-center justify-center">
          <div className="w-24 h-px bg-white/30" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
