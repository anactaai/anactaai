import { ArrowRight, Mail, Sparkles } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px] z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-violet-300">Ready to Transform?</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Let's Build Your
          <br />
          <span className="gradient-text">AI Future</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12">
          Schedule a free consultation with our AI experts and discover how 
          intelligent automation can transform your business.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="btn-primary flex items-center gap-2 text-lg">
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="btn-outline-tech flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Sales
          </button>
        </div>

        {/* Trust Text */}
        <p className="text-white/30 text-sm">
          No commitment required. Get a custom AI roadmap in 48 hours.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
