import React, { useState } from 'react';
import { INDIAN_HOSPITALS, COMMON_CARE_NEEDS } from '../../data/mockData';
import { PatientBookingRequest, SathiSkillBadge } from '../../types';
import { 
  Building2, 
  Bed, 
  Clock, 
  User, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  HelpCircle,
  AlertCircle,
  Moon,
  Award
} from 'lucide-react';

interface BookingFormProps {
  onSubmitBooking: (request: Omit<PatientBookingRequest, 'id' | 'requestedAt' | 'status' | 'startOtp' | 'careLogs'>) => void;
  isDispatching: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmitBooking, isDispatching }) => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('max-saket');
  const [customHospital, setCustomHospital] = useState('');
  const [wardRoomBed, setWardRoomBed] = useState('Ward 402 - General Bed #12');
  const [attendantPassAvailable, setAttendantPassAvailable] = useState(true);

  // Patient info
  const [patientName, setPatientName] = useState('Shri Om Prakash Verma');
  const [patientAge, setPatientAge] = useState<number>(72);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  // Care need & hours
  const [shiftType, setShiftType] = useState<'hourly' | 'night_vigil'>('hourly');
  const [selectedNeedId, setSelectedNeedId] = useState<string>('companion-feeding');
  const [requestedHours, setRequestedHours] = useState<number>(4);
  const [requiredSkillBadge, setRequiredSkillBadge] = useState<SathiSkillBadge | 'Any'>('Any');
  const [specialInstructions, setSpecialInstructions] = useState('Father had cataract & knee discomfort. Needs steady support walking to washroom and gentle reminder for warm soup at 8:30 PM.');
  const [preferredAttendantGender, setPreferredAttendantGender] = useState<'Any' | 'Male' | 'Female'>('Any');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi');

  // Requester contact
  const [requesterName, setRequesterName] = useState('Vikram Verma');
  const [requesterPhone, setRequesterPhone] = useState('+91 98112 40590');
  const [requesterRelation, setRequesterRelation] = useState('Son');

  // Price calculation
  const isNightShift = shiftType === 'night_vigil';
  const effectiveHours = isNightShift ? 12 : requestedHours;
  const currentNeed = COMMON_CARE_NEEDS.find(n => n.id === selectedNeedId) || COMMON_CARE_NEEDS[0];
  const hourlyRate = isNightShift ? 150 : currentNeed.baseRate;
  const totalEstimatedCost = isNightShift ? 1800 : (hourlyRate * requestedHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentHospitalObj = INDIAN_HOSPITALS.find(h => h.id === selectedHospitalId);
    const finalHospitalName = selectedHospitalId === 'other' ? customHospital : (currentHospitalObj?.name || 'Hospital');
    const finalHospitalCity = selectedHospitalId === 'other' ? 'India' : (currentHospitalObj?.city || 'Delhi NCR');

    onSubmitBooking({
      patientName,
      patientAge,
      patientGender,
      hospitalId: selectedHospitalId,
      hospitalName: finalHospitalName,
      hospitalCity: finalHospitalCity,
      wardRoomBed,
      attendantPassAvailable,
      primaryNeed: isNightShift ? 'Scheduled Night Vigil (8 PM - 8 AM)' : currentNeed.title,
      specialInstructions,
      preferredAttendantGender,
      preferredLanguage,
      requiredSkillBadge,
      shiftType,
      isNightVigil: isNightShift,
      requestedHours: effectiveHours,
      hourlyRate,
      totalEstimatedCost,
      requesterName,
      requesterPhone,
      requesterRelation,
    });
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm p-6 sm:p-8 transition-colors">
      
      {/* Header / Context */}
      <div className="border-b border-stone-100 dark:border-stone-800 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-400 tracking-wide mb-1">
          <span>OLA / UBER STYLE DISPATCH</span>
          <span aria-hidden="true">·</span>
          <span>VERIFIED BEDSIDE ATTENDANT</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
          Request an Hourly Attendant for Hospital Bedside Care
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl">
          Have urgent work, travel, or need rest? Our verified CareSathi attendants sit beside your loved one, assist with meals, monitor IV fluids, and coordinate with hospital nurses.
        </p>

        {/* Shift Type Switcher: Standard Hourly vs Night Vigil */}
        <div className="mt-5 grid grid-cols-2 gap-3 p-1.5 bg-stone-100 dark:bg-stone-800/80 rounded-2xl max-w-md">
          <button
            type="button"
            onClick={() => setShiftType('hourly')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              shiftType === 'hourly'
                ? 'bg-white dark:bg-stone-900 text-teal-900 dark:text-teal-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Standard Hourly Shift</span>
          </button>
          <button
            type="button"
            onClick={() => setShiftType('night_vigil')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              shiftType === 'night_vigil'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>Night Vigil (8 PM - 8 AM)</span>
          </button>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Hospital & Room Location */}
        <div>
          <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
            1. Hospital & Ward Details (Where is patient admitted?)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Select Hospital</label>
              <div className="relative">
                <select
                  value={selectedHospitalId}
                  onChange={(e) => setSelectedHospitalId(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-colors"
                >
                  {INDIAN_HOSPITALS.map((h) => (
                    <option key={h.id} value={h.id} className="dark:bg-stone-800">
                      {h.name} ({h.city})
                    </option>
                  ))}
                  <option value="other" className="dark:bg-stone-800">Other Hospital (Enter Name)</option>
                </select>
                <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {selectedHospitalId === 'other' ? (
              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Hospital Name & City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaslok Hospital, Mumbai"
                  value={customHospital}
                  onChange={(e) => setCustomHospital(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Ward / Room / Bed Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward 402, Bed #12 (or Private Room 312)"
                    value={wardRoomBed}
                    onChange={(e) => setWardRoomBed(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                  <Bed className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            )}
          </div>

          {/* Attendant Pass note */}
          <div className="mt-3 flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-700 text-xs">
            <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
              <Shield className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
              <span>Hospital Attendant Pass: CareSathi carries verified Aadhaar & Police ID to obtain visitor badge.</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800 dark:text-stone-200 shrink-0">
              <input
                type="checkbox"
                checked={attendantPassAvailable}
                onChange={(e) => setAttendantPassAvailable(e.target.checked)}
                className="rounded border-stone-300 dark:border-stone-600 text-teal-800 focus:ring-teal-700"
              />
              <span>Physical pass in room</span>
            </label>
          </div>
        </div>

        {/* Section 2: Patient Information */}
        <div>
          <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
            2. Patient Information
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Patient Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
                <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Age (Years)</label>
              <input
                type="number"
                min={1}
                max={120}
                required
                value={patientAge}
                onChange={(e) => setPatientAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Gender</label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value as 'Male' | 'Female' | 'Other')}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              >
                <option value="Male" className="dark:bg-stone-800">Male</option>
                <option value="Female" className="dark:bg-stone-800">Female</option>
                <option value="Other" className="dark:bg-stone-800">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Care Need, Night Vigil & Specialized Skill Badges */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              3. Nature of Assistance & Skill Requirements
            </label>
            <span className="text-xs text-teal-800 dark:text-teal-400 font-medium">Transparent Hourly / Shift Pricing</span>
          </div>

          {/* Night Vigil Highlight Card when selected */}
          {isNightShift ? (
            <div className="p-4 bg-gradient-to-r from-stone-900 to-teal-950 text-white rounded-2xl border border-teal-800 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-800 flex items-center justify-center text-amber-300">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      Scheduled Night Vigil (Raat Ki Chowki)
                    </h4>
                    <span className="text-xs text-stone-300">
                      8:00 PM to 8:00 AM (12 Hours Full Overnight Vigil)
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-teal-900/80 text-amber-300 text-xs font-bold rounded-lg border border-teal-700 tabular-nums">
                  ₹1,800 Flat
                </span>
              </div>
              <div className="text-xs text-stone-300 bg-black/20 p-2.5 rounded-xl border border-white/10 space-y-1">
                <span className="font-semibold text-amber-300 block">✓ Automatic 90-Minute Awake Checks:</span>
                <span>The night attendant must confirm awake vigilance every 90 minutes (checking IV fluid, patient comfort, vitals monitor) and log it live for your family.</span>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMON_CARE_NEEDS.map((need) => {
                  const isSelected = selectedNeedId === need.id;
                  return (
                    <button
                      type="button"
                      key={need.id}
                      onClick={() => setSelectedNeedId(need.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-700 bg-teal-50/70 dark:bg-teal-950/40 dark:border-teal-500 shadow-sm ring-1 ring-teal-700'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-850'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-sm text-stone-900 dark:text-white leading-snug">
                          {need.title}
                        </span>
                        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 bg-white dark:bg-stone-800 px-2 py-0.5 rounded-md border border-stone-200 dark:border-stone-700 tabular-nums">
                          ₹{need.baseRate}/hr
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                        {need.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Hours Duration Selector */}
              <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Required Care Duration (Hours):
                  </span>
                  <span className="text-sm font-bold text-teal-900 dark:text-teal-300 tabular-nums">
                    {requestedHours} {requestedHours === 1 ? 'Hour' : 'Hours'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8].map((hrs) => (
                    <button
                      type="button"
                      key={hrs}
                      onClick={() => setRequestedHours(hrs)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        requestedHours === hrs
                          ? 'bg-teal-800 dark:bg-teal-700 text-white border-teal-800 dark:border-teal-700 shadow-sm'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SATHI SKILL BADGES & SPECIALIZED MATCHING */}
          <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                Required Sathi Skill Badge (Specialized Matching):
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Filtered Attendants
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Any',
                'Night Vigil Specialist',
                'Post-Op Mobility',
                'Dementia & Elder Companion',
                'GDA Clinical Assistant',
                'IV & Vitals Vigilance'
              ].map((badge) => {
                const isSelected = requiredSkillBadge === badge;
                return (
                  <button
                    type="button"
                    key={badge}
                    onClick={() => setRequiredSkillBadge(badge as SathiSkillBadge | 'Any')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-800 dark:bg-teal-700 text-white border-teal-800 shadow-xs'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {badge === 'Any' ? 'Any Verified Sathi' : badge}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: Special Instructions & Attendant Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1">
              Care Instructions for Attendant
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Diabetic patient, feed half glass soup, help walk, ring nurse bell if saline finishes"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
            />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Attendant Gender</label>
                <select
                  value={preferredAttendantGender}
                  onChange={(e) => setPreferredAttendantGender(e.target.value as 'Any' | 'Male' | 'Female')}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Any" className="dark:bg-stone-800">Any Gender</option>
                  <option value="Male" className="dark:bg-stone-800">Male Attendant</option>
                  <option value="Female" className="dark:bg-stone-800">Female Attendant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Language</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Hindi" className="dark:bg-stone-800">Hindi</option>
                  <option value="English" className="dark:bg-stone-800">English</option>
                  <option value="Bengali" className="dark:bg-stone-800">Bengali</option>
                  <option value="Punjabi" className="dark:bg-stone-800">Punjabi</option>
                  <option value="Tamil" className="dark:bg-stone-800">Tamil</option>
                  <option value="Telugu" className="dark:bg-stone-800">Telugu</option>
                  <option value="Kannada" className="dark:bg-stone-800">Kannada</option>
                  <option value="Marathi" className="dark:bg-stone-800">Marathi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Your Contact & Relation</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Vikram)"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
                <input
                  type="tel"
                  required
                  placeholder="+91 98112 XXXXX"
                  value={requesterPhone}
                  onChange={(e) => setRequesterPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary & Dispatch CTA */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 dark:bg-stone-950 text-white border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <span>ESTIMATED HOURLY CHARGE</span>
                <span aria-hidden="true">·</span>
                <span>{effectiveHours} HOURS {isNightShift ? '(NIGHT VIGIL FLAT)' : `@ ₹${hourlyRate}/HR`}</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-white">
                  ₹{totalEstimatedCost}
                </span>
                <span className="text-xs text-stone-300">
                  (Pay after OTP start & shift conclusion)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-2">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Police & Aadhaar Checked
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  OTP Handshake
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No Surge Fee
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isDispatching}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {isDispatching ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Nearby Sathis...</span>
                </>
              ) : (
                <>
                  <span>Request CareSathi Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        </div>

      </form>
    </div>
  );
};
