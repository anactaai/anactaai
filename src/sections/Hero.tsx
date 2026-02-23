import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroConfig } from '../config';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax for image
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#E85A24] grain-overlay"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-white/5"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-white/5"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-0 left-0 w-full z-50 px-6 lg:px-16 py-5 flex items-center justify-between"
      >
        <motion.div 
          className="mos-label text-white/80 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          MUSEUM OF SYDNEY
        </motion.div>
        <div className="flex items-center gap-6 lg:gap-10">
          {heroConfig.navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="mos-label text-white/70 hover:text-white transition-colors text-[11px] hidden sm:block"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Main content grid */}
      <motion.div 
        className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 lg:px-16 pt-24 pb-12"
        style={{ opacity }}
      >
        {/* Left column - Image with parallax */}
        <motion.div
          className="lg:col-span-5 flex items-start justify-center lg:justify-start"
          style={{ y: imageY }}
        >
          <motion.div 
            className="relative w-full max-w-lg lg:max-w-none lg:w-[42vw] aspect-video rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -100, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={heroConfig.heroImage}
              alt={heroConfig.heroImageAlt}
              className="w-full h-full object-cover"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E85A24]/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Right column - Headline and buttons */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center"
          style={{ y: textY }}
        >
          <div className="space-y-2">
            <motion.h1 
              className="mos-headline text-white text-[8vw] lg:text-[5vw] leading-[1]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Was, is and always will be
            </motion.h1>
            <motion.h1 
              className="mos-headline text-white text-[8vw] lg:text-[5vw] leading-[1]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Aboriginal land.
            </motion.h1>
          </div>

          {/* Animated divider */}
          <motion.div 
            className="w-full h-px bg-white/30 my-6 lg:my-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          {/* Buttons with stagger */}
          <motion.div 
            className="flex flex-wrap gap-3 lg:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { text: 'Find out more', variant: 'primary' },
              { text: 'First Nations Hub', variant: 'primary' },
              { text: 'Scroll to continue', variant: 'outline', icon: ChevronDown },
            ].map((btn, i) => (
              <motion.button
                key={i}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  btn.variant === 'primary'
                    ? 'bg-white text-[#E85A24]'
                    : 'border border-white/40 text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn.text === 'Scroll to continue' ? scrollToContent : undefined}
              >
                {btn.text}
                {btn.icon && <btn.icon className="w-4 h-4" />}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom left - Paragraph */}
        <motion.div 
          className="lg:col-span-6 lg:row-start-2 flex items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="mos-body text-white/90 text-sm lg:text-base max-w-xl leading-relaxed">
            Museums of History NSW acknowledges the traditional custodians of the lands now known as New South Wales. 
            We pay our respects to Elders past and present, and to the continuing strength and resilience of 
            First Nations people and cultures.
          </p>
        </motion.div>

        {/* Bottom right - Caption */}
        <motion.div 
          className="lg:col-span-6 lg:row-start-2 flex items-end justify-start lg:justify-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <p className="mos-body text-white/70 text-xs lg:text-sm italic max-w-sm">
            Smoke coming from lit gum leaves for the Smoking Ceremony at Eel Festival 2021 
            Photo © Joshua Morris for Museums of History NSW
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
      >
        <span className="mos-label text-white/50 text-[10px]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
