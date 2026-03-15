import React from 'react';

function DesktopRedirect({ onContinue }) {
  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-3">
        <p className="text-slate-500 text-sm sm:text-base font-medium px-4">
          Scan QR code dibawah ini untuk membuka aplikasi di HP dan melihat hasil setoran dengan mudah tanpa harus menggunakan komputer.
        </p>
      </div>

      <div className="relative group">
        <div className="relative bg-white rounded-3xl overflow-hidden">
          <img 
            src="/qr.svg" 
            alt="QR Code" 
            className="w-48 h-48 sm:w-full sm:h-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-slate-500 text-sm sm:text-base font-medium">
          Atau
        </p>
      </div>

      <div className="w-full pt-4">
        <button
          onClick={onContinue}
          className="w-full bg-slate-50 font-black py-3.5 px-6 rounded-2xl border  hover:bg-white text-sky-600 border-sky-300/50 focus:outline-none focus:ring-4 focus:ring-cyan-100/50 transition duration-300 ease-in-out text-base sm:text-lg cursor-pointer shadow-sm"
        >
          Lanjut buka disini
        </button>
      </div>
    </div>
  );
}

export default DesktopRedirect;
