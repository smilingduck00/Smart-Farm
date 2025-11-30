import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EmailIcon, 
  LocationIcon,
  SendIcon,
  CheckIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon
} from '../components/Icons';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Telefon',
      details: ['+994 50 123 45 67', '+994 12 456 78 90'],
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: EmailIcon,
      title: 'E-poçt',
      details: ['info@ecogrow.az', 'support@ecogrow.az'],
      color: 'bg-sky-100 text-sky-600'
    },
    {
      icon: LocationIcon,
      title: 'Ünvan',
      details: ['Bakı şəhəri, Nəsimi rayonu', 'Nizami küç. 45'],
      color: 'bg-earth-100 text-earth-600'
    },
    {
      icon: ClockIcon,
      title: 'İş Saatları',
      details: ['Bazar ertəsi - Cümə: 09:00 - 18:00', 'Şənbə: 10:00 - 15:00'],
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: InstagramIcon, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: TwitterIcon, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: YouTubeIcon, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  const faqItems = [
    {
      question: 'AI köməkçi necə işləyir?',
      answer: 'AI köməkçimiz süni intellekt texnologiyası əsasında işləyir və fermerlərə kənd təsərrüfatı ilə bağlı suallarına cavab verir.'
    },
    {
      question: 'Xidmətlər pulludurmu?',
      answer: 'Əsas xidmətlər pulsuzdur. Premium funksiyalar üçün aylıq abunə planları mövcuddur.'
    },
    {
      question: 'Necə qeydiyyatdan keçə bilərəm?',
      answer: 'Veb-saytımızda "Qeydiyyat" bölməsinə daxil olaraq sadə proseslə qeydiyyatdan keçə bilərsiniz.'
    }
  ];

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
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            <EmailIcon className="w-4 h-4 mr-2" />
            {t('contact.badge')}
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <div key={index} className="card p-6 text-center hover:bg-white">
              <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-gray-800 dark:text-white mb-2">{info.title}</h3>
              {info.details.map((detail, dIndex) => (
                <p key={dIndex} className="text-sm text-gray-600 dark:text-gray-300">{detail}</p>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-display font-semibold text-gray-800 dark:text-white mb-6">
              {t('contact.sendMessage')}
            </h2>
            
            {isSubmitted ? (
              <div className="card p-8 text-center bg-primary-50 dark:bg-primary-900/20">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t('contact.success.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('contact.success.message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">{t('contact.subjects.select')}</option>
                      <option value="general">{t('contact.subjects.general')}</option>
                      <option value="support">{t('contact.subjects.support')}</option>
                      <option value="partnership">{t('contact.subjects.partnership')}</option>
                      <option value="feedback">{t('contact.subjects.feedback')}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <SendIcon className="w-5 h-5 mr-2" />
                  {t('contact.form.send')}
                </button>
              </form>
            )}
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-gray-800 dark:text-white mb-6">
                {t('contact.findUs')}
              </h2>
              <div className="card overflow-hidden h-64 rounded-xl">
                <img 
                  src="https://cdn.pacer.cc/route/screenshot/tp5mv_20200225_3.png"
                  alt="Bakı, Azərbaycan xəritəsi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white mb-4">
                {t('contact.socialNetworks')}
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white mb-4">
                {t('contact.faq')}
              </h3>
              <div className="space-y-4">
                <div className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('contact.faqItems.q1')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('contact.faqItems.a1')}</p>
                </div>
                <div className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('contact.faqItems.q2')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('contact.faqItems.a2')}</p>
                </div>
                <div className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('contact.faqItems.q3')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('contact.faqItems.a3')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);

