import { useEffect, useRef, useState } from 'react';

interface Service {
  code: string;
  number: string;
  title: string;
  description: string;
  audience: string;
}

const services: Service[] = [
  {
    code: 'DE',
    number: '01',
    title: 'IMMERSIVE EXPERIENCES',
    description: 'Craft captivating digital experiences that engage users through interactive design, dynamic content, and AI-powered personalisation. From landing pages to full-scale web applications.',
    audience: 'Brands & Agencies',
  },
  {
    code: 'WA',
    number: '02',
    title: 'INTELLIGENT WEBSITES',
    description: 'Build websites that think — adaptive layouts, AI-generated content, smart search, and conversational interfaces that transform visitors into engaged users.',
    audience: 'Businesses & Creators',
  },
  {
    code: 'AO',
    number: '03',
    title: 'AGENT ORCHESTRATION',
    description: 'Design and deploy multi-agent systems that coordinate complex workflows autonomously. Agents that communicate, delegate, and execute tasks end-to-end without human intervention.',
    audience: 'Enterprise & Scale-ups',
  },
  {
    code: 'WF',
    number: '04',
    title: 'WORKFLOW AUTOMATION',
    description: 'Transform manual processes into intelligent, autonomous workflows. From document processing to customer onboarding — we automate what slows you down.',
    audience: 'Operations Teams',
  },
  {
    code: 'AI',
    number: '05',
    title: 'AI CONSULTING',
    description: 'Strategic guidance on AI implementation, from feasibility assessments to roadmap development. We help you showcase AI capabilities and identify high-ROI opportunities.',
    audience: 'Leadership & Innovation',
  },
  {
    code: 'PO',
    number: '06',
    title: 'AI SHOWCASE & DEMOS',
    description: 'Create compelling AI demonstrations, proof-of-concepts, and interactive showcases that help your organisation visualise and communicate the power of artificial intelligence.',
    audience: 'Sales & Marketing',
  },
];

export const ServicesSection = () => {
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
      id="services"
      className="relative min-h-screen w-full py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/starry-mountains.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase mb-6">
            OUR CAPABILITIES
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-white mb-4">
            EXPERIENCES <span className="text-teal-400/70">+</span> AGENTS
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            From stunning digital experiences to autonomous AI systems — 
            we orchestrate technology that works for you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.code}
              className={`glass-card rounded-2xl p-8 flex flex-col items-center text-center service-card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1.5 text-[10px] tracking-[0.2em] text-teal-400/50 border border-teal-400/20 rounded-full">
                  {service.number} — {service.code}
                </span>
              </div>

              {/* Audience Tag */}
              <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-4">
                {service.audience}
              </p>

              {/* Title */}
              <h3 className="text-base md:text-lg font-medium tracking-[0.1em] text-white mb-6">
                {service.title}
              </h3>

              {/* Decorative Line */}
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent mb-6" />

              {/* Description */}
              <p className="text-sm text-teal-400/40 leading-relaxed max-w-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a href="#contact" className="btn-outline text-teal-400/60 hover:text-teal-400">
            Discuss Your Project
          </a>
        </div>
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full animate-twinkle"
            style={{ 
              top: `${15 + i * 15}%`, 
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s` 
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
