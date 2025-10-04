
import React, { useState, useEffect } from 'react';
import { SettingsIcon, RefreshCwIcon, SparkleIcon, FileIcon, CheckCircleIcon, ChevronDownIcon } from './icons';
import PromptInput from './PromptInput';
import type { AiResponse } from '../types';

interface SidebarProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    aiResponse: AiResponse | null;
}

interface DisplayedFile {
  name: string;
  status: 'loading' | 'completed';
}

const Sidebar: React.FC<SidebarProps> = ({ prompt, onPromptChange, onSubmit, isLoading, aiResponse }) => {
    const [displayedFiles, setDisplayedFiles] = useState<DisplayedFile[]>([]);
    const [isThoughtExpanded, setIsThoughtExpanded] = useState(false);

    useEffect(() => {
        if (!aiResponse?.fileList) {
            setDisplayedFiles([]);
            return;
        }

        setDisplayedFiles([]);
        const filesToProcess = aiResponse.fileList;
        let timeouts: ReturnType<typeof setTimeout>[] = [];

        const processFile = (index: number) => {
            if (index >= filesToProcess.length) return;
            
            setDisplayedFiles(prev => [...prev, { name: filesToProcess[index], status: 'loading' }]);

            const completionTimeout = setTimeout(() => {
                setDisplayedFiles(prev => {
                    const updatedFiles = [...prev];
                    if (updatedFiles[index]) {
                        updatedFiles[index].status = 'completed';
                    }
                    return updatedFiles;
                });

                const nextFileTimeout = setTimeout(() => {
                    processFile(index + 1);
                }, 300);
                timeouts.push(nextFileTimeout);

            }, 750 + Math.random() * 500);
            timeouts.push(completionTimeout);
        };
        
        const initialTimeout = setTimeout(() => processFile(0), 200);
        timeouts.push(initialTimeout);

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [aiResponse]);

    return (
        <aside className="w-80 bg-zinc-900 text-white p-4 flex flex-col border-r border-zinc-800 flex-shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                    <SparkleIcon className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold">Code assistant</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-400">
                    <button className="hover:text-white" aria-label="Settings"><SettingsIcon className="w-5 h-5" /></button>
                    <button className="hover:text-white" aria-label="Sync"><RefreshCwIcon className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="flex-1 mt-4 space-y-4 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
                {aiResponse ? (
                    <div className="animate-fade-in space-y-4">
                        <p className="text-sm text-zinc-300">{aiResponse.summary}</p>
                        
                        <div className="bg-zinc-800 rounded-md">
                            <button 
                                onClick={() => setIsThoughtExpanded(!isThoughtExpanded)}
                                className="w-full flex items-center justify-between p-3 text-sm text-zinc-300"
                                aria-expanded={isThoughtExpanded}
                            >
                                <span>Thought for 55 seconds</span>
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isThoughtExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            {isThoughtExpanded && (
                                <div className="p-3 border-t border-zinc-700">
                                    <p className="text-sm text-zinc-400 whitespace-pre-wrap">{aiResponse.thought}</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <h3 className="text-md font-semibold text-white my-2">Generating Files...</h3>
                            <div className="space-y-2">
                                {displayedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center bg-zinc-800 p-2 rounded-md animate-file-item">
                                        <FileIcon className="w-4 h-4 mr-2 text-zinc-400 flex-shrink-0" />
                                        <span className="font-mono text-xs flex-grow truncate">{file.name}</span>
                                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 ml-2">
                                            {file.status === 'loading' ? (
                                                <RefreshCwIcon className="w-4 h-4 text-zinc-400 animate-spin" />
                                            ) : (
                                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-zinc-500 pt-10 px-4">
                        <p>The AI's plan and generated files will appear here once you submit a prompt.</p>
                    </div>
                )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <PromptInput
                  prompt={prompt}
                  onPromptChange={onPromptChange}
                  onSubmit={onSubmit}
                  isLoading={isLoading}
              />
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; } to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

                @keyframes file-item-anim {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-file-item { animation: file-item-anim 0.4s ease-out forwards; }
                
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
            `}</style>
        </aside>
    );
};

export default Sidebar;