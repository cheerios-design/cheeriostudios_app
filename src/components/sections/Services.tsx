'use client';

import { SERVICES } from '@/utils/constants';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import { staggerContainer } from '@/utils/animations';

export default function Services() {
  return (
    <section id="services" className="py-32">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-section text-center mb-16">Our Services</h2>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <ScrollAnimation
              key={service.title}
              delay={index * 0.1}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/70 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-white/60 flex items-start">
                    <span className="text-brand-primary mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
