"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlipTextProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

export default function FlipText({
  children,
  isActive = true,
  className = "",
}: FlipTextProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ rotateX: 0, opacity: 1 }}
        animate={{
          rotateX: isActive ? 0 : 5,
          opacity: isActive ? 1 : 0.7,
          scale: isActive ? 1 : 0.98,
        }}
        transition={{
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        style={{
          transformOrigin: "center",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
