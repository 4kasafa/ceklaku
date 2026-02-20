import React from 'react';

function DualInfoSection({ komputerValue, uangFisikValue }) {
  return (
    <div className="grid grid-cols-2 gap-2 my-4 sm:my-5">
      <div className="text-center p-2 sm:p-4 rounded-2xl bg-cyan-50 border border-cyan-100 shadow-sm">
        <p className="text-[11px] sm:text-xs text-cyan-700 font-black tracking-[0.14em] mb-1">KOMPUTER</p>
        <p className="text-wrap sm:text-3xl font-black text-cyan-900">{komputerValue}</p>
      </div>
      <div className="text-center p-2 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
        <p className="text-[11px] sm:text-xs text-emerald-700 font-black tracking-[0.14em] mb-1">UANG FISIK</p>
        <p className="text-wrap sm:text-3xl font-black text-emerald-900">{uangFisikValue}</p>
      </div>
    </div>
  );
}

export default DualInfoSection;
