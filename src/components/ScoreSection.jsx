import React from 'react';

function ScoreSection({ status, selisih }) {
  const statusInfo = {
    LEBIH: {
      color: 'bg-emerald-100',
      textColor: 'text-emerald-700',
      label: 'LEBIH',
    },
    KURANG: {
      color: 'bg-rose-100',
      textColor: 'text-rose-700',
      label: 'KURANG',
    },
    PAS: {
      color: 'bg-cyan-100',
      textColor: 'text-cyan-700',
      label: 'PAS',
    },
  };

  const currentStatus = statusInfo[status] || statusInfo.PAS;

  return (
    <div className="text-center my-4 p-2 sm:p-4">
      <div className="inline-block mb-2">
        <span
          className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-lg sm:text-xl border border-white/80 shadow-sm ${currentStatus.color} ${currentStatus.textColor}`}
        >
          {currentStatus.label}
        </span>
      </div>
      <p className="text-wrap text-5xl sm:text-6xl font-black text-slate-800 mt-2 tracking-tight">{selisih}</p>
    </div>
  );
}

export default ScoreSection;
