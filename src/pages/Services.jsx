import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AIIcon,
  SunIcon,
  MarketIcon,
  EducationIcon,
  LeafIcon,
  CheckIcon,
  ArrowRightIcon
} from '../components/Icons';

const Services = () => {
  const { t } = useTranslation();
  const mainServices = [
    {
      icon: AIIcon,
      title: 'Smart Problem Solver AI',
      description: 'Süni intellekt dəstəyi ilə fermerlik problemlərinizə ən optimal həlləri tapın. AI köməkçimiz suallarınızı cavablandırır, riskləri təhlil edir.',
      features: [
        'Real vaxtda sual-cavab',
        'Risk analizi',
        'Fərdi tövsiyələr',
        '24/7 dəstək'
      ],
      link: '/ai-assistant',
      color: 'from-primary-500 to-emerald-600'
    },
    {
      icon: SunIcon,
      title: 'İqlim və Hava Məlumatları',
      description: 'Dəqiq hava proqnozları və iqlim məlumatları ilə əkinlərinizi qoruyun. Lokal hava məlumatları ilə ən doğru qərarları verin.',
      features: [
        'Real vaxtda hava məlumatı',
        '7 günlük proqnoz',
        'Xəbərdarlıq sistemi',
        'Tarixi məlumatlar'
      ],
      link: '/weather',
      color: 'from-sky-500 to-blue-600'
    },
    {
      icon: MarketIcon,
      title: 'Bazar və Satış Dəstəyi',
      description: 'Canlı qiymət məlumatları, bazar tendensiyaları və satış imkanları ilə məhsullarınızı ən yaxşı qiymətə satın.',
      features: [
        'Canlı qiymət məlumatları',
        'Bazar analizi',
        'Alıcı şəbəkəsi',
        'Logistika dəstəyi'
      ],
      link: '/market',
      color: 'from-earth-500 to-amber-600'
    },
    {
      icon: EducationIcon,
      title: 'Təlim və Kadr Hazırlığı',
      description: 'Müasir əkinçilik metodları, aqro-texniki biliklər və peşəkar sertifikatlar üçün təlim proqramları.',
      features: [
        'Online kurslar',
        'Praktiki seminarlar',
        'Sertifikat proqramları',
        'Expert mentorluq'
      ],
      link: '/training',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-8 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-primary-200/40 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 lg:w-96 h-64 lg:h-96 bg-sky-200/40 dark:bg-sky-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-16"
          >
            <span className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs lg:text-sm font-medium mb-3 lg:mb-4">
              <LeafIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
              {t('services.badge')}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-800 dark:text-white mb-4 lg:mb-6 px-4">
              {t('services.title')}
            </h1>
            <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="card p-4 lg:p-8 group hover:bg-white dark:hover:bg-dark-800"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-base lg:text-xl font-display font-semibold text-gray-800 dark:text-white mb-2 lg:mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={service.link}
                  className="inline-flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors"
                >
                  Ətraflı Məlumat
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t('services.ctaTitle')}
              </h2>
              <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                {t('services.ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/ai-assistant" 
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300"
                >
                  <AIIcon className="w-5 h-5 mr-2" />
                  {t('services.chatWithAI')}
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  {t('services.contactUs')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default memo(Services);

