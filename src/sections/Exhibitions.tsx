import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { exhibitionsConfig } from '../config';
import ExhibitionCard from '../components/ExhibitionCard';
import ImageLightbox from '../components/ImageLightbox';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Exhibitions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!exhibitionsConfig.headline && exhibitionsConfig.exhibitions.length === 0) return null;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const exhibitionImages = exhibitionsConfig.exhibitions.map((ex) => ({
    src: ex.image,
    alt: ex.title,
    caption: ex.date,
  }));

  return (
    <section
      id="exhibitions"
      ref={sectionRef}
      className="relative w-full bg-[#E85A24] grain-overlay py-20 lg:py-32 px-6 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-12 lg:mb-16">
        <motion.p 
          className="reveal-header mos-label text-white/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {exhibitionsConfig.label}
        </motion.p>
        <motion.h2 
          className="reveal-header mos-headline text-white text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {exhibitionsConfig.headline}
        </motion.h2>
      </div>

      {/* 2x2 Exhibition Grid with 3D Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {exhibitionsConfig.exhibitions.map((exhibit, i) => (
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <ExhibitionCard
              title={exhibit.title}
              image={exhibit.image}
              date={exhibit.date}
              description={`Explore ${exhibit.title} and discover the stories behind the artifacts.`}
              onClick={() => openLightbox(i)}
            />
          </motion.div>
        ))}
      </div>

      {/* Get Tickets CTA */}
      <motion.div 
        className="max-w-7xl mx-auto mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.button 
          className="btn-outline flex items-center gap-2 text-sm group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {exhibitionsConfig.ctaText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      {/* Lightbox */}
      <ImageLightbox
        images={exhibitionImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default Exhibitions;
