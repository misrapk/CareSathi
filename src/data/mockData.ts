import { Hospital, CaregiverProfile } from '../types';

export const INDIAN_HOSPITALS: Hospital[] = [
  {
    id: 'aiims-delhi',
    name: 'AIIMS (All India Institute of Medical Sciences)',
    city: 'New Delhi',
    area: 'Ansari Nagar',
    popularWards: ['Ward 3A - Geriatric', 'Ward 5B - Orthopedic', 'Private Ward 2', 'Cardiology Stepdown'],
  },
  {
    id: 'max-saket',
    name: 'Max Super Speciality Hospital',
    city: 'New Delhi',
    area: 'Saket',
    popularWards: ['Ward 402 - General', 'Room 312 - Deluxe', 'Post-Op Recovery Ward B', 'Elderly Care Wing'],
  },
  {
    id: 'fortis-gurugram',
    name: 'Fortis Memorial Research Institute',
    city: 'Gurugram',
    area: 'Sector 44',
    popularWards: ['Ward 6A - Neuro', 'Ward 2C - Surgical Care', 'Deluxe Room 504'],
  },
  {
    id: 'apollo-chennai',
    name: 'Apollo Hospitals',
    city: 'Chennai',
    area: 'Greams Road',
    popularWards: ['Main Block Ward 3', 'Cardio Recovery 4th Floor', 'Private Wing Room 218'],
  },
  {
    id: 'lilavati-mumbai',
    name: 'Lilavati Hospital & Research Centre',
    city: 'Mumbai',
    area: 'Bandra West',
    popularWards: ['Ward 7 - Medical', 'Floor 5 - Semi-Private', 'Room 410'],
  },
  {
    id: 'manipal-bangalore',
    name: 'Manipal Hospital',
    city: 'Bengaluru',
    area: 'Old Airport Road',
    popularWards: ['General Ward 2B', 'Elder Care Suite 308', 'Post-Surgical Care Unit'],
  },
  {
    id: 'kgmu-lucknow',
    name: 'KGMU (King George’s Medical University)',
    city: 'Lucknow',
    area: 'Chowk',
    popularWards: ['Shatabdi Phase 2 - Ward 4', 'Gandhi Memorial Ward 3', 'Trauma Stepdown'],
  },
  {
    id: 'gangaram-delhi',
    name: 'Sir Ganga Ram Hospital',
    city: 'New Delhi',
    area: 'Rajinder Nagar',
    popularWards: ['Ward 10 - Nephrology', 'Private Room 405', 'Geriatric Bed 14'],
  },
];

