import { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/5 to-black z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase mb-6">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-white">
            The Mind Behind <span className="text-teal-400/70">ANACTA AI</span>
          </h2>
        </div>

        {/* Story */}
        <div 
          className={`glass-card rounded-2xl p-10 md:p-16 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-10">
              ANACTA AI is a Sydney-based studio built on a simple belief:{' '}
              <span className="text-teal-400">AI should work for you.</span>
            </p>
            
            <p className="text-white/50 leading-relaxed mb-8">
              With over a decade of experience across artificial intelligence, technology, 
              marketing, and design, we bring a rare multidisciplinary approach to every project.
            </p>

            <p className="text-white/50 leading-relaxed">
              Whether you are a Fortune 500 looking to transform operations or a founder 
              with a vision, we bring the same level of craft to every engagement.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div 
          className={`text-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent mx-auto mb-8" />
          
          <p className="text-sm md:text-base text-white/40 uppercase tracking-[0.15em] max-w-xl mx-auto leading-relaxed">
            We bridge the gap between trying AI and running on AI.
          </p>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
