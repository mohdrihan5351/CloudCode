
import React from 'react';
import { AiResponse } from '../types';
import { CheckCircleIcon, ChevronDownIcon } from './icons';

interface ThoughtProcessProps {
  response: AiResponse;
}

const ThoughtProcess: React.FC<ThoughtProcessProps> = ({ response }) => {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm text-gray-300 w-full h-full p-6 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between text-sm text-zinc-400 border-b border-zinc-700 pb-2 mb-6">
          <span>Thought for 13 seconds</span>
          <button>
            <ChevronDownIcon className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">Plan & Execution</h2>
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white mb-8">
            <p>{response.thought}</p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">Files to be created</h3>
        <div className="space-y-3">
          {response.fileList.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
              <span className="font-mono text-sm">{file}</span>
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThoughtProcess;
