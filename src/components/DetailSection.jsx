import React from 'react';

function DetailSection({ data }) {
  if (!data) {
    return null; // Or a loading/empty state
  }

  // Define a display order and mapping for clearer labels
  const displayFields = [
    { key: 'Tanggal', label: 'Tanggal' },
    { key: 'Shift', label: 'Shift' },
    { key: 'Cabang', label: 'Cabang' },
    { key: 'Kasir', label: 'Kasir' },
    { key: 'Pengeluaran', label: 'Pengeluaran' },
  ];

  return (
    <div className="bg-slate-50/90 p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm my-4">
      <div className="space-y-2 sm:space-y-3">
        {displayFields.map((field, index) => {
          if (data[field.key]) {
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200/70 last:border-b-0 gap-3">
                <span className="text-sm sm:text-base text-slate-500 font-bold">{field.label}</span>
                <span className="text-sm sm:text-base text-slate-800 font-bold text-right">{data[field.key]}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default DetailSection;
