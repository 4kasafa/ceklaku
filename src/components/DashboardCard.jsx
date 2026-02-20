import React from 'react';
import LoadingOverlay from './LoadingOverlay';

function DashboardCard({ children, isLoading, loadingMessage }) {
  return (
    <div className="relative bg-white backdrop-blur-xl p-4 sm:p-6 rounded-4xl border border-white/80 shadow-[0_24px_60px_-22px_rgba(14,116,144,0.55)] w-full max-w-lg mx-auto transition-all duration-500 ease-in-out overflow-hidden">
      {isLoading && (
        <LoadingOverlay message={loadingMessage} isVisible={isLoading} />
      )}
      {children}
    </div>
  );
}

export default DashboardCard;
