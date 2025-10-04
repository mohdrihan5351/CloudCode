import React, { useState, useEffect } from 'react';
import { FileIcon, SparkleIcon, RefreshCwIcon } from './icons';

interface CodeViewProps {
  files: Record<string, string>;
  onRefactor: (fileName: string) => Promise<void>;
  refactoringFile: string | null;
}

const CodeView: React.FC<CodeViewProps> = ({ files, onRefactor, refactoringFile }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    const fileList = Object.keys(files);
    if (fileList.length > 0) {
      // Preserve selection if it's still valid, otherwise default to first file
      if (!selectedFile || !files[selectedFile]) {
        setSelectedFile(fileList[0]);
      }
    } else {
      setSelectedFile(null);
    }
  }, [files, selectedFile]);

  if (!files || Object.keys(files).length === 0) {
    return <div className="p-4 text-center text-zinc-500">No files generated yet.</div>;
  }
  
  const fileList = Object.keys(files);
  const code = selectedFile ? files[selectedFile] : '';
  const isRefactoring = refactoringFile === selectedFile;

  return (
    <div className="w-full h-full flex bg-zinc-950">
      <div className="w-1/4 max-w-xs h-full bg-zinc-900 border-r border-zinc-800 overflow-y-auto custom-scrollbar">
        <div className="p-2 text-sm text-zinc-400 font-semibold border-b border-zinc-800">Files</div>
        <ul>
          {fileList.map((file) => (
            <li key={file}>
              <button
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left flex items-center px-3 py-2 text-sm truncate ${
                  selectedFile === file ? 'bg-orange-600/20 text-white' : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <FileIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                {file}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col h-full">
        {selectedFile ? (
          <>
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900">
              <span className="font-mono text-sm text-zinc-300">{selectedFile}</span>
              <button
                onClick={() => onRefactor(selectedFile)}
                disabled={isRefactoring}
                className="flex items-center space-x-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-sm text-zinc-300 disabled:opacity-50 disabled:cursor-wait"
              >
                {isRefactoring ? (
                  <RefreshCwIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <SparkleIcon className="w-4 h-4 text-cyan-400" />
                )}
                <span>{isRefactoring ? 'Refactoring...' : 'Refactor'}</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-black">
              <pre className="p-4"><code className="language-tsx text-sm whitespace-pre-wrap break-words">{code}</code></pre>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            Select a file to view its code.
          </div>
        )}
      </div>
      <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
      `}</style>
    </div>
  );
};

export default CodeView;
