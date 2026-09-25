import React, { useEffect, useState, useMemo } from 'react';
import { CaregiverProfile, PatientBookingRequest } from '../../types';
import { INITIAL_CAREGIVERS } from '../../data/mockData';
import { Radio, MapPin, User, ShieldCheck, Star, Clock, Check, ArrowRight, Award, Moon, Sparkles } from 'lucide-react';

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

  // Filter and sort caregivers based on specialized skill badges and shift type
  const sortedSathis = useMemo(() => {
    return [...INITIAL_CAREGIVERS].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Specialized Skill Badge Matching
      if (request.requiredSkillBadge && request.requiredSkillBadge !== 'Any') {
        if (a.skills.includes(request.requiredSkillBadge)) scoreA += 5;
        if (b.skills.includes(request.requiredSkillBadge)) scoreB += 5;
      }

      // Night Vigil Matching
      if (request.isNightVigil || request.shiftType === 'night_vigil') {
        if (a.skills.includes('Night Vigil Specialist')) scoreA += 6;
        if (b.skills.includes('Night Vigil Specialist')) scoreB += 6;
      }

      // Proximity score
      scoreA += (10 - a.distanceKm);
      scoreB += (10 - b.distanceKm);

      return scoreB - scoreA;
    });
  }, [request]);

  const nearbySathis = sortedSathis.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Auto-match after 6 seconds if family doesn't pick manually
    const autoMatchTimer = setTimeout(() => {
      const bestMatch = nearbySathis[0];
      if (bestMatch) {
        onMatched(bestMatch);
      }
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoMatchTimer);
    };
  }, [nearbySathis, onMatched]);

  const hasSpecificBadge = request.requiredSkillBadge && request.requiredSkillBadge !== 'Any';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto text-center transition-colors">
      
      {/* Radar Pulse Animation */}
      <div className="relative w-32 h-32 mx-auto mb-5 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-teal-100 dark:bg-teal-900/40 animate-ping opacity-35" />
        <div className="absolute inset-4 rounded-full bg-teal-200/50 dark:bg-teal-800/40 animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-teal-800 dark:bg-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
          <Radio className="w-8 h-8 animate-spin text-teal-200" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>SPECIALIZED RADAR DISPATCH ACTIVE</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
        Connecting with CareSathis near {request.hospitalName}
      </h3>
      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-md mx-auto">
        Broadcasting request for <span className="font-semibold text-stone-900 dark:text-white">{request.patientName}</span> ({request.wardRoomBed}).
      </p>

      {/* Matching Criteria Badges Tag */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {request.isNightVigil && (
          <span className="inline-flex items-center gap-1 text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
            <Moon className="w-3.5 h-3.5 text-amber-500" />
            Night Vigil Specialist Priority
          </span>
        )}
        {hasSpecificBadge && (
          <span className="inline-flex items-center gap-1 text-xs font-bold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            Required Skill: {request.requiredSkillBadge}
          </span>
        )}
      </div>

      {/* Ola/Uber Style Alert: You can test the driver side */}
      <div className="mt-5 p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
        <div>
          <span className="font-bold block">Testing Ola/Uber Driver Accept Flow?</span>
          <span className="text-amber-800 dark:text-amber-300">Switch to CareSathi Partner mode to test the incoming driver-side acceptance buzzer & OTP entry!</span>
        </div>
        <button
          onClick={onSwitchToPartnerView}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shrink-0 transition-colors cursor-pointer"
        >
          Open Attendant View
        </button>
      </div>

      {/* Nearby Attendants Ping List with SKILL BADGES */}
      <div className="mt-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Verified Nearby Sathis ({nearbySathis.length} Active in Radius)
          </div>
          <span className="text-[11px] text-teal-800 dark:text-teal-400 font-semibold">
            Filtered by Skill Badges
          </span>
        </div>

        <div className="space-y-3">
          {nearbySathis.map((sathi) => {
            const hasRequestedBadge = Boolean(
              hasSpecificBadge && 
              request.requiredSkillBadge && 
              request.requiredSkillBadge !== 'Any' && 
              sathi.skills.includes(request.requiredSkillBadge)
            );
            const hasNightBadge = Boolean(request.isNightVigil && sathi.skills.includes('Night Vigil Specialist'));
            const isTopMatch = hasRequestedBadge || hasNightBadge;

            return (
              <div
                key={sathi.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isTopMatch
                    ? 'border-teal-600/70 bg-teal-50/40 dark:bg-teal-950/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:bg-white dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${sathi.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0`}>
                    {sathi.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-sm text-stone-900 dark:text-white">{sathi.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      {isTopMatch && (
                        <span className="text-[10px] font-bold bg-teal-800 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> 100% Badge Match
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      <span className="flex items-center gap-0.5 text-stone-700 dark:text-stone-300 font-medium">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {sathi.rating} ({sathi.reviewsCount})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{sathi.experienceYears}y exp</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-teal-800 dark:text-teal-400 font-bold">₹{sathi.hourlyRate}/hr</span>
                    </div>

                    {/* Sathi Skill Badges Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {sathi.skills.map((skill) => {
                        const isHighlighted = (hasSpecificBadge && skill === request.requiredSkillBadge) ||
                          (request.isNightVigil && skill === 'Night Vigil Specialist');
                        return (
                          <span
                            key={skill}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium border flex items-center gap-1 ${
                              isHighlighted
                                ? 'bg-teal-700 text-white border-teal-800 shadow-2xs font-bold'
                                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                            }`}
                          >
                            <Award className="w-2.5 h-2.5" />
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-stone-700">
                  <div className="text-left sm:text-right text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-900 dark:text-white block tabular-nums">{sathi.etaMinutes} mins away</span>
                    <span>{sathi.distanceKm} km from ward</span>
                  </div>
                  <button
                    onClick={() => onMatched(sathi)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
                  >
                    <span>Confirm Sathi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancel button */}
      <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <span>Searching radius... ({secondsElapsed}s)</span>
        <button
          onClick={onCancel}
          className="text-rose-600 dark:text-rose-400 hover:text-rose-700 font-medium underline cursor-pointer"
        >
          Cancel Booking Request
        </button>
      </div>

    </div>
  );
};