export const INITIAL_CAREGIVERS: CaregiverProfile[] = [
  {
    id: 'sathi-1',
    name: 'Rameshwar Yadav',
    avatarColor: 'bg-emerald-600',
    gender: 'Male',
    age: 34,
    experienceYears: 6,
    qualification: 'GDA Certified (General Duty Assistant)',
    aadhaarVerified: true,
    policeVerificationPassed: true,
    hospitalPassApproved: true,
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 150,
    phone: '+91 98712 34567',
    bio: 'Patient, calm, and trained in elder bedside care, catheter bag monitoring, mobility support, and feeding. Fluent in Hindi and basic English.',
    primaryLanguages: ['Hindi', 'Bhojpuri', 'English'],
    currentHospitalNearby: 'Max Super Speciality Hospital, Saket',
    distanceKm: 0.8,
    etaMinutes: 10,
    status: 'available',
    badgeId: 'CS-DL-8841',
  },
  {
    id: 'sathi-2',
    name: 'Sunita Devi Sharma',
    avatarColor: 'bg-teal-600',
    gender: 'Female',
    age: 39,
    experienceYears: 8,
    qualification: 'Nursing Assistant (GNM / ANM)',
    aadhaarVerified: true,
    policeVerificationPassed: true,
    hospitalPassApproved: true,
    rating: 4.95,
    reviewsCount: 218,
    hourlyRate: 180,
    phone: '+91 98105 89214',
    bio: 'Specialized in post-operative care, elderly stroke patients, sponge bath, and night vigil. Attentive to doctor instructions and medication times.',
    primaryLanguages: ['Hindi', 'Punjabi', 'English'],
    currentHospitalNearby: 'AIIMS, New Delhi',
    distanceKm: 1.2,
    etaMinutes: 14,
    status: 'available',
    badgeId: 'CS-DL-5120',
  },
  {
    id: 'sathi-3',
    name: 'Manoj Kumar Verma',
    avatarColor: 'bg-indigo-600',
    gender: 'Male',
    age: 29,
    experienceYears: 4,
    qualification: 'Senior Patient Attendant',
    aadhaarVerified: true,
    policeVerificationPassed: true,
    hospitalPassApproved: true,
    rating: 4.85,
    reviewsCount: 94,
    hourlyRate: 120,
    phone: '+91 97110 43901',
    bio: 'Punctual bedside attendant for general ward sitting, wheeling to X-Ray/CT scan rooms, and assisting patient during family absence.',
    primaryLanguages: ['Hindi', 'English'],
    currentHospitalNearby: 'Safdarjung / AIIMS',
    distanceKm: 1.5,
    etaMinutes: 16,
    status: 'available',
    badgeId: 'CS-DL-9932',
  },
  {
    id: 'sathi-4',
    name: 'Anjali Mukherjee',
    avatarColor: 'bg-rose-600',
    gender: 'Female',
    age: 31,
    experienceYears: 5,
    qualification: 'GDA Certified (General Duty Assistant)',
    aadhaarVerified: true,
    policeVerificationPassed: true,
    hospitalPassApproved: true,
    rating: 4.92,
    reviewsCount: 160,
    hourlyRate: 160,
    phone: '+91 98302 76114',
    bio: 'Empathetic companion for admitted mothers and grandmothers. Experienced in bed-sore prevention, gentle back massage, reading, and moral comfort.',
    primaryLanguages: ['Bengali', 'Hindi', 'English'],
    currentHospitalNearby: 'Fortis Memorial, Gurugram',
    distanceKm: 2.1,
    etaMinutes: 18,
    status: 'available',
    badgeId: 'CS-HR-3049',
  },
  {
    id: 'sathi-5',
    name: 'Pradeep Gowda',
    avatarColor: 'bg-sky-600',
    gender: 'Male',
    age: 36,
    experienceYears: 7,
    qualification: 'Senior Patient Attendant',
    aadhaarVerified: true,
    policeVerificationPassed: true,
    hospitalPassApproved: true,
    rating: 4.88,
    reviewsCount: 110,
    hourlyRate: 140,
    phone: '+91 99801 22934',
    bio: 'Dedicated to overnight vigilance. Never sleeps on duty, monitors IV drip levels closely, and alerts nursing station immediately.',
    primaryLanguages: ['Kannada', 'Hindi', 'English'],
    currentHospitalNearby: 'Manipal Hospital, Old Airport Rd',
    distanceKm: 1.0,
    etaMinutes: 12,
    status: 'available',
    badgeId: 'CS-KA-4102',
  }
];

export const COMMON_CARE_NEEDS = [
  {
    id: 'companion-feeding',
    title: 'Elderly Bedside Care & Feeding',
    description: 'Serving meals, spoon-feeding, warm water hydration, and reassuring company.',
    baseRate: 120,
    recommendedFor: 'Elderly parents whose family has office/travel commitments',
  },
  {
    id: 'mobility-washroom',
    title: 'Mobility & Washroom Assistance',
    description: 'Helping sit up, slow corridor walking, wheelchair transfer, and washroom assistance.',
    baseRate: 150,
    recommendedFor: 'Orthopedic, post-op, or weak patients requiring steady physical help',
  },
  {
    id: 'night-vigil',
    title: 'Night Vigil & Nurse Alert',
    description: 'Staying awake beside patient all night, monitoring IV line, alerting nurse on distress.',
    baseRate: 180,
    recommendedFor: 'Overnight hospital stay when family members must rest or work next day',
  },
  {
    id: 'test-escort',
    title: 'Ward Companion & Diagnostic Escort',
    description: 'Accompanying to Ultrasound/CT Scan queues, collecting reports, pharmacy runs.',
    baseRate: 130,
    recommendedFor: 'Busy hospital days with multiple tests across building wings',
  }
];

