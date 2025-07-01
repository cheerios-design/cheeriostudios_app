#!/bin/bash

# Cheerio Studios Project Setup Script
# This script sets up the complete project structure for the Next.js App Router

echo "🚀 Setting up Cheerio Studios project structure..."

# Create component directories
echo "📁 Creating component directories..."
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/components/animations

# Create hooks directory
echo "🪝 Creating hooks directory..."
mkdir -p src/hooks

# Create utils directory
echo "🛠️ Creating utils directory..."
mkdir -p src/utils

# Create layout components
echo "📐 Creating layout components..."
cat > src/components/layout/Navigation.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAVIGATION_LINKS } from '@/utils/constants';

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [background, setBackground] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setHidden(latest > previous && latest > 150);
    setBackground(latest > 50);
  });

  return (
    <motion.header
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      animate={{ 
        y: hidden ? -100 : 0,
        backgroundColor: background ? 'rgba(0,0,0,0.8)' : 'transparent',
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          Cheerio Studios
        </div>
        <ul className="hidden md:flex space-x-8">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-white">
          Menu
        </button>
      </nav>
    </motion.header>
  );
}
EOF

cat > src/components/layout/Footer.tsx << 'EOF'
'use client';

import { COMPANY_INFO } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-dark-surface py-16 mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-white/60 mb-4">{COMPANY_INFO.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-white/60">{COMPANY_INFO.email}</p>
            <p className="text-white/60">{COMPANY_INFO.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {Object.entries(COMPANY_INFO.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  className="text-white/60 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
EOF

# Create section components
echo "🎨 Creating section components..."
cat > src/components/sections/Hero.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, textReveal } from '@/utils/animations';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-hero font-display mb-6">
            Where Digital
            <span className="block text-brand-primary">Dreams Take Flight</span>
          </h1>
          
          <ScrollAnimation>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
              We transform ambitious ideas into extraordinary online experiences 
              that captivate audiences and drive results.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-brand-primary text-white px-8 py-4 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </div>
          </ScrollAnimation>
        </motion.div>
      </div>
    </section>
  );
}
EOF

cat > src/components/sections/Services.tsx << 'EOF'
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
EOF

cat > src/components/sections/Projects.tsx << 'EOF'
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
EOF

cat > src/components/sections/Contact.tsx << 'EOF'
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
EOF

# Create UI components
echo "🎯 Creating UI components..."
cat > src/components/ui/Button.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-200';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
    secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90',
    outline: 'border border-white/20 text-white hover:bg-white/10'
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <motion.button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
EOF

cat > src/components/ui/Card.tsx << 'EOF'
'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export default function Card({ children, className, glass = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl p-8',
        glass ? 'glass' : 'bg-dark-surface',
        className
      )}
    >
      {children}
    </div>
  );
}
EOF

cat > src/components/ui/Typography.tsx << 'EOF'
'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface TypographyProps {
  children: ReactNode;
  variant?: 'hero' | 'section' | 'display' | 'body' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Typography({
  children,
  variant = 'body',
  className,
  as
}: TypographyProps) {
  const variants = {
    hero: 'text-hero',
    section: 'text-section',
    display: 'text-display',
    body: 'text-base md:text-lg',
    caption: 'text-sm text-white/60'
  };

  const Component = as || 'p';

  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
}
EOF

# Create animation components
echo "✨ Creating remaining animation components..."
cat > src/components/animations/TextReveal.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const variants = {
    hidden: { 
      opacity: 0,
      y: '100%'
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
EOF

# Create hooks
echo "🪝 Creating custom hooks..."
cat > src/hooks/useScrollProgress.ts << 'EOF'
'use client';

import { useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return progress;
}
EOF

cat > src/hooks/useWindowSize.ts << 'EOF'
'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
EOF

cat > src/hooks/useIntersection.ts << 'EOF'
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersection(options: UseIntersectionOptions = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [options.threshold, options.root, options.rootMargin]);

  return { targetRef, isIntersecting };
}
EOF

# Create the main page
echo "📄 Creating main page..."
cat > src/app/page.tsx << 'EOF'
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
EOF

# Make the script executable
chmod +x setup-project.sh

echo "✅ Project structure created successfully!"
echo "📝 Don't forget to:"
echo "   1. Run 'npm install' to install dependencies"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Initialize git with 'git init'"
echo "   4. Add the .gitignore file"
echo ""
echo "🚀 Happy coding!"