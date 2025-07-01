This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Cheerio Studios Website

A cutting-edge digital agency website built with Next.js 14+, TypeScript, Tailwind CSS v4.1, and Framer Motion. This project showcases modern web development techniques including scroll-based animations, parallax effects, and responsive design.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4.1
- **Animations:** Framer Motion 11+
- **Smooth Scrolling:** Lenis
- **Other Tools:** React Intersection Observer, clsx

## 📦 Installation

1. Clone the repository (when available):

```bash
git clone https://github.com/yourusername/cheeriostudios_app.git
cd cheeriostudios_app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles with Tailwind v4.1
├── components/
│   ├── layout/            # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScroll.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Typography.tsx
│   └── animations/       # Animation components
│       ├── ScrollAnimation.tsx
│       ├── ParallaxSection.tsx
│       └── TextReveal.tsx
├── hooks/                # Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useWindowSize.ts
│   └── useIntersection.ts
└── utils/               # Utility functions
    ├── animations.ts    # Animation variants
    └── constants.ts     # App constants
```

## 🎨 Design System

### Colors

- **Primary:** #FF6B6B
- **Secondary:** #4ECDC4
- **Accent:** #FFE66D
- **Dark Background:** #000000
- **Dark Surface:** #1a1a1a

### Typography

- **Font Family:** Inter
- **Hero Text:** clamp(3rem, 10vw, 8rem)
- **Section Text:** clamp(2rem, 6vw, 4rem)
- **Display Text:** clamp(1.5rem, 4vw, 2.5rem)

### Animations

- Scroll-triggered fade-ins
- Parallax sections
- Text reveal effects
- Smooth page transitions

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Code Style

This project uses:

- ESLint for code linting
- Prettier for code formatting (recommended)
- TypeScript for type safety

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy with default settings

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Cheerio Studios.

## 👤 Author

**Sam Daramroei**

- Founder, Cheerio Studios
- Software Development Specialist
- Certified in Design Masterclass & Web Programming

## 🙏 Acknowledgments

- Built with inspiration from modern web design trends
- Special thanks to the Next.js and Framer Motion communities

---

**Cheerio Studios** - _Where Digital Dreams Take Flight_ 🚀
