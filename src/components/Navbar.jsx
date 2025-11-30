import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuIcon, CloseIcon, LeafIcon, SunIcon, MoonIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const farmerLinks = [
    { path: '/', label: t('common.home') },
    { path: '/services', label: t('common.services') },
    { path: '/ai-assistant', label: t('common.aiAssistant') },
    { path: '/weather', label: t('common.weather') },
    { path: '/market', label: t('common.market') },
    { path: '/events', label: t('common.events') },
    { path: '/training', label: t('common.training') },
    { path: '/contact', label: t('common.contact') },
  ];

  const buyerLinks = [
    { path: '/alici/bazar', label: t('common.buyerMarket') },
    { path: '/events', label: t('common.events') }
  ];

  const navLinks = user?.role === 'alici' ? buyerLinks : farmerLinks;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/giris');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const languages = [
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/98 dark:bg-dark-900/98 backdrop-blur-md shadow-md shadow-gray-200/30 dark:shadow-dark-950/30 border-b border-gray-100/50 dark:border-dark-700/50' 
          : 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md'
      }`}
      role="navigation"
      aria-label={t('common.mainNavigation')}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
                <LeafIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-earth-500 rounded-full border-2 border-white dark:border-dark-900"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-display font-bold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
                Eco<span className="text-primary-600 dark:text-primary-400">Grow</span>
              </h1>
              <p className="text-[9px] lg:text-[10px] text-gray-700 dark:text-gray-400 -mt-0.5 leading-tight drop-shadow-sm">{t('navbar.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden xl:flex items-center space-x-0.5 flex-nowrap" role="list">
            {navLinks.map((link) => (
              <li key={link.path} role="none" className="flex-shrink-0">
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isActive(link.path)
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                      : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-white drop-shadow-sm'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Dil seç"
                aria-expanded={langMenuOpen}
              >
                <span className="text-sm font-medium">{currentLanguage.flag}</span>
              </button>
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 z-20 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center space-x-2 ${
                          i18n.language === lang.code
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isDark ? t('common.lightMode') : t('common.darkMode')}
              aria-pressed={isDark}
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {!user ? (
              <>
                <Link
                  to="/giris"
                  className="hidden lg:inline-flex px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  {t('common.login')}
                </Link>
                <Link to="/qeydiyyat" className="hidden lg:inline-flex btn-primary text-sm px-4 py-2">
                  {t('common.signup')}
                </Link>
              </>
            ) : (
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
                <div className="text-right hidden xl:block">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">{t(`common.${user.role === 'fermer' ? 'farmer' : 'buyer'}`)}</p>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm px-3 py-2">
                  {t('common.logout')}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isOpen ? t('common.closeMenu') : t('common.openMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <CloseIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              ) : (
                <MenuIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`xl:hidden absolute top-full left-0 right-0 bg-white/98 dark:bg-dark-900/98 backdrop-blur-md shadow-lg border-b border-gray-100/50 dark:border-dark-700/50 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
        role="menu"
        aria-label={t('common.mobileMenu')}
      >
        <ul className="px-4 py-4 lg:py-6 space-y-2 lg:space-y-3 max-h-[80vh] overflow-y-auto" role="list">
          {navLinks.map((link) => (
            <li key={link.path} role="none">
              <Link
                to={link.path}
                className={`block px-4 py-3 lg:py-4 rounded-xl text-base lg:text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isActive(link.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                }`}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          </ul>
          <div className="pt-3 lg:pt-4 space-y-2 px-4 pb-4">
            {!user ? (
              <>
                <Link 
                  to="/giris" 
                  className="w-full text-center block py-3 lg:py-4 font-semibold rounded-xl bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t('common.login')}
                </Link>
                <Link 
                  to="/qeydiyyat" 
                  className="btn-primary w-full text-center block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t('common.signup')}
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="btn-secondary w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={t('common.logoutLabel')}
              >
                {t('common.logout')}
              </button>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
