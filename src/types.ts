export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: 'family' | 'attendant';
  email?: string;
  badgeId?: string;
}

export type CaregiverQualification = 
  | 'GDA Certified (General Duty Assistant)'
  | 'Nursing Assistant (GNM / ANM)'
  | 'Senior Patient Attendant'
  | 'Compassionate Bedside Companion';

export interface CaregiverProfile {
  id: string;
  name: string;
  avatarColor: string;
  gender: 'Male' | 'Female';
  age: number;
  experienceYears: number;
  qualification: CaregiverQualification;
  aadhaarVerified: boolean;
  policeVerificationPassed: boolean;
  hospitalPassApproved: boolean;
  rating: number;
  reviewsCount: number;
  hourlyRate: number; // in INR (₹)
  phone: string;
  bio: string;
  primaryLanguages: string[];
  currentHospitalNearby: string;
  distanceKm: number;
  etaMinutes: number;
  status: 'available' | 'busy' | 'offline';
  badgeId: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  area: string;
  popularWards: string[];
}

export type BookingStatus = 'searching' | 'matched' | 'in_progress' | 'completed' | 'cancelled';

export interface CareLogItem {
  id: string;
  timestamp: string;
  note: string;
  category: 'vitals' | 'food' | 'mobility' | 'medication' | 'nurse' | 'general';
  loggedBy: string;
}

export interface PatientBookingRequest {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  hospitalId: string;
  hospitalName: string;
  hospitalCity: string;
  wardRoomBed: string;
  attendantPassAvailable: boolean;
  primaryNeed: string;
  specialInstructions?: string;
  preferredAttendantGender: 'Any' | 'Male' | 'Female';
  preferredLanguage: string;
  requestedHours: number;
  hourlyRate: number;
  totalEstimatedCost: number;
  requestedAt: string;
  requesterName: string;
  requesterPhone: string;
  requesterRelation: string;
  status: BookingStatus;
  matchedCaregiverId?: string;
  matchedCaregiver?: CaregiverProfile;
  startOtp: string; // 4-digit code e.g. "5839"
  dutyStartedAt?: number; // epoch ms
  dutyEndedAt?: number;
  actualElapsedSeconds?: number;
  finalTotalCost?: number;
  careLogs: CareLogItem[];
  paymentStatus?: 'pending' | 'paid_cash' | 'paid_upi';
  ratingGiven?: number;
  reviewGiven?: string;
}
