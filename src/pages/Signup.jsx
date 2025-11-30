import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LeafIcon, SunIcon, MoonIcon } from '../components/Icons';
import { useTheme } from '../context/ThemeContext';

const initialState = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  role: 'fermer',
  farmName: '',
  farmLocation: '',
  focusProduct: '',
  city: '',
  interest: '',
};

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const fullNameInputRef = useRef(null);
  const [formValues, setFormValues] = useState(initialState);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Auto-focus first field
    setTimeout(() => {
      fullNameInputRef.current?.focus();
    }, 300);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (feedback) setFeedback(null);
  };

  const handleRoleChange = (role) => {
    setFormValues((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        phone: formValues.phone.trim(),
        role: formValues.role,
        farmName: formValues.role === 'fermer' ? formValues.farmName.trim() : '',
        farmLocation: formValues.role === 'fermer' ? formValues.farmLocation.trim() : '',
        focusProduct: formValues.role === 'fermer' ? formValues.focusProduct.trim() : '',
        city: formValues.role === 'alici' ? formValues.city.trim() : '',
        interest: formValues.role === 'alici' ? formValues.interest.trim() : '',
      };

      signup(payload);
      setFeedback({ type: 'success', message: 'Hesabınız uğurla yaradıldı! Giriş səhifəsinə yönləndirilirsiniz...' });
      setTimeout(() => {
        navigate('/giris');
      }, 1500);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
      setIsSubmitting(false);
    }
  };

  const isFarmer = formValues.role === 'fermer';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-sky-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-earth-200/30 dark:bg-earth-800/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/15 dark:bg-sky-800/10 rounded-full blur-3xl"></div>
        {/* Animated particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-earth-400/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-sky-400/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Theme Toggle - Enhanced */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-md shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={isDark ? 'Açıq rejimə keç' : 'Qaranlıq rejimə keç'}
      >
        {isDark ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-700" />
        )}
      </motion.button>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 dark:border-dark-700/60 p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100/50 to-transparent dark:from-primary-900/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-earth-100/50 to-transparent dark:from-earth-900/20 rounded-tr-full"></div>

          {/* Logo and Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white mb-5 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
            >
              <LeafIcon className="w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t('signup.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Fermer və ya alıcı olaraq hesab yaradın
            </p>
          </motion.div>

          {/* Role Selection - Enhanced */}
          <motion.div variants={itemVariants} className="flex space-x-4 mb-8">
            <motion.button
              type="button"
              onClick={() => handleRoleChange('fermer')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden ${
                isFarmer
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl shadow-primary-500/40'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 border-2 border-transparent'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span className="text-xl">🌾</span>
                <span>Mən fermerəm</span>
              </span>
              {isFarmer && (
                <motion.div
                  layoutId="roleIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => handleRoleChange('alici')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden ${
                !isFarmer
                  ? 'bg-gradient-to-r from-earth-600 to-earth-700 text-white shadow-xl shadow-earth-500/40'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 border-2 border-transparent'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span className="text-xl">🛒</span>
                <span>Mən alıcıyam</span>
              </span>
              {!isFarmer && (
                <motion.div
                  layoutId="roleIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-earth-500/20 to-earth-600/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Ad, Soyad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'fullName' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    ref={fullNameInputRef}
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    value={formValues.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                    placeholder="Məsələn, Leyla Quliyeva"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'phone' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formValues.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                    placeholder="+994 xx xxx xx xx"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  E-poçt ünvanı <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formValues.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                    placeholder="example@mail.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Şifrə <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    minLength={6}
                    required
                    value={formValues.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                    placeholder="Minimum 6 simvol"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600"
                    aria-label={showPassword ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Role-specific Fields */}
            <AnimatePresence mode="wait">
              {isFarmer ? (
                <motion.div
                  key="farmer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 pt-2"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="farmName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ferma adı <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'farmName' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <input
                          id="farmName"
                          type="text"
                          name="farmName"
                          required
                          value={formValues.farmName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('farmName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                          placeholder="Məsələn, Şəki Agro"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="farmLocation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Region <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'farmLocation' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input
                          id="farmLocation"
                          type="text"
                          name="farmLocation"
                          required
                          value={formValues.farmLocation}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('farmLocation')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                          placeholder="Şəhər və ya rayon"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="focusProduct" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Əsas məhsul / istiqamət <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'focusProduct' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <input
                        id="focusProduct"
                        type="text"
                        name="focusProduct"
                        required
                        value={formValues.focusProduct}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('focusProduct')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-700"
                        placeholder="Məsələn, orqanik tərəvəz"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="buyer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 pt-2"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Şəhər <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'city' ? 'text-earth-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          required
                          value={formValues.city}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('city')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-earth-500 dark:focus:border-earth-500 border-gray-300 dark:border-dark-600 hover:border-earth-400 dark:hover:border-earth-700"
                          placeholder="Bakı"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        İstifadə məqsədi <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'interest' ? 'text-earth-500' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <input
                          id="interest"
                          type="text"
                          name="interest"
                          required
                          value={formValues.interest}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('interest')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-earth-500 dark:focus:border-earth-500 border-gray-300 dark:border-dark-600 hover:border-earth-400 dark:hover:border-earth-700"
                          placeholder="Ev istifadəsi, mağaza və s."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl text-sm font-medium flex items-start space-x-3 border-2 ${
                    feedback.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                  }`}
                >
                  <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feedback.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feedback.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <span>{feedback.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden group ${
                isFarmer
                  ? 'bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 hover:from-primary-700 hover:via-primary-700 hover:to-primary-800 text-white shadow-primary-500/30 hover:shadow-primary-500/40'
                  : 'bg-gradient-to-r from-earth-600 via-earth-600 to-earth-700 hover:from-earth-700 hover:via-earth-700 hover:to-earth-800 text-white shadow-earth-500/30 hover:shadow-earth-500/40'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Göndərilir...</span>
                  </>
                ) : (
                  <>
                    <span>Hesab yarat</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </motion.form>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Artıq hesabın var?{' '}
              <Link
                to="/giris"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 underline-offset-2 hover:underline inline-flex items-center space-x-1 group"
              >
                <span>Giriş et</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
