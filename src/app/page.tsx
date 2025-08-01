import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
