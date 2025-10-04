
import React, { useState } from 'react';
import AppBuilder from './components/AppBuilder';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [page, setPage] = useState<'landing' | 'home' | 'appBuilder'>('landing');

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage onGetStarted={() => setPage('home')} />;
      case 'home':
        return <HomePage onSelectAppBuilder={() => setPage('appBuilder')} onGoBack={() => setPage('landing')} />;
      case 'appBuilder':
        return <AppBuilder onGoHome={() => setPage('home')} />;
      default:
        return <LandingPage onGetStarted={() => setPage('home')} />;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-gray-300 font-sans">
      {renderPage()}
    </div>
  );
};

export default App;