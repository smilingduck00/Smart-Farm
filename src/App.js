import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AccessibilityControls from './components/AccessibilityControls';
import ScreenReader from './components/ScreenReader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Weather = lazy(() => import('./pages/Weather'));
const Market = lazy(() => import('./pages/Market'));
const Events = lazy(() => import('./pages/Events'));
const Training = lazy(() => import('./pages/Training'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const BuyerMarket = lazy(() => import('./pages/BuyerMarket'));

// Loading component
const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center">
        <div className="w-12 h-12 lg:w-16 lg:h-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base">{t('common.loading')}</p>
      </div>
    </div>
  );
};

// Component to redirect to login if not authenticated, or home if authenticated
const NavigateToLoginOrHome = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/giris" replace />;
  }
  
  // If user is authenticated, redirect to their default page
  if (user.role === 'alici') {
    return <Navigate to="/alici/bazar" replace />;
  }
  
  return (
    <ProtectedRoute allowedRoles={['fermer']}>
      <Home />
    </ProtectedRoute>
  );
};

function AppContent() {
  const location = useLocation();
  const { t } = useTranslation();
  const isAuthPage = location.pathname === '/giris' || location.pathname === '/qeydiyyat';
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only"></div>
      <main id="main-content" className="flex-1" role="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/giris" element={<Login />} />
            <Route path="/qeydiyyat" element={<Signup />} />
            <Route
              path="/alici/bazar"
              element={
                <ProtectedRoute allowedRoles={['alici']}>
                  <BuyerMarket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={<NavigateToLoginOrHome />}
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <AIAssistant />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weather"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <Weather />
                </ProtectedRoute>
              }
            />
            <Route
              path="/market"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <Market />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute allowedRoles={['fermer', 'alici']}>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/training"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <Training />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute allowedRoles={['fermer']}>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/giris" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isAuthPage && <Footer />}
      <AccessibilityControls />
      <ScreenReader />
    </>
  );
}

function SkipToMainLink() {
  const { t } = useTranslation();
  return (
    <a href="#main-content" className="skip-to-main">
      {t('common.skipToMain')}
    </a>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col overflow-x-hidden">
            <SkipToMainLink />
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
