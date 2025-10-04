
import React from 'react';
import { CodeIcon, RocketIcon } from './icons';
import { MockComponentType } from '../types';

interface PreviewProps {
  mockComponent: MockComponentType;
}

const InitialState: React.FC = () => (
    <div className="text-center text-zinc-500">
        <RocketIcon className="w-16 h-16 mx-auto mb-4 text-orange-600"/>
        <h2 className="text-2xl font-bold text-zinc-300 mb-2">AI App Builder</h2>
        <p className="max-w-md mx-auto">Describe the application you want to build in the prompt below. You can start with something simple like "a modern login page" or "a personal portfolio website".</p>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="text-center text-zinc-400">
        <div className="w-12 h-12 border-4 border-t-transparent border-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Building your app...</p>
        <p className="text-sm">The AI is thinking and generating the code.</p>
    </div>
);

const MockLogin: React.FC = () => (
    <div className="w-full max-w-sm p-8 space-y-6 bg-zinc-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">Email address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:ring-orange-500 focus:border-orange-500 focus:outline-none"/>
            </div>
            <div>
                <label className="text-sm font-medium text-zinc-400 block mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:ring-orange-500 focus:border-orange-500 focus:outline-none"/>
            </div>
        </div>
        <button className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition-colors">Sign In</button>
    </div>
);

const MockDashboard: React.FC = () => (
     <div className="w-full max-w-4xl p-8 bg-zinc-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 p-6 rounded-md">
                <h3 className="text-lg font-semibold text-white">Active Users</h3>
                <p className="text-4xl font-bold text-orange-500 mt-2">1,234</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-md">
                <h3 className="text-lg font-semibold text-white">Revenue</h3>
                <p className="text-4xl font-bold text-green-500 mt-2">$56,789</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-md">
                <h3 className="text-lg font-semibold text-white">Bounce Rate</h3>
                <p className="text-4xl font-bold text-red-500 mt-2">42%</p>
            </div>
        </div>
    </div>
);


const Preview: React.FC<PreviewProps> = ({ mockComponent }) => {
    const renderContent = () => {
        switch (mockComponent) {
            case 'login': return <MockLogin />;
            case 'dashboard': return <MockDashboard />;
            // Add more cases for other components
            default: return null; // Should not happen if used correctly with other states
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-black">
            {renderContent()}
        </div>
    );
};

export const InitialPreview: React.FC = () => (
     <div className="w-full h-full flex items-center justify-center p-4 bg-black">
        <InitialState />
     </div>
);

export const LoadingPreview: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center p-4 bg-black">
        <LoadingState />
    </div>
);


export default Preview;
