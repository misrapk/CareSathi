import React, { useState, useEffect } from 'react';
import { 
  PatientBookingRequest, 
  CaregiverProfile, 
  CareLogItem,
  AuthUser
} from './types';
import { INITIAL_CAREGIVERS } from './data/mockData';
import { getCurrentUser, saveCurrentUser, logoutUser } from './data/localAuth';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { BookingForm } from './components/FamilyPortal/BookingForm';
import { MatchingRadar } from './components/FamilyPortal/MatchingRadar';
import { ActiveDutyView } from './components/FamilyPortal/ActiveDutyView';
import { PartnerDashboard } from './components/CaregiverPortal/PartnerDashboard';
import { RegistrationModal } from './components/CaregiverPortal/RegistrationModal';
import { HospitalPassModal } from './components/HospitalPassModal';
import { DutyCompletionModal } from './components/DutyCompletionModal';
import { SafetyTrustSection } from './components/SafetyTrustSection';
import { AuthModal } from './components/AuthModal';
import { 
  CheckCircle2, 
  Building2, 
  Stethoscope,
  UserCheck,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'family' | 'partner' | 'register' | 'safety'>('home');
  const [caregivers, setCaregivers] = useState<CaregiverProfile[]>(INITIAL_CAREGIVERS);
  const [activeBooking, setActiveBooking] = useState<PatientBookingRequest | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('caresathi_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // User Auth State from Local Storage Database
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    return getCurrentUser();
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'join'>('signin');
  const [authModalRole, setAuthModalRole] = useState<'family' | 'attendant'>('family');

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('caresathi_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('caresathi_dark_mode', 'false');
    }
  }, [isDark]);

  // Check URL query parameters for live watch links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const watchId = params.get('watch');
      if (watchId) {
        showToast('Connecting to Multi-Family Live Bedside Watch Stream...');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Generate 4-digit OTP
  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Safe navigation handler enforcing login for booking and attendant mode
  const handleNavigateView = (view: 'home' | 'family' | 'partner' | 'register' | 'safety') => {
    if (!currentUser && (view === 'family' || view === 'partner' || view === 'register')) {
      const targetRole = view === 'partner' || view === 'register' ? 'attendant' : 'family';
      setAuthModalRole(targetRole);
      setAuthModalMode('signin');
      setAuthModalOpen(true);
      showToast(`Please sign in or create an account to access ${view === 'family' ? 'booking' : 'attendant'} features.`);
      return;
    }
    setCurrentView(view);
  };

  // Step 1: Family submits booking request
  const handleCreateBooking = (
    formData: Omit<PatientBookingRequest, 'id' | 'requestedAt' | 'status' | 'startOtp' | 'careLogs'>
  ) => {
    setIsDispatching(true);
    const newOtp = generateOtp();
    const isNightShift = formData.isNightVigil || formData.shiftType === 'night_vigil';

    const initialCareLogs: CareLogItem[] = [
      {
        id: `log-init-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: `Booking request raised for ${formData.patientName} (${formData.wardRoomBed}). Shift: ${isNightShift ? 'Overnight Night Vigil (8 PM - 8 AM)' : 'Standard Hourly'}. Required Badge: ${formData.requiredSkillBadge || 'Any'}.`,
        category: 'general',
        loggedBy: 'CareSathi Dispatch',
      },
    ];

    if (isNightShift) {
      initialCareLogs.unshift({
        id: `log-vigil-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: '🌙 Night Vigil Protocol Activated: Mandatory 90-minute awake & vitals checks registered for assigned CareSathi.',
        category: 'awake_check',
        loggedBy: 'Vigil System',
      });
    }

    const newBooking: PatientBookingRequest = {
      ...formData,
      id: `CS-REQ-${Date.now()}`,
      requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'searching',
      startOtp: newOtp,
      careLogs: initialCareLogs,
      familyWatchMembers: [
        {
          id: 'watch-1',
          name: formData.requesterName || (currentUser?.name || 'Primary Family'),
          relation: `${formData.requesterRelation || 'Family'} (Booker)`,
          city: formData.hospitalCity,
          joinedAt: 'Active now',
        },
        {
          id: 'watch-2',
          name: 'Priya Verma',
          relation: 'Daughter (NRI)',
          city: 'California, USA',
          joinedAt: 'Connected to live stream',
        }
      ]
    };

    setActiveBooking(newBooking);
    setIsDispatching(false);
    showToast(isNightShift ? 'Dispatching request to nearest Night Vigil Specialists!' : 'Dispatching request to nearest verified CareSathis!');
  };

  // Step 2: Attendant matches (either auto-matched or manual select or Partner accepted)
  const handleCaregiverMatched = (caregiver: CaregiverProfile) => {
    if (!activeBooking) return;

    const updated: PatientBookingRequest = {
      ...activeBooking,
      status: 'matched',
      matchedCaregiverId: caregiver.id,
      matchedCaregiver: caregiver,
      careLogs: [
        {
          id: `log-matched-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `${caregiver.name} (Badge #${caregiver.badgeId}, ${caregiver.skills.join(', ')}) accepted duty. En route to ${activeBooking.wardRoomBed}. ETA: ${caregiver.etaMinutes} mins.`,
          category: 'general',
          loggedBy: caregiver.name,
        },
        ...activeBooking.careLogs,
      ],
    };

    setActiveBooking(updated);
    showToast(`${caregiver.name} accepted! Bedside Start OTP is ${activeBooking.startOtp}`);
  };

  // Step 3: Verify OTP (Ola/Uber style handshake)
  const handleVerifyOtp = (enteredOtp: string): boolean => {
    if (!activeBooking) return false;

    if (enteredOtp.trim() === activeBooking.startOtp.trim()) {
      const now = Date.now();
      const updated: PatientBookingRequest = {
        ...activeBooking,
        status: 'in_progress',
        dutyStartedAt: now,
        careLogs: [
          {
            id: `log-start-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: `OTP verified by family in room. Physical arrival confirmed at ${activeBooking.wardRoomBed}. Hourly duty clock started.`,
            category: 'general',
            loggedBy: activeBooking.matchedCaregiver?.name || 'CareSathi',
          },
          ...activeBooking.careLogs,
        ],
      };
      setActiveBooking(updated);
      showToast('OTP Verified! Hourly duty clock has started.');
      return true;
    }
    return false;
  };

  // Add real-time care log note
  const handleAddCareLog = (
    note: string,
    category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general' | 'awake_check'
  ) => {
    if (!activeBooking) return;

    const newLogItem: CareLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note,
      category,
      loggedBy: activeBooking.matchedCaregiver?.name || 'Attendant',
    };

    setActiveBooking({
      ...activeBooking,
      careLogs: [newLogItem, ...activeBooking.careLogs],
    });
    showToast('Activity logged for all connected family watchers.');
  };

  const handleAddFamilyNote = (note: string) => {
    if (!activeBooking) return;

    const newLogItem: CareLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: `Family Note: ${note}`,
      category: 'general',
      loggedBy: `${activeBooking.requesterName} (${activeBooking.requesterRelation})`,
    };

    setActiveBooking({
      ...activeBooking,
      careLogs: [newLogItem, ...activeBooking.careLogs],
    });
    showToast('Message sent to attendant.');
  };

  // End duty flow
  const handleTriggerEndDuty = () => {
    setShowCompletionModal(true);
  };

  const handleFinishAndReset = (
    rating: number,
    review: string,
    paymentMethod: 'upi' | 'cash'
  ) => {
    showToast(`Payment recorded via ${paymentMethod.toUpperCase()}. Thank you for using CareSathi!`);
    setShowCompletionModal(false);
    setActiveBooking(null);
  };

  // Onboard new caregiver
  const handleRegisterCaregiver = (newSathi: CaregiverProfile) => {
    setCaregivers([newSathi, ...caregivers]);
    showToast(`CareSathi partner profile for ${newSathi.name} registered successfully!`);
  };

  const handleOpenAuth = (mode: 'signin' | 'join', role?: 'family' | 'attendant') => {
    setAuthModalMode(mode);
    if (role) {
      setAuthModalRole(role);
    }
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    saveCurrentUser(user);
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Welcome ${user.name}! Signed in as ${user.role === 'family' ? 'Family Requester' : 'Attendant Partner'}.`);

    if (user.role === 'family') {
      setCurrentView('family');
    } else {
      setCurrentView('partner');
    }
  };

  const handleSignOut = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentView('home');
    showToast('Signed out of CareSathi. Returning to Home.');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onSelectView={handleNavigateView}
        hasActiveBooking={!!activeBooking}
        onJumpToActive={() => {
          if (currentUser) {
            if (activeBooking?.status === 'in_progress' || activeBooking?.status === 'matched') {
              setCurrentView('family');
            }
          } else {
            handleOpenAuth('signin', 'family');
          }
        }}
        activeOtp={activeBooking?.startOtp}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-stone-900 dark:bg-stone-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-top-3 duration-200 max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* VIEW 0: MINIMAL & MODERN HOME PAGE (ALWAYS ACCESSIBLE) */}
        {currentView === 'home' && (
          <HomePage
            onBookForPatient={() => {
              if (currentUser) {
                setCurrentView('family');
              } else {
                handleOpenAuth('signin', 'family');
              }
            }}
            onAttendantMode={() => {
              if (currentUser) {
                setCurrentView('partner');
              } else {
                handleOpenAuth('signin', 'attendant');
              }
            }}
            onOpenSafety={() => setCurrentView('safety')}
            onOpenAuth={handleOpenAuth}
            isAuthenticated={!!currentUser}
          />
        )}

        {/* AUTH GATE CHECK: IF ATTEMPTING PROTECTED VIEW WITHOUT LOGIN */}
        {!currentUser && (currentView === 'family' || currentView === 'partner' || currentView === 'register') && (
          <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">
                Sign In Required to Access Portal
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                To request hourly hospital attendants or accept bedside duties, please sign in or create a free account.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => handleOpenAuth('signin', currentView === 'partner' ? 'attendant' : 'family')}
                className="flex-1 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: FAMILY / PATIENT BOOKING MODE (PROTECTED: REQUIRES LOGIN) */}
        {currentUser && currentView === 'family' && (
          <div className="space-y-8">
            
            {/* Sub-view: Active booking in progress or matched */}
            {activeBooking && activeBooking.status !== 'searching' && (
              <ActiveDutyView
                request={activeBooking}
                onVerifyOtpDirectly={handleVerifyOtp}
                onEndDuty={handleTriggerEndDuty}
                onOpenPassModal={() => setShowPassModal(true)}
                onAddFamilyNote={handleAddFamilyNote}
                onSwitchToPartnerView={() => setCurrentView('partner')}
              />
            )}

            {/* Sub-view: Matching radar searching nearby */}
            {activeBooking && activeBooking.status === 'searching' && (
              <MatchingRadar
                request={activeBooking}
                onMatched={handleCaregiverMatched}
                onCancel={() => {
                  setActiveBooking(null);
                  showToast('Booking request cancelled.');
                }}
                onSwitchToPartnerView={() => setCurrentView('partner')}
              />
            )}

            {/* Sub-view: Fresh booking form */}
            {!activeBooking && (
              <BookingForm
                onSubmitBooking={handleCreateBooking}
                isDispatching={isDispatching}
              />
            )}

            {/* Hospital Trust Grid */}
            {!activeBooking && (
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    Stationed at Top Medical Institutions
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    CareSathis are available for dispatch near premier government and private multi-speciality hospitals.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">AIIMS New Delhi</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">Ansari Nagar · 14 Sathis</span>
                  </div>
                  <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">Max Super Speciality</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">Saket & Patparganj · 18 Sathis</span>
                  </div>
                  <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">Apollo Hospitals</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">Greams Rd Chennai · 12 Sathis</span>
                  </div>
                  <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">Fortis Healthcare</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">Gurugram & Mumbai · 15 Sathis</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: CAREGIVER PARTNER (ATTENDANT) MODE (PROTECTED: REQUIRES LOGIN) */}
        {currentUser && currentView === 'partner' && (
          <div className="space-y-6">
            <PartnerDashboard
              currentRequest={activeBooking}
              onAcceptRequest={() => {
                if (activeBooking) {
                  const defaultSathi = caregivers[0];
                  handleCaregiverMatched(defaultSathi);
                }
              }}
              onDeclineRequest={() => {
                showToast('Duty request passed.');
              }}
              onVerifyOtp={handleVerifyOtp}
              onAddCareLog={handleAddCareLog}
              onEndDuty={handleTriggerEndDuty}
              onOpenPassModal={() => setShowPassModal(true)}
              onSwitchToFamilyView={() => setCurrentView('family')}
            />
          </div>
        )}

        {/* VIEW 3: REGISTER AS ATTENDANT */}
        {currentUser && currentView === 'register' && (
          <div className="space-y-6">
            <RegistrationModal
              onRegisterCaregiver={handleRegisterCaregiver}
              onClose={() => setCurrentView('partner')}
            />
          </div>
        )}

        {/* VIEW 4: SAFETY & VERIFICATION (ALWAYS ACCESSIBLE) */}
        {currentView === 'safety' && (
          <div className="space-y-6">
            <SafetyTrustSection />
          </div>
        )}

      </main>

      {/* Hospital Attendant Pass Modal */}
      {showPassModal && activeBooking && (
        <HospitalPassModal
          request={activeBooking}
          onClose={() => setShowPassModal(false)}
        />
      )}

      {/* Duty Completion & Settle Payment Modal */}
      {showCompletionModal && activeBooking && (
        <DutyCompletionModal
          request={activeBooking}
          onFinishAndReset={handleFinishAndReset}
          onClose={() => setShowCompletionModal(false)}
        />
      )}

      {/* User Sign In / Join Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        targetRole={authModalRole}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-8 text-stone-500 dark:text-stone-400 text-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-800 dark:bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
              CS
            </div>
            <span className="font-semibold text-stone-900 dark:text-white">CareSathi Technologies</span>
            <span>· Dedicated Hospital Bedside Companion Network in India</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('home')} className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => setCurrentView('safety')} className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer">
              Safety Protocol
            </button>
            <button 
              onClick={() => {
                if (currentUser) {
                  setCurrentView('register');
                } else {
                  handleOpenAuth('join', 'attendant');
                }
              }} 
              className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Join as Sathi
            </button>
            <button onClick={toggleDarkMode} className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer">
              {isDark ? 'Light Theme' : 'Dark Theme'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
