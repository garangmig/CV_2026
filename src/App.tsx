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
import { ProjectModal } from './components/ProjectModal';
import { siteConfig } from './data/siteConfig';
import type { Project } from './types/project';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
ScrollTrigger.config({ ignoreMobileResize: false });
ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeSectionRef = useRef(0);
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure section heights to create the extended L-shaped path
  useLayoutEffect(() => {

    const calculateOffsets = () => {
      // Force refresh before measuring to ensure GSAP releases pins temporarily if needed
      // ScrollTrigger.refresh(); // Optional: can be heavy, rely on the final refresh

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

    const handleResize = () => {
      // Immediate calculation for responsiveness
      calculateOffsets();

      // Debounced "settle" calculation to catch post-transition values
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        calculateOffsets();
        ScrollTrigger.refresh();
      }, 600); // 600ms to cover most CSS transitions (usually 500ms)
    };

    // Use ResizeObserver to watch for content size changes that usually happen during resize/reflow
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    calculateOffsets();
    window.addEventListener('resize', handleResize);

    // Observe main sections
    const ids = ['#hero-section', '#portfolio-section', '#network-section', '#credentials-section'];
    ids.forEach(id => {
      const el = document.querySelector(id);
      if (el) resizeObserver.observe(el);
    });

    // Initial refresh sequence
    const initTimer = setTimeout(() => {
      calculateOffsets();
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      clearTimeout(initTimer);
      resizeObserver.disconnect();
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
      const totalDist = hDuration + BREAK_PX + w + BREAK_PX + vDuration + BREAK_PX + w + BREAK_PX + nDuration + BREAK_PX + w + BREAK_PX + cDuration + BREAK_PX;

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

            // Segment start/end points for internal logic
            const d1 = hDuration;
            const d2 = d1 + BREAK_PX;
            const d3 = d2 + w;
            const d4 = d3 + BREAK_PX;
            const d5 = d4 + vDuration;
            const d6 = d5 + BREAK_PX;
            const d7 = d6 + w;
            const d8 = d7 + BREAK_PX;
            const d9 = d8 + nDuration;
            const d10 = d9 + BREAK_PX;
            const d11 = d10 + w;
            const d12 = d11 + BREAK_PX;
            const d13 = d12 + cDuration;

            // 1. Determine active section
            let newSection = 0;
            if (currentPx < (d2 + d3) / 2) newSection = 0; // Hero
            else if (currentPx < (d6 + d7) / 2) newSection = 1; // Portfolio
            else if (currentPx < (d10 + d11) / 2) newSection = 2; // Network
            else newSection = 3; // Credentials

            if (newSection !== activeSectionRef.current) {
              activeSectionRef.current = newSection;
              setActiveSection(newSection);
            }

            // 2. Real-time latY calculation (HUD telemetry)
            if (currentPx < d1) setLatY((currentPx / (hDuration || 1)) * 90);
            else if (currentPx > d4 && currentPx < d5) setLatY((Math.abs(currentPx - d4) / (vDuration || 1)) * 90);
            else if (currentPx > d8 && currentPx < d9) setLatY((Math.abs(currentPx - d8) / (nDuration || 1)) * 90);
            else if (currentPx > d12 && currentPx < d13) setLatY((Math.abs(currentPx - d12) / (cDuration || 1)) * 90);
            else setLatY(0);
          },
        }
      });

      mainTimeline.current = tl;

      // Helper to get live offset
      const getLiveOffset = (id: string) => {
        const el = document.querySelector(id);
        if (!el) return 0;
        const off = el.scrollHeight - window.innerHeight;
        return off > 0 ? off : 0;
      };

      tl.addLabel("hero")
        .to(sliderRef.current, {
          y: () => -getLiveOffset('#hero-section'),
          duration: hDuration,
          ease: "none",
        })
        .addLabel("hero-bottom")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          x: () => -window.innerWidth,
          duration: w,
          ease: "none",
        })
        .addLabel("portfolio")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          y: () => -(getLiveOffset('#hero-section') + getLiveOffset('#portfolio-section')),
          duration: vDuration,
          ease: "none",
        })
        .addLabel("portfolio-bottom")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          x: () => -window.innerWidth * 2,
          duration: w,
          ease: "none",
        })
        .addLabel("network")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          y: () => -(getLiveOffset('#hero-section') + getLiveOffset('#portfolio-section') + getLiveOffset('#network-section')),
          duration: nDuration,
          ease: "none",
        })
        .to("#skills-panel", {
          y: () => {
            const nOff = getLiveOffset('#network-section');
            return window.innerHeight <= 568 ? 0 : nOff;
          },
          duration: nDuration,
          ease: "none",
        }, "<")
        .addLabel("network-bottom")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          x: () => -window.innerWidth * 3,
          duration: w,
          ease: "none",
        })
        .addLabel("credentials")
        .to({}, { duration: BREAK_PX })

        .to(sliderRef.current, {
          y: () => -(getLiveOffset('#hero-section') + getLiveOffset('#portfolio-section') + getLiveOffset('#network-section') + getLiveOffset('#credentials-section')),
          duration: cDuration,
          ease: "none",
        })
        .addLabel("credentials-bottom")
        .to({}, { duration: BREAK_PX });

      // Refresh ScrollTrigger after build to ensure all dimensions are locked in
      ScrollTrigger.refresh();

    }, componentRef);

    return () => ctx.revert();
  }, [hOffset, vOffset, nOffset, cOffset]);

  // Handle ScrollTrigger disabling when modal is open
  useLayoutEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      ScrollTrigger.getAll().forEach(t => t.disable(false));
      ScrollTrigger.normalizeScroll(false);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      ScrollTrigger.getAll().forEach(t => t.enable());
      ScrollTrigger.normalizeScroll({ allowNestedScroll: true });
      ScrollTrigger.refresh();
    }
  }, [isModalOpen]);

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
    <div ref={componentRef} className="relative w-full h-[100dvh] bg-background-dark text-white font-display antialiased">

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
        <section id="hero-section" className="w-screen min-h-[100dvh] h-min flex-shrink-0">
          <Hero />
        </section>

        {/* PORTFOLIO: Expands vertically */}
        <section
          className="w-screen flex-shrink-0"
          style={{ transform: `translateY(${hOffset}px)` }}
        >
          <Portfolio onProjectSelect={(proj) => {
            setSelectedProject(proj);
            setIsModalOpen(true);
          }} />
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
          className="w-screen min-h-[100dvh] h-min flex-shrink-0"
          style={{ transform: `translateY(${hOffset + vOffset + nOffset}px)` }}
        >
          <Credentials />
        </section>
      </div>

      {/* HUD LAYER */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] z-50 pointer-events-none flex flex-col justify-between transition-[height] duration-10 ease-out will-change-[height]">
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

      {/* PROJECT MODAL: Outside transformed containers */}
      {selectedProject && isModalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
        />
      )}

    </div>
  );
}

export default App;
