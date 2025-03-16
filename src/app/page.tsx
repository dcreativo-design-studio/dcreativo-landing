import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Automation from '@/components/sections/Automation';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <Hero />

      <Skills />

      <Process />

      <Projects />

      <Automation />

      <Contact />

      <Footer />
    </main>
  );
}
