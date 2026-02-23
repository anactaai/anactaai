import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { aboutConfig } from '../config';
import ImageLightbox from '../components/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  if (!aboutConfig.headline) return null;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // Gallery column parallax
    const columns = gallery.querySelectorAll<HTMLElement>('.gallery-col');
    columns.forEach((col) => {
      const speed = parseFloat(col.dataset.speed || '0');
      ScrollTrigger.create({
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(col, { y: self.progress * speed });
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

  const galleryImages = aboutConfig.galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.label,
  }));

  // Split gallery images into 3 columns
  const col1Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 0);
  const col2Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 1);
  const col3Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#E85A24] grain-overlay"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto pt-24 lg:pt-32 pb-12 px-6 lg:px-16">
        <motion.p 
          className="mos-label text-white/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {aboutConfig.label}
        </motion.p>
        <motion.h2 
          className="mos-headline text-white text-4xl md:text-5xl lg:text-7xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {aboutConfig.headline}
        </motion.h2>
        <motion.p 
          className="mos-body text-white/80 text-base lg:text-lg max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {aboutConfig.description}
        </motion.p>
      </div>

      {/* Featured Image */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 lg:px-8 pb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.01 }}
          onClick={() => openLightbox(0)}
        >
          <img 
            src="/images/museum_exterior.jpg" 
            alt="Museum of Sydney exterior" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.div 
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Sub-nav links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 lg:gap-8 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {['Plan your visit', 'What\'s on', 'Eat & drink', 'Shop with us', 'Learning', 'Venue hire'].map((link, i) => (
            <motion.a 
              key={i} 
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
              className="mos-label text-white/70 hover:text-white transition-colors text-[11px] underline underline-offset-4"
              whileHover={{ y: -2 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Gallery — overflow hidden to prevent parallax leaking */}
      <div className="overflow-hidden">
        <div ref={galleryRef} className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-3 gap-4 lg:gap-5">
            {/* Column 1 */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-80">
              {col1Images.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden rounded-xl cursor-pointer group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(i * 3)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: i === 0 ? '3/4' : '4/5' }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mos-label text-white/50 mt-3 text-[10px]">{img.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="gallery-col space-y-4 lg:space-y-5 pt-20 lg:pt-32 will-change-transform" data-speed="100">
              {col2Images.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden rounded-xl cursor-pointer group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(i * 3 + 1)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mos-label text-white/50 mt-3 text-[10px]">{img.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-120">
              {col3Images.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="gallery-img-wrap overflow-hidden rounded-xl cursor-pointer group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(i * 3 + 2)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: i === 0 ? '4/5' : '3/4' }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mos-label text-white/50 mt-3 text-[10px]">{img.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {aboutConfig.stats.length > 0 && (
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-12">
            {aboutConfig.stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="stat-item text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.p 
                  className="mos-headline text-white text-3xl md:text-5xl mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="mos-label text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom text */}
      {aboutConfig.bottomText && (
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="mos-body text-white/70 text-sm lg:text-base">
                {aboutConfig.bottomText}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default About;
