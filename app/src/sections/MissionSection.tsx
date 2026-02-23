import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface MissionSectionProps {
  isVisible?: boolean;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ isVisible = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const finalText = 'WE BUILD IMMERSIVE DIGITAL EXPERIENCES AND ORCHESTRATE INTELLIGENT AI SYSTEMS — FROM BESPOKE WEBSITES THAT ADAPT TO USERS, TO AUTONOMOUS WORKFLOWS THAT RUN YOUR BUSINESS. WE PARTNER WITH ENTERPRISES AND INDIVIDUALS ALIKE TO BRING AI FROM CONCEPT TO REALITY.';

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        const charProgress = Math.min(progress * finalText.length * 0.7, i + 1) / (i + 1);
        
        if (finalText[i] === ' ' || finalText[i] === '"' || finalText[i] === '.' || finalText[i] === '—' || finalText[i] === ',') {
          result += finalText[i];
        } else if (charProgress >= 1) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
        setTimeout(() => setSubtitleVisible(true), 300);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);
  }, [isVisible, hasAnimated]);

  return (
    <section 
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black py-20 px-4"
    >
      {/* Subtitle */}
      <div 
        className={`mb-12 transition-all duration-700 ${
          subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase">
          WHAT WE DO
        </p>
      </div>

      {/* Main Scramble Text */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-medium tracking-wide text-white leading-relaxed scramble-text">
          {displayText || finalText}
        </h2>
      </div>

      {/* Client Types */}
      <div 
        className={`flex flex-wrap justify-center gap-6 md:gap-12 mb-12 transition-all duration-700 delay-300 ${
          subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {[
          { label: 'Enterprise', desc: 'Fortune 500' },
          { label: 'Startups', desc: 'High-Growth' },
          { label: 'Agencies', desc: 'Creative' },
          { label: 'Individuals', desc: 'Visionaries' },
        ].map((client) => (
          <div key={client.label} className="text-center">
            <p className="text-sm md:text-base font-medium text-teal-400 tracking-wide">{client.label}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{client.desc}</p>
          </div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent mb-8" />

      {/* Brand Name */}
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white/80">
          ANACTA <span className="text-teal-400">AI</span>
        </p>
      </div>

      {/* Decorative gradient orbs - turquoise */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>
    </section>
  );
};

export default MissionSection;
