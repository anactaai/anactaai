import { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink, ArrowRight, Bot, Sparkles, Workflow, Wand2 } from 'lucide-react';

interface Demo {
  id: string;
  title: string;
  category: string;
  description: string;
  type: 'video' | 'interactive' | 'case-study';
  thumbnail?: string;
  videoUrl?: string;
  link?: string;
  tags: string[];
}

const demos: Demo[] = [
  {
    id: 'agent-orchestrator',
    title: 'Multi-Agent Workflow System',
    category: 'Agent Orchestration',
    description: 'Watch multiple AI agents collaborate to complete a complex business workflow from start to finish.',
    type: 'video',
    tags: ['Multi-Agent', 'Automation', 'Workflow'],
  },
  {
    id: 'smart-website',
    title: 'Adaptive AI Website',
    category: 'Intelligent Experiences',
    description: 'A website that learns from visitors and personalizes content, layout, and messaging in real-time.',
    type: 'interactive',
    link: '#',
    tags: ['Personalization', 'Real-time', 'Adaptive'],
  },
  {
    id: 'content-generator',
    title: 'AI Content Pipeline',
    category: 'Generative AI',
    description: 'From brief to published — see how AI agents research, write, design, and publish content autonomously.',
    type: 'video',
    tags: ['Content', 'Generation', 'Automation'],
  },
  {
    id: 'customer-support',
    title: 'Intelligent Support Agent',
    category: 'Conversational AI',
    description: 'An AI support agent that understands context, accesses your knowledge base, and resolves tickets end-to-end.',
    type: 'interactive',
    link: '#',
    tags: ['Support', 'Chatbot', 'Integration'],
  },
];

export const DemosSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

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

  const getIcon = (category: string) => {
    switch (category) {
      case 'Agent Orchestration': return Bot;
      case 'Intelligent Experiences': return Sparkles;
      case 'Generative AI': return Wand2;
      case 'Conversational AI': return Workflow;
      default: return Sparkles;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="demos"
      className="relative w-full py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/5 to-black z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase mb-6">
            See It In Action
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-white mb-6">
            LIVE <span className="text-teal-400/70">DEMOS</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Experience the future of AI-powered digital experiences and autonomous workflows.
          </p>
        </div>

        {/* Featured Demo - Large */}
        <div 
          className={`mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Demo Preview Area */}
            <div className="relative aspect-video bg-gradient-to-br from-teal-900/20 to-black flex items-center justify-center">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-[100px] animate-pulse" />
              </div>
              
              {/* Play Button */}
              <button 
                className="relative z-10 w-20 h-20 rounded-full bg-teal-400/20 backdrop-blur-sm border border-teal-400/30 flex items-center justify-center hover:bg-teal-400/30 transition-all hover:scale-110"
                onClick={() => setActiveDemo('featured')}
              >
                <Play className="w-8 h-8 text-teal-400 ml-1" />
              </button>
              
              {/* Demo Label */}
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-teal-400/20 text-teal-400 text-[10px] tracking-widest uppercase rounded-full">
                  Featured Demo
                </span>
              </div>
            </div>
            
            {/* Demo Info */}
            <div className="p-8">
              <h3 className="text-2xl font-medium text-white mb-3">
                Complete Agent Ecosystem Demo
              </h3>
              <p className="text-white/50 mb-6 max-w-2xl">
                See how multiple AI agents work together — from receiving a customer inquiry to 
                researching, drafting a response, getting approval, and sending the final email. 
                All without human intervention.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Multi-Agent', 'End-to-End', 'Real-time'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos.map((demo, index) => {
            const Icon = getIcon(demo.category);
            return (
              <div
                key={demo.id}
                className={`glass-card rounded-2xl p-6 group cursor-pointer hover:border-teal-400/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                onClick={() => setActiveDemo(demo.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <span className="px-2 py-1 bg-white/5 text-white/40 text-[10px] uppercase tracking-wider rounded">
                    {demo.type}
                  </span>
                </div>

                {/* Content */}
                <p className="text-[10px] text-teal-400/60 uppercase tracking-widest mb-2">
                  {demo.category}
                </p>
                <h4 className="text-lg font-medium text-white mb-3 group-hover:text-teal-400 transition-colors">
                  {demo.title}
                </h4>
                <p className="text-white/40 text-sm mb-4 line-clamp-2">
                  {demo.description}
                </p>

                {/* Tags & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {demo.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-white/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-teal-400/60 text-sm group-hover:text-teal-400 transition-colors">
                    {demo.type === 'video' ? 'Watch' : 'Try It'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/40 mb-6">
            Want to see something specific?
          </p>
          <a 
            href="https://calendly.com/hello-anactaai/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            Book a Custom Demo
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Demo Modal (Placeholder) */}
      {activeDemo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveDemo(null)}
        >
          <div 
            className="glass-card rounded-2xl p-8 max-w-lg w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-teal-400/10 flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-4">
              Demo Coming Soon
            </h3>
            <p className="text-white/50 mb-6">
              We're preparing this demo for you. In the meantime, book a call 
              to see a live personalized demonstration.
            </p>
            <a 
              href="https://calendly.com/hello-anactaai/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              Book a Live Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
    </section>
  );
};

export default DemosSection;
