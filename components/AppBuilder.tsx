import React, { useState, useCallback } from 'react';
import Preview, { InitialPreview, LoadingPreview } from './Preview';
import { generateAppCode, refactorCode } from '../services/geminiService';
import type { AiResponse, MockComponentType } from '../types';
import Sidebar from './Sidebar';
import { ArrowLeftIcon, ChevronDownIcon, DownloadIcon, EditIcon, GithubIcon, LaptopIcon, MaximizeIcon, RefreshCwIcon, RocketIcon, SaveIcon, Share2Icon } from './icons';
import CodeView from './CodeView';
import { generateMockCode } from '../utils/mockCodeGenerator';

interface AppBuilderProps {
  onGoHome: () => void;
}

const AppBuilder: React.FC<AppBuilderProps> = ({ onGoHome }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [mockComponent, setMockComponent] = useState<MockComponentType>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [filesContent, setFilesContent] = useState<Record<string, string> | null>(null);
  const [refactoringFile, setRefactoringFile] = useState<string | null>(null);

  const determineMockComponent = (userPrompt: string): MockComponentType => {
    const lowerCasePrompt = userPrompt.toLowerCase();
    if (lowerCasePrompt.includes('login') || lowerCasePrompt.includes('signin') || lowerCasePrompt.includes('auth')) {
      return 'login';
    }
    if (lowerCasePrompt.includes('dashboard') || lowerCasePrompt.includes('analytics')) {
      return 'dashboard';
    }
    return 'dashboard'; 
  };

  const handleSubmit = useCallback(async () => {
    const currentPrompt = prompt.trim();
    if (!currentPrompt) return;

    setIsLoading(true);
    setError(null);
    setAiResponse(null);
    setMockComponent(null);
    setFilesContent(null);
    setPrompt(''); // Clear the input field immediately

    try {
      const response = await generateAppCode(currentPrompt);
      setAiResponse(response);
      setMockComponent(determineMockComponent(currentPrompt));

      const generatedFiles: Record<string, string> = {};
      for (const fileName of response.fileList) {
          generatedFiles[fileName] = generateMockCode(fileName);
      }
      setFilesContent(generatedFiles);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);
  
  const handleRefactor = useCallback(async (fileName: string) => {
    if (!filesContent || !filesContent[fileName]) return;

    setRefactoringFile(fileName);
    setError(null);

    try {
        const currentCode = filesContent[fileName];
        const refactored = await refactorCode(currentCode);
        setFilesContent(prev => prev ? { ...prev, [fileName]: refactored } : null);
    } catch (err: any) {
        setError(err.message || 'Failed to refactor code.');
    } finally {
        setRefactoringFile(null);
    }
  }, [filesContent]);

  const renderMainContent = () => {
    if (isLoading) {
      return <LoadingPreview />;
    }
    if (error) {
      return <div className="w-full h-full flex items-center justify-center text-red-500 p-8 text-center">{error}</div>;
    }
    if (aiResponse) {
        if (activeTab === 'preview') {
            return <Preview mockComponent={mockComponent} />;
        } else {
            return filesContent ? (
                <CodeView 
                    files={filesContent}
                    onRefactor={handleRefactor}
                    refactoringFile={refactoringFile}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">Generating code...</div>
            );
        }
    }
    return <InitialPreview />;
  };
  
  return (
    <div className="h-screen w-screen bg-black text-gray-300 flex font-sans">
        <Sidebar
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            aiResponse={aiResponse}
        />
        <div className="flex-1 flex flex-col min-h-0">
            <header className="flex-shrink-0 bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onGoHome} className="flex items-center space-x-2 text-sm text-zinc-400 hover:text-white">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                    <div className="h-6 border-l border-zinc-700"></div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">Code Cloud</span>
                        <button aria-label="Edit project name" className="text-zinc-500 hover:text-white"><EditIcon className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="flex items-center space-x-1 text-zinc-400">
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Save"><SaveIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Download"><DownloadIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="GitHub"><GithubIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Launch"><RocketIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Share"><Share2Icon className="w-5 h-5" /></button>
                    <div className="h-6 border-l border-zinc-700 mx-2"></div>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Device"><LaptopIcon className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-md" aria-label="Refresh"><RefreshCwIcon className="w-5 h-5" /></button>
                </div>
            </header>

            <div className="border-b border-zinc-800 px-4 bg-zinc-900 flex items-center">
                <div className="flex items-center space-x-4 text-sm">
                    <button 
                        onClick={() => setActiveTab('preview')}
                        className={`py-2 px-1 border-b-2 ${activeTab === 'preview' ? 'border-orange-500 text-white' : 'border-transparent text-zinc-400 hover:text-white'}`}
                    >
                        Preview
                    </button>
                    <button 
                        onClick={() => setActiveTab('code')}
                        className={`py-2 px-1 border-b-2 ${activeTab === 'code' ? 'border-orange-500 text-white' : 'border-transparent text-zinc-400 hover:text-white'}`}
                    >
                        Code
                    </button>
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 py-2 px-1 border-b-2 border-transparent text-zinc-400 hover:text-white">
                        <MaximizeIcon className="w-4 h-4" />
                        <span>Full screen</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <span className="text-zinc-400">Device</span>
                        <div className="relative">
                           <select className="bg-zinc-800 border border-zinc-700 rounded-md py-1 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500" aria-label="Select device">
                               <option>Desktop</option>
                               <option>Tablet</option>
                               <option>Mobile</option>
                           </select>
                           <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                       </div>
                    </div>
                    <span className="text-xs bg-orange-600 text-white font-semibold px-2 py-1 rounded-full">Preview</span>
                </div>
            </div>

            <main className="flex-1 relative bg-black min-h-0 overflow-y-auto">
                {renderMainContent()}
            </main>
        </div>
    </div>
  );
};

export default AppBuilder;