import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '1998-04-15',
    gender: 'Male',
    bloodGroup: 'B+',
    address: 'Flat 204, Sunrise Apartments, Andheri West, Mumbai – 400058',
    emergencyContact: '9123456780',
    avatar: '👤',
    conditions: ['Hypertension'],
    allergies: ['Penicillin', 'Dust'],
    medications: ['Amlodipine 5mg', 'Vitamin D3'],
  });

  const update = (fields) => setProfile(p => ({ ...p, ...fields }));

  return (
    <ProfileContext.Provider value={{ profile, update }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
