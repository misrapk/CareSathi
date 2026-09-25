import React, { useEffect, useState } from 'react';
import { CaregiverProfile, PatientBookingRequest } from '../../types';
import { INITIAL_CAREGIVERS } from '../../data/mockData';
import { Radio, MapPin, User, ShieldCheck, Star, Clock, Check, ArrowRight } from 'lucide-react';

interface MatchingRadarProps {
  request: PatientBookingRequest;
  onMatched: (caregiver: CaregiverProfile) => void;
  onCancel: () => void;
  onSwitchToPartnerView: () => void;
}

export const MatchingRadar: React.FC<MatchingRadarProps> = ({
  request,
  onMatched,
  onCancel,
  onSwitchToPartnerView,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [nearbySathis] = useState<CaregiverProfile[]>(INITIAL_CAREGIVERS.slice(0, 3));

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Auto-match after 4 seconds if user doesn't pick manually
    const autoMatchTimer = setTimeout(() => {
      const bestMatch = nearbySathis[0];
      if (bestMatch) {
        onMatched(bestMatch);
      }
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(autoMatchTimer);
    };
  }, [nearbySathis, onMatched]);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto text-center">
      
      {/* Radar Pulse Animation */}
      <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-35" />
        <div className="absolute inset-4 rounded-full bg-teal-200/50 animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-teal-800 text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
          <Radio className="w-9 h-9 animate-spin text-teal-200" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-700 mb-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        DISPATCHING REQUEST TO NEARBY SATHIS
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
        Connecting with CareSathis near {request.hospitalName}
      </h3>
      <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
        Broadcasting request for <span className="font-semibold text-stone-800">{request.patientName}</span> ({request.wardRoomBed}).
      </p>

      {/* Ola/Uber Style Alert: You can test the driver side */}
      <div className="mt-5 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
        <div>
          <span className="font-bold block">Want to accept this request yourself as the Attendant?</span>
          <span className="text-amber-800">Switch to CareSathi Partner mode to test the driver-side acceptance & OTP entry!</span>
        </div>
        <button
          onClick={onSwitchToPartnerView}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shrink-0 transition-colors"
        >
          Open Attendant View
        </button>
      </div>

      {/* Nearby Attendants Ping List */}
      <div className="mt-6 text-left">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Pinging Nearest Verified Attendants ({nearbySathis.length} Active in Area)
        </div>

        <div className="space-y-2.5">
          {nearbySathis.map((sathi, idx) => (
            <div
              key={sathi.id}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-teal-700/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${sathi.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                  {sathi.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-stone-900">{sathi.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span className="flex items-center gap-0.5 text-stone-700 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {sathi.rating}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{sathi.experienceYears}y exp</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-800 font-medium">₹{sathi.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-stone-500">
                  <span className="font-semibold text-stone-800 block tabular-nums">{sathi.etaMinutes} mins away</span>
                  <span>{sathi.distanceKm} km from ward</span>
                </div>
                <button
                  onClick={() => onMatched(sathi)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Select Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel button */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>Searching... ({secondsElapsed}s)</span>
        <button
          onClick={onCancel}
          className="text-rose-600 hover:text-rose-700 font-medium underline"
        >
          Cancel Booking Request
        </button>
      </div>

    </div>
  );
};
