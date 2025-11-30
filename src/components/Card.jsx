import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

// Service Card Component
export const ServiceCard = ({ icon: Icon, title, description, link, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 shadow-primary-500/30',
    earth: 'from-earth-500 to-earth-600 shadow-earth-500/30',
    sky: 'from-sky-500 to-sky-600 shadow-sky-500/30',
    orange: 'from-orange-500 to-orange-600 shadow-orange-500/30',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/30',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/30',
  };

  return (
    <article className="card group card-spacing hover:bg-white dark:hover:bg-dark-800" role="article" aria-labelledby={`service-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-5 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
      </div>
      <h3 id={`service-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-xl lg:text-2xl font-display font-semibold text-gray-800 dark:text-white mb-3 lg:mb-4">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6 text-readable">{description}</p>
      {link && (
        <Link 
          to={link} 
          className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm lg:text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-label={`${title} haqqında ətraflı məlumat`}
        >
          Ətraflı
          <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
};

// Feature Card Component
export const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => (
  <article 
    className="relative p-5 lg:p-7 rounded-2xl bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm border border-white/50 dark:border-dark-700/50 hover:bg-white dark:hover:bg-dark-800 hover:shadow-xl transition-all duration-300"
    style={{ animationDelay: `${index * 100}ms` }}
    role="article"
    aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="flex items-start space-x-4 lg:space-x-5">
      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary-600 dark:text-primary-400" />
      </div>
      <div>
        <h4 id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-lg lg:text-xl font-display font-semibold text-gray-800 dark:text-white mb-2 lg:mb-3">{title}</h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed text-readable">{description}</p>
      </div>
    </div>
  </article>
);

// Stat Card Component
export const StatCard = ({ value, label, icon: Icon, suffix = '' }) => (
  <div className="text-center p-5 lg:p-7 rounded-2xl bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-white/50 dark:border-dark-700/50 shadow-lg" role="region" aria-label={`Statistika: ${label}`}>
    {Icon && (
      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-5" aria-hidden="true">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary-600 dark:text-primary-400" />
      </div>
    )}
    <div className="text-3xl lg:text-5xl font-display font-bold gradient-text mb-2 lg:mb-3" aria-label={`${value}${suffix} ${label}`}>
      {value}{suffix}
    </div>
    <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base font-medium">{label}</p>
  </div>
);

// Weather Card Component
export const WeatherCard = ({ icon: Icon, label, value, unit = '', color = 'primary' }) => {
  const bgColors = {
    primary: 'bg-primary-50 dark:bg-primary-900/20',
    sky: 'bg-sky-50 dark:bg-sky-900/20',
    orange: 'bg-orange-50 dark:bg-orange-900/20',
    earth: 'bg-earth-50 dark:bg-earth-900/20',
  };

  const iconColors = {
    primary: 'text-primary-600 dark:text-primary-400',
    sky: 'text-sky-600 dark:text-sky-400',
    orange: 'text-orange-600 dark:text-orange-400',
    earth: 'text-earth-600 dark:text-earth-400',
  };

  return (
    <div className={`${bgColors[color]} rounded-xl p-3 lg:p-4 text-center`}>
      <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${iconColors[color]} mx-auto mb-1 lg:mb-2`} />
      <p className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">{value}{unit}</p>
      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
};

// Training Card Component
export const TrainingCard = ({ title, description, duration, level, image, link }) => (
  <div className="card overflow-hidden group">
    <div className="relative h-40 lg:h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-sky-100 dark:from-primary-900/30 dark:to-sky-900/30">
      {image ? (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl lg:text-6xl">📚</span>
        </div>
      )}
      <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex space-x-2">
        <span className="px-2 lg:px-3 py-1 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-full text-[10px] lg:text-xs font-medium text-gray-700 dark:text-gray-300">
          {duration}
        </span>
        <span className="px-2 lg:px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-[10px] lg:text-xs font-medium text-white">
          {level}
        </span>
      </div>
    </div>
    <div className="p-4 lg:p-6">
      <h3 className="text-base lg:text-lg font-display font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4">{description}</p>
      <Link 
        to={link || '#'} 
        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-xs lg:text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        Qeydiyyatdan keç
        <ArrowRightIcon className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2" />
      </Link>
    </div>
  </div>
);

// Grant Card Component
export const GrantCard = ({ title, organization, amount, deadline, description, link }) => (
  <div className="card p-4 lg:p-6 group">
    <div className="flex items-start justify-between mb-3 lg:mb-4">
      <div>
        <span className="px-2 lg:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-[10px] lg:text-xs font-medium">
          {organization}
        </span>
      </div>
      <div className="text-right">
        <p className="text-lg lg:text-2xl font-bold text-primary-600 dark:text-primary-400">{amount}</p>
        <p className="text-[10px] lg:text-xs text-gray-500 dark:text-gray-400">Maksimum məbləğ</p>
      </div>
    </div>
    <h3 className="text-base lg:text-lg font-display font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4">{description}</p>
    <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-100 dark:border-dark-700">
      <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
        Son tarix: <span className="font-medium text-gray-700 dark:text-gray-300">{deadline}</span>
      </div>
      <Link 
        to={link || '#'} 
        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-xs lg:text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        Ətraflı
        <ArrowRightIcon className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

// Market Item Card
export const MarketCard = ({ name, price, change, unit, trend, location, onContactClick }) => (
  <div className="card p-3 lg:p-4 hover:bg-white dark:hover:bg-dark-800">
    <div className="flex items-center justify-between mb-2">
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-white text-sm lg:text-base">{name}</h4>
        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{unit}</p>
      </div>
      <div className="text-right">
        <p className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white">{price} ₼</p>
        <p className={`text-xs lg:text-sm font-medium ${
          trend === 'up' ? 'text-green-500' : 
          trend === 'down' ? 'text-red-500' : 
          'text-gray-500 dark:text-gray-400'
        }`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}%
        </p>
      </div>
    </div>
    {location && (
      <div className="pt-2 border-t border-gray-100 dark:border-dark-700 mb-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <span className="mr-1">📍</span>
          {location}
        </p>
      </div>
    )}
    {onContactClick && (
      <button
        onClick={onContactClick}
        className="w-full mt-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Əlaqəyə keç
      </button>
    )}
  </div>
);

export default ServiceCard;
