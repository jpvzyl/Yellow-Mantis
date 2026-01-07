import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroductionLetter from './pages/IntroductionLetter';
import PitchDeck from './pages/PitchDeck';
import FullFeatures from './pages/FullFeatures';
import FundingRequirements from './pages/FundingRequirements';
import QuantumForInvestors from './pages/QuantumForInvestors';
import CompanyStructure from './pages/CompanyStructure';
import Organogram from './pages/Organogram';

// Unique structure IDs (5-character random strings)
const STRUCTURE_IDS = ['7x3k9', 'm4p2n', 'q8f5t'];

function App() {
  const location = useLocation();
  
  // Hide header/footer for standalone pages
  const isStandalonePage = 
    location.pathname === '/funding' ||
    location.pathname.startsWith('/structure/') ||
    location.pathname.startsWith('/organogram/');

  return (
    <div className="app">
      {!isStandalonePage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/introduction-letter" replace />} />
          <Route path="/introduction-letter" element={<IntroductionLetter />} />
          <Route path="/pitch-deck" element={<PitchDeck />} />
          <Route path="/full-features" element={<FullFeatures />} />
          <Route path="/funding" element={<FundingRequirements />} />
          <Route path="/quantum-guide" element={<QuantumForInvestors />} />
          
          {/* Company Structure Pages - 3 unique URLs */}
          <Route path="/structure/7x3k9" element={<CompanyStructure structureId="7x3k9" />} />
          <Route path="/structure/m4p2n" element={<CompanyStructure structureId="m4p2n" />} />
          <Route path="/structure/q8f5t" element={<CompanyStructure structureId="q8f5t" />} />
          
          {/* Organogram - SARFAT Holdings Structure */}
          <Route path="/organogram/sarfat" element={<Organogram />} />
        </Routes>
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
}

export default App;
