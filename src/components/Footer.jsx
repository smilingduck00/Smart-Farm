import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LeafIcon, 
  PhoneIcon, 
  EmailIcon, 
  LocationIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon 
} from './Icons';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('common.home') },
    { path: '/services', label: t('common.services') },
    { path: '/ai-assistant', label: t('common.aiAssistant') },
    { path: '/weather', label: t('footer.weatherInfo') },
  ];

  const serviceLinks = [
    { path: '/market', label: t('home.services.market.title') },
    { path: '/events', label: t('common.events') },
    { path: '/training', label: t('home.services.training.title') },
    { path: '/contact', label: t('common.contact') },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: YouTubeIcon, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 lg:w-96 h-64 lg:h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-earth-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-12 lg:pt-16 pb-6 lg:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <LeafIcon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-display font-bold">
                  Eco<span className="text-primary-400">Grow</span>
                </h3>
                <p className="text-[10px] lg:text-xs text-gray-400">{t('footer.tagline')}</p>
              </div>
            </Link>
            <p className="text-gray-400 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex space-x-2 lg:space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 lg:w-10 lg:h-10 bg-white/10 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base lg:text-lg font-display font-semibold mb-4 lg:mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 lg:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xs lg:text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base lg:text-lg font-display font-semibold mb-4 lg:mb-6">{t('footer.services')}</h4>
            <ul className="space-y-2 lg:space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xs lg:text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base lg:text-lg font-display font-semibold mb-4 lg:mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <a href="tel:+994501234567" className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors text-xs lg:text-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span>+994 50 123 45 67</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ecogrow.az" className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors text-xs lg:text-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <EmailIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span>info@ecogrow.az</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-gray-400 text-xs lg:text-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span>Bakı şəhəri, Azərbaycan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <p className="text-gray-500 text-xs lg:text-sm text-center sm:text-left">
              © {currentYear} EcoGrow. {t('footer.rights')}
            </p>
            <div className="flex items-center space-x-4 lg:space-x-6 text-xs lg:text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-primary-400 transition-colors">
                Məxfilik Siyasəti
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary-400 transition-colors">
                İstifadə Şərtləri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
