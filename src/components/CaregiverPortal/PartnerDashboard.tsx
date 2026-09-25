import React, { useState } from 'react';
import { PatientBookingRequest, CaregiverProfile } from '../../types';
import { 
  Power, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Bell, 
  Bed, 
  Building2, 
  KeyRound, 
  Check, 
  Wallet, 
  Plus, 
  Heart,
  Droplets,
  Soup,
  Footprints,
  Pill,
  Send
} from 'lucide-react';

interface PartnerDashboardProps {
  currentRequest: PatientBookingRequest | null;
  onAcceptRequest: () => void;
  onDeclineRequest: () => void;
  onVerifyOtp: (enteredOtp: string) => boolean;
  onAddCareLog: (note: string, category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general') => void;
  onEndDuty: () => void;
  onOpenPassModal: () => void;
  onSwitchToFamilyView: () => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  currentRequest,
  onAcceptRequest,
  onDeclineRequest,
  onVerifyOtp,
  onAddCareLog,
  onEndDuty,
  onOpenPassModal,
  onSwitchToFamilyView
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [customLogNote, setCustomLogNote] = useState('');

  // Shift state
  const isAssigned = currentRequest && (currentRequest.status === 'matched' || currentRequest.status === 'in_progress');
  const isShiftActive = currentRequest?.status === 'in_progress';
  const hasIncomingDuty = currentRequest && currentRequest.status === 'searching';

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.length !== 4) {
      setOtpError('Please enter the full 4-digit OTP provided by the family.');
      return;
    }

