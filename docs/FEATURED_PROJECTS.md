# Featured Projects Section

## Overview

The Featured Projects section is a sophisticated showcase component that displays project information with a sticky navigation layout. It features:

- **Left Side (Sticky)**: Project navigation with names and case study links
- **Right Side (Scrollable)**: Detailed project information, descriptions, and technologies
- **Smooth Transitions**: Flip animations and visual feedback as users scroll through projects
- **Interactive Elements**: Clickable navigation, hover effects, and scroll progress indicators

## Features

### Sticky Navigation

- Project counter with progress indicators
- Animated project names with flip transitions
- Direct links to case studies
- Visual active state feedback

### Project Details

- Rich descriptions and project information
- Technology badges with hover effects
- High-quality project images with parallax effects
- Mobile-responsive layout

### Scroll Behavior

- Continuous scrolling on the right side
- Left side sticks until previous project details are complete
- Smooth transitions between project states
- Global scroll progress indicator

## Data Structure

Projects are defined in `src/utils/constants.ts` as `FEATURED_PROJECTS`:

```typescript
{
  id: "unique-project-id",
  name: "Project Name",
  category: "INTUITIVE|SCALABLE|SEAMLESS",
  title: "Short Project Title",
  description: ["Paragraph 1", "Paragraph 2"],
  technologies: ["React", "Next.js", "TypeScript"],
  caseStudyUrl: "/case-studies/project-name",
  thumbnail: "/projects/project/image.webp"
}
```

## Customization

### Animation Timing

Modify transition durations in the component:

- Flip transitions: `duration-500`
- Hover effects: `duration-300`
- Image scale: `duration-700`

### Intersection Observer Settings

Adjust scroll trigger sensitivity in `useStickyNavigation`:

- `threshold`: How much of element must be visible (0.6 = 60%)
- `rootMargin`: Offset from viewport edges

### Visual Styling

- Colors use design tokens from `globals.css`
- Responsive breakpoints follow Tailwind conventions
- Glass morphism effects with backdrop blur

## Usage

```tsx
import FeaturedProjects from "@/components/sections/FeaturedProjects";

export default function Page() {
  return (
    <main>
      <FeaturedProjects />
    </main>
  );
}
```

The component is fully self-contained and automatically handles:

- Intersection observation for scroll tracking
- Responsive layout adjustments
- Animation state management
- Navigation interactions
