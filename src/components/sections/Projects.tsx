'use client';

import ScrollAnimation from '@/components/animations/ScrollAnimation';
import ParallaxSection from '@/components/animations/ParallaxSection';

export default function Projects() {
  const projects = [
    {
      title: "Archovia Platform",
      category: "Web Application",
      description: "Revolutionary architecture collaboration platform",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Envanter System",
      category: "Enterprise Solution",
      description: "Comprehensive inventory management system",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Digital Agency Website",
      category: "Corporate Website",
      description: "Modern website with cutting-edge animations",
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <h2 className="text-section text-center mb-16">Featured Projects</h2>
        </ScrollAnimation>
        
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ParallaxSection key={project.title} offset={30}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <ScrollAnimation>
                    <h3 className="text-display mb-4">{project.title}</h3>
                    <p className="text-brand-primary mb-2">{project.category}</p>
                    <p className="text-white/70 mb-6">{project.description}</p>
                    <button className="text-white underline underline-offset-4 hover:text-brand-primary transition-colors">
                      View Case Study →
                    </button>
                  </ScrollAnimation>
                </div>
                <div className="flex-1">
                  <ScrollAnimation>
                    <div className="aspect-[3/2] bg-dark-surface rounded-lg overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
}
