import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Ticket } from 'lucide-react';
import { visitConfig } from '../config';
import InteractiveAccordion from '../components/InteractiveAccordion';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Clock,
  Calendar,
  Ticket,
};

const Visit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  if (!visitConfig.headline && visitConfig.infoCards.length === 0) return null;

  useEffect(() => {
    const cards = cardsRef.current;
    const info = infoRef.current;

    if (!cards || !info) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
    });

    gsap.set(info, { opacity: 0, x: 40 });
    ScrollTrigger.create({
      trigger: info,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(info, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative w-full bg-[#E85A24] grain-overlay py-20 lg:py-32 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Text content */}
          <div>
            <motion.p 
              className="mos-label text-white/70 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {visitConfig.label}
            </motion.p>
            <motion.h2 
              className="mos-headline text-white text-4xl md:text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              On the site of first Government House
            </motion.h2>
            <motion.p 
              className="mos-body text-white/80 text-base lg:text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Built over and around the remains of <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Sydney's first Government House</a>, the Museum of Sydney is a special place. Join us on Gadigal Country for a changing program of exhibitions, events and conversations that explore the character, cultures and soul of this city.
            </motion.p>
            
            {/* Interior image */}
            <motion.div 
              className="relative aspect-video rounded-2xl overflow-hidden mt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/images/museum_interior.jpg" 
                alt="Museum interior" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          </div>

          {/* Right column - Interactive accordion */}
          <motion.div 
            ref={infoRef} 
            className="lg:pt-16"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <InteractiveAccordion />
          </motion.div>
        </div>

        {/* Info Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16 lg:mt-24"
        >
          {visitConfig.infoCards.map((card, i) => {
            const IconComponent = iconMap[card.icon];
            return (
              <motion.div 
                key={i} 
                className="info-card p-6 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/30 transition-all cursor-pointer group"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {IconComponent && (
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <IconComponent className="w-7 h-7 text-white/70 mb-4 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </motion.div>
                )}
                <h3 className="mos-headline text-white text-lg mb-2">{card.title}</h3>
                <div
                  className="mos-body text-white/70 text-sm"
                  dangerouslySetInnerHTML={{ __html: card.content }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {visitConfig.ctaText && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="btn-dark text-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {visitConfig.ctaText}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Visit;
