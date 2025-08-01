"use client";

import { SERVICES } from "@/utils/constants";
import CurvedLoop from "@/components/ui/CurvedLoop";
import {
  GlowingCards,
  GlowingCard,
} from "@/components/lightswind/glowing-cards";

export default function Services() {
  const glowColors = [
    "#fcb434", // Brand primary
    "#4ecdc4", // Brand secondary
    "#ff6b6b", // Brand accent
    "#fcb434", // Brand primary
  ];

  return (
    <section id="services" className="py-0 md:py-10 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 user-select-none">
          <CurvedLoop
            marqueeText="✦ EVERYTHING ✦ YOU ✦ NEED ✦ AND ✦ MORE ✦"
            speed={1.2}
            curveAmount={120}
            direction="right"
            interactive={false}
            className="text-white text-[5rem] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black curved-loop-custom"
          />
        </div>

        <GlowingCards
          enableGlow={true}
          glowRadius={30}
          glowOpacity={0.8}
          animationDuration={500}
          enableHover={true}
          gap="2rem"
          maxWidth="80rem"
          padding="2rem 1rem"
          backgroundColor="transparent"
          borderRadius="1.5rem"
          responsive={true}
          className="relative"
        >
          {SERVICES.map((service, index) => (
            <GlowingCard
              key={service.title}
              glowColor={glowColors[index % 4]}
              hoverEffect={true}
              className="relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 min-h-[400px]"
            >
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="mb-6">
                  <div
                    className="inline-flex items-center justify-center w-8 h-4 rounded-lg mb-4"
                    style={{ backgroundColor: glowColors[index % 4] }}
                  ></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0"></div>
                      <span className="text-base text-white/90 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowingCard>
          ))}
        </GlowingCards>
      </div>
    </section>
  );
}
