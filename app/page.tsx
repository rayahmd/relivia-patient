import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CtaSection from "@/components/landing/cta-section";
import Footer from "@/components/landing/footer";

import PageTransition from "@/components/motion/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </PageTransition>
  );
}