// src/utils/constants.ts
export const COMPANY_INFO = {
  name: "Cheerio Studios",
  tagline: "Where Digital Dreams Take Flight",
  email: "sam.d@cheeriostudios.com",
  phone: "+90 544 696 14 15",
  address: "Digital Innovation Hub, Tech Valley",
  social: {
    website: "https://cheeriostudios.com",
    linkedin: "https://linkedin.com/company/cheeriostudis",
    instagram: "https://instagram.com/cheerio.studio",
    github: "https://github.com/cheerios-design",
  },
};

export const NAVIGATION_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#featured-projects" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    title: "Strategic Brand Development",
    description:
      "Build a brand that resonates and endures in the digital landscape.",
    features: [
      "Brand identity creation",
      "Logo design & visual systems",
      "Brand voice & messaging",
      "Competitive analysis",
    ],
  },
  {
    title: "Web Design & Development",
    description:
      "Custom websites that captivate visitors and drive conversions.",
    features: [
      "UI/UX design",
      "Responsive development",
      "E-commerce solutions",
      "Performance optimization",
    ],
  },
  {
    title: "Digital Marketing Ecosystem",
    description: "Comprehensive strategies to grow your online presence.",
    features: [
      "Social media management",
      "Content creation",
      "SEO optimization",
      "Analytics & reporting",
    ],
  },
  {
    title: "Consulting & Strategy",
    description:
      "Expert guidance to navigate the digital transformation journey.",
    features: [
      "Digital roadmaps",
      "Technology recommendations",
      "UX audits",
      "Growth strategies",
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "archovia",
    name: "Archovia Platform",
    category: "INTUITIVE",
    title: "Architecture Collaboration",
    description: [
      "Revolutionary platform that transforms how architects collaborate and manage projects in the digital age.",
      "Built with cutting-edge technology to provide seamless workflow integration and real-time project visualization.",
    ],
    technologies: [
      "React & Next.js",
      "TypeScript",
      "Three.js",
      "WebGL",
      "Node.js",
      "PostgreSQL",
    ],
    caseStudyUrl: "/case-studies/archovia",
    thumbnail: "/projects/archovia/proj.thmbnl-archovia.webp",
  },
  {
    id: "envanter",
    name: "Envanter System",
    category: "SCALABLE",
    title: "Enterprise Inventory",
    description: [
      "Comprehensive inventory management system designed for enterprise-level operations and scalability.",
      "Advanced analytics and real-time tracking capabilities that streamline business operations and reduce costs.",
    ],
    technologies: ["Vue.js", "Python", "Django", "Redis", "Docker", "MySQL"],
    caseStudyUrl: "/case-studies/envanter",
    thumbnail: "/projects/envanter/proj.thmbnl-envanter.webp",
  },
  {
    id: "brandflow",
    name: "BrandFlow Studio",
    category: "SEAMLESS",
    title: "Brand Management",
    description: [
      "Digital brand management platform that unifies creative workflows and brand consistency across teams.",
      "Intuitive design system management with collaborative features for distributed creative teams.",
    ],
    technologies: ["React", "GraphQL", "Apollo", "Figma API", "AWS", "MongoDB"],
    caseStudyUrl: "/case-studies/brandflow",
    thumbnail: "/projects/archovia/proj.thmbnl-archovia.png",
  },
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
