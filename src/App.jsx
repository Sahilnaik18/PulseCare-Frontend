import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileContainer from './layout/MobileContainer';
import { OnboardingProvider } from './context/OnboardingContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProfileProvider } from './context/ProfileContext';

import Splash        from './pages/Splash';
import Intro         from './pages/Intro';
import Login         from './pages/Login';
import OTP           from './pages/OTP';
import Onboarding1   from './pages/Onboarding1';
import Onboarding2   from './pages/Onboarding2';
import Onboarding3   from './pages/Onboarding3';
import Home          from './pages/Home';
import Search        from './pages/Search';
import AIChat        from './pages/AIChat';
import DoctorDetail  from './pages/DoctorDetail';
import Appointments  from './pages/Appointments';
import Reports       from './pages/Reports';
import Videos        from './pages/Videos';
import VideoPlayer   from './pages/VideoPlayer';
import Profile       from './pages/Profile';
import LiveStream    from './pages/LiveStream';
import HealthNews    from './pages/HealthNews';
import Shorts        from './pages/Shorts';
import LiveQueue     from './pages/LiveQueue';
import Notifications from './pages/Notifications';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <NotificationProvider>
      <ProfileProvider>
      <OnboardingProvider>
        <MobileContainer>
          <Routes>
            <Route path="/"                element={<Splash />} />
            <Route path="/intro"           element={<Intro />} />
            <Route path="/login"           element={<Login />} />
            <Route path="/otp"             element={<OTP />} />
            <Route path="/onboarding/1"    element={<Onboarding1 />} />
            <Route path="/onboarding/2"    element={<Onboarding2 />} />
            <Route path="/onboarding/3"    element={<Onboarding3 />} />
            <Route path="/home"            element={<Home />} />
            <Route path="/search"          element={<Search />} />
            <Route path="/ai-chat"         element={<AIChat />} />
            <Route path="/doctor/:id"      element={<DoctorDetail />} />
            <Route path="/appointments"    element={<Appointments />} />
            <Route path="/reports"         element={<Reports />} />
            <Route path="/videos"          element={<Videos />} />
            <Route path="/video/:id"       element={<VideoPlayer />} />
            <Route path="/profile"         element={<Profile />} />
            <Route path="/live"            element={<LiveStream />} />
            <Route path="/health-news/:category" element={<HealthNews />} />
            <Route path="/shorts"          element={<Shorts />} />
            <Route path="/queue/:id"       element={<LiveQueue />} />
            <Route path="/notifications"   element={<Notifications />} />
            <Route path="*"               element={<Navigate to="/" replace />} />
          </Routes>
        </MobileContainer>
      </OnboardingProvider>
      </ProfileProvider>
      </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
