import React from 'react';
import { X } from 'lucide-react'; // Import the X icon for closing

function AboutContent({ onClose }) {
  return (
    <div className="relative p-4 sm:p-8 text-center flex flex-col items-center">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-slate-500 hover:text-slate-700 bg-white/70 p-2 rounded-full border border-white shadow-sm transition duration-300 transform hover:scale-110 z-30"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <h2 className="font-black text-3xl sm:text-4xl text-slate-800 mb-4 mt-6 sm:mt-0">Tentang</h2>
      <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
        Aplikasi ini dibuat untuk membantu kasir melihat hasil setoran tanpa harus menggunakan komputer. Dengan antarmuka yang sederhana dan responsif, kasir dapat dengan mudah memeriksa hasil setoran menggunakan perangkat seluler/hp.
      </p>
      <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
        Dibangun dengan React, TailwindCSS, dan backend API kustom.
        Versi 1.18.0
      </p>
    </div>
  );
}

export default AboutContent;
