import { useEffect, useRef, useState } from 'react';
import { Check, Cpu, Shield, Rocket, Clock, Users, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: Cpu,
    title: 'Cutting-Edge Technology',
    description: 'Leverage the latest AI models including GPT-4, DALL-E, Stable Diffusion, and custom-trained solutions.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC 2 compliance, and strict data privacy protocols protect your information.',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Go from concept to production in weeks, not months, with our proven implementation framework.',
  },
  {
    icon: Clock,
    title: '24/7 AI Operations',
    description: 'Your AI systems work around the clock, handling tasks while your team focuses on strategy.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Work with PhD-level AI researchers and engineers who understand both technology and business.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI',
    description: 'Track performance with clear metrics. Our clients see average 300% ROI within 12 months.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We analyze your business needs and identify AI opportunities.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Develop a custom AI roadmap aligned with your goals.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Build and train AI models tailored to your use case.',
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'Launch your AI solution with full support and monitoring.',
  },
];

export const FeaturesSection = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative w-full py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute inset-0 grid-pattern z-[1] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Why Choose Us */}
        <div className={`mb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="tech-badge mb-4 mx-auto">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for <span className="gradient-text">Modern Business</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              We combine technical excellence with business acumen to deliver AI solutions that actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="tech-badge mb-4 mx-auto">
              <span>Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How We <span className="gradient-text">Deliver</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="text-5xl font-bold gradient-text mb-4 opacity-50">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-violet-500 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-24 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Trusted by Industry Leaders
                </h3>
                <p className="text-white/50 mb-8">
                  Join hundreds of companies already transforming their operations with ANACTA's AI solutions.
                </p>
                <div className="space-y-4">
                  {[
                    'Enterprise-grade security & compliance',
                    'Dedicated AI success managers',
                    '99.9% uptime guarantee',
                    'Flexible pricing for any scale',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '300%', label: 'Average ROI' },
                  { value: '50M+', label: 'AI Tasks Automated' },
                  { value: '200+', label: 'Enterprise Clients' },
                  { value: '15+', label: 'Industries Served' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
