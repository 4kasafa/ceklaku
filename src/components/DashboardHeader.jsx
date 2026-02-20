import React from 'react';
import { Settings, Info } from 'lucide-react'; // Import Lucide icons

function DashboardHeader({ isAuthenticated, onAboutClick, onSettingsClick }) {
  return (
    <div className="w-full max-w-lg mx-auto relative text-center py-6 z-10">
      {isAuthenticated && (
        <div className="absolute top-0 left-0 sm:top-6">
          <button onClick={onSettingsClick} className="text-slate-600 hover:text-slate-900  hover:bg-white p-2.5 rounded-full">
            <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      )}
      <div className="absolute top-0 right-0 sm:top-6">
        <button onClick={onAboutClick} className="text-slate-600 hover:text-slate-900  hover:bg-white p-2.5 rounded-full">
          <Info className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-black text-slate-800 mt-8 tracking-tight">
          CEK LAKU
        </h1>
        <p className="text-base sm:text-lg text-slate-600 tracking-[0.18em] uppercase">versi hp</p>
      </div>
    </div>
  );
}

export default DashboardHeader;
