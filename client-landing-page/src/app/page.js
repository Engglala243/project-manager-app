import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ClientsSection from "./components/ClientsSection";
import ContactSection from "./components/ContactSection";
import NewsletterSection from "./components/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <ClientsSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  );
}
