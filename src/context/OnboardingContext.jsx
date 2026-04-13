import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [data, setData] = useState({
    phone: '',
    age: '',
    gender: '',
    conditions: [],
    name: '',
    email: '',
  });

  const update = (fields) => setData((prev) => ({ ...prev, ...fields }));

  return (
    <OnboardingContext.Provider value={{ data, update }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
