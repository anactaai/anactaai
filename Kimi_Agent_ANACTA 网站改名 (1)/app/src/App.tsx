import { useEffect, useState } from 'react';
import { FlowingBackground } from './components/FlowingBackground';
import { HeroSection } from './sections/HeroSection';
import { MissionSection } from './sections/MissionSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

function App() {
  const [missionVisible, setMissionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY > windowHeight * 0.5) {
        setMissionVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Flowing Background Canvas */}
      <FlowingBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Mission Section with Text Scramble */}
        <MissionSection isVisible={missionVisible} />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Contact Section with Form & Booking */}
        <ContactSection />
        
        {/* Footer */}
        <footer className="relative z-10 bg-black py-16 px-4 md:px-8 border-t border-teal-400/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo - Text Only */}
              <div>
                <span className="text-xl font-semibold tracking-[0.15em] text-white">
                  ANACTA <span className="text-teal-400">AI</span>
                </span>
              </div>

              {/* Links */}
              <nav className="flex items-center gap-8">
                {['Services', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-[11px] tracking-[0.2em] text-teal-400/40 hover:text-teal-400 transition-colors uppercase"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Copyright */}
              <p className="text-[11px] text-teal-400/30 tracking-wide">
                © 2026 ANACTA. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
