import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroductionLetter from './pages/IntroductionLetter';
import PitchDeck from './pages/PitchDeck';
import FullFeatures from './pages/FullFeatures';
import FundingRequirements from './pages/FundingRequirements';
import QuantumForInvestors from './pages/QuantumForInvestors';

function App() {
  const location = useLocation();
  const isFundingPage = location.pathname === '/funding';

  return (
    <div className="app">
      {!isFundingPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/introduction-letter" replace />} />
          <Route path="/introduction-letter" element={<IntroductionLetter />} />
          <Route path="/pitch-deck" element={<PitchDeck />} />
          <Route path="/full-features" element={<FullFeatures />} />
          <Route path="/funding" element={<FundingRequirements />} />
          <Route path="/quantum-guide" element={<QuantumForInvestors />} />
        </Routes>
      </main>
      {!isFundingPage && <Footer />}
    </div>
  );
}

export default App;
