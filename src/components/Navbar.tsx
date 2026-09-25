import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  UserCheck, 
  Stethoscope, 
  Sparkles, 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  LogOut, 
  User,
  Home
} from 'lucide-react';
import { AuthUser } from '../types';

interface NavbarProps {
  currentView: 'home' | 'family' | 'partner' | 'register' | 'safety';
  onSelectView: (view: 'home' | 'family' | 'partner' | 'register' | 'safety') => void;
  hasActiveBooking: boolean;
  onJumpToActive: () => void;
  activeOtp?: string;
  isDark: boolean;
  onToggleDark: () => void;
  currentUser: AuthUser | null;
  onOpenAuth: (mode: 'signin' | 'join') => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  hasActiveBooking,
  onJumpToActive,
  activeOtp,
  isDark,
  onToggleDark,
  currentUser,
  onOpenAuth,
  onSignOut
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectView('home')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-800 dark:bg-teal-700 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-900 transition-colors">
              <HeartHandshake className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-stone-950 dark:text-white block leading-tight">
                CareSathi
              </span>
              <span className="text-[10px] text-teal-800 dark:text-teal-400 font-semibold tracking-wide block">
                Hospital Bedside Care
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Primary Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 dark:bg-stone-800/80 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => onSelectView('home')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'home'
                ? 'bg-white dark:bg-stone-900 text-teal-900 dark:text-teal-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => onSelectView('family')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'family'
                ? 'bg-white dark:bg-stone-900 text-teal-900 dark:text-teal-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Book for Patient
          </button>

          <button
            onClick={() => onSelectView('partner')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 relative cursor-pointer ${
              currentView === 'partner'
                ? 'bg-white dark:bg-stone-900 text-teal-900 dark:text-teal-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Attendant Mode
            {hasActiveBooking && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute top-1 right-1" />
            )}
          </button>

          <button
            onClick={() => onSelectView('safety')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'safety'
                ? 'bg-white dark:bg-stone-900 text-teal-900 dark:text-teal-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Safety & Verification
          </button>
        </nav>

        {/* Zone 3: Actions - Dark Mode, Join/Sign In, Active Duty Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Booking shortcut */}
          {hasActiveBooking && (
            <button
              onClick={onJumpToActive}
              className="bg-amber-50 dark:bg-amber-950/70 hover:bg-amber-100 dark:hover:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs px-2.5 sm:px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="hidden sm:inline">Duty:</span>
              <span className="font-mono font-bold">OTP {activeOtp}</span>
            </button>
          )}

          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center transition-colors border border-stone-200 dark:border-stone-700 cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* User Auth Section: Sign In / Join OR User Profile */}
          {!currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('join')}
                className="px-3.5 py-1.5 bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 pl-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-stone-900 dark:text-white truncate max-w-[100px] sm:max-w-[120px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:inline">
                  ({currentUser.role === 'family' ? 'Family' : 'Attendant'})
                </span>
              </div>
              <button
                onClick={onSignOut}
                title="Sign Out"
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile subnavigation bar for small screens */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-100 dark:border-stone-800 bg-stone-50/95 dark:bg-stone-900/95 px-2 py-1.5 text-xs">
        <button
          onClick={() => onSelectView('home')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            currentView === 'home' ? 'bg-teal-800 text-white' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectView('family')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            currentView === 'family' ? 'bg-teal-800 text-white' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Book
        </button>
        <button
          onClick={() => onSelectView('partner')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            currentView === 'partner' ? 'bg-teal-800 text-white' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Attendant
        </button>
        <button
          onClick={() => onSelectView('safety')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            currentView === 'safety' ? 'bg-teal-800 text-white' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Safety
        </button>
      </div>
    </header>
  );
};
