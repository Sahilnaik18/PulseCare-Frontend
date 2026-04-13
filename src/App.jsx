import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileContainer from './layout/MobileContainer';
import { OnboardingProvider } from './context/OnboardingContext';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import Welcome from './pages/Welcome';

export default function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <MobileContainer>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/onboarding/1" element={<Onboarding1 />} />
            <Route path="/onboarding/2" element={<Onboarding2 />} />
            <Route path="/onboarding/3" element={<Onboarding3 />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MobileContainer>
      </OnboardingProvider>
    </BrowserRouter>
  );
}
