import { useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Network } from './components/Network';
import { Credentials } from './components/Credentials';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CameraOverlay } from './components/CameraOverlay';
import { useMouseCoordinates } from './hooks/useMouseCoordinates';

function App() {
  const location = useLocation();
  const coords = useMouseCoordinates();

  // Mapping routes to content for the HUD (Header)
  const getSectionInfo = () => {
    switch (location.pathname) {
      case '/':
        return { index: 0, title: "MISSION_PROFILE", subtitle: "SYSTEM_ENTRY" };
      case '/portfolio':
        return { index: 1, title: "PROJECT_ARCHIVE", subtitle: "DEPLOYMENTS" };
      case '/network':
        return { index: 2, title: "SIGNAL_GRID", subtitle: "CORE_SKILLS" };
      case '/credentials':
        return { index: 3, title: "VERIFICATION", subtitle: "CERT_VAULT" };
      default:
        return { index: 0, title: "MISSION_PROFILE", subtitle: "SYSTEM_ENTRY" };
    }
  };

  const { index, title, subtitle } = getSectionInfo();

  // Calculate the horizontal offset based on the current active index
  const translateX = -(index * 100);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background-dark text-white font-display antialiased">

      {/* CAPA 03: BACKGROUND_GRID (Z-index: 0) */}
      <div className="absolute inset-0 z-0">
        <BackgroundGrid opacityGrid={15} opacityCross={5} />
      </div>

      {/* CAPA 02: WORLD_SPACE (Z-index: 10) */}
      <div
        className="world-content relative z-10 flex flex-row w-full h-full transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(${translateX}vw)` }}
      >
        <section id="hero" className="w-screen h-screen flex-shrink-0">
          <Hero />
        </section>
        <section id="portfolio" className="w-screen h-screen flex-shrink-0">
          <Portfolio />
        </section>
        <section id="network" className="w-screen h-screen flex-shrink-0">
          <Network />
        </section>
        <section id="credentials" className="w-screen h-screen flex-shrink-0">
          <Credentials />
        </section>
      </div>

      {/* CAPA 01: HUD_LAYER (Z-index: 50) */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
        {/* Top HUD Element */}
        <div className="pointer-events-auto">
          <Header
            title={title}
            subtitle={subtitle}
            activeIndex={index}
            coords={coords}
          />
        </div>

        {/* Center Focus Elements */}
        <CameraOverlay />

        {/* Bottom HUD Element */}
        <div className="pointer-events-auto">
          <Footer status={true} />
        </div>
      </div>

    </div>
  );
}

export default App;
