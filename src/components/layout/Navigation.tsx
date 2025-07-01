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
