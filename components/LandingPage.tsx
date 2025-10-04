import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white relative">
      <div className="text-center animate-fade-in-scale">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          Code Cloud<span className="text-4xl md:text-6xl align-top">☁️</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-8">Build and modify web apps with the power of AI.</p>
        <button
          onClick={onGetStarted}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
          aria-label="Get Started"
        >
          Get Started
        </button>
      </div>
      <footer className="absolute bottom-4 text-zinc-500 text-sm">
        MADE WITH ♥ BY creator.saurav
      </footer>
      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;