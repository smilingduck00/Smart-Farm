import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  LocationIcon,
  UsersIcon,
  ClockIcon,
  ArrowRightIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  XIcon,
  ImageIcon,
  MoneyIcon,
  LeafIcon,
  TractorIcon,
  WheatIcon,
  DropIcon,
  SunIcon
} from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { getEvents, loadFromLocalStorage, saveToLocalStorage } from '../database/database';

// Varsayılan görsel URL'i
const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80';

// Tarih formatlama fonksiyonu (Azerbaycan dili)
const formatDate = (dateString) => {
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Geçersiz tarih ise olduğu gibi döndür
    }
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateString;
  }
};

const Events = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [loading, setLoading] = useState(false);

  // Event types with icons and colors
  const eventTypes = [
    { id: 'harvest', label: t('events.types.harvest'), icon: WheatIcon, color: 'earth' },
    { id: 'planting', label: t('events.types.planting'), icon: LeafIcon, color: 'primary' },
    { id: 'irrigation', label: t('events.types.irrigation'), icon: DropIcon, color: 'sky' },
    { id: 'maintenance', label: t('events.types.maintenance'), icon: TractorIcon, color: 'orange' },
    { id: 'workshop', label: t('events.types.workshop'), icon: UsersIcon, color: 'purple' },
    { id: 'other', label: t('events.types.other'), icon: SunIcon, color: 'gray' }
  ];

  const paymentTypes = [
    { id: 'free', label: t('events.payment.free') },
    { id: 'paid', label: t('events.payment.paid') },
    { id: 'barter', label: t('events.payment.barter') }
  ];

  // Load events from database and localStorage
  useEffect(() => {
    const savedEvents = loadFromLocalStorage('ecogrow-events', null);
    if (savedEvents && savedEvents.length > 0) {
      setEvents(savedEvents);
      setFilteredEvents(savedEvents);
    } else {
      // Load from database
      const dbEvents = getEvents();
      setEvents(dbEvents);
      setFilteredEvents(dbEvents);
      saveToLocalStorage('ecogrow-events', dbEvents);
    }
  }, []);

  // Filter events
  useEffect(() => {
    let filtered = [...events];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.type === filterType);
    }

    // Payment filter
    if (filterPayment !== 'all') {
      filtered = filtered.filter(event => event.paymentType === filterPayment);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filterType, filterPayment, events]);

  const handleJoinEvent = (eventId) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId && event.participants < event.maxParticipants) {
        return { ...event, participants: event.participants + 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    saveToLocalStorage('ecogrow-events', updatedEvents);
    alert(t('events.modal.joinSuccess'));
  };

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      organizer: user?.fullName || 'Anonim',
      organizerPhone: user?.phone || 'Məlumat yoxdur',
      participants: 0,
      createdAt: new Date().toISOString()
    };
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    saveToLocalStorage('ecogrow-events', updatedEvents);
    setShowCreateModal(false);
    alert('Tədbir uğurla yaradıldı!');
  };

  const getEventTypeInfo = (typeId) => {
    return eventTypes.find(t => t.id === typeId) || eventTypes[eventTypes.length - 1];
  };

  const getPaymentBadgeColor = (paymentType) => {
    switch (paymentType) {
      case 'free': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'paid': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'barter': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-4">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {t('events.badge')}
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            {t('events.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('events.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('events.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">{t('events.filterAllTypes')}</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Payment Filter */}
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">{t('events.filterAllPayments')}</option>
                {paymentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>

              {/* Create Event Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary inline-flex items-center justify-center whitespace-nowrap"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                {t('events.createEvent')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => {
            const typeInfo = getEventTypeInfo(event.type);
            const TypeIcon = typeInfo.icon;
            return (
              <EventCardItem
                key={event.id}
                event={event}
                typeInfo={typeInfo}
                TypeIcon={TypeIcon}
                index={index}
                onSelect={() => setSelectedEvent(event)}
                onJoin={() => handleJoinEvent(event.id)}
                paymentTypes={paymentTypes}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">{t('events.noEvents')}</p>
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateModal && (
          <CreateEventModal
            eventTypes={eventTypes}
            paymentTypes={paymentTypes}
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateEvent}
          />
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            eventTypes={eventTypes}
            paymentTypes={paymentTypes}
            onClose={() => setSelectedEvent(null)}
            onJoin={() => {
              handleJoinEvent(selectedEvent.id);
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Event Card Item Component
const EventCardItem = ({ event, typeInfo, TypeIcon, index, onSelect, onJoin, paymentTypes, getPaymentBadgeColor }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const imageUrl = event.image && !imageError ? event.image : DEFAULT_EVENT_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="card overflow-hidden group hover:shadow-xl transition-all duration-300">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
          <img 
            src={imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => {
              if (!imageError) {
                setImageError(true);
              }
            }}
          />
          {/* Payment Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadgeColor(event.paymentType)}`}>
              {paymentTypes.find(p => p.id === event.paymentType)?.label}
            </span>
          </div>
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <TypeIcon className="w-3 h-3" />
              {typeInfo.label}
            </span>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-5 lg:p-6">
          <h3 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <LocationIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{event.time} - {event.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UsersIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{event.participants}/{event.maxParticipants} {t('events.participants')}</span>
            </div>
            {event.paymentAmount && (
              <div className="flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
                <MoneyIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{event.paymentAmount}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onSelect}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm"
            >
              {t('events.details')}
            </button>
            <button
              onClick={onJoin}
              disabled={event.participants >= event.maxParticipants}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                event.participants >= event.maxParticipants
                  ? 'bg-gray-200 dark:bg-dark-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {event.participants >= event.maxParticipants ? t('events.full') : t('events.join')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Create Event Modal Component
const CreateEventModal = ({ eventTypes, paymentTypes, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'harvest',
    location: '',
    date: '',
    time: '',
    duration: '',
    paymentType: 'free',
    paymentAmount: '',
    paymentDescription: '',
    maxParticipants: 10,
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.time) {
      alert(t('events.create.form.required'));
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-dark-700 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white">{t('events.create.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="form-label">{t('events.create.form.title')}</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              placeholder={t('events.create.form.titlePlaceholder')}
              required
            />
          </div>

          <div>
            <label className="form-label">{t('events.create.form.description')}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-input"
              rows="4"
              placeholder={t('events.create.form.descriptionPlaceholder')}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">{t('events.create.form.type')}</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="form-input"
                required
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">{t('events.create.form.maxParticipants')}</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                className="form-input"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">{t('events.create.form.location')}</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="form-input"
              placeholder={t('events.create.form.locationPlaceholder')}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">{t('events.create.form.date')}</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="form-label">{t('events.create.form.time')}</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">{t('events.create.form.duration')}</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="form-input"
                placeholder={t('events.create.form.durationPlaceholder')}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">{t('events.create.form.paymentType')}</label>
            <select
              value={formData.paymentType}
              onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
              className="form-input"
              required
            >
              {paymentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          {formData.paymentType !== 'free' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">{t('events.create.form.paymentAmount')}</label>
                <input
                  type="text"
                  value={formData.paymentAmount}
                  onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
                  className="form-input"
                  placeholder={t('events.create.form.paymentAmountPlaceholder')}
                />
              </div>

              <div>
                <label className="form-label">{t('events.create.form.paymentDescription')}</label>
                <input
                  type="text"
                  value={formData.paymentDescription}
                  onChange={(e) => setFormData({ ...formData, paymentDescription: e.target.value })}
                  className="form-input"
                  placeholder={t('events.create.form.paymentDescriptionPlaceholder')}
                />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">{t('events.create.form.image')}</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="form-input"
              placeholder={t('events.create.form.imagePlaceholder')}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              {t('events.create.form.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {t('events.create.form.create')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Event Detail Modal Component
const EventDetailModal = ({ event, eventTypes, paymentTypes, onClose, onJoin }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const typeInfo = eventTypes.find(type => type.id === event.type) || eventTypes[eventTypes.length - 1];
  const TypeIcon = typeInfo.icon;
  const paymentInfo = paymentTypes.find(p => p.id === event.paymentType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
          <img 
            src={event.image && !imageError ? event.image : DEFAULT_EVENT_IMAGE} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={() => {
              if (!imageError) {
                setImageError(true);
              }
            }}
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.paymentType === 'free' ? 'bg-green-100 text-green-700' : event.paymentType === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
              {paymentInfo?.label}
            </span>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TypeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{typeInfo.label}</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-4">
                {event.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {event.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <LocationIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <ClockIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{event.time} - {event.duration}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <UsersIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{event.participants}/{event.maxParticipants} {t('events.participants')}</span>
            </div>
            {event.paymentAmount && (
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold">
                <MoneyIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{event.paymentAmount}</span>
                {event.paymentDescription && (
                  <span className="ml-2 text-sm text-gray-500">({event.paymentDescription})</span>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-dark-700 pt-6 mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{t('events.organizer')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              <strong>{t('events.organizerName')}</strong> {event.organizer}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{t('events.organizerPhone')}</strong> {event.organizerPhone}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              {t('events.modal.back')}
            </button>
            <button
              onClick={onJoin}
              disabled={event.participants >= event.maxParticipants}
              className={`flex-1 ${event.participants >= event.maxParticipants ? 'btn-secondary cursor-not-allowed opacity-50' : 'btn-primary'}`}
            >
              {event.participants >= event.maxParticipants ? t('events.modal.eventFull') : t('events.modal.joinEvent')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Events);

