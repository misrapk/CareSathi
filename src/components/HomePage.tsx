import React from 'react';
import { 
  Stethoscope, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  KeyRound, 
  Activity, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Sparkles,
  Bed,
  BellRing
} from 'lucide-react';

interface HomePageProps {
  onBookForPatient: () => void;
  onAttendantMode: () => void;
  onOpenSafety: () => void;
  onOpenAuth: (mode: 'signin' | 'join') => void;
  isAuthenticated: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onBookForPatient,
  onAttendantMode,
  onOpenSafety,
  onOpenAuth,
  isAuthenticated
}) => {
  return (
    <div className="space-y-16 py-4 sm:py-8">
      
      {/* 1. HERO SECTION: LARGE TEXT, LARGE GRAPHIC, TWO PROMINENT BUTTONS */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-100/90 via-stone-50 to-white dark:from-stone-900/80 dark:via-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 p-8 sm:p-12 lg:p-16">
        
        {/* Subtle decorative glowing mesh */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Headline, Description, Two Primary Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimal Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-stone-800/80 rounded-full text-xs font-semibold text-teal-800 dark:text-teal-300 border border-stone-200 dark:border-stone-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ON-DEMAND HOSPITAL ATTENDANTS IN INDIA</span>
            </div>

            {/* Large Bold Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black text-stone-950 dark:text-white tracking-tight leading-[1.08] text-balance">
                CareSathi
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-teal-400 tracking-tight leading-snug">
                Dignified bedside care in Indian hospitals, by the hour.
              </p>
            </div>

            {/* Clean Subtitle */}
            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
              When relatives have urgent office commitments, travel, or childcare duties, verified hospital companions step in to provide meals, mobility support, and continuous bedside vigilance.
            </p>

            {/* TWO PROMINENT ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onBookForPatient}
                className="px-6 py-4 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-teal-900/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Stethoscope className="w-5 h-5 text-teal-200" />
                <span>Book for Patient</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onAttendantMode}
                className="px-6 py-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 border border-stone-700/50 shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserCheck className="w-5 h-5 text-amber-400" />
                <span>Attendant Mode</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                100% Aadhaar & Police Checked
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Ola/Uber 4-Digit Bedside OTP
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ₹100 – ₹180 / hr
              </span>
            </div>

          </div>

          {/* Right Column: LARGE GRAPHIC OF CARESATHI */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Illustration Box */}
              <div className="bg-white dark:bg-stone-850 rounded-3xl p-6 border-2 border-stone-200/90 dark:border-stone-700 shadow-xl relative overflow-hidden">
                
                {/* SVG Graphic Scene of CareSathi Bedside Care */}
                <svg
                  viewBox="0 0 400 320"
                  className="w-full h-auto drop-shadow-sm"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="wallGlow" x1="0" y1="0" x2="400" y2="320" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F0FDFA" stopOpacity="0.8" />
                      <stop stopColor="#E0F2FE" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="bedGrad" x1="50" y1="180" x2="350" y2="280" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0F766E" />
                      <stop stopColor="#115E59" />
                    </linearGradient>
                    <linearGradient id="warmLight" x1="200" y1="20" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FEF3C7" stopOpacity="0.6" />
                      <stop stopColor="#FEF3C7" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Room Ambient Background */}
                  <rect width="400" height="320" rx="16" fill="url(#wallGlow)" />
                  <path d="M 0 240 L 400 240 L 400 320 L 0 320 Z" fill="#E2E8F0" opacity="0.6" />

                  {/* Hospital Window & Soft Daylight */}
                  <rect x="30" y="30" width="80" height="100" rx="8" fill="#BAE6FD" opacity="0.6" />
                  <line x1="70" y1="30" x2="70" y2="130" stroke="#7DD3FC" strokeWidth="2" />
                  <line x1="30" y1="80" x2="110" y2="80" stroke="#7DD3FC" strokeWidth="2" />

                  {/* Vitals Monitor on Stand */}
                  <rect x="290" y="60" width="85" height="60" rx="8" fill="#1E293B" />
                  <rect x="295" y="65" width="75" height="50" rx="4" fill="#0F172A" />
                  {/* ECG Line */}
                  <path
                    d="M 300 90 L 315 90 L 320 80 L 325 102 L 332 75 L 338 95 L 343 90 L 365 90"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Heart Icon on Monitor */}
                  <circle cx="355" cy="76" r="4" fill="#EF4444" />
                  <line x1="332" y1="120" x2="332" y2="240" stroke="#94A3B8" strokeWidth="3" />
                  <line x1="315" y1="240" x2="350" y2="240" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />

                  {/* Hospital Bed */}
                  <rect x="60" y="190" width="220" height="40" rx="10" fill="url(#bedGrad)" />
                  {/* Bed Frame & Legs */}
                  <rect x="50" y="160" width="16" height="85" rx="6" fill="#64748B" />
                  <rect x="265" y="180" width="16" height="65" rx="6" fill="#64748B" />
                  <circle cx="58" cy="248" r="5" fill="#475569" />
                  <circle cx="273" cy="248" r="5" fill="#475569" />

                  {/* Bed Pillow & Patient Contour */}
                  <ellipse cx="95" cy="182" rx="20" ry="10" fill="#F8FAFC" />
                  <path d="M 85 180 C 100 165, 140 170, 160 185 L 255 195 L 255 210 L 80 210 Z" fill="#F1F5F9" />

                  {/* Patient Head & Peaceful Expression */}
                  <circle cx="102" cy="170" r="12" fill="#FDE68A" />
                  <path d="M 98 168 Q 102 171 106 168" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

                  {/* CareSathi Attendant Companion Sitting Beside */}
                  {/* Chair */}
                  <rect x="180" y="200" width="35" height="45" rx="4" fill="#CBD5E1" />
                  <line x1="182" y1="245" x2="182" y2="270" stroke="#64748B" strokeWidth="3" />
                  <line x1="213" y1="245" x2="213" y2="270" stroke="#64748B" strokeWidth="3" />

                  {/* Attendant Figure in Clean Teal Scrub */}
                  <circle cx="200" cy="148" r="14" fill="#FDE68A" />
                  <path d="M 194 146 Q 198 149 202 146" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Scrub Jacket */}
                  <path d="M 182 166 C 182 166, 190 162, 200 162 C 210 162, 218 166, 218 166 L 222 215 L 178 215 Z" fill="#0D9488" />
                  {/* ID Pass Lanyard */}
                  <path d="M 194 162 L 200 180 L 206 162" stroke="#F59E0B" strokeWidth="1.8" fill="none" />
                  <rect x="195" y="180" width="10" height="12" rx="2" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1" />

                  {/* Caring Gesture: Attendant's Hand Gently Comforting Patient's Arm */}
                  <path d="M 182 185 Q 165 185 145 188" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 130 188 Q 140 188 150 188" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
                </svg>

                {/* Floating Glassmorphic Pill 1: 4-Digit Bedside OTP Handshake */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-300 dark:border-amber-700 shadow-md flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-semibold leading-tight">
                      BEDSIDE OTP
                    </span>
                    <span className="font-mono font-black text-xs text-stone-900 dark:text-white tracking-wider">
                      5 8 4 2 · Verified
                    </span>
                  </div>
                </div>

                {/* Floating Glassmorphic Pill 2: Live Activity Milestone */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-900 dark:text-white block leading-tight">
                        Warm Meal & Hydration Assisted
                      </span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">
                        Room 402 · Attendant on duty
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Live
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 2. THE THREE CORE ESSENTIAL FEATURES */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
            HOW CARESATHI WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Built for Real Indian Hospital Realities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white leading-snug">
                1. Hourly Bedside Presence
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Zero monthly contracts or ayah broker fees. Pay only for the exact hours your parent needs assistance (₹100–₹180/hr) while you work or travel.
              </p>
            </div>
            <div className="text-xs font-semibold text-teal-800 dark:text-teal-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              Transparent UPI / Cash Settlement
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white leading-snug">
                2. Ola/Uber Bedside OTP
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Duty time never begins until your CareSathi physically arrives at the patient's hospital bed and validates your 4-digit security OTP.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-800 dark:text-amber-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              Guaranteed Physical Presence
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white leading-snug">
                3. Live Logs & Nurse Alert
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Follow meals, water intake, and corridor walks on your mobile in real time, backed by 1-tap in-ward hospital emergency nurse coordination.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              Floating SOS Emergency Directory
            </div>
          </div>

        </div>
      </section>

      {/* 3. QUICK CTA FOOTER CARD */}
      <section className="bg-stone-900 dark:bg-stone-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Ready to arrange a bedside companion or earn as an attendant?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            Join thousands of patient families and verified attendants across top Indian hospitals.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAuth('join')}
            className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Join CareSathi
          </button>
          <button
            onClick={onOpenSafety}
            className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Learn About Safety
          </button>
        </div>
      </section>

    </div>
  );
};
