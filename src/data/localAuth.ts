import { AuthUser } from '../types';

const STORAGE_KEY_CURRENT_USER = 'caresathi_current_user';
const STORAGE_KEY_ALL_USERS = 'caresathi_all_users';

export const SEED_USERS: AuthUser[] = [
  {
    id: 'user-family-demo',
    name: 'Vikram Verma',
    phone: '+91 98112 40590',
    role: 'family',
    email: 'vikram.verma@example.com',
  },
  {
    id: 'user-attendant-demo',
    name: 'Rameshwar Yadav',
    phone: '+91 98712 34567',
    role: 'attendant',
    email: 'rameshwar.yadav@caresathi.in',
    badgeId: 'CS-DL-8841',
  },
  {
    id: 'user-attendant-sunita',
    name: 'Sunita Devi Sharma',
    phone: '+91 98105 89214',
    role: 'attendant',
    email: 'sunita.sharma@caresathi.in',
    badgeId: 'CS-DL-5120',
  }
];

export function getStoredUsers(): AuthUser[] {
  if (typeof window === 'undefined') return SEED_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALL_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to save auth state to localStorage', e);
  }
}

export function registerUser(name: string, phone: string, role: 'family' | 'attendant', badgeId?: string): AuthUser {
  const users = getStoredUsers();
  
  // Check if user with phone already exists
  const existingIndex = users.findIndex(u => u.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
  if (existingIndex >= 0) {
    const updated = {
      ...users[existingIndex],
      name: name.trim() || users[existingIndex].name,
      role: role,
      badgeId: role === 'attendant' ? (badgeId || users[existingIndex].badgeId || `CS-DL-${Math.floor(1000 + Math.random() * 9000)}`) : undefined,
    };
    users[existingIndex] = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(users));
    }
    saveCurrentUser(updated);
    return updated;
  }

  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    name: name.trim() || (role === 'family' ? 'Family Guardian' : 'CareSathi Attendant'),
    phone: phone.trim(),
    role,
    badgeId: role === 'attendant' ? (badgeId || `CS-DL-${Math.floor(1000 + Math.random() * 9000)}`) : undefined,
  };

  const updatedUsers = [newUser, ...users];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updatedUsers));
  }
  saveCurrentUser(newUser);
  return newUser;
}

export function loginUserByPhone(phone: string, role?: 'family' | 'attendant'): AuthUser {
  const users = getStoredUsers();
  const clean = phone.replace(/\s+/g, '');
  const found = users.find(u => u.phone.replace(/\s+/g, '') === clean);

  if (found) {
    const userToSave = role && found.role !== role ? { ...found, role } : found;
    saveCurrentUser(userToSave);
    return userToSave;
  }

  // Auto-create user if not found during demo phone login
  return registerUser(
    role === 'family' ? 'Patient Family' : 'CareSathi Partner',
    phone,
    role || 'family'
  );
}

export function logoutUser(): void {
  saveCurrentUser(null);
}
