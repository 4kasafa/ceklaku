import React from 'react';

function NavigationSection({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="flex justify-center items-center my-4 sm:my-6 space-x-3 sm:space-x-4">
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="p-2.5 sm:p-3 bg-slate-800 text-white rounded-full shadow-md hover:bg-slate-900 disabled:opacity-35 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <span className="text-lg sm:text-xl font-black text-slate-700 bg-white/80 border border-white rounded-full px-4 py-1.5 shadow-sm min-w-24 text-center">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="p-2.5 sm:p-3 bg-slate-800 text-white rounded-full shadow-md hover:bg-slate-900 disabled:opacity-35 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  );
}

export default NavigationSection;
