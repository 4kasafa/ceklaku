import React, { useState } from 'react';
import { X, RefreshCcw, LogOut, Download } from 'lucide-react'; // Import Lucide icons, added Download

function SettingsContent({ onClose, onRefresh, onLogout, canShowInstallButton, isIOS, hasDeferredPrompt, onInstallPWA }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    await onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="relative p-4 sm:p-8 text-center flex flex-col items-center">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-slate-500 hover:text-slate-700 bg-white/70 p-2 rounded-full border border-white shadow-sm transition duration-300 transform hover:scale-110 z-30"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <h2 className="font-black text-3xl sm:text-4xl text-slate-800 mb-6 mt-6 sm:mt-0">Pengaturan</h2>

      <div className="space-y-4 w-full max-w-xs">
        {canShowInstallButton && (
          <button
            onClick={onInstallPWA}
            className="w-full bg-linear-to-r from-emerald-500 to-green-600 text-white font-black py-3 px-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-300/70 transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-md shadow-emerald-200"
          >
            <Download size={20} />
            <span>
              {isIOS ? 'Pasang Aplikasi (iOS)' : hasDeferredPrompt ? 'Unduh Aplikasi' : 'Pasang Aplikasi'}
            </span>
          </button>
        )}

        <button
          onClick={onRefresh}
          className="w-full bg-linear-to-r from-sky-500 to-blue-600 text-white font-black py-3 px-4 rounded-2xl hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-300/70 transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-md shadow-sky-200"
        >
          <RefreshCcw size={20} />
          <span>Muat Ulang Data</span>
        </button>

        <button
          onClick={handleLogoutClick}
          className="w-full bg-linear-to-r from-rose-500 to-red-600 text-white font-black py-3 px-4 rounded-2xl hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-rose-300/70 transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-md shadow-rose-200"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/25 rounded-2xl p-4">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 border border-slate-100 shadow-xl">
            <p className="text-slate-800 font-black text-lg mb-4">Yakin mau keluar?</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-red-500 text-white font-black py-2 rounded-xl hover:bg-red-600 transition"
              >
                Ya
              </button>
              <button
                onClick={handleCancelLogout}
                className="flex-1 bg-slate-100 text-slate-800 font-black py-2 rounded-xl hover:bg-slate-200 transition"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsContent;
