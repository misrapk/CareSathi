import React, { useState } from 'react';
import { AuthUser } from '../types';
import { X, HeartHandshake, ShieldCheck, UserCheck, Stethoscope, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'join';
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'join'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'family' | 'attendant'>('family');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpStep) {
      setOtpStep(true);
      return;
    }

    // Successfully verified
    const loggedUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: name.trim() || (selectedRole === 'family' ? 'Vikram Verma' : 'Rameshwar Yadav'),
      phone: phone.trim() || '+91 98112 40590',
      role: selectedRole,
      badgeId: selectedRole === 'attendant' ? 'CS-DL-8841' : undefined,
    };
    onSuccess(loggedUser);
  };

  const handleQuickDemoLogin = (role: 'family' | 'attendant') => {
    const demoUser: AuthUser = role === 'family' ? {
      id: 'demo-family-1',
      name: 'Vikram Verma',
      phone: '+91 98112 40590',
      role: 'family',
    } : {
      id: 'demo-attendant-1',
      name: 'Rameshwar Yadav',
      phone: '+91 98712 34567',
      role: 'attendant',
      badgeId: 'CS-DL-8841',
    };
    onSuccess(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-50 dark:bg-stone-950/80 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-sm">
              <HeartHandshake className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white leading-tight">
                {mode === 'signin' ? 'Sign In to CareSathi' : 'Join CareSathi'}
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Hospital bedside care portal
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
        <div className="p-6 space-y-5">
          
          {/* Toggle Sign In / Join */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('signin'); setOtpStep(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('join'); setOtpStep(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'join'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Join (Register)
            </button>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Select Your Profile Role:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRole('family')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'family'
                    ? 'border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-600 ring-1 ring-teal-700'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white">Patient / Family</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1">
                  Book attendants for admitted relatives
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('attendant')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'attendant'
                    ? 'border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-600 ring-1 ring-teal-700'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white">Caregiver Partner</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1">
                  Earn ₹100–₹180/hr taking bedside care
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'join' && !otpStep && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            )}

            {!otpStep ? (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Mobile Number
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
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
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
                  className="w-44 mx-auto block px-3 py-2.5 text-center text-xl font-mono font-bold tracking-widest bg-stone-50 dark:bg-stone-800 border-2 border-teal-700 rounded-xl text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block text-center">
                  Demo hint: enter any 4 digits (e.g. 1234)
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{otpStep ? 'Verify & Continue' : (mode === 'signin' ? 'Send Login OTP' : 'Join CareSathi')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-center">
            <span className="text-xs text-stone-500 dark:text-stone-400 block mb-2">
              Or quick test with instant demo profile:
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('family')}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Sign In as Family (Vikram)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('attendant')}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Sign In as Attendant (Rameshwar)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
