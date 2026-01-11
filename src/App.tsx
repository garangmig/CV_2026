import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Network } from './components/Network';
import { Credentials } from './components/Credentials';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CameraOverlay } from './components/CameraOverlay';
import { siteConfig } from './data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sliderRef.current || !componentRef.current) return;

      // Main horizontal scroll animation
      gsap.to(sliderRef.current, {
        // Use a function for 'x' so it recalculates on resize (invalidateOnRefresh)
        x: () => -(sliderRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1.5,
          snap: 1 / 3,
          start: "top top",
          // Similarly, end calculation should be dynamic
          end: () => "+=" + (sliderRef.current!.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(Math.round(self.progress * 100));
            const newIndex = Math.round(self.progress * 3);
            setActiveSection(newIndex);
          },
        }
      });
    }, componentRef);

    // Initial refresh to ensure dimensions are caught
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const getHeaderUpdates = () => {
    switch (activeSection) {
      case 0: return siteConfig.sections.hero;
      case 1: return siteConfig.sections.portfolio;
      case 2: return siteConfig.sections.network;
      case 3: return siteConfig.sections.credentials;
      default: return siteConfig.sections.hero;
    }
  };

  const { title, subtitle } = getHeaderUpdates();

  return (
    <div ref={componentRef} className="relative w-full h-screen bg-background-dark text-white font-display antialiased">

      {/* CAPA 03: BACKGROUND_GRID (Z-index: 0) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundGrid opacityGrid={15} opacityCross={5} />
      </div>

      {/* CAPA 02: WORLD_SPACE (Z-index: 10) */}
      <div
        ref={sliderRef}
        id="world-content"
        className="relative z-10 flex flex-row w-[400vw] h-full"
      >
        <section className="w-screen h-screen flex-shrink-0">
          <Hero />
        </section>
        <section className="w-screen h-screen flex-shrink-0">
          <Portfolio />
        </section>
        <section className="w-screen h-screen flex-shrink-0">
          <Network />
        </section>
        <section className="w-screen h-screen flex-shrink-0">
          <Credentials />
        </section>
      </div>

      {/* CAPA 01: HUD_LAYER (Z-index: 50) */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
        <div className="pointer-events-auto">
          <Header
            title={title}
            subtitle={subtitle}
            activeIndex={activeSection}
            coords={`TRAV: ${progress}% // LOC_X: ${(progress * 3.6).toFixed(2)}°`}
          />
        </div>

        <CameraOverlay />

        <div className="pointer-events-auto">
          <Footer status={true} />
        </div>
      </div>

    </div>
  );
}

export default App;