export const HOSPITAL_EMERGENCY_DIRECTORY: Record<string, {
  casualty: string;
  nursingStation: string;
  rmoDesk: string;
  security: string;
  ambulance: string;
  notes: string;
}> = {
  'aiims-delhi': {
    casualty: '011-2659-4400',
    nursingStation: '011-2658-8500 (Ext 421)',
    rmoDesk: '011-2659-3333',
    security: '011-2659-3222',
    ambulance: '108 / 102',
    notes: 'Ansari Nagar Emergency Wing Code Blue Response',
  },
  'max-saket': {
    casualty: '011-4055-4055',
    nursingStation: '011-2651-5050 (Ext 302)',
    rmoDesk: '011-4055-4000',
    security: '011-4055-4111',
    ambulance: '011-4055-4055',
    notes: 'Max Saket Trauma & Emergency 24x7 Command Center',
  },
  'fortis-gurugram': {
    casualty: '0124-4921-021',
    nursingStation: '0124-4921-000',
    rmoDesk: '0124-4921-111',
    security: '0124-4921-099',
    ambulance: '105010',
    notes: 'FMRI Sector 44 Critical Care Response',
  },
  'apollo-chennai': {
    casualty: '044-2829-0200',
    nursingStation: '044-2829-3333',
    rmoDesk: '044-2829-1066',
    security: '044-2829-0111',
    ambulance: '1066',
    notes: 'Greams Road Apollo Emergency Network',
  },
  'lilavati-mumbai': {
    casualty: '022-2675-1000',
    nursingStation: '022-2656-8000',
    rmoDesk: '022-2675-1234',
    security: '022-2675-1100',
    ambulance: '022-2675-1555',
    notes: 'Bandra West Lilavati Critical Response Unit',
  },
  'manipal-bangalore': {
    casualty: '080-2502-4444',
    nursingStation: '080-2502-3344',
    rmoDesk: '080-2502-2222',
    security: '080-2502-1111',
    ambulance: '080-2222-1111',
    notes: 'Old Airport Road Manipal Rapid Response Team',
  },
  'kgmu-lucknow': {
    casualty: '0522-2257-540',
    nursingStation: '0522-2257-450',
    rmoDesk: '0522-2257-300',
    security: '0522-2257-100',
    ambulance: '108',
    notes: 'Chowk KGMU Trauma Central Control',
  },
  'gangaram-delhi': {
    casualty: '011-4225-4000',
    nursingStation: '011-4225-1000',
    rmoDesk: '011-4225-2000',
    security: '011-4225-1234',
    ambulance: '011-2586-1100',
    notes: 'Sir Ganga Ram Hospital 24x7 Emergency Desk',
  },
};

export const getHospitalEmergencyContacts = (hospitalId?: string, hospitalName?: string) => {
  if (hospitalId && HOSPITAL_EMERGENCY_DIRECTORY[hospitalId]) {
    return HOSPITAL_EMERGENCY_DIRECTORY[hospitalId];
  }
  // Try finding by name substring
  const key = Object.keys(HOSPITAL_EMERGENCY_DIRECTORY).find(k => 
    hospitalName && hospitalName.toLowerCase().includes(k.replace('-', ' '))
  );
  if (key && HOSPITAL_EMERGENCY_DIRECTORY[key]) {
    return HOSPITAL_EMERGENCY_DIRECTORY[key];
  }
  return {
    casualty: '112 / 108',
    nursingStation: 'Dial Ward Intercom (In-Room Nurse Bell)',
    rmoDesk: '108 (National Emergency)',
    security: 'Hospital Reception Gate 1',
    ambulance: '108',
    notes: 'Local Hospital Emergency Response & Ward Station',
  };
};

