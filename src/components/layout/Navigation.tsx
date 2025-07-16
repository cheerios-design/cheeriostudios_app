"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { NAVIGATION_LINKS } from "@/utils/constants";
import Image from "next/image";
import clsx from "clsx";

export default function Navigation() {
  const [background, setBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setBackground(latest > 50);
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className={clsx(
          "fixed top-0 w-full z-50 transition-all duration-500",
          background ? "backdrop-blur-xl" : ""
        )}
        style={{
          backgroundColor: background ? "rgba(0, 0, 0, 0.4)" : "transparent",
        }}
      >
        <nav className="container mx-auto">
          <div className="flex items-center justify-between px-6 lg:px-12 py-6">
            {/* Logo + Navigation Links Group - Left Side with Background */}
            <div className="flex items-center space-x-8 lg:space-x-12 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              {/* Logo */}
              <motion.a
                href="/"
                className="relative z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/sticker-dark.svg"
                  alt="Cheerio Studios Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </motion.a>

              {/* Desktop Navigation Links */}
              <ul className="hidden lg:flex items-center space-x-8">
                {NAVIGATION_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="relative text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-300" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Standalone CTA Button - Fixed Position */}
      <motion.a
        href="#contact"
        className="fixed top-6 right-6 lg:right-12 z-50 inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: NAVIGATION_LINKS.length * 0.1,
        }}
      >
        Get Started
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.a>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-40 flex items-center justify-center lg:hidden"
            >
              <nav className="text-center">
                <ul className="space-y-8">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-3xl font-medium text-white hover:text-brand-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: NAVIGATION_LINKS.length * 0.1,
                    }}
                  >
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-brand-primary rounded-full hover:bg-brand-primary/90 transition-all duration-300 mt-4"
                    >
                      Get Started
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
