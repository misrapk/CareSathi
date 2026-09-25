import React, { useState, useEffect } from 'react';
import { PatientBookingRequest, CareLogItem } from '../../types';
import { getHospitalEmergencyContacts } from '../../data/mockData';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  Bed, 
  IdCard, 
  Check, 
  Star,
  Activity,
  Heart,
  FileText,
  Siren,
  X,
  PhoneCall,
  BellRing,
  Share2,
  Copy
} from 'lucide-react';

interface ActiveDutyViewProps {
  request: PatientBookingRequest;
  onVerifyOtpDirectly: (enteredOtp: string) => boolean;
  onEndDuty: () => void;
  onOpenPassModal: () => void;
  onAddFamilyNote: (note: string) => void;
  onSwitchToPartnerView: () => void;
}

export const ActiveDutyView: React.FC<ActiveDutyViewProps> = ({
  request,
  onVerifyOtpDirectly,
  onEndDuty,
  onOpenPassModal,
  onAddFamilyNote,
  onSwitchToPartnerView
}) => {
  const caregiver = request.matchedCaregiver;
  const isStarted = request.status === 'in_progress';
  const isCompleted = request.status === 'completed';

  // Live timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [familyNoteInput, setFamilyNoteInput] = useState('');
  const [showManualOtpVerify, setShowManualOtpVerify] = useState(false);
  const [manualOtpInput, setManualOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  // Emergency SOS state
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [sosSentTime, setSosSentTime] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const emergencyContacts = getHospitalEmergencyContacts(request.hospitalId, request.hospitalName);

  useEffect(() => {
    if (!isStarted || !request.dutyStartedAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - request.dutyStartedAt!) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, request.dutyStartedAt]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleManualVerify = () => {
    const success = onVerifyOtpDirectly(manualOtpInput);
    if (success) {
      setOtpError('');
      setShowManualOtpVerify(false);
    } else {
      setOtpError('Invalid OTP. Please check the 4-digit code shown above.');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyNoteInput.trim()) return;
    onAddFamilyNote(familyNoteInput.trim());
    setFamilyNoteInput('');
  };

  const handleTriggerSos = () => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSosSentTime(timeString);
    setIsSosOpen(true);

    // Trigger haptic vibration if supported
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 300]);
    }

    // Automatically post high-priority SOS alert into the shared Care Logs
    const caregiverName = caregiver?.name || 'Assigned CareSathi';
    const alertNote = `🚨 [URGENT EMERGENCY SOS] Family triggered high-priority alert for ${request.patientName} at ${request.wardRoomBed}. Attendant ${caregiverName} instructed to check patient vitals immediately and ring the Ward Sister Bell!`;
    onAddFamilyNote(alertNote);
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleShareEmergencyDetails = () => {
    const message = encodeURIComponent(
      `🚨 EMERGENCY ALERT FOR PATIENT\n` +
      `Patient: ${request.patientName} (${request.patientAge}y)\n` +
      `Hospital: ${request.hospitalName}\n` +
      `Location: ${request.wardRoomBed}\n` +
      `Attendant: ${caregiver?.name || 'CareSathi'} (${caregiver?.phone || 'N/A'})\n` +
      `Hospital Casualty: ${emergencyContacts.casualty}\n` +
      `Nursing Station: ${emergencyContacts.nursingStation}\n` +
      `Time: ${new Date().toLocaleTimeString()}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner: Status & Hospital context */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              <span>{request.hospitalName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-800 font-bold">{request.wardRoomBed}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>Patient: {request.patientName}</span>
              <span className="text-xs font-normal text-stone-500">
                ({request.patientAge}y, {request.patientGender})
              </span>
            </h2>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {!isStarted && !isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Caregiver En Route · Share OTP on Arrival
              </span>
            )}
            {isStarted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Duty in Progress at Bedside
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Duty Completed
              </span>
            )}
          </div>
        </div>

        {/* THE OLA/UBER STYLE OTP SECTION */}
        {!isStarted && !isCompleted && (
          <div className="mt-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300/80 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Your Bedside Start Duty OTP (Ola/Uber Style Security)
                </div>
                <div className="text-xs text-amber-800 mt-1 max-w-lg">
                  When <span className="font-semibold text-stone-900">{caregiver?.name}</span> reaches the hospital room ({request.wardRoomBed}), verify their identity and share this OTP to start the hourly duty clock.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white px-5 py-3 rounded-xl border-2 border-amber-400 shadow-inner text-center">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-bold block">
                    START OTP
                  </span>
                  <span className="text-3xl font-black font-mono tracking-widest text-stone-950 tabular-nums">
                    {request.startOtp}
                  </span>
                </div>

                <button
                  onClick={() => setShowManualOtpVerify(!showManualOtpVerify)}
                  className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Verify Attendant Arrival
                </button>
              </div>
            </div>

            {/* Quick test prompt to switch to partner view */}
            <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center justify-between text-xs text-amber-900">
              <span>
                💡 Attendant can enter this code in <strong>Attendant Partner Mode</strong>.
              </span>
              <button
                onClick={onSwitchToPartnerView}
                className="font-bold underline text-amber-950 hover:text-amber-800"
              >
                Switch to Attendant Mode to Enter OTP →
              </button>
            </div>

            {showManualOtpVerify && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-amber-300 space-y-2">
                <label className="block text-xs font-semibold text-stone-800">
                  Simulate Attendant Arrival: Enter OTP ({request.startOtp}) to start clock:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-digit OTP"
                    value={manualOtpInput}
                    onChange={(e) => setManualOtpInput(e.target.value)}
                    className="w-40 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-center font-mono font-bold text-lg tracking-widest"
                  />
                  <button
                    onClick={handleManualVerify}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg"
                  >
                    Confirm Presence & Start Duty
                  </button>
                </div>
                {otpError && <p className="text-xs text-rose-600 font-semibold">{otpError}</p>}
              </div>
            )}
          </div>
        )}

        {/* Live Active Duty Clock when in progress */}
        {isStarted && (
          <div className="mt-5 p-5 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ACTIVE SHIFT CLOCK</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Rate: ₹{request.hourlyRate}/hr</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mt-1 tabular-nums">
                {formatTimer(elapsedSeconds)}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Started with verified OTP handshake at {new Date(request.dutyStartedAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenPassModal}
                className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                <IdCard className="w-4 h-4 text-teal-400" />
                <span>Attendant Pass</span>
              </button>

              <button
                onClick={onEndDuty}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Conclude Shift & Pay
              </button>
            </div>
          </div>
        )}

        {/* Caregiver Details Card */}
        {caregiver && (
          <div className="mt-6 p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${caregiver.avatarColor} text-white text-2xl font-bold flex items-center justify-center shadow-md shrink-0`}>
                  {caregiver.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      {caregiver.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      Aadhaar & Police Verified
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-1">
                    <span className="font-semibold text-stone-800">{caregiver.qualification}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-medium text-stone-800">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {caregiver.rating} ({caregiver.reviewsCount} reviews)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-800 font-bold">Badge #{caregiver.badgeId}</span>
                  </div>

                  <p className="text-xs text-stone-600 mt-1 max-w-xl">
                    {caregiver.bio}
                  </p>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${caregiver.phone}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Calling CareSathi Attendant ${caregiver.name} at ${caregiver.phone}`);
                  }}
                  className="px-3.5 py-2 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Call Attendant</span>
                </a>

                <button
                  onClick={() => {
                    const message = encodeURIComponent(`Hello ${caregiver.name}, checking in for patient ${request.patientName} at ${request.wardRoomBed}.`);
                    window.open(`https://wa.me/?text=${message}`, '_blank');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Real-time Bedside Care Activity Log */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-stone-900 text-base">
              Bedside Care Event Log (Real-Time Updates)
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Updated by Attendant & Family
          </span>
        </div>

        {/* Care log timeline */}
        <div className="space-y-3">
          {request.careLogs && request.careLogs.length > 0 ? (
            request.careLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{log.loggedBy}</span>
                    <span className="text-stone-400 font-mono tabular-nums">{log.timestamp}</span>
                  </div>
                  <p className="text-stone-700 mt-0.5 text-xs">{log.note}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-200">
              No entries logged yet. Milestones like water intake, nurse call, medication reminders will appear here live.
            </div>
          )}
        </div>

        {/* Add Family Message / Reminder */}
        <form onSubmit={handleAddNote} className="mt-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Send quick instruction to attendant (e.g. 'Father needs warm blanket')"
            value={familyNoteInput}
            onChange={(e) => setFamilyNoteInput(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
          >
            Post Update
          </button>
        </form>
      </div>

      {/* Safety & Hospital Nurse Coordination Box */}
      <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 text-teal-200" />
          </div>
          <div>
            <span className="font-bold block">Hospital Nursing Protocol:</span>
            <span className="text-teal-900">CareSathi works under on-duty hospital nurse supervision and will ring the emergency bell immediately if vitals change or patient is uncomfortable.</span>
          </div>
        </div>

        <button
          onClick={handleTriggerSos}
          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shrink-0 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Siren className="w-4 h-4 animate-bounce" />
          <span>Emergency SOS</span>
        </button>
      </div>

      {/* FLOATING SOS EMERGENCY BUTTON (OLA/UBER STYLE RAPID SAFETY TRIGGER) */}
      <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
        <button
          onClick={handleTriggerSos}
          aria-label="Trigger Hospital SOS Emergency Alert"
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-full font-bold text-sm shadow-2xl shadow-rose-600/50 ring-4 ring-rose-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
        >
          {/* Animated beacon ring */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          <Siren className="w-5 h-5 text-white animate-pulse" />
          <span className="tracking-wide uppercase font-extrabold text-xs sm:text-sm">
            SOS Emergency
          </span>
        </button>
      </div>

      {/* SOS EMERGENCY DIALOG & HOSPITAL CONTACTS MODAL */}
      {isSosOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-rose-500 animate-in fade-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Top Header */}
            <div className="bg-gradient-to-r from-rose-700 to-red-700 text-white p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                  <Siren className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-extrabold text-rose-200 block">
                    EMERGENCY RESPONSE PROTOCOL ACTIVE
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    Hospital Bedside SOS Alert
                  </h3>
                  <div className="text-xs text-rose-100 flex items-center gap-2 mt-0.5">
                    <span>{request.hospitalName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold underline">{request.wardRoomBed}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSosOpen(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Alert Dispatched Status Banner */}
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <BellRing className="w-4 h-4 animate-ping" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-950 uppercase tracking-wide">
                      Alert Dispatched to Attendant
                    </span>
                    <span className="font-mono text-rose-700 font-semibold">{sosSentTime}</span>
                  </div>
                  <p className="text-rose-900 mt-1">
                    An urgent notification has been broadcast to <strong className="font-semibold text-stone-900">{caregiver?.name || 'CareSathi'}</strong> to check on <strong className="font-semibold text-stone-900">{request.patientName}</strong> immediately and alert the Ward Sister.
                  </p>
                </div>
              </div>

              {/* Patient Bed Location Card */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-stone-500 block">Admitted Patient:</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {request.patientName} ({request.patientAge}y, {request.patientGender})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block">Exact Ward Location:</span>
                  <span className="font-bold text-teal-800 text-sm">{request.wardRoomBed}</span>
                </div>
              </div>

              {/* Attendant Direct Action */}
              {caregiver && (
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${caregiver.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                      {caregiver.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 block">Bedside CareSathi:</span>
                      <span className="font-bold text-stone-900 text-sm">{caregiver.name}</span>
                      <span className="text-[11px] text-stone-500 block">Badge #{caregiver.badgeId}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${caregiver.phone}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Sathi</span>
                  </a>
                </div>
              )}

              {/* Hospital Emergency Response Directory */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-stone-600" />
                    <span>{request.hospitalName} Emergency Directory</span>
                  </h4>
                  <span className="text-[11px] text-rose-600 font-semibold">24x7 Response</span>
                </div>

                <div className="space-y-2 text-xs">
                  
                  {/* 1. Ward Nursing Sister Desk */}
                  <div className="p-3 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Ward Nursing Station (Sister In-Charge)
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        Direct desk intercom for {request.wardRoomBed}
                      </span>
                      <span className="font-mono font-bold text-teal-800 block mt-0.5">
                        {emergencyContacts.nursingStation}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.nursingStation)}
                        className="p-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-600"
                        title="Copy number"
                      >
                        {copiedNumber === emergencyContacts.nursingStation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${emergencyContacts.nursingStation}`}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Dial</span>
                      </a>
                    </div>
                  </div>

                  {/* 2. Hospital Casualty / Code Blue Desk */}
                  <div className="p-3 bg-rose-50/70 hover:bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-rose-950 block">
                          Casualty & Code Blue Command Center
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">
                          Priority
                        </span>
                      </div>
                      <span className="text-stone-500 text-[11px]">
                        Hospital Rapid Resuscitation & Critical Care
                      </span>
                      <span className="font-mono font-bold text-rose-900 block mt-0.5">
                        {emergencyContacts.casualty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.casualty)}
                        className="p-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-600"
                        title="Copy number"
                      >
                        {copiedNumber === emergencyContacts.casualty ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${emergencyContacts.casualty}`}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>

                  {/* 3. Resident Medical Officer (RMO) */}
                  <div className="p-3 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Duty Resident Medical Officer (RMO Desk)
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        On-duty medical doctor for floor escalations
                      </span>
                      <span className="font-mono font-bold text-stone-800 block mt-0.5">
                        {emergencyContacts.rmoDesk}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.rmoDesk)}
                        className="p-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-600"
                        title="Copy number"
                      >
                        {copiedNumber === emergencyContacts.rmoDesk ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${emergencyContacts.rmoDesk}`}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Dial</span>
                      </a>
                    </div>
                  </div>

                  {/* 4. Security & Floor Control */}
                  <div className="p-3 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Hospital Security & Access Control
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        Stretcher movement, lift priority & gate access
                      </span>
                      <span className="font-mono font-bold text-stone-800 block mt-0.5">
                        {emergencyContacts.security}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${emergencyContacts.security}`}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg border border-stone-300"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  {/* 5. National Ambulance Services */}
                  <div className="p-3 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 block">
                        National Emergency & Ambulance (108 / 112)
                      </span>
                      <span className="font-mono font-bold text-stone-800 block mt-0.5">
                        {emergencyContacts.ambulance}
                      </span>
                    </div>
                    <a
                      href={`tel:${emergencyContacts.ambulance}`}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg border border-stone-300"
                    >
                      Call
                    </a>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleShareEmergencyDetails}
                  className="w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Broadcast Location & Contacts on WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsSosOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close Alert
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
