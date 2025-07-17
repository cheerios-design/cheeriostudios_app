"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuroraGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AuroraGradientText({
  children,
  className = "",
}: AuroraGradientTextProps) {
  return (
    <motion.span
      className={`aurora-gradient-text ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}
