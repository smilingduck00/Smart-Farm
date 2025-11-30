import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LeafIcon, SunIcon, MoonIcon } from '../components/Icons';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const emailInputRef = useRef(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Auto-focus email field
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 300);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (feedback) setFeedback(null);
  };

  const handleQuickLogin = () => {
    setCredentials({ email: 'admin@gmail.com', password: 'admin' });
    setFeedback(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      login(credentials);
      const redirectPath = location.state?.from || '/';
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 300);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-sky-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden py-4 xs:py-6 sm:py-8">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-48 xs:w-64 sm:w-80 md:w-96 h-48 xs:h-64 sm:h-80 md:h-96 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-48 xs:w-64 sm:w-80 md:w-96 h-48 xs:h-64 sm:h-80 md:h-96 bg-sky-200/30 dark:bg-sky-800/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 xs:w-80 sm:w-96 md:w-[400px] lg:w-[500px] h-64 xs:h-80 sm:h-96 md:h-[400px] lg:h-[500px] bg-earth-200/15 dark:bg-earth-800/10 rounded-full blur-3xl"></div>
        {/* Animated particles - hidden on very small screens */}
        <div className="hidden xs:block absolute top-20 right-20 w-2 h-2 bg-primary-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="hidden sm:block absolute bottom-32 left-32 w-3 h-3 bg-sky-400/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="hidden md:block absolute top-1/3 right-1/4 w-2 h-2 bg-earth-400/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Theme Toggle - Enhanced */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-md shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={isDark ? 'Açıq rejimə keç' : 'Qaranlıq rejimə keç'}
      >
        {isDark ? (
          <SunIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700" />
        )}
      </motion.button>

      <div className="relative z-10 w-full max-w-md px-3 xs:px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl rounded-2xl xs:rounded-3xl shadow-2xl border border-gray-200/60 dark:border-dark-700/60 p-5 xs:p-6 sm:p-8 md:p-10 relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent dark:from-primary-900/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-100/50 to-transparent dark:from-sky-900/20 rounded-tr-full"></div>

          {/* Logo and Header */}
          <motion.div variants={itemVariants} className="text-center mb-6 xs:mb-7 sm:mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-xl xs:rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white mb-4 xs:mb-5 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
            >
              <LeafIcon className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" />
            </motion.div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1.5 xs:mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Xoş gəlmisiniz
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm sm:text-base">
              {t('login.title')}
            </p>
          </motion.div>

          {/* Quick Login Button */}
          <motion.div variants={itemVariants} className="mb-5 xs:mb-6">
            <button
              onClick={handleQuickLogin}
              className="w-full py-2 xs:py-2.5 px-3 xs:px-4 rounded-lg xs:rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-600 hover:from-gray-200 hover:to-gray-100 dark:hover:from-dark-600 dark:hover:to-dark-500 text-gray-700 dark:text-gray-300 text-xs xs:text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-700 flex items-center justify-center space-x-2 group"
            >
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="whitespace-nowrap">Admin ilə sürətli giriş</span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative mb-5 xs:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 xs:px-3 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 text-[10px] xs:text-xs">və ya</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                E-poçt ünvanı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                  <svg className={`w-4 h-4 xs:w-5 xs:h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  ref={emailInputRef}
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 sm:py-3.5 rounded-lg xs:rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                  placeholder="example@mail.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                Şifrə
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                  <svg className={`w-4 h-4 xs:w-5 xs:h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-10 xs:pl-12 pr-10 xs:pr-12 py-2.5 xs:py-3 sm:py-3.5 rounded-lg xs:rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                  placeholder="Şifrənizi daxil edin"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600"
                  aria-label={showPassword ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error/Success Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 xs:p-4 rounded-lg xs:rounded-xl text-xs xs:text-sm font-medium flex items-start space-x-2 xs:space-x-3 ${
                    feedback.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-2 border-red-200 dark:border-red-800'
                      : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-2 border-green-200 dark:border-green-800'
                  }`}
                >
                  <svg className={`w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0 mt-0.5 ${feedback.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feedback.type === 'error' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <span className="break-words">{feedback.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !credentials.email || !credentials.password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 hover:from-primary-700 hover:via-primary-700 hover:to-primary-800 text-white font-semibold py-3 xs:py-3.5 sm:py-4 rounded-lg xs:rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 relative overflow-hidden group text-sm xs:text-base"
            >
              <span className="relative z-10 flex items-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Yüklənir...</span>
                  </>
                ) : (
                  <>
                    <span>Daxil ol</span>
                    <svg className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </motion.form>

          {/* Signup Link */}
          <motion.div variants={itemVariants} className="mt-5 xs:mt-6 text-center">
            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
              Hesabın yoxdur?{' '}
              <Link
                to="/qeydiyyat"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 underline-offset-2 hover:underline inline-flex items-center space-x-1 group"
              >
                <span>{t('login.signupLink')}</span>
                <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          variants={itemVariants}
          className="mt-4 xs:mt-6 text-center text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 px-2"
        >
          {t('login.subtitle')}
        </motion.p>
      </div>
    </div>
  );
};

export default Login;
