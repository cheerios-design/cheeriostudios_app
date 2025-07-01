'use client';

import ScrollAnimation from '@/components/animations/ScrollAnimation';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-section text-center mb-16">Let's Create Together</h2>
        </ScrollAnimation>
        
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <div className="glass p-12 rounded-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="project" className="block text-sm font-medium mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="project"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 rounded-full font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
