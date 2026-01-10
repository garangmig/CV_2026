import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Network } from './components/Network';
import { Credentials } from './components/Credentials';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden bg-background-dark text-white font-display antialiased">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/network" element={<Network />} />
        <Route path="/credentials" element={<Credentials />} />
      </Routes>
    </div>
  );
}

export default App;
