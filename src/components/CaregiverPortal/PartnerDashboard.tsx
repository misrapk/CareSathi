import React, { useState } from 'react';
import { PatientBookingRequest, SathiSkillBadge } from '../../types';
import { 
  Power, 
  Clock, 
  ShieldCheck, 
  Bed, 
  Building2, 
  KeyRound, 
  Wallet, 
  Heart,
  Droplets,
  Soup,
  Footprints,
  Pill,
  Send,
  Award,
  Moon,
  Sparkles,
  CheckCircle2,
  BellRing
} from 'lucide-react';

interface PartnerDashboardProps {
  currentRequest: PatientBookingRequest | null;
  onAcceptRequest: () => void;
  onDeclineRequest: () => void;
  onVerifyOtp: (enteredOtp: string) => boolean;
  onAddCareLog: (note: string, category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general' | 'awake_check') => void;
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
  const isShiftActive = currentRequest?.status === 'in_progress';
  const hasIncomingDuty = currentRequest && currentRequest.status === 'searching';
  const isNightVigil = currentRequest?.isNightVigil || currentRequest?.shiftType === 'night_vigil';

  // Partner's verified badges
  const partnerBadges: SathiSkillBadge[] = [
    'Night Vigil Specialist',
    'GDA Clinical Assistant',
    'IV & Vitals Vigilance',
    'Post-Op Mobility'
  ];

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

  const handleQuickLog = (note: string, category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general' | 'awake_check') => {
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
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <span>CARESATHI PARTNER CONSOLE</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400">OLA / UBER DRIVER MODEL</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Attendant: Rameshwar Yadav</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              Badge #CS-DL-8841
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 mt-1.5">
            <span>GDA Certified</span>
            <span aria-hidden="true">·</span>
            <span>Max Super Speciality & AIIMS Radius</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">₹150/hr Base Rate</span>
          </div>

          {/* SATHI SKILL BADGES BAR */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-stone-800">
            <span className="text-[11px] text-stone-400 flex items-center gap-1 font-semibold mr-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Verified Sathi Badges:
            </span>
            {partnerBadges.map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-800 text-teal-300 border border-stone-700 flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Online / Offline Switch */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
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
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">₹1,800</span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">Overnight & hourly duty</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Hours On-Duty</span>
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">12.0 hrs</span>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">Ward 402 - Bed #12</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Partner Rating</span>
          <span className="text-xl font-bold text-stone-900 dark:text-white tabular-nums">4.9 ★</span>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">142 patient families</span>
        </div>
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Instant Payout</span>
          <button
            onClick={() => alert('Payout of ₹1,800 initiated to your linked UPI VPA (rameshwar@okaxis). Transfer time: Instant.')}
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
            <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-white dark:bg-stone-900 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
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
              {currentRequest.requiredSkillBadge && currentRequest.requiredSkillBadge !== 'Any' && (
                <div className="text-xs text-teal-800 dark:text-teal-300 mt-1.5 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Required Badge: {currentRequest.requiredSkillBadge}</span>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200 dark:border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-stone-500 dark:text-stone-400">Estimated Total Earnings:</span>
                <div className="text-2xl font-black text-emerald-800 dark:text-emerald-400 tabular-nums mt-0.5">
                  ₹{currentRequest.totalEstimatedCost}
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {currentRequest.requestedHours} hours {isNightVigil ? '(Night Vigil)' : `@ ₹${currentRequest.hourlyRate}/hr`}
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
                placeholder="4-digit OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-44 mx-auto block px-3 py-2 text-center text-2xl font-mono font-black tracking-widest bg-white dark:bg-stone-900 border-2 border-teal-700 rounded-xl text-stone-900 dark:text-white focus:outline-none"
              />

              {otpError && (
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold block mt-2">
                  {otpError}
                </span>
              )}

              <button
                type="submit"
                className="mt-4 w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
              >
                Validate OTP & Start Bedside Shift
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Case 3: DUTY IN PROGRESS - BED LOGGING & NIGHT VIGIL CONSOLE */}
      {isShiftActive && currentRequest && (
        <div className="space-y-6">
          
          {/* Active Shift Header */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border-2 border-emerald-600 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  ACTIVE BEDSIDE DUTY IN PROGRESS
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                  Sitting with {currentRequest.patientName} ({currentRequest.wardRoomBed})
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {currentRequest.hospitalName} · Rate: ₹{currentRequest.hourlyRate}/hr
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenPassModal}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl border border-stone-300 dark:border-stone-700 cursor-pointer"
                >
                  Entry Pass
                </button>
                <button
                  onClick={onEndDuty}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                >
                  Conclude Shift & Request Payment
                </button>
              </div>
            </div>

            {/* FEATURE: NIGHT VIGIL 90-MINUTE AWAKE LOGGING STATION */}
            {isNightVigil && (
              <div className="mt-4 p-4 bg-gradient-to-r from-stone-900 to-indigo-950 text-white rounded-2xl border border-indigo-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs uppercase tracking-wide text-amber-300">
                      Night Vigil Awake Protocol (Every 90 Mins)
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-stone-300">
                    Family Sees This Live
                  </span>
                </div>

                <p className="text-xs text-stone-300">
                  Tap any status below to immediately post a verified awake check to the patient family's live screen:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleQuickLog('🌙 Awake Check: Patient sleeping peacefully. IV drip flow steady, blanket adjusted.', 'awake_check')}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-medium border border-white/15 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>✓ Vitals steady, IV normal</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                  <button
                    onClick={() => handleQuickLog('🌙 Awake Check: Assisted warm water sip. Changed position to prevent bedsores.', 'awake_check')}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-medium border border-white/15 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>✓ Water sip & turned posture</span>
                    <Droplets className="w-3.5 h-3.5 text-teal-300" />
                  </button>
                  <button
                    onClick={() => handleQuickLog('🌙 Awake Check: Patient woke up feeling restless. Comforted patient, all stable.', 'awake_check')}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-medium border border-white/15 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>✓ Patient checked & reassured</span>
                    <Heart className="w-3.5 h-3.5 text-rose-300" />
                  </button>
                  <button
                    onClick={() => handleQuickLog('🌙 Awake Check: Ward nurse checked temperature & BP. All normal.', 'awake_check')}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-medium border border-white/15 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>✓ Sister vitals round completed</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Standard Quick Care Actions (Food, Water, Walk, Sister Bell) */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                  One-Tap Bedside Action Log:
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Instant SMS/App sync to family
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleQuickLog('Hydration: Assisted patient with warm water sip (200ml)', 'food')}
                  className="p-3 bg-stone-50 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-xl border border-stone-200 dark:border-stone-700 text-left transition-all cursor-pointer group"
                >
                  <Droplets className="w-4 h-4 text-teal-700 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white block mt-1">Water / Tea</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Log hydration</span>
                </button>

                <button
                  onClick={() => handleQuickLog('Meal: Spoon-fed warm hospital dalia & fruits', 'food')}
                  className="p-3 bg-stone-50 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-xl border border-stone-200 dark:border-stone-700 text-left transition-all cursor-pointer group"
                >
                  <Soup className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white block mt-1">Meal Served</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Feeding support</span>
                </button>

                <button
                  onClick={() => handleQuickLog('Mobility: Supported slow 5-minute corridor walk & washroom visit', 'mobility')}
                  className="p-3 bg-stone-50 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-xl border border-stone-200 dark:border-stone-700 text-left transition-all cursor-pointer group"
                >
                  <Footprints className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white block mt-1">Walk / Washroom</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Mobility assisted</span>
                </button>

                <button
                  onClick={() => handleQuickLog('Nurse Call: Rung bedside emergency bell for IV replacement', 'nurse')}
                  className="p-3 bg-stone-50 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl border border-stone-200 dark:border-stone-700 text-left transition-all cursor-pointer group"
                >
                  <BellRing className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-stone-900 dark:text-white block mt-1">Sister Bell</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Nurse assistance</span>
                </button>
              </div>

              {/* Custom Attendant Log */}
              <form onSubmit={handleCustomLogSubmit} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type specific care note (e.g. 'Doctor visited for morning rounds')"
                  value={customLogNote}
                  onChange={(e) => setCustomLogNote(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>Post Note</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

      {/* Case 4: IDLE CONSOLE - WAITING FOR DISPATCH */}
      {!currentRequest && (
        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-stone-900 dark:text-white">
              You are Online & Ready for Bedside Duties
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              Requests raised by patient families at Max Saket, AIIMS, and Apollo will buzzer here in real time.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onSwitchToFamilyView}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Switch to Family View to Raise a Test Request →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
