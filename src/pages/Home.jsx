import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LeafIcon, 
  TractorIcon, 
  SunIcon, 
  DropIcon, 
  ChartIcon, 
  MarketIcon, 
  MoneyIcon, 
  EducationIcon, 
  AIIcon,
  WheatIcon,
  UsersIcon,
  GlobeIcon,
  ArrowRightIcon,
  CheckIcon,
  CalendarIcon
} from '../components/Icons';
import { ServiceCard, StatCard, FeatureCard } from '../components/Card';

const MemoizedServiceCard = memo(ServiceCard);
const MemoizedStatCard = memo(StatCard);
const MemoizedFeatureCard = memo(FeatureCard);

const Home = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: AIIcon,
      title: t('home.services.aiAssistant.title'),
      description: t('home.services.aiAssistant.description'),
      link: '/ai-assistant',
      color: 'primary'
    },
    {
      icon: SunIcon,
      title: t('home.services.weather.title'),
      description: t('home.services.weather.description'),
      link: '/weather',
      color: 'sky'
    },
    {
      icon: MarketIcon,
      title: t('home.services.market.title'),
      description: t('home.services.market.description'),
      link: '/market',
      color: 'earth'
    },
    {
      icon: CalendarIcon,
      title: t('home.services.events.title'),
      description: t('home.services.events.description'),
      link: '/events',
      color: 'orange'
    },
    {
      icon: EducationIcon,
      title: t('home.services.training.title'),
      description: t('home.services.training.description'),
      link: '/training',
      color: 'purple'
    },
  ];

  const stats = [
    { value: '5000', suffix: '+', label: t('home.stats.activeFarmers'), icon: UsersIcon },
    { value: '98', suffix: '%', label: t('home.stats.satisfaction'), icon: CheckIcon },
    { value: '24', suffix: '/7', label: t('home.stats.support'), icon: AIIcon },
    { value: '50', suffix: '+', label: t('home.stats.coverage'), icon: GlobeIcon },
  ];

  const features = [
    {
      icon: ChartIcon,
      title: t('home.features.soilAnalytics.title'),
      description: t('home.features.soilAnalytics.description')
    },
    {
      icon: LeafIcon,
      title: t('home.features.ecoApproach.title'),
      description: t('home.features.ecoApproach.description')
    },
    {
      icon: TractorIcon,
      title: t('home.features.modernTech.title'),
      description: t('home.features.modernTech.description')
    },
    {
      icon: WheatIcon,
      title: t('home.features.cropPlanning.title'),
      description: t('home.features.cropPlanning.description')
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20"
        aria-label={t('home.title')}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            // src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80&auto=format&fit=crop"
            src='https://thumbs.dreamstime.com/b/expansive-view-green-agricultural-fields-parallel-crop-rows-organized-farming-scenic-landscape-nature-bounty-agriculture-385828789.jpg'
            alt="Nature farm background"
            className="w-full h-full object-cover brightness-75"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50 dark:from-black/50 dark:via-black/45 dark:to-black/60"></div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-5 lg:left-10 w-48 lg:w-72 h-48 lg:h-72 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-5 lg:right-10 w-64 lg:w-96 h-64 lg:h-96 bg-sky-300/20 dark:bg-sky-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 lg:w-[500px] h-80 lg:h-[500px] bg-earth-200/10 dark:bg-earth-600/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements - Desktop only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          <div className="absolute top-32 left-[15%] animate-float">
            <div className="w-12 h-12 2xl:w-14 2xl:h-14 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center shadow-lg">
              <LeafIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="absolute top-48 right-[20%] animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-10 h-10 2xl:w-12 2xl:h-12 bg-sky-100 dark:bg-sky-900/50 rounded-2xl flex items-center justify-center shadow-lg">
              <SunIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-sky-600 dark:text-sky-400" />
            </div>
          </div>
          <div className="absolute bottom-32 left-[25%] animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-10 h-10 bg-earth-100 dark:bg-earth-900/50 rounded-2xl flex items-center justify-center shadow-lg">
              <WheatIcon className="w-5 h-5 text-earth-600 dark:text-earth-400" />
            </div>
          </div>
          <div className="absolute bottom-48 right-[15%] animate-float" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 2xl:w-12 2xl:h-12 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center shadow-lg">
              <DropIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-primary-700 dark:text-primary-400 text-xs lg:text-sm font-medium mb-2 lg:mb-3 shadow-lg">
              <LeafIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
              {t('home.ecoPlatform')}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-display font-bold mb-3 lg:mb-4">
              <span className="text-white drop-shadow-2xl">{t('home.title')}</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/95 max-w-2xl lg:max-w-3xl mx-auto mb-6 lg:mb-8 leading-relaxed px-4 drop-shadow-lg">
              {t('home.subtitle')}
            </p>

            {/* Mission Section */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-8 lg:mb-10"
            >
              <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-200/50 dark:border-dark-700/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <LeafIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-display font-bold text-gray-800 dark:text-white mb-2">
                      Missiyamız
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                      Kənd təsərrüfatında rəqəmsal transformasiyanı sürətləndirmək və hər bir fermer üçün etibarlı, 
                      innovativ və ekoloji yönümlü rəqəmsal köməkçi yaratmaqla Azərbaycanın aqrar sektorunu inkişaf etdirmək. 
                      Müasir texnologiyalar və süni intellekt vasitəsilə fermerlərin məhsuldarlığını artırmaq, 
                      davamlı kənd təsərrüfatı praktikalarını təşviq etmək və yerli fermerlərin qlobal bazarda rəqabət qabiliyyətini gücləndirmək.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div> */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
              <Link to="/services" className="btn-secondary inline-flex items-center w-full sm:w-auto justify-center bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-dark-800 shadow-xl">
                {t('home.exploreServices')}
                <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 lg:w-1.5 lg:h-3 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="spacing-section relative" aria-label={t('home.stats.activeFarmers')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileInView="animate"
                initial="initial"
              >
                <MemoizedStatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="spacing-section relative" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true, margin: "-50px" }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-12 lg:mb-20"
          >
            <span className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm lg:text-base font-medium mb-4 lg:mb-6">
              {t('home.services.title')}
            </span>
            <h2 id="services-heading" className="section-title">
              <span className="gradient-text">{t('home.services.heading')}</span>
            </h2>
            <p className="section-subtitle">
              {t('home.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                whileInView="animate"
                initial="initial"
              >
                <MemoizedServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="spacing-section bg-gradient-to-br from-primary-50/50 via-white to-sky-50/50 dark:from-dark-900/50 dark:via-dark-900 dark:to-dark-800/50"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <span className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm lg:text-base font-medium mb-4 lg:mb-6">
                {t('home.features.whyUs')}
              </span>
              <h2 id="features-heading" className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-800 dark:text-white mb-6 lg:mb-8">
                {t('home.features.heading')}
              </h2>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-8 lg:mb-10 text-base lg:text-lg text-readable">
                {t('home.features.description')}
              </p>

              <div className="space-y-4 lg:space-y-6">
                {features.map((feature, index) => (
                  <MemoizedFeatureCard key={index} {...feature} index={index} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/20 dark:shadow-primary-500/10">
                  <img 
                    src="https://www.cest.org.uk/wp-content/uploads/2021/07/cest-environment-science-technology.jpg" 
                    alt={t('home.features.smartFarming')}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Cards - Hidden on mobile */}
                <div className="hidden lg:block absolute -top-6 -right-6 bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-3 2xl:p-4 animate-float">
                  <div className="flex items-center space-x-2 2xl:space-x-3">
                    <div className="w-10 h-10 2xl:w-12 2xl:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <ChartIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xl 2xl:text-2xl font-bold text-gray-800 dark:text-white">+45%</p>
                      <p className="text-[10px] 2xl:text-xs text-gray-500 dark:text-gray-400">{t('home.features.productivity')}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-3 2xl:p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-2 2xl:space-x-3">
                    <div className="w-10 h-10 2xl:w-12 2xl:h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center">
                      <DropIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <p className="text-xl 2xl:text-2xl font-bold text-gray-800 dark:text-white">-30%</p>
                      <p className="text-[10px] 2xl:text-xs text-gray-500 dark:text-gray-400">{t('home.features.waterConsumption')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="spacing-section" aria-labelledby="ai-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-6 md:p-8 lg:p-12"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 lg:w-96 h-64 lg:h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="text-white">
                <span className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/20 text-white text-xs lg:text-sm font-medium mb-4 lg:mb-6">
                  <AIIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                  {t('home.aiPreview.badge')}
                </span>
                <h2 id="ai-preview-heading" className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 lg:mb-6">
                  {t('home.aiPreview.heading')}
                </h2>
                <p className="text-primary-100 mb-8 lg:mb-10 leading-relaxed text-base lg:text-lg">
                  {t('home.aiPreview.description')}
                </p>
                <Link 
                  to="/ai-assistant" 
                  className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 text-sm lg:text-base"
                >
                  {t('home.aiPreview.chatWithAI')}
                  <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                </Link>
              </div>

              <div className="relative hidden md:block">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20">
                  <div className="flex items-start space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AIIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <p className="text-white/90 text-xs lg:text-sm">
                      {t('home.aiPreview.aiGreeting')}
                    </p>
                  </div>
                  <div className="flex justify-end mb-3 lg:mb-4">
                    <div className="bg-white/20 rounded-2xl rounded-tr-sm p-2 lg:p-3 max-w-[80%]">
                      <p className="text-white/90 text-xs lg:text-sm">
                        {t('home.aiPreview.userMessage')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 lg:space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AIIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <p className="text-white/90 text-xs lg:text-sm">
                      {t('home.aiPreview.aiResponse')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="spacing-section" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 id="cta-heading" className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-800 dark:text-white mb-6 lg:mb-8">
              {t('home.cta.heading')}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-base lg:text-lg mb-8 lg:mb-10 px-4 text-readable">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
              <Link to="/contact" className="btn-primary w-full sm:w-auto">
                {t('home.cta.contactUs')}
              </Link>
              <Link to="/services" className="btn-secondary w-full sm:w-auto">
                {t('home.cta.moreInfo')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="spacing-section bg-gradient-to-br from-primary-50/50 via-white to-sky-50/50 dark:from-dark-900/50 dark:via-dark-900 dark:to-dark-800/50" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm lg:text-base font-medium mb-4 lg:mb-6">
              <LeafIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              {t('about.badge')}
            </span>
            <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-800 dark:text-white mb-6 lg:mb-8">
              {t('about.paragraph2')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="card p-8 lg:p-12 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm">
              <div className="prose prose-lg dark:prose-invert max-w-none">
               
                {/* <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg mb-6">
                  {t('about.paragraph2').split('EcoGrow').map((part, index) => 
                    index === 0 ? (
                      <React.Fragment key={index}>
                        {part}
                        <strong className="text-primary-600 dark:text-primary-400">EcoGrow</strong>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>{part}</React.Fragment>
                    )
                  )}
                </p> */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg mb-6">
                  {t('about.paragraph1')}
                </p>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700">
                  <p className="text-xl lg:text-2xl font-display font-bold text-primary-600 dark:text-primary-400 text-center">
                    {t('about.conclusion')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);
