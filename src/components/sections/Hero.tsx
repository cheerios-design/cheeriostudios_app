"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import ScrollAnimation from "@/components/animations/ScrollAnimation";
import ThreeWave from "@/components/animations/ThreeWave";
import BlurText from "@/components/animations/BlurText";
import AuroraGradientText from "@/components/animations/AuroraGradientText";
import ClientOnly from "@/components/layout/ClientOnly";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen my-5 flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Wave Background */}
      <ClientOnly>
        <ThreeWave />
      </ClientOnly>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center flex flex-col items-center justify-center"
        >
          <h1 className="text-hero font-display mb-6 text-center flex flex-col items-center">
            <BlurText
              text="Where Digital"
              animateBy="words"
              direction="top"
              delay={0.3}
            />
            <AuroraGradientText className="pt-4">
              <BlurText
                text="Dreams Take Flight"
                animateBy="words"
                direction="top"
                delay={0.5}
              />
            </AuroraGradientText>
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
