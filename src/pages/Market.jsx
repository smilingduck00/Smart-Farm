import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  MarketIcon, 
  ChartIcon, 
  WheatIcon,
  LeafIcon,
  CalendarIcon,
  LocationIcon,
  XIcon
} from '../components/Icons';
import { MarketCard } from '../components/Card';
import { marketDatabase, getMarketProductsByCategory } from '../database/database';

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', label: 'Hamısı' },
    { id: 'vegetables', label: 'Tərəvəz' },
    { id: 'fruits', label: 'Meyvə' },
    { id: 'grains', label: 'Taxıl' },
    { id: 'dairy', label: 'Süd məhsulları' },
  ];

  const cities = [
    { id: 'all', label: 'Bütün şəhərlər' },
    { id: 'Bakı', label: 'Bakı' },
    { id: 'Gəncə', label: 'Gəncə' },
    { id: 'Sumqayıt', label: 'Sumqayıt' },
    { id: 'Mingəçevir', label: 'Mingəçevir' },
    { id: 'Şəki', label: 'Şəki' },
    { id: 'Lənkəran', label: 'Lənkəran' },
    { id: 'Şirvan', label: 'Şirvan' },
    { id: 'Yevlax', label: 'Yevlax' },
    { id: 'Xaçmaz', label: 'Xaçmaz' },
    { id: 'Quba', label: 'Quba' },
  ];

  const marketData = getMarketProductsByCategory(selectedCategory, selectedLocation);
  const marketNews = marketDatabase.news;
  const tips = marketDatabase.tips;
  const stats = marketDatabase.stats;

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
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-earth-100 text-earth-700 text-sm font-medium mb-4">
            <MarketIcon className="w-4 h-4 mr-2" />
            Bazar Məlumatları
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            Canlı <span className="text-earth-600 dark:text-earth-400">Qiymət</span> Məlumatları
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Kənd təsərrüfatı məhsullarının real vaxtda qiymətlərini izləyin və 
            satışlarınızı optimal vaxtda həyata keçirin.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          {/* Category Filter */}
          <div className="flex items-center justify-center space-x-2 flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-earth-600 text-white shadow-lg shadow-earth-500/30'
                    : 'bg-white/80 dark:bg-dark-800/80 text-gray-600 dark:text-gray-300 hover:bg-earth-50 dark:hover:bg-dark-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Location Filter */}
          <div className="flex items-center justify-center">
            <div className="relative inline-flex items-center">
              <LocationIcon className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium bg-white/80 dark:bg-dark-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-700 hover:bg-earth-50 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card p-5 text-center">
            <ChartIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">↑ {stats.priceUp}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Qiyməti artanlar</p>
          </div>
          <div className="card p-5 text-center">
            <ChartIcon className="w-8 h-8 text-red-500 mx-auto mb-2 rotate-180" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">↓ {stats.priceDown}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Qiyməti düşənlər</p>
          </div>
          <div className="card p-5 text-center">
            <WheatIcon className="w-8 h-8 text-earth-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalProducts}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">İzlənən məhsul</p>
          </div>
          <div className="card p-5 text-center">
            <CalendarIcon className="w-8 h-8 text-sky-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.lastUpdate}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Son yenilənmə</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Price List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
              Qiymət Cədvəli
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {marketData.map((item, index) => (
                <MarketCard 
                  key={index} 
                  {...item} 
                  onContactClick={() => setSelectedProduct(item)}
                />
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
            {/* Market News */}
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
                Bazar Xəbərləri
              </h2>
              <div className="space-y-4">
                {marketNews.map((news, index) => (
                  <div key={index} className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                    <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">{news.date}</p>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{news.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{news.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4">
                Satış Tövsiyələri
              </h2>
              <div className="card p-5 bg-gradient-to-br from-earth-50 to-orange-50 dark:from-dark-800 dark:to-dark-700">
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-earth-100 dark:bg-earth-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-earth-600 dark:text-earth-400">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="card p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
              <LeafIcon className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Məhsulunuzu Satın</h3>
              <p className="text-primary-100 text-sm mb-4">
                Alıcı şəbəkəmizə qoşulun və məhsullarınızı birbaşa satın.
              </p>
              <button className="w-full py-2 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors">
                Qeydiyyatdan Keç
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedProduct && (
        <ContactModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

// Contact Modal Component
const ContactModal = ({ product, onClose }) => {
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white">
            Əlaqə Məlumatları
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Məhsul</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Satıcı</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{product.seller}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Telefon</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{product.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ünvan</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{product.location}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Market);

