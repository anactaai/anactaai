import { useState } from 'react';
import { Send, Calendar, Mail, Phone, MapPin, ArrowRight, Building2, User } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/10 to-black z-0" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.35em] text-teal-400/40 uppercase mb-6">
            GET IN TOUCH
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-white mb-6">
            LET'S CREATE <span className="text-teal-400/70">TOGETHER</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Whether you're a Fortune 500 looking to transform operations, 
            or an individual with a vision — we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-medium text-white mb-6 tracking-wide">
              START A CONVERSATION
            </h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Message Sent</h4>
                <p className="text-white/50">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select...</option>
                      <option value="experience" className="bg-black">Digital Experience</option>
                      <option value="website" className="bg-black">Intelligent Website</option>
                      <option value="agents" className="bg-black">Agent Orchestration</option>
                      <option value="workflow" className="bg-black">Workflow Automation</option>
                      <option value="consulting" className="bg-black">AI Consulting</option>
                      <option value="showcase" className="bg-black">AI Showcase/Demo</option>
                      <option value="other" className="bg-black">Something Else</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-teal-400/60 uppercase mb-2">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors resize-none"
                    placeholder="What are you looking to build or automate?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-outline flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Booking & Contact Info */}
          <div className="space-y-8">
            {/* Book a Call Card */}
            <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-400/10 flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-teal-400" />
                </div>
                
                <h3 className="text-xl font-medium text-white mb-4 tracking-wide">
                  BOOK A DISCOVERY CALL
                </h3>
                
                <p className="text-white/50 mb-8 leading-relaxed">
                  Schedule a 30-minute call where we'll explore your vision:
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'Understand your goals and challenges',
                    'Identify the right AI or experience solution',
                    'Map out a clear path to implementation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="https://calendly.com/hello-anactaai/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center justify-center gap-2 w-full"
                >
                  Book Your Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Client Types */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-sm font-medium text-white/70 mb-4 tracking-wide uppercase">
                We Work With
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-teal-400/60" />
                  <span className="text-white/60 text-sm">Enterprise</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-teal-400/60" />
                  <span className="text-white/60 text-sm">Startups</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-teal-400/60" />
                  <span className="text-white/60 text-sm">Agencies</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-teal-400/60" />
                  <span className="text-white/60 text-sm">Individuals</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-sm font-medium text-white/70 mb-4 tracking-wide uppercase">
                Contact Details
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-400/60" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Email</p>
                    <a href="mailto:hello@anactaai.com" className="text-white/70 hover:text-teal-400 transition-colors">
                      hello@anactaai.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-teal-400/60" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Phone</p>
                    <a href="tel:0479055479" className="text-white/70 hover:text-teal-400 transition-colors">
                      0479 055 479
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal-400/60" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Location</p>
                    <p className="text-white/70">Sydney, Australia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
