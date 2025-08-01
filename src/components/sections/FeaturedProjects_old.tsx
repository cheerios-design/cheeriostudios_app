"use client";

import Link from "next/link";
import Image from "next/image";
import { FEATURED_PROJECTS } from "@/utils/constants";
import { useStickyNavigation } from "@/hooks/useStickyNavigation";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import FlipText from "@/components/animations/FlipText";

export default function FeaturedProjects() {
  const { activeIndex, setItemRef } = useStickyNavigation(
    FEATURED_PROJECTS.length,
    {
      threshold: 0.6,
      rootMargin: "-10% 0px -40% 0px",
    }
  );
  
  const scrollProgress = useScrollProgress();

  return (
    <section
      id="featured-projects"
      className="py-20 md:py-32 bg-gradient-to-b from-dark-bg to-dark-surface relative"
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Showcasing our most impactful work and innovative solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Sticky Navigation */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              {/* Project Counter */}
              <div className="hidden lg:block mb-12">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl font-bold text-white opacity-20 font-mono">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>
                  <div className="flex flex-col space-y-1">
                    {FEATURED_PROJECTS.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 transition-all duration-500 ${
                          index === activeIndex
                            ? "w-12 bg-brand-primary"
                            : index < activeIndex 
                            ? "w-8 bg-brand-primary/50"
                            : "w-8 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Navigation */}
              <div className="space-y-8">
                {FEATURED_PROJECTS.map((project, index) => (
                  <div
                    key={project.id}
                    className={`transition-all duration-500 cursor-pointer group ${
                      index === activeIndex
                        ? "opacity-100 transform translate-x-0"
                        : "opacity-50 transform translate-x-2 hover:opacity-75"
                    }`}
                    onClick={() => {
                      const projectElement = document.getElementById(`project-${project.id}`);
                      if (projectElement) {
                        projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    <div className="mb-3">
                      <span className="text-sm font-medium text-brand-primary tracking-wide">
                        {project.category}
                      </span>
                    </div>
                    <FlipText isActive={index === activeIndex}>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors duration-300">
                        {project.name}
                      </h3>
                    </FlipText>
                    <Link
                      href={project.caseStudyUrl}
                      className="inline-flex items-center text-white/70 hover:text-brand-primary transition-colors duration-300 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="mr-2">View Case Study</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Scrollable Content */}
          <div className="lg:col-span-8">
            <div className="space-y-32">
              {FEATURED_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  ref={setItemRef(index)}
                  className="min-h-screen flex items-center"
                >
                  <div className="w-full">
                    {/* Mobile Project Title */}
                    <div className="lg:hidden mb-8">
                      <span className="text-sm font-medium text-brand-primary tracking-wide block mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.name}
                      </h3>
                    </div>

                    {/* Project Details */}
                    <div className="mb-8">
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-6">
                        {project.title}
                      </h4>
                      <div className="space-y-4">
                        {project.description.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-lg text-white/80 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h5 className="text-lg font-medium text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Technologies Used
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-brand-primary/30 hover:bg-white/10 transition-all duration-300 group"
                          >
                            <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                            <span className="text-sm text-white/90 font-medium group-hover:text-white transition-colors duration-300">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Image */}
                    <div className="aspect-[16/10] bg-dark-surface rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-brand-primary/30 transition-all duration-500 group">
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Mobile Case Study Link */}
                    <div className="lg:hidden mt-6">
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center text-white/70 hover:text-brand-primary transition-colors duration-300 group"
                      >
                        <span className="mr-2">View Case Study</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
