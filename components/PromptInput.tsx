
import React, { useRef } from 'react';
import { MicIcon, PlusCircleIcon, PlayIcon } from './icons';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Make changes, add new features, ask for anything"
            disabled={isLoading}
            className="w-full bg-zinc-800 border border-zinc-600 rounded-full py-3 pl-12 pr-28 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            aria-label="Prompt input"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-3 text-zinc-400">
            <button className="hover:text-white transition-colors" aria-label="Use microphone">
              <MicIcon className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" aria-hidden="true" />
            <button onClick={handleUploadClick} className="hover:text-white transition-colors" aria-label="Upload file">
              <PlusCircleIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-700 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
            aria-label={isLoading ? "Generating..." : "Submit prompt"}
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : <PlayIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
