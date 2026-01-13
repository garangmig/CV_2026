import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Network } from './components/Network';
import { Credentials } from './components/Credentials';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CameraOverlay } from './components/CameraOverlay';
import { siteConfig } from './data/siteConfig';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [latY, setLatY] = useState(0);
  const [vOffset, setVOffset] = useState(0);
  const [nOffset, setNOffset] = useState(0);

  const activeSectionRef = useRef(0);
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);

  // Measure section heights to create the extended L-shaped path
  useLayoutEffect(() => {
    const calculateOffsets = () => {
      const portfolioEl = document.querySelector('#portfolio-section');
      const networkEl = document.querySelector('#network-section');

      if (portfolioEl) {
        const pHeight = portfolioEl.scrollHeight - window.innerHeight;
        setVOffset(pHeight > 0 ? pHeight : 0);
      }

      if (networkEl) {
        const nHeight = networkEl.scrollHeight - window.innerHeight;
        setNOffset(nHeight > 0 ? nHeight : 0);
      }
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);

    const timer = setTimeout(calculateOffsets, 600);

    return () => {
      window.removeEventListener('resize', calculateOffsets);
      clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sliderRef.current || !componentRef.current) return;

      const totalDist = window.innerWidth * 3 + vOffset + nOffset;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 0.3, // Much more responsive to input
          start: "top top",
          end: () => "+=" + totalDist,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setProgress(Math.round(p * 100));

            const currentPx = p * totalDist;
            const w = window.innerWidth;

            // 1. Determine active section (Distance-based thresholds)
            let newSection = 0;
            if (currentPx < w * 0.5) {
              newSection = 0; // Hero
            } else if (currentPx < w * 1.5 + vOffset) {
              newSection = 1; // Portfolio
            } else if (currentPx < w * 2.5 + vOffset + nOffset) {
              newSection = 2; // Network
            } else {
              newSection = 3; // Credentials
            }

            if (newSection !== activeSectionRef.current) {
              activeSectionRef.current = newSection;
              setActiveSection(newSection);
            }

            // 2. Real-time latY calculation (HUD telemetry)
            if (currentPx > w && currentPx < w + vOffset) {
              // Inside Portfolio scan
              setLatY((Math.abs(currentPx - w) / (vOffset || 1)) * 90);
            } else if (currentPx > w * 2 + vOffset && currentPx < w * 2 + vOffset + nOffset) {
              // Inside Network scan
              setLatY((Math.abs(currentPx - (w * 2 + vOffset)) / (nOffset || 1)) * 90);
            } else {
              setLatY(0);
            }
          },
        }
      });

      mainTimeline.current = tl;

      // THE DISTANCE-ACCURATE L-PATH
      tl.addLabel("hero")
        // 1. Hero -> Portfolio
        .to(sliderRef.current, {
          x: () => -window.innerWidth,
          duration: window.innerWidth,
          ease: "none",
        })
        .addLabel("portfolio")

        // 2. Portfolio Scan
        .to(sliderRef.current, {
          y: () => -vOffset,
          duration: vOffset,
          ease: "none",
        })
        .addLabel("portfolio-bottom")

        // 3. Portfolio -> Network
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 2,
          duration: window.innerWidth,
          ease: "none",
        })
        .addLabel("network")

        // 4. Network Scan
        .to(sliderRef.current, {
          y: () => -(vOffset + nOffset),
          duration: nOffset,
          ease: "none",
        }, "<")
        // Mirror the skills panel pin
        .to("#skills-panel", {
          y: () => window.innerWidth >= 768 ? nOffset : 0,
          duration: nOffset,
          ease: "none",
        }, "<")
        .addLabel("network-bottom")

        // 5. Network -> Credentials
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 3,
          duration: window.innerWidth,
          ease: "none",
        })
        .addLabel("credentials");

    }, componentRef);

    return () => ctx.revert();
  }, [vOffset, nOffset]);

  const scrollToSection = (index: number) => {
    const labels = ["hero", "portfolio", "network", "credentials"];
    const label = labels[index];

    if (mainTimeline.current && mainTimeline.current.scrollTrigger) {
      const scrollPos = mainTimeline.current.scrollTrigger.labelToScroll(label);
      gsap.to(window, {
        duration: 2,
        scrollTo: scrollPos,
        ease: "power3.inOut"
      });
    }
  };

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

      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundGrid opacityGrid={15} opacityCross={5} />
      </div>

      <div
        ref={sliderRef}
        id="world-content"
        className="relative z-10 flex flex-row w-[400vw]"
      >
        {/* HERO */}
        <section className="w-screen h-screen flex-shrink-0">
          <Hero />
        </section>

        {/* PORTFOLIO: Expands vertically */}
        <section className="w-screen flex-shrink-0">
          <Portfolio />
        </section>

        {/* NETWORK: Expands vertically, offset by Portfolio's scan */}
        <section
          className="w-screen flex-shrink-0"
          style={{ transform: `translateY(${vOffset}px)` }}
        >
          <Network />
        </section>

        {/* CREDENTIALS: Offset by both Portfolio and Network scans */}
        <section
          className="w-screen h-screen flex-shrink-0"
          style={{ transform: `translateY(${vOffset + nOffset}px)` }}
        >
          <Credentials />
        </section>
      </div>

      {/* HUD LAYER */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
        <div className="pointer-events-auto">
          <Header
            title={title}
            subtitle={subtitle}
            activeIndex={activeSection}
            coords={`TRAV: ${progress}% // LOC_X: ${(progress * 3.6).toFixed(2)}° // LAT_Y: ${latY.toFixed(2)}°`}
            onSectionClick={scrollToSection}
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
