// src/components/animations/ScrollAnimation.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export default function ScrollAnimation({
  children,
  variants,
  className = "",
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: ScrollAnimationProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
