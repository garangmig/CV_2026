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
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(0);
  const [nOffset, setNOffset] = useState(0);
  const [cOffset, setCOffset] = useState(0);

  const activeSectionRef = useRef(0);
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);

  // Measure section heights to create the extended L-shaped path
  useLayoutEffect(() => {
    const calculateOffsets = () => {
      const heroEl = document.querySelector('#hero-section');
      const portfolioEl = document.querySelector('#portfolio-section');
      const networkEl = document.querySelector('#network-section');
      const credentialsEl = document.querySelector('#credentials-section');

      if (heroEl) {
        const hHeight = heroEl.scrollHeight - window.innerHeight;
        setHOffset(hHeight > 0 ? hHeight : 0);
      }

      if (portfolioEl) {
        const pHeight = portfolioEl.scrollHeight - window.innerHeight;
        setVOffset(pHeight > 0 ? pHeight : 0);
      }

      if (networkEl) {
        const nHeight = networkEl.scrollHeight - window.innerHeight;
        setNOffset(nHeight > 0 ? nHeight : 0);
      }

      if (credentialsEl) {
        const cHeight = credentialsEl.scrollHeight - window.innerHeight;
        setCOffset(cHeight > 0 ? cHeight : 0);
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

      const SCAN_FACTOR = 3;
      const BREAK_PX = 800; // Duration of the "jolting" stop
      const w = 300; //window.innerWidth;
      const hDuration = hOffset;
      const vDuration = vOffset * SCAN_FACTOR;
      const nDuration = nOffset * SCAN_FACTOR;
      const cDuration = cOffset * SCAN_FACTOR;

      // DISTANCE SEGMENTS
      const d1 = hDuration; // Hero Vertical Scan
      const d2 = d1 + BREAK_PX; // Hero Bottom Pause
      const d3 = d2 + w;        // Hero -> Portfolio
      const d4 = d3 + BREAK_PX; // Portfolio Arrival Pause
      const d5 = d4 + vDuration; // Portfolio Vertical Scan
      const d6 = d5 + BREAK_PX; // Portfolio Bottom Pause
      const d7 = d6 + w;         // Portfolio -> Network arrival
      const d8 = d7 + BREAK_PX; // Network Arrival Pause
      const d9 = d8 + nDuration; // Network Vertical Scan
      const d10 = d9 + BREAK_PX; // Network Bottom Pause
      const d11 = d10 + w;         // Network -> Credentials arrival
      const d12 = d11 + BREAK_PX; // Credentials Arrival Pause
      const d13 = d12 + cDuration; // Credentials Vertical Scan
      const d14 = d13 + BREAK_PX; // Credentials Bottom Pause

      const totalDist = d14;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 0.2,
          start: "top top",
          end: () => "+=" + totalDist,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setProgress(Math.round(p * 100));

            const currentPx = p * totalDist;

            // 1. Determine active section (Distance-based thresholds at mid-transitions)
            let newSection = 0;
            if (currentPx < (d2 + d3) / 2) {
              newSection = 0; // Hero
            } else if (currentPx < (d6 + d7) / 2) {
              newSection = 1; // Portfolio
            } else if (currentPx < (d10 + d11) / 2) {
              newSection = 2; // Network
            } else {
              newSection = 3; // Credentials
            }

            if (newSection !== activeSectionRef.current) {
              activeSectionRef.current = newSection;
              setActiveSection(newSection);
            }

            // 2. Real-time latY calculation (HUD telemetry)
            if (currentPx < d1) {
              // Inside Hero scan
              setLatY((currentPx / (hDuration || 1)) * 90);
            } else if (currentPx > d4 && currentPx < d5) {
              // Inside Portfolio scan
              setLatY((Math.abs(currentPx - d4) / (vDuration || 1)) * 90);
            } else if (currentPx > d8 && currentPx < d9) {
              // Inside Network scan
              setLatY((Math.abs(currentPx - d8) / (nDuration || 1)) * 90);
            } else if (currentPx > d12 && currentPx < d13) {
              // Inside Credentials scan
              setLatY((Math.abs(currentPx - d12) / (cDuration || 1)) * 90);
            } else {
              setLatY(0);
            }
          },
        }
      });

      mainTimeline.current = tl;

      // THE DISTANCE-ACCURATE L-PATH WITH JOLTING STOPS
      tl.addLabel("hero")
        // 1. Hero Vertical Scan
        .to(sliderRef.current, {
          y: () => -hOffset,
          duration: hDuration,
          ease: "none",
        })
        .addLabel("hero-bottom")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 2. Hero -> Portfolio
        .to(sliderRef.current, {
          x: () => -window.innerWidth,
          duration: w,
          ease: "none",
        })
        .addLabel("portfolio")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 3. Portfolio Scan
        .to(sliderRef.current, {
          y: () => -(hOffset + vOffset),
          duration: vDuration,
          ease: "none",
        })
        .addLabel("portfolio-bottom")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 4. Portfolio -> Network
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 2,
          duration: w,
          ease: "none",
        })
        .addLabel("network")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 5. Network Scan (Scrolled Service Records)
        .to(sliderRef.current, {
          y: () => -(hOffset + vOffset + nOffset),
          duration: nDuration,
          ease: "none",
        })
        // Counter-animation for Skills Panel: keep it fixed relative to camera
        .to("#skills-panel", {
          y: () => window.innerHeight <= 568 ? 0 : nOffset, // Apply to both mobile and desktop to keep fixed/pinned
          duration: nDuration,
          ease: "none",
        }, "<")
        .addLabel("network-bottom")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 6. Network -> Credentials
        .to(sliderRef.current, {
          x: () => -window.innerWidth * 3,
          duration: w,
          ease: "none",
        })
        .addLabel("credentials")
        .to({}, { duration: BREAK_PX }) // SUDDEN STOP

        // 7. Credentials Scan
        .to(sliderRef.current, {
          y: () => -(hOffset + vOffset + nOffset + cOffset),
          duration: cDuration,
          ease: "none",
        })
        .addLabel("credentials-bottom")
        .to({}, { duration: BREAK_PX }); // FINAL STOP

    }, componentRef);

    return () => ctx.revert();
  }, [hOffset, vOffset, nOffset, cOffset]);

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
        <section id="hero-section" className="w-screen min-h-screen h-min flex-shrink-0">
          <Hero />
        </section>

        {/* PORTFOLIO: Expands vertically */}
        <section
          className="w-screen flex-shrink-0"
          style={{ transform: `translateY(${hOffset}px)` }}
        >
          <Portfolio />
        </section>

        {/* NETWORK: Expands vertically, offset by Portfolio's scan */}
        <section
          className="w-screen flex-shrink-0"
          style={{ transform: `translateY(${hOffset + vOffset}px)` }}
        >
          <Network />
        </section>

        {/* CREDENTIALS: Offset by both Portfolio and Network scans */}
        <section
          id="credentials-section"
          className="w-screen min-h-screen h-min flex-shrink-0"
          style={{ transform: `translateY(${hOffset + vOffset + nOffset}px)` }}
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
