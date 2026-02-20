import React from 'react';

function LoadingOverlay({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 rounded-4xl z-20 transition-opacity duration-300">
      <div className="text-center">
        <p className="text-xl sm:text-2xl font-black text-slate-800 mb-4">{message}</p>
        <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
