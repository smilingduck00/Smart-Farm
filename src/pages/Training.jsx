import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  EducationIcon, 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  LeafIcon,
  SoilIcon,
  DropIcon,
  ChartIcon,
  XIcon,
  EmailIcon
} from '../components/Icons';
import { trainingDatabase, getTrainingCoursesByCategory } from '../database/database';

const Training = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showEventRegistrationModal, setShowEventRegistrationModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    { id: 'all', label: t('training.categories.all') },
    { id: 'beginner', label: t('training.categories.beginner') },
    { id: 'intermediate', label: t('training.categories.intermediate') },
    { id: 'advanced', label: t('training.categories.advanced') },
    { id: 'intermediate', label: 'Orta' },
    { id: 'advanced', label: 'Qabaqcıl' },
  ];

  // Map icon names to icon components
  const iconMap = {
    LeafIcon,
    SoilIcon,
    DropIcon,
    ChartIcon
  };

  // Get courses from database and add icons
  const courses = getTrainingCoursesByCategory('all').map((course, index) => {
    const iconKeys = ['LeafIcon', 'SoilIcon', 'DropIcon', 'LeafIcon', 'ChartIcon', 'LeafIcon'];
    return {
      ...course,
      icon: iconMap[iconKeys[index % iconKeys.length]] || LeafIcon
    };
  });

  const filteredCourses = getTrainingCoursesByCategory(selectedCategory).map((course, index) => {
    const iconKeys = ['LeafIcon', 'SoilIcon', 'DropIcon', 'LeafIcon', 'ChartIcon', 'LeafIcon'];
    const allCourses = getTrainingCoursesByCategory('all');
    const courseIndex = allCourses.findIndex(c => c.title === course.title);
    return {
      ...course,
      icon: iconMap[iconKeys[courseIndex % iconKeys.length]] || LeafIcon
    };
  });

  const upcomingEvents = trainingDatabase.upcomingEvents;
  const benefits = trainingDatabase.benefits;
  const stats = trainingDatabase.stats;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <EducationIcon className="w-4 h-4 mr-2" />
            {t('training.badge')}
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            {t('training.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('training.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card p-5 text-center">
            <EducationIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.activeCourses}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('training.stats.activeCourses')}</p>
          </div>
          <div className="card p-5 text-center">
            <UsersIcon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.graduates}+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('training.stats.graduates')}</p>
          </div>
          <div className="card p-5 text-center">
            <StarIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" filled />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.averageRating}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('training.stats.averageRating')}</p>
          </div>
          <div className="card p-5 text-center">
            <ClockIcon className="w-8 h-8 text-sky-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.videoHours}+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('training.stats.videoHours')}</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/80 dark:bg-dark-800/80 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-dark-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
              {t('training.availableCourses')}
            </h2>
            <div className="space-y-6">
              {filteredCourses.map((course, index) => (
                <div key={index} className="card p-6 hover:bg-white dark:hover:bg-dark-800 group">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.category === 'beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          course.category === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {course.level}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                          {course.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.topics.map((topic, tIndex) => (
                          <span key={tIndex} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {course.students} şagird
                          </span>
                          <span className="flex items-center">
                            <StarIcon className="w-4 h-4 mr-1 text-yellow-500" filled />
                            {course.rating}
                          </span>
                        </div>
                        <a 
                          href={course.videoUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                          {t('training.view')}
                          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Benefits */}
            {/* <div>
              <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
                Niyə Biz?
              </h2>
              <div className="card p-5 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-dark-800 dark:to-dark-700">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* Upcoming Events */}
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
                {t('training.upcomingEvents')}
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium">
                        {event.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <p className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {event.date}
                      </p>
                      <p className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        {event.location}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventRegistrationModal(true);
                      }}
                      className="w-full mt-3 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors"
                    >
                      {t('training.register')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card p-6 bg-gradient-to-br from-purple-600 to-violet-700 text-white">
              <EducationIcon className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('training.personalTraining')}</h3>
              <p className="text-purple-100 text-sm mb-4">
                {t('training.personalTrainingDescription')}
              </p>
              <button 
                onClick={() => setShowRegistrationModal(true)}
                className="w-full py-2 bg-white text-purple-700 rounded-xl font-medium hover:bg-purple-50 transition-colors"
              >
                {t('training.register')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <RegistrationModal
          email={email}
          setEmail={setEmail}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          onClose={() => {
            setShowRegistrationModal(false);
            setEmail('');
            setIsSubmitted(false);
          }}
        />
      )}

      {/* Event Registration Modal */}
      {showEventRegistrationModal && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          email={email}
          setEmail={setEmail}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          onClose={() => {
            setShowEventRegistrationModal(false);
            setSelectedEvent(null);
            setEmail('');
            setIsSubmitted(false);
          }}
        />
      )}
    </div>
  );
};

// Registration Modal Component
const RegistrationModal = ({ email, setEmail, isSubmitted, setIsSubmitted, onClose }) => {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        {isSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white mb-2">
              {t('training.registration.successTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('training.registration.successTraining')} <strong>{email}</strong> {t('training.registration.successSent')}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white">
                {t('training.registration.personalTitle')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('training.registration.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('training.registration.emailLabel')}
                </label>
                <div className="relative">
                  <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="example@mail.com"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  {t('training.registration.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {t('training.registration.send')}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Event Registration Modal Component
const EventRegistrationModal = ({ event, email, setEmail, isSubmitted, setIsSubmitted, onClose }) => {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        {isSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white mb-2">
              {t('training.registration.successTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('training.registration.successEvent')} <strong>{email}</strong> {t('training.registration.successSent')}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white">
                {t('training.registration.eventTitle')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {event.date}
                </p>
                <p className="flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  {event.location}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('training.registration.eventDescription')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="event-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('training.registration.emailLabel')}
                </label>
                <div className="relative">
                  <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="event-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('training.registration.emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  Ləğv Et
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Göndər
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default memo(Training);

