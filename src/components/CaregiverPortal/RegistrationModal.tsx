import React, { useState } from 'react';
import { CaregiverProfile, CaregiverQualification } from '../../types';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  UserPlus, 
  Building2, 
  IndianRupee, 
  FileCheck, 
  Phone,
  Heart,
  BadgeCheck
} from 'lucide-react';

interface RegistrationModalProps {
  onRegisterCaregiver: (caregiver: CaregiverProfile) => void;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onRegisterCaregiver,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [phone, setPhone] = useState('+91 ');
  const [qualification, setQualification] = useState<CaregiverQualification>('GDA Certified (General Duty Assistant)');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(150);
  const [currentHospitalNearby, setCurrentHospitalNearby] = useState('AIIMS, New Delhi');
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-8921');
  const [languages, setLanguages] = useState('Hindi, English');
  const [bio, setBio] = useState('Compassionate attendant ready to sit beside elderly admitted patients, assist with feeding, mobility, and coordinate with nurses.');
  const [consentAadhaar, setConsentAadhaar] = useState(true);
  const [consentPolice, setConsentPolice] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredBadgeId, setRegisteredBadgeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBadgeId = `CS-IN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCaregiver: CaregiverProfile = {
      id: `sathi-user-${Date.now()}`,
      name: name.trim(),
      avatarColor: gender === 'Female' ? 'bg-teal-700' : 'bg-stone-800',
      gender,
      age,
      experienceYears,
      qualification,
      aadhaarVerified: true,
      policeVerificationPassed: true,
      hospitalPassApproved: true,
      rating: 5.0,
      reviewsCount: 1,
      hourlyRate,
      phone: phone.trim() || '+91 98000 12345',
      bio: bio.trim(),
      primaryLanguages: languages.split(',').map(l => l.trim()),
      currentHospitalNearby,
      distanceKm: 0.9,
      etaMinutes: 11,
      status: 'available',
      badgeId: newBadgeId,
    };

    setRegisteredBadgeId(newBadgeId);
    setIsSuccess(true);
    onRegisterCaregiver(newCaregiver);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      
      {!isSuccess ? (
        <>
          <div className="border-b border-stone-100 pb-5 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              <span>CARESATHI PARTNER NETWORK</span>
              <span aria-hidden="true">·</span>
              <span>EARN ₹100 - ₹250 PER HOUR</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Register as an On-Demand Hospital Bedside Attendant
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Are you willing to care for admitted hospital patients whose families are busy or travelling? Register your profile, accept hourly duties near you, and receive instant payouts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 mb-1">Full Legal Name (as per Aadhaar)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Age</label>
                <input
                  type="number"
                  min={18}
                  max={70}
                  required
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Mobile Number (for SMS & OTP)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  required
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {/* Care Category & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Qualification / Role Category</label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value as CaregiverQualification)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="GDA Certified (General Duty Assistant)">GDA Certified (General Duty Assistant)</option>
                  <option value="Nursing Assistant (GNM / ANM)">Nursing Assistant (GNM / ANM)</option>
                  <option value="Senior Patient Attendant">Senior Patient Attendant</option>
                  <option value="Compassionate Bedside Companion">Compassionate Bedside Companion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Your Hourly Fee Rate (in ₹ INR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={80}
                    max={500}
                    step={10}
                    required
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                  <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Most attendants charge ₹120 to ₹180/hr. 100% of this goes to you.
                </span>
              </div>
            </div>

            {/* Base hospital area & languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Preferred Hospital / Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Max Saket, AIIMS, Safdarjung"
                  value={currentHospitalNearby}
                  onChange={(e) => setCurrentHospitalNearby(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">Languages Spoken</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hindi, Bhojpuri, English"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">Short Introduction for Families</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            {/* Aadhaar & Background verification check */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <span className="font-bold text-stone-900 block">Trust & Verification Declarations:</span>
              
              <label className="flex items-start gap-2.5 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={consentAadhaar}
                  onChange={(e) => setConsentAadhaar(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-stone-300 text-teal-800 focus:ring-teal-700"
                />
                <span>
                  I hold a valid Government Aadhaar Card and consent to digital KYC identity verification.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={consentPolice}
                  onChange={(e) => setConsentPolice(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-stone-300 text-teal-800 focus:ring-teal-700"
                />
                <span>
                  I have no adverse criminal record and agree to hospital entry pass standards and nursing oversight.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Complete Partner Registration & Activate Badge</span>
            </button>

          </form>
        </>
      ) : (
        /* Success Screen */
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-9 h-9" />
          </div>

          <h3 className="text-2xl font-bold text-stone-900">
            Welcome to CareSathi, {name}!
          </h3>
          <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Your attendant partner profile is now active. Your digital hospital entry badge number is:
          </p>

          <div className="inline-block my-5 px-6 py-3 bg-stone-900 text-white rounded-xl font-mono text-xl font-bold tracking-wider">
            {registeredBadgeId}
          </div>

          <div className="max-w-md mx-auto bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-1.5 text-stone-700 mb-6">
            <div className="flex justify-between">
              <span className="text-stone-500">Hourly Rate:</span>
              <span className="font-bold text-stone-900">₹{hourlyRate}/hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Assigned Hospital Zone:</span>
              <span className="font-semibold text-stone-900">{currentHospitalNearby}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Verification Status:</span>
              <span className="text-emerald-700 font-bold">Instant KYC Approved</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Go to Attendant Console
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
