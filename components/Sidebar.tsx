
import React from 'react';
import { SettingsIcon, RefreshCwIcon, SparkleIcon } from './icons';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-80 bg-zinc-900 text-white p-4 flex flex-col border-r border-zinc-800 flex-shrink-0">
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center space-x-2">
                    <SparkleIcon className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold">Code assistant</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-400">
                    <button className="hover:text-white" aria-label="Settings"><SettingsIcon className="w-5 h-5" /></button>
                    <button className="hover:text-white" aria-label="Sync"><RefreshCwIcon className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="flex-grow space-y-2">
                <button className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-md text-sm transition-colors">
                    Add file editing
                </button>
                 <button className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-md text-sm transition-colors">
                    Code preview controls
                </button>
                <button className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-md text-sm transition-colors">
                    View generated files
                </button>
                 <button className="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-md text-sm transition-colors">
                    Save/Load App State
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
