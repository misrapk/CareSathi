import React, { useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { 
  X, 
  HeartHandshake, 
  ShieldCheck, 
  UserCheck, 
  Stethoscope, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { getStoredUsers, registerUser, loginUserByPhone } from '../data/localAuth';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'join';
  targetRole?: 'family' | 'attendant';
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  targetRole = 'family',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'join'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'family' | 'attendant'>(targetRole);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 98112 40590');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [savedUsers, setSavedUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    setMode(initialMode);
    setSelectedRole(targetRole);
    setOtpStep(false);
    setOtp('');
    if (targetRole === 'attendant') {
      setPhone('+91 98712 34567');
      setName('Rameshwar Yadav');
    } else {
      setPhone('+91 98112 40590');
      setName('Vikram Verma');
    }
    setSavedUsers(getStoredUsers());
  }, [isOpen, initialMode, targetRole]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpStep) {
      setOtpStep(true);
      return;
    }

    // Process authentication with local DB
    let user: AuthUser;
    if (mode === 'join') {
      user = registerUser(
        name.trim() || (selectedRole === 'family' ? 'Family Guardian' : 'CareSathi Attendant'),
        phone.trim() || '+91 98112 40590',
        selectedRole
      );
    } else {
      user = loginUserByPhone(phone.trim(), selectedRole);
    }

    onSuccess(user);
  };

  const handleSelectQuickUser = (user: AuthUser) => {
    // Save to current user session
    const logged = loginUserByPhone(user.phone, user.role);
    onSuccess(logged);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-50 dark:bg-stone-950/80 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center shadow-sm">
              <HeartHandshake className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-stone-900 dark:text-white leading-tight">
                  {mode === 'signin' ? 'Sign In to CareSathi' : 'Join CareSathi'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                  Required
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
                Hospital bedside care portal · Free to use
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Information Notice */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Protected Hospital Feature:</span>
              <span>Please sign in or join to raise hourly patient requests or accept attendant bedside duties.</span>
            </div>
          </div>

          {/* Toggle Sign In / Join */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('signin'); setOtpStep(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('join'); setOtpStep(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'join'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Join (Register New)
            </button>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Select Your Access Role:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRole('family')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'family'
                    ? 'border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-500 ring-2 ring-teal-700/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white">Patient / Family</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1 leading-tight">
                  Book hospital attendants & track bedside care
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('attendant')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'attendant'
                    ? 'border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-500 ring-2 ring-teal-700/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white">Caregiver Sathi</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1 leading-tight">
                  Receive duties & earn ₹100–₹180/hr
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'join' && !otpStep && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedRole === 'family' ? 'e.g. Vikram Verma' : 'e.g. Rameshwar Yadav'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            )}

            {!otpStep ? (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Mobile Number (India +91)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 98112 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 text-center">
                  Enter 4-Digit SMS OTP sent to {phone}
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  autoFocus
                  placeholder="4 8 2 1"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-44 mx-auto block px-3 py-2 text-center text-xl font-mono font-bold tracking-widest bg-white dark:bg-stone-900 border-2 border-teal-700 rounded-xl text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block text-center">
                  Instant Verification: Enter any 4 digits (e.g. 1234)
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            >
              <span>{otpStep ? 'Verify & Enter Portal' : (mode === 'signin' ? 'Send Login OTP' : 'Create Account & Continue')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick One-Tap Demo Accounts */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                One-Tap Instant Test Login:
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Local DB Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectQuickUser({
                  id: 'demo-vikram',
                  name: 'Vikram Verma',
                  phone: '+91 98112 40590',
                  role: 'family',
                })}
                className="p-2.5 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-left rounded-xl border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-600" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300">
                    Vikram Verma
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                  Family Requester (Patient Son)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuickUser({
                  id: 'demo-rameshwar',
                  name: 'Rameshwar Yadav',
                  phone: '+91 98712 34567',
                  role: 'attendant',
                  badgeId: 'CS-DL-8841',
                })}
                className="p-2.5 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-left rounded-xl border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300">
                    Rameshwar Yadav
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                  CareSathi Attendant (Badge #8841)
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
