import React, { useState, useEffect } from 'react';
import { PatientBookingRequest, CareLogItem, FamilyWatchMember } from '../../types';
import { getHospitalEmergencyContacts } from '../../data/mockData';
import { FamilyWatchModal } from '../FamilyWatchModal';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Bed, 
  IdCard, 
  Check, 
  Star,
  Activity,
  Heart,
  Siren,
  X,
  PhoneCall,
  BellRing,
  Share2,
  Copy,
  Users,
  Moon,
  Award,
  Sparkles,
  Eye
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
  const isNightVigil = request.isNightVigil || request.shiftType === 'night_vigil';

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

  // Multi-Family Live Watch state
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);
  const [familyWatchers, setFamilyWatchers] = useState<FamilyWatchMember[]>(() => {
    return request.familyWatchMembers && request.familyWatchMembers.length > 0 
      ? request.familyWatchMembers 
      : [
          {
            id: 'mem-1',
            name: request.requesterName,
            relation: `${request.requesterRelation} (Primary Booker)`,
            city: request.hospitalCity,
            joinedAt: 'Active at bedside',
          },
          {
            id: 'mem-2',
            name: 'Priya Verma',
            relation: 'Daughter (NRI)',
            city: 'California, USA',
            joinedAt: 'Watching live',
          }
        ];
  });

  const [copiedLink, setCopiedLink] = useState(false);

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

    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 300]);
    }

    const caregiverName = caregiver?.name || 'Assigned CareSathi';
    const alertNote = `🚨 [URGENT EMERGENCY SOS] Family triggered high-priority alert for ${request.patientName} at ${request.wardRoomBed}. Attendant ${caregiverName} instructed to check patient vitals immediately and ring the Ward Sister Bell!`;
    onAddFamilyNote(alertNote);
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleCopyWatchLink = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://caresathi.app'}?watch=${request.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddWatcherMember = (member: FamilyWatchMember) => {
    setFamilyWatchers(prev => [...prev, member]);
    onAddFamilyNote(`Family Watch: ${member.name} (${member.relation} from ${member.city}) joined live bedside watch.`);
  };

  const handleRequestAwakeCheck = () => {
    onAddFamilyNote(`Family Vigil Ping: Family requested an instant awake & comfort check on ${request.patientName}.`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner: Status & Hospital context */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm p-6 sm:p-7 transition-colors">
        
        {/* Top Header line with Live Watch Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
              <span>{request.hospitalName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-800 dark:text-teal-400 font-bold">{request.wardRoomBed}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Patient: {request.patientName}</span>
              <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                ({request.patientAge}y, {request.patientGender})
              </span>
            </h2>
          </div>

          {/* Status & Multi-Family Watch Action */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Multi-Family Watch Pill Button */}
            <button
              onClick={() => setIsWatchModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-900 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span>Family Watch ({familyWatchers.length} Live)</span>
              <Eye className="w-3 h-3 text-emerald-500 animate-pulse ml-0.5" />
            </button>

            {!isStarted && !isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Caregiver En Route · Share OTP on Arrival
              </span>
            )}
            {isStarted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Duty in Progress at Bedside
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Duty Completed
              </span>
            )}
          </div>
        </div>

        {/* FEATURE: MULTI-FAMILY LIVE WATCH QUICK BAR */}
        <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
            <Users className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
            <span>
              <strong>Live Family Watch Link:</strong> Relatives in other cities or overseas are connected to this room.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyWatchLink}
              className="px-3 py-1 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-lg font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
            <button
              onClick={() => setIsWatchModalOpen(true)}
              className="px-3 py-1 bg-teal-800 hover:bg-teal-900 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Share2 className="w-3 h-3" />
              <span>Invite Family</span>
            </button>
          </div>
        </div>

        {/* FEATURE: SCHEDULED NIGHT VIGIL COMMAND BAR (IF NIGHT VIGIL) */}
        {isNightVigil && (
          <div className="mt-4 p-4 bg-gradient-to-r from-stone-900 via-stone-850 to-teal-950 text-white rounded-2xl border border-teal-800 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-800 flex items-center justify-center text-amber-300">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Scheduled Night Vigil Active (8:00 PM – 8:00 AM)</span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-300/30">
                      Pledged Awake
                    </span>
                  </h4>
                  <span className="text-xs text-stone-300">
                    Mandatory 90-minute awake logs · Constant IV fluid & vitals supervision
                  </span>
                </div>
              </div>

              <button
                onClick={handleRequestAwakeCheck}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
              >
                <BellRing className="w-3.5 h-3.5 text-amber-300" />
                <span>Request Status Ping</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-300">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-stone-400 block font-semibold">OVERNIGHT PROTOCOL</span>
                <span className="font-bold text-white">Full 12-Hour Shift</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-stone-400 block font-semibold">AWAKE CHECK INTERVAL</span>
                <span className="font-bold text-amber-300">Every 90 Minutes</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-stone-400 block font-semibold">WARD NURSE ESCALATION</span>
                <span className="font-bold text-emerald-400">Emergency Sister Bell Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* THE OLA/UBER STYLE OTP SECTION */}
        {!isStarted && !isCompleted && (
          <div className="mt-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-2xl border-2 border-amber-300/80 dark:border-amber-700/80 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  Your Bedside Start Duty OTP (Ola/Uber Style Security)
                </div>
                <div className="text-xs text-amber-800 dark:text-amber-200 mt-1 max-w-lg">
                  When <span className="font-semibold text-stone-900 dark:text-white">{caregiver?.name}</span> reaches the hospital room ({request.wardRoomBed}), verify their identity and share this OTP to start the hourly duty clock.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white dark:bg-stone-900 px-5 py-3 rounded-xl border-2 border-amber-400 dark:border-amber-600 shadow-inner text-center">
                  <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold block">
                    START OTP
                  </span>
                  <span className="text-3xl font-black font-mono tracking-widest text-stone-950 dark:text-white tabular-nums">
                    {request.startOtp}
                  </span>
                </div>

                <button
                  onClick={() => setShowManualOtpVerify(!showManualOtpVerify)}
                  className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Verify Attendant Arrival
                </button>
              </div>
            </div>

            {/* Quick test prompt to switch to partner view */}
            <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-amber-800/60 flex flex-wrap items-center justify-between text-xs text-amber-900 dark:text-amber-200">
              <span>
                💡 Attendant can enter this code in <strong>Attendant Partner Mode</strong>.
              </span>
              <button
                onClick={onSwitchToPartnerView}
                className="font-bold underline text-amber-950 dark:text-amber-300 hover:text-amber-800 cursor-pointer"
              >
                Switch to Attendant Mode to Enter OTP →
              </button>
            </div>

            {showManualOtpVerify && (
              <div className="mt-4 p-4 bg-white dark:bg-stone-850 rounded-xl border border-amber-300 dark:border-amber-700 space-y-2">
                <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Simulate Attendant Arrival: Enter OTP ({request.startOtp}) to start clock:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-digit OTP"
                    value={manualOtpInput}
                    onChange={(e) => setManualOtpInput(e.target.value)}
                    className="w-40 px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-center font-mono font-bold text-lg tracking-widest text-stone-900 dark:text-white"
                  />
                  <button
                    onClick={handleManualVerify}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer"
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
          <div className="mt-5 p-5 bg-stone-900 dark:bg-stone-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800">
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
                className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IdCard className="w-4 h-4 text-teal-400" />
                <span>Attendant Pass</span>
              </button>

              <button
                onClick={onEndDuty}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Conclude Shift & Pay
              </button>
            </div>
          </div>
        )}

        {/* Caregiver Details Card with SATHI SKILL BADGES */}
        {caregiver && (
          <div className="mt-6 p-4 sm:p-5 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${caregiver.avatarColor} text-white text-2xl font-bold flex items-center justify-center shadow-md shrink-0`}>
                  {caregiver.name.charAt(0)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                      {caregiver.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                      Aadhaar & Police Verified
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mt-1">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{caregiver.qualification}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-medium text-stone-800 dark:text-stone-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {caregiver.rating} ({caregiver.reviewsCount} reviews)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-800 dark:text-teal-400 font-bold">Badge #{caregiver.badgeId}</span>
                  </div>

                  {/* SATHI SKILL BADGES DISPLAY */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {caregiver.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center gap-1"
                      >
                        <Award className="w-2.5 h-2.5 text-teal-700 dark:text-teal-400" />
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 max-w-xl">
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
                  className="px-3.5 py-2 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-900 dark:text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Call Attendant</span>
                </a>

                <button
                  onClick={() => {
                    const message = encodeURIComponent(`Hello ${caregiver.name}, checking in for patient ${request.patientName} at ${request.wardRoomBed}.`);
                    window.open(`https://wa.me/?text=${message}`, '_blank');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
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
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 transition-colors">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              Bedside Care Event Log (Real-Time Updates)
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Synchronized for all family watchers
          </span>
        </div>

        {/* Care log timeline */}
        <div className="space-y-3">
          {request.careLogs && request.careLogs.length > 0 ? (
            request.careLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/80 dark:border-stone-800 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-white">{log.loggedBy}</span>
                    <span className="text-stone-400 font-mono tabular-nums">{log.timestamp}</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 mt-0.5 text-xs">{log.note}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-stone-500 bg-stone-50 dark:bg-stone-850 rounded-xl border border-dashed border-stone-200 dark:border-stone-800">
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
            className="flex-1 px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Post Update
          </button>
        </form>
      </div>

      {/* Safety & Hospital Nurse Coordination Box */}
      <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-950 dark:text-teal-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 text-teal-200" />
          </div>
          <div>
            <span className="font-bold block">Hospital Nursing Protocol:</span>
            <span className="text-teal-900 dark:text-teal-300">CareSathi works under on-duty hospital nurse supervision and will ring the emergency bell immediately if vitals change or patient is uncomfortable.</span>
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
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-rose-500 animate-in fade-in zoom-in-95 duration-200 my-8">
            
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
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Alert Dispatched Status Banner */}
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <BellRing className="w-4 h-4 animate-ping" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wide">
                      Alert Dispatched to Attendant
                    </span>
                    <span className="font-mono text-rose-700 dark:text-rose-400 font-semibold">{sosSentTime}</span>
                  </div>
                  <p className="text-rose-900 dark:text-rose-300 mt-1">
                    An urgent notification has been broadcast to <strong className="font-semibold text-stone-900 dark:text-white">{caregiver?.name || 'CareSathi'}</strong> to check on <strong className="font-semibold text-stone-900 dark:text-white">{request.patientName}</strong> immediately and alert the Ward Sister.
                  </p>
                </div>
              </div>

              {/* Patient Bed Location Card */}
              <div className="bg-stone-50 dark:bg-stone-850 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block">Admitted Patient:</span>
                  <span className="font-bold text-stone-900 dark:text-white text-sm">
                    {request.patientName} ({request.patientAge}y, {request.patientGender})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 dark:text-stone-400 block">Exact Ward Location:</span>
                  <span className="font-bold text-teal-800 dark:text-teal-400 text-sm">{request.wardRoomBed}</span>
                </div>
              </div>

              {/* Attendant Direct Action */}
              {caregiver && (
                <div className="p-3.5 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${caregiver.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                      {caregiver.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 dark:text-stone-400 block">Bedside CareSathi:</span>
                      <span className="font-bold text-stone-900 dark:text-white text-sm">{caregiver.name}</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Badge #{caregiver.badgeId}</span>
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
                  <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-stone-600" />
                    <span>{request.hospitalName} Emergency Directory</span>
                  </h4>
                  <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">24x7 Response</span>
                </div>

                <div className="space-y-2 text-xs">
                  
                  {/* 1. Ward Nursing Sister Desk */}
                  <div className="p-3 bg-stone-50 dark:bg-stone-850 hover:bg-white dark:hover:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">
                        Ward Nursing Station (Sister In-Charge)
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                        Direct desk intercom for {request.wardRoomBed}
                      </span>
                      <span className="font-mono font-bold text-teal-800 dark:text-teal-400 block mt-0.5">
                        {emergencyContacts.nursingStation}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.nursingStation)}
                        className="p-2 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-300"
                        title="Copy number"
                      >
                        {copiedNumber === emergencyContacts.nursingStation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${emergencyContacts.nursingStation}`}
                        className="px-3 py-1.5 bg-stone-900 dark:bg-teal-700 hover:bg-stone-800 dark:hover:bg-teal-600 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Dial</span>
                      </a>
                    </div>
                  </div>

                  {/* 2. Hospital Casualty / Code Blue Desk */}
                  <div className="p-3 bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl border border-rose-200 dark:border-rose-900 flex items-center justify-between transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-rose-950 dark:text-rose-200 block">
                          Casualty & Code Blue Command Center
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                          Priority
                        </span>
                      </div>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                        Hospital Rapid Resuscitation & Critical Care
                      </span>
                      <span className="font-mono font-bold text-rose-900 dark:text-rose-300 block mt-0.5">
                        {emergencyContacts.casualty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.casualty)}
                        className="p-2 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-300"
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
                  <div className="p-3 bg-stone-50 dark:bg-stone-850 hover:bg-white dark:hover:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between transition-colors">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">
                        Duty Resident Medical Officer (RMO Desk)
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                        On-duty medical doctor for floor escalations
                      </span>
                      <span className="font-mono font-bold text-stone-800 dark:text-stone-200 block mt-0.5">
                        {emergencyContacts.rmoDesk}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(emergencyContacts.rmoDesk)}
                        className="p-2 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-300"
                        title="Copy number"
                      >
                        {copiedNumber === emergencyContacts.rmoDesk ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${emergencyContacts.rmoDesk}`}
                        className="px-3 py-1.5 bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Dial</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsSosOpen(false)}
                  className="w-full py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close Alert
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MULTI-FAMILY LIVE WATCH MODAL */}
      {isWatchModalOpen && (
        <FamilyWatchModal
          request={{
            ...request,
            familyWatchMembers: familyWatchers
          }}
          onClose={() => setIsWatchModalOpen(false)}
          onAddMember={handleAddWatcherMember}
        />
      )}

    </div>
  );
};
