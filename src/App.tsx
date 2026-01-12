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
  const [latY, setLatY] = useState(0);
  const [vOffset, setVOffset] = useState(0);
  const [nOffset, setNOffset] = useState(0);
  const [currentScanY, setCurrentScanY] = useState(0);

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

      const totalVOffset = vOffset + nOffset;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => "+=" + (window.innerWidth * 5 + totalVOffset),
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
        }
      });

      // THE EXTENDED L-PATH
      tl.addLabel("hero")
        // 1. Move to Portfolio (X)
        .to(sliderRef.current, {
          x: () => -window.innerWidth,
          duration: 2,
          ease: "power2.inOut",
          onStart: () => setActiveSection(1),
          onReverseComplete: () => setActiveSection(0)
        })
        .addLabel("portfolio-top")

        // 2. Scan down Portfolio (Y)
        .to(sliderRef.current, {
          y: () => -vOffset,
          duration: 3,
          ease: "none",
          onUpdate: function () {
            const currentY = gsap.getProperty(sliderRef.current, "y") as number;
            // LatY relative to first scan
            if (activeSection === 1) {
              setLatY(Math.abs((currentY / (vOffset || 1)) * 90));
            }
          }
        })
        .addLabel("portfolio-bottom")

        // 3. Transition to Network (X)
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 2,
          duration: 2,
          ease: "power2.inOut",
          onStart: () => {
            setActiveSection(2);
            setCurrentScanY(0);
          },
          onReverseComplete: () => setActiveSection(1)
        })
        .addLabel("network-top")

        // 4. Scan down Network (Y) - Adding nOffset to the world's Y
        .to(sliderRef.current, {
          y: () => -(vOffset + nOffset),
          duration: 3,
          ease: "none",
          onUpdate: function () {
            const currentY = gsap.getProperty(sliderRef.current, "y") as number;
            const absY = Math.abs(currentY);

            if (activeSection === 2) {
              const localY = absY - vOffset;
              setCurrentScanY(localY);
              const netProgress = localY / (nOffset || 1);
              setLatY(netProgress * 90);
            }
          }
        })
        .addLabel("network-bottom")

        // 5. Final transition to Credentials (X)
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 3,
          duration: 2,
          ease: "power2.inOut",
          onStart: () => {
            setActiveSection(3);
            setLatY(0);
          },
          onReverseComplete: () => setActiveSection(2)
        })
        .addLabel("credentials");

    }, componentRef);

    return () => ctx.revert();
  }, [vOffset, nOffset]);

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
          <Network yOffset={currentScanY} />
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
