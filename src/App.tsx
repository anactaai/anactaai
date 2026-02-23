import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Config
import { siteConfig } from './config';

// Hooks
import useLenis from './hooks/useLenis';

// Interactive Components
import InteractiveNav from './components/InteractiveNav';
import ScrollProgress from './components/ScrollProgress';
import MouseFollower from './components/MouseFollower';
import ShopSection from './components/ShopSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import { StatsSection } from './components/AnimatedCounter';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Exhibitions from './sections/Exhibitions';
import Collections from './sections/Collections';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scroll
  useLenis();

  // Set document language and title
  useEffect(() => {
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Interactive Navigation */}
      <InteractiveNav />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Custom Mouse Follower */}
      <MouseFollower />

      {/* Hero Section - First Nations Acknowledgment */}
      <div id="hero">
        <Hero />
      </div>

      {/* About Section - Museum Overview */}
      <div id="about">
        <About />
      </div>

      {/* Animated Statistics */}
      <StatsSection />

      {/* Exhibitions Section */}
      <div id="exhibitions">
        <Exhibitions />
      </div>

      {/* Collections Section */}
      <div id="collections">
        <Collections />
      </div>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Visit Section */}
      <div id="visit">
        <Visit />
      </div>

      {/* Shop Section */}
      <ShopSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
