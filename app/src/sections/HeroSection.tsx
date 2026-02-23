import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (windowHeight * 0.5)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentOpacity = Math.max(0, 1 - scrollProgress * 2);
  const contentTranslate = scrollProgress * -80;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-8">
        <a href="#contact" className="btn-outline text-teal-400/70 hover:text-teal-400 text-xs tracking-widest">
          Book a Call
        </a>
        <button 
          className="btn-outline flex items-center gap-3 text-teal-400/70 hover:text-teal-400 text-xs tracking-widest"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>Menu</span>
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Main Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslate}px)`,
        }}
      >
        {/* Side Text - Left */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 hidden md:block">
          <p className="text-[10px] tracking-[0.4em] text-teal-400/25 uppercase writing-vertical-left">
            Digital Experiences
          </p>
        </div>

        {/* Side Text - Right */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:block">
          <p className="text-[10px] tracking-[0.4em] text-teal-400/25 uppercase writing-vertical">
            AI Orchestration
          </p>
        </div>

        {/* Brand Name - Large */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.08em] text-white mb-12">
          ANACTA <span className="text-teal-400">AI</span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-center gap-6 mb-20">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-teal-400/40" />
          <p className="text-lg md:text-xl tracking-[0.3em] text-teal-400/80 font-light uppercase">
            Agent Systems Studio
          </p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-teal-400/40" />
        </div>

        {/* Value Proposition - Clean and Simple */}
        <div className="max-w-xl mx-auto mb-28">
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8">
            Digital experiences. Intelligent agents. AI consulting.
          </p>
          <p className="text-xs tracking-[0.2em] text-white/30 uppercase">
            Fortune 500 · Startups · Visionaries
          </p>
        </div>

        {/* Bottom Tagline */}
        <div className="absolute bottom-24 left-0 right-0 text-center px-6">
          <p className="text-[11px] tracking-[0.25em] text-teal-400/30 uppercase">
            Websites that think. Workflows that autonomate.
          </p>
        </div>
      </div>

      {/* Mobile Side Text */}
      <div 
        className="md:hidden absolute bottom-44 left-0 right-0 flex justify-between px-8"
        style={{ opacity: contentOpacity }}
      >
        <p className="text-[8px] tracking-[0.25em] text-teal-400/20 uppercase">
          Digital Experiences
        </p>
        <p className="text-[8px] tracking-[0.25em] text-teal-400/20 uppercase">
          AI Orchestration
        </p>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center">
          <button 
            className="absolute top-8 right-8 btn-outline text-xs tracking-widest"
            onClick={() => setIsMenuOpen(false)}
          >
            Close
          </button>
          <nav className="flex flex-col items-center gap-12">
            {['Experiences', 'Agents', 'Consulting', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-light tracking-[0.25em] text-teal-400/70 hover:text-teal-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