    const isValid = onVerifyOtp(enteredOtp);
    if (isValid) {
      setOtpError('');
      setEnteredOtp('');
    } else {
      setOtpError('Incorrect OTP. Please ask the family in the room for the correct code.');
    }
  };

  const handleQuickLog = (note: string, category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general') => {
    onAddCareLog(note, category);
  };

  const handleCustomLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLogNote.trim()) return;
    onAddCareLog(customLogNote.trim(), 'general');
    setCustomLogNote('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Attendant Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <span>CARESATHI PARTNER CONSOLE</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400">OLA / UBER DRIVER MODEL</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Attendant: Rameshwar Yadav</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-md font-medium">
              Badge #CS-DL-8841
            </span>
          </h2>
          <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
            <span>GDA Certified</span>
            <span aria-hidden="true">·</span>
            <span>Max Super Speciality & AIIMS Radius</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">₹150/hr Base Rate</span>
          </div>
        </div>

        {/* Online / Offline Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-700'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? 'Online (Receiving Duties)' : 'Go Offline'}</span>
          </button>
        </div>
      </div>

      {/* Wallet & Shift Earnings Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Today's Earnings</span>
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">₹1,200</span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">2 duties completed</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Hours On-Duty</span>
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">8.0 hrs</span>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">Max Saket Ward 4</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Partner Rating</span>
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">4.9 ★</span>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">142 patient families</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Instant Payout</span>
          <button
            onClick={() => alert('Payout of ₹1,200 initiated to your linked UPI VPA (rameshwar@okaxis). Transfer time: Instant.')}
            className="mt-1 text-xs font-bold text-teal-800 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 flex items-center gap-1 underline cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5" />
            Withdraw to UPI
          </button>
        </div>
      </div>

      {/* Case 1: INCOMING DUTY DISPATCH ALERT (Ola/Uber buzzer) */}
      {hasIncomingDuty && isOnline && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-600 rounded-3xl p-6 shadow-md animate-pulse">
          <div className="flex items-center justify-between pb-4 border-b border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600 animate-ping" />
              <span className="font-bold text-amber-950 dark:text-amber-200 text-sm uppercase tracking-wide">
                NEW BEDSIDE DUTY REQUEST NEARBY!
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-white dark:bg-stone-900 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700">
              0.8 km away
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-stone-800 dark:text-white font-bold text-base">
                <Building2 className="w-4 h-4 text-stone-500" />
                <span>{currentRequest.hospitalName}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 text-xs mt-1">
                <Bed className="w-4 h-4 text-stone-400" />
                <span className="font-semibold text-stone-800 dark:text-white">{currentRequest.wardRoomBed}</span>
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-300 mt-2">
                Patient: <span className="font-semibold text-stone-900 dark:text-white">{currentRequest.patientName}</span> ({currentRequest.patientAge}y, {currentRequest.patientGender})
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Need: <span className="font-medium text-stone-700 dark:text-stone-200">{currentRequest.primaryNeed}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200 dark:border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-stone-500 dark:text-stone-400">Estimated Total Earnings:</span>
                <div className="text-2xl font-black text-emerald-800 dark:text-emerald-400 tabular-nums mt-0.5">
                  ₹{currentRequest.totalEstimatedCost}
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {currentRequest.requestedHours} hours @ ₹{currentRequest.hourlyRate}/hr
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={onAcceptRequest}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                >
                  Accept Duty
                </button>
                <button
                  onClick={onDeclineRequest}
                  className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case 2: DUTY ACCEPTED - REACH ROOM & ENTER OTP HANDSHAKE */}
      {currentRequest && currentRequest.status === 'matched' && (
        <div className="bg-white dark:bg-stone-900 border-2 border-teal-700 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider block">
                STEP 1: REACH HOSPITAL ROOM & ENTER 4-DIGIT START OTP
              </span>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                Head to {currentRequest.wardRoomBed} at {currentRequest.hospitalName}
              </h3>
            </div>
            <button
              onClick={onOpenPassModal}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl border border-stone-300 dark:border-stone-700 cursor-pointer"
            >
              Show Entry Pass
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-xs text-stone-600 dark:text-stone-400 space-y-2">
              <p>
                1. Present yourself to the hospital security/nursing counter with your CareSathi Attendant Badge.
              </p>
              <p>
                2. Greet the family/patient in <strong className="text-stone-900 dark:text-white">{currentRequest.wardRoomBed}</strong>.
              </p>
              <p className="font-semibold text-stone-900 dark:text-white">
                3. Ask the family for their 4-digit Booking Start OTP (shown on their family booking screen).
              </p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <span className="font-bold">Family Screen OTP Hint: </span>
                <span className="font-mono font-bold">{currentRequest.startOtp}</span>
              </div>
            </div>

            {/* OTP Keypad Input Box */}
            <form onSubmit={handleOtpSubmit} className="bg-stone-50 dark:bg-stone-850 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 text-center">
              <div className="flex items-center justify-center gap-2 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase mb-2">
                <KeyRound className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Enter Family's 4-Digit OTP to Start Clock</span>
              </div>

              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="• • • •"
                className="w-48 mx-auto px-4 py-3 bg-white dark:bg-stone-800 border-2 border-teal-700 rounded-xl text-center text-2xl font-mono font-bold tracking-widest text-stone-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-teal-700/20"
              />

              {otpError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-2">{otpError}</p>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
              >
                Verify OTP & Begin Shift Clock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Case 3: SHIFT IN PROGRESS (Attendant Bedside Assistant Mode) */}
      {isShiftActive && currentRequest && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>LIVE DUTY IN PROGRESS</span>
                <span aria-hidden="true">·</span>
                <span>{currentRequest.wardRoomBed}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                Attending: {currentRequest.patientName} ({currentRequest.patientAge}y)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenPassModal}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 cursor-pointer"
              >
                Hospital Pass
              </button>
              <button
                onClick={onEndDuty}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Conclude Shift & Bill
              </button>
            </div>
          </div>

          {/* Quick Bedside Action Buttons */}
          <div>
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider block mb-2">
              Quick Log: Tap to notify family in real-time
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleQuickLog('Offered fresh warm water & patient had 200ml', 'food')}
                className="p-3 bg-stone-50 hover:bg-teal-50 dark:bg-stone-800 dark:hover:bg-stone-750 dark:border-stone-700 border border-stone-200 rounded-xl text-left transition-colors text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2 cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Gave Water / Hydration</span>
              </button>

              <button
                onClick={() => handleQuickLog('Assisted patient with hot soup / meal as per diet chart', 'food')}
                className="p-3 bg-stone-50 hover:bg-teal-50 dark:bg-stone-800 dark:hover:bg-stone-750 dark:border-stone-700 border border-stone-200 rounded-xl text-left transition-colors text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2 cursor-pointer"
              >
                <Soup className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Assisted Meal / Soup</span>
              </button>

              <button
                onClick={() => handleQuickLog('Supported patient walking 10 steps in corridor & back to bed safely', 'mobility')}
                className="p-3 bg-stone-50 hover:bg-teal-50 dark:bg-stone-800 dark:hover:bg-stone-750 dark:border-stone-700 border border-stone-200 rounded-xl text-left transition-colors text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2 cursor-pointer"
              >
                <Footprints className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Mobility / Walk Support</span>
              </button>

              <button
                onClick={() => handleQuickLog('IV drip was low; alerted Ward Duty Sister who replaced saline', 'nurse')}
                className="p-3 bg-stone-50 hover:bg-rose-50 dark:bg-stone-800 dark:hover:bg-stone-750 dark:border-stone-700 border border-stone-200 rounded-xl text-left transition-colors text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Alerted On-Duty Nurse</span>
              </button>
            </div>
          </div>

          {/* Custom Log input */}
          <form onSubmit={handleCustomLogSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type specific care update for family (e.g. 'Patient sleeping peacefully, vitals normal')"
              value={customLogNote}
              onChange={(e) => setCustomLogNote(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log to Family</span>
            </button>
          </form>

        </div>
      )}

      {/* Case 4: No active duty right now */}
      {!hasIncomingDuty && !isAssigned && isOnline && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6 animate-bounce" />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            Waiting for Hospital Attendant Requests...
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            You are online. When a family raises a care request near Max Saket or AIIMS, your screen will buzz with the duty details and payout.
          </p>

          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center gap-3">
            <button
              onClick={onSwitchToFamilyView}
              className="text-xs font-semibold text-teal-800 hover:underline"
            >
              Switch to Family View to Raise a Test Booking →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
