import { useAuth } from './contexts/AuthContext.jsx';
import React, { useState, useCallback, useEffect } from 'react';
import DashboardCard from './components/DashboardCard';
import DashboardHeader from './components/DashboardHeader';
import ScoreSection from './components/ScoreSection';
import DualInfoSection from './components/DualInfoSection';
import DetailSection from './components/DetailSection';
import NavigationSection from './components/NavigationSection';
import { Eye, EyeOff } from 'lucide-react';
import AboutContent from './components/AboutContent';
import SettingsContent from './components/SettingsContent';

function LoginForm() {
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-200/80 bg-white/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-200 transition text-base sm:text-lg text-slate-800 placeholder:text-slate-400 shadow-sm"
                        placeholder="Masukkan email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-200/80 bg-white/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-200 transition text-base sm:text-lg pr-11 text-slate-800 placeholder:text-slate-400 shadow-sm"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative text-center" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-sky-500 to-blue-600 text-white font-black py-3 sm:py-3.5 px-4 rounded-2xl hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-300/70 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-xl shadow-lg shadow-sky-200"
                    disabled={isLoading}
                >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </div>
    );
}

function App() {
    const { isAuthenticated, isLoading, dashboardData, loadingMessage, checkAuth, logout } = useAuth();
    const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
    const [showAbout, setShowAbout] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isAppInstalled, setIsAppInstalled] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(display-mode: standalone)').matches || Boolean(window.navigator.standalone);
    });
    const isIOS = typeof window !== 'undefined' && /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const canShowInstallButton = !isAppInstalled;

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        const handleAppInstalled = () => {
            setIsAppInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installPWA = useCallback(async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setIsAppInstalled(true);
            }
            setDeferredPrompt(null);
            return;
        }
        if (isIOS) {
            window.alert('Untuk iPhone/iPad: tekan Share lalu pilih "Add to Home Screen".');
        } else {
            window.alert('Di Android Chrome: tekan menu titik tiga lalu pilih "Install app" atau "Add to Home screen".');
        }
    }, [deferredPrompt, isIOS]);


    const totalSessions = dashboardData?.data?.length || 0;
    const currentSession = dashboardData?.data?.[currentSessionIndex];

    const handlePreviousSession = () => {
        setCurrentSessionIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNextSession = () => {
        setCurrentSessionIndex((prevIndex) => Math.min(totalSessions - 1, prevIndex + 1));
    };

    const toggleAbout = useCallback(() => {
        setShowAbout(prev => !prev);
        if (showSettings) setShowSettings(false);
    }, [showSettings]);

    const toggleSettings = useCallback(() => {
        setShowSettings(prev => !prev);
        if (showAbout) setShowAbout(false);
    }, [showAbout]);

    let cardContent;
    if (showAbout) {
        cardContent = <AboutContent onClose={toggleAbout} />;
    } else if (showSettings) {
        cardContent = (
            <SettingsContent
                onClose={toggleSettings}
                onRefresh={async () => {
                    await checkAuth();
                    toggleSettings();
                }}
                onLogout={async () => {
                    await logout();
                    toggleSettings();
                }}
                canShowInstallButton={canShowInstallButton}
                isIOS={isIOS}
                hasDeferredPrompt={Boolean(deferredPrompt)}
                onInstallPWA={installPWA}
            />
        );
    } else if (isAuthenticated && dashboardData && currentSession) {
        cardContent = (
            <>
                <ScoreSection
                    status={currentSession.Status}
                    selisih={currentSession.Selisih}
                />
                <DualInfoSection
                    komputerValue={currentSession['Total Komputer']}
                    uangFisikValue={currentSession['Uang Fisik']}
                />
                <DetailSection data={currentSession} />
                {totalSessions > 1 && (
                    <NavigationSection
                        currentPage={currentSessionIndex + 1}
                        totalPages={totalSessions}
                        onPrevious={handlePreviousSession}
                        onNext={handleNextSession}
                    />
                )}
            </>
        );
    } else {
        cardContent = <LoginForm />;
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center px-5 sm:px-6 py-0 relative overflow-hidden">
            <div className="absolute -top-28 -left-16 h-64 w-64 rounded-full bg-cyan-200/70 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-blue-300/60 blur-3xl" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-cyan-100/40 via-transparent to-blue-200/30 opacity-80" />
            <DashboardHeader isAuthenticated={isAuthenticated} onAboutClick={toggleAbout} onSettingsClick={toggleSettings} />
            <div className=" justify-center w-full">
                <DashboardCard isLoading={isLoading} loadingMessage={loadingMessage}>
                    {cardContent}
                </DashboardCard>
            </div>

            <footer className="relative mt-8 pb-5 text-slate-500 text-sm text-center tracking-wide">
                &copy; 2026 | by kasafa.
            </footer>
        </div>
    );
}

export default App;
