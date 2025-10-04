
import React from 'react';
import { ArrowLeftIcon, LaptopIcon, RocketIcon } from './icons';

interface HomePageProps {
  onSelectAppBuilder: () => void;
  onGoBack: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectAppBuilder, onGoBack }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-zinc-900 text-white relative">
      <header className="px-8 py-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center space-x-4">
            <button onClick={onGoBack} className="p-2 rounded-full hover:bg-zinc-800 transition-colors" aria-label="Go back">
                <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">
              Code Cloud<span className="text-xl align-top">☁️</span>
            </h1>
        </div>
        <nav className="flex items-center space-x-6 text-zinc-300">
          <button className="hover:text-white transition-colors">Profile Management</button>
          <button className="hover:text-white transition-colors">Settings</button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Welcome!</h2>
          <p className="text-zinc-400">Choose a tool to get started.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Tool 1 */}
          <button
            onClick={onSelectAppBuilder}
            className="group bg-zinc-800 p-8 rounded-lg border border-zinc-700 hover:border-orange-500 hover:bg-zinc-800/50 transition-all duration-300 text-left"
            aria-label="Code Apps with Cloud"
          >
            <div className="flex items-center mb-4">
              <RocketIcon className="w-8 h-8 text-orange-500 mr-4" />
              <h3 className="text-2xl font-semibold">Code Apps with Cloud☁️</h3>
            </div>
            <p className="text-zinc-400">
              Use our AI-powered assistant to build, modify, and deploy web applications from a simple prompt.
            </p>
          </button>

          {/* Tool 2 */}
          <div className="group bg-zinc-800 p-8 rounded-lg border border-zinc-700 relative overflow-hidden opacity-60 cursor-not-allowed">
             <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Coming Soon</span>
            <div className="flex items-center mb-4">
               <LaptopIcon className="w-8 h-8 text-zinc-500 mr-4" />
               <h3 className="text-2xl font-semibold text-zinc-500">Code website with Cloud☁️</h3>
            </div>
            <p className="text-zinc-500">
              Generate beautiful, responsive static websites and landing pages in seconds. Perfect for portfolios.
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full text-center py-4 text-zinc-500 text-sm">
        MADE WITH ♥ BY creator.saurav
      </footer>
    </div>
  );
};

export default HomePage;