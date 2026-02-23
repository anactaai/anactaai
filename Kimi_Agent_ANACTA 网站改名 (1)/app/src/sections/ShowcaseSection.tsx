import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ShowcaseItem {
  title: string;
  category: string;
  description: string;
  link: string;
}

const showcases: ShowcaseItem[] = [
  {
    title: 'Museum Experience',
    category: 'Digital Experience',
    description: 'An immersive digital museum experience showcasing interactive storytelling and AI-powered content delivery.',
    link: '#', // Replace with actual museum mockup link
  },
  {
    title: 'Brand Showcase',
    category: 'Intelligent Website',
    description: 'Adaptive brand website that personalizes content based on visitor behavior and preferences.',
    link: '#',
  },
  {
    title: 'Agent Dashboard',
    category: 'Agent Orchestration',
    description: 'Live dashboard showing multiple AI agents coordinating tasks in real-time.',
    link: '#',
  },
];

export const ShowcaseSection = () => {
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
      id="showcase"
      className="relative w-full py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/5 to-black z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase mb-6">
            Our Work
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-white mb-6">
            LIVE <span className="text-teal-400/70">SHOWCASE</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Explore our work. Click through to experience live demos.
          </p>
        </div>

        {/* Showcase Items */}
        <div className="space-y-6">
          {showcases.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card rounded-2xl p-8 block group hover:border-teal-400/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm max-w-lg">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-teal-400/60 group-hover:text-teal-400 transition-colors">
                  <span className="text-sm">View Live</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a 
            href="https://calendly.com/hello-anactaai/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            Request Custom Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
