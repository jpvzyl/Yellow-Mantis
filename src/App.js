import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
