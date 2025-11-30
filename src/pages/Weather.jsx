import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  CloudRainIcon, 
  ThermometerIcon, 
  WindIcon, 
  HumidityIcon,
  DropIcon,
  LocationIcon,
  LeafIcon,
  InfoIcon
} from '../components/Icons';
import { fetchWeatherData } from '../services/weatherService';

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState('Bakı');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = [
    'Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şəki', 
    'Lənkəran', 'Şirvan', 'Yevlax', 'Xaçmaz', 'Quba'
  ];

  // Get icon based on condition
  const getWeatherIcon = (condition) => {
    if (!condition) return SunIcon;
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('yağış') || lowerCondition.includes('qar') || lowerCondition.includes('tufan')) {
      return CloudRainIcon;
    }
    if (lowerCondition.includes('bulud')) {
      return CloudRainIcon;
    }
    return SunIcon;
  };

  // Get day name in Azerbaijani
  const getDayName = (index) => {
    const days = ['Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];
    const today = new Date().getDay();
    const dayIndex = (today + index) % 7;
    return days[dayIndex];
  };

  // Fetch weather data on mount and when city changes
  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      } catch (err) {
        console.error('Weather loading error:', err);
        setError('Hava məlumatı yüklənə bilmədi. Zəhmət olmasa daha sonra yenidən sınayın.');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
    
    // Auto-refresh every 10 minutes to get latest data
    const refreshInterval = setInterval(() => {
      loadWeatherData();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(refreshInterval);
  }, [selectedCity]);

  // Use real weather data - no fallbacks, only show when data is loaded
  const currentWeather = weatherData?.current;
  const hourlyForecast = weatherData?.hourly || [];
  const weeklyForecast = weatherData?.daily?.map((day, index) => ({
    day: getDayName(index),
    high: day?.high || '--',
    low: day?.low || '--',
    condition: day?.condition || 'Məlumat yoxdur',
    icon: getWeatherIcon(day?.condition)
  })) || [];

  // Generate dynamic farming recommendations based on real weather data
  const generateFarmingTips = () => {
    if (!currentWeather || loading) {
      return [
        {
          icon: DropIcon,
          title: 'Suvarma',
          tip: 'Hava məlumatı yüklənir...'
        }
      ];
    }

    const tips = [];
    const temp = currentWeather?.temp || 20;
    const humidity = currentWeather?.humidity || 50;
    const wind = currentWeather?.wind || 10;
    const condition = currentWeather?.condition?.toLowerCase() || '';
    const lowTemp = weeklyForecast[0]?.low || (typeof temp === 'number' ? temp - 5 : 15);

    // Irrigation recommendation
    if (condition.includes('yağış') || condition.includes('qar')) {
      tips.push({
        icon: DropIcon,
        title: 'Suvarma',
        tip: 'Bu gün yağış gözlənilir. Suvarmanı dayandırın və ya azaldın. Təbii suvarma kifayət edəcək.'
      });
    } else if (humidity < 50 && temp > 20) {
      tips.push({
        icon: DropIcon,
        title: 'Suvarma',
        tip: 'Rütubət aşağıdır və temperatur yüksəkdir. Əkinləri düzgün suvarmaq vacibdir. Səhər erkən və ya axşam gecə suvarmaq tövsiyə olunur.'
      });
    } else if (humidity > 70) {
      tips.push({
        icon: DropIcon,
        title: 'Suvarma',
        tip: 'Rütubət yüksəkdir. Suvarmanı azaldın və ya dayandırın. Həddindən artıq suvarma kök çürüməsinə səbəb ola bilər.'
      });
    } else {
      tips.push({
        icon: DropIcon,
        title: 'Suvarma',
        tip: 'Hava şəraiti suvarma üçün uyğundur. Normal suvarma rejimini davam etdirin.'
      });
    }

    // Spraying recommendation
    if (wind > 20) {
      tips.push({
        icon: LeafIcon,
        title: 'Püskürtmə',
        tip: 'Küləyin sürəti yüksəkdir (20 km/s-dən çox). Pestisid və gübrə püskürtməsi üçün uyğun deyil. Külək azalana qədər gözləyin.'
      });
    } else if (wind < 5 && !condition.includes('yağış')) {
      tips.push({
        icon: LeafIcon,
        title: 'Püskürtmə',
        tip: 'Küləyin sürəti aşağıdır və hava qurudur. Pestisid və gübrə püskürtməsi üçün ideal şəraitdir.'
      });
    } else if (condition.includes('yağış')) {
      tips.push({
        icon: LeafIcon,
        title: 'Püskürtmə',
        tip: 'Yağış gözlənilir. Püskürtmə işlərini təxirə salın. Yağışdan sonra davam edin.'
      });
    } else {
      tips.push({
        icon: LeafIcon,
        title: 'Püskürtmə',
        tip: 'Külək sürəti mülayimdir. Püskürtmə işləri aparıla bilər, lakin külək istiqamətinə diqqət edin.'
      });
    }

    // Temperature/Frost recommendation
    if (lowTemp < 0) {
      tips.push({
        icon: ThermometerIcon,
        title: 'Donma Xəbərdarlığı',
        tip: `Gecə temperaturu ${lowTemp}°C-ə düşəcək. Donma riski var! Həssas bitkiləri qoruyun və ya örtün.`
      });
    } else if (lowTemp < 5) {
      tips.push({
        icon: ThermometerIcon,
        title: 'Temperatur',
        tip: `Gecə temperaturu ${lowTemp}°C-ə düşəcək. Həssas bitkilər üçün diqqətli olun. Donma riski aşağıdır, lakin müşahidə edin.`
      });
    } else if (temp > 35) {
      tips.push({
        icon: ThermometerIcon,
        title: 'İstilik Xəbərdarlığı',
        tip: 'Temperatur çox yüksəkdir. Bitkilər üçün istilik stressi riski var. Kölgə və əlavə suvarma təmin edin.'
      });
    } else if (temp > 30) {
      tips.push({
        icon: ThermometerIcon,
        title: 'Temperatur',
        tip: 'Temperatur yüksəkdir. Bitkilərin su ehtiyacını artırın və günorta saatlarında kölgə təmin edin.'
      });
    } else {
      tips.push({
        icon: ThermometerIcon,
        title: 'Temperatur',
        tip: `Temperatur mülayimdir (${temp}°C). Bitkilər üçün optimal şəraitdir. Donma riski yoxdur.`
      });
    }

    // Additional tip based on conditions
    if (condition.includes('günəşli') && currentWeather?.uvIndex && currentWeather.uvIndex > 6) {
      tips.push({
        icon: SunIcon,
        title: 'UV İndeksi',
        tip: 'UV indeksi yüksəkdir. Günorta saatlarında açıq sahələrdə işləməkdən çəkinin və müdafiə tədbirləri görün.'
      });
    }

    return tips.slice(0, 3); // Return top 3 most relevant tips
  };

  const farmingTips = generateFarmingTips();

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
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <SunIcon className="w-4 h-4 mr-2" />
            Hava Proqnozu
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            Real Vaxtda <span className="text-sky-600 dark:text-sky-400">Hava Məlumatları</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Dəqiq hava proqnozu ilə əkinlərinizi qoruyun və optimal vaxtlama ilə fermerlik fəaliyyətinizi planlaşdırın.
          </p>
        </motion.div>

        {/* City Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
            <LocationIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCity === city
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white/80 dark:bg-dark-800/80 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-dark-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Current Weather Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="card-glass p-8 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <LocationIcon className="w-5 h-5" />
                  <span className="text-lg">{selectedCity}, Azərbaycan</span>
                </div>
                <div className="flex items-center space-x-4">
                  {loading ? (
                    <div className="w-24 h-24 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  ) : currentWeather ? (
                    <>
                      {(() => {
                        const WeatherIcon = getWeatherIcon(currentWeather?.condition);
                        return <WeatherIcon className="w-24 h-24 text-yellow-300" />;
                      })()}
                      <div>
                        <p className="text-7xl font-bold">{currentWeather?.temp || '--'}°</p>
                        <p className="text-xl text-sky-100">{currentWeather?.condition || 'Məlumat yoxdur'}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center">
                      <div className="text-sky-100">Məlumat yoxdur</div>
                    </div>
                  )}
                </div>
                {currentWeather && (
                  <p className="mt-4 text-sky-100">
                    Hiss olunan temperatur: {currentWeather.feelsLike}°C
                  </p>
                )}
              </div>
              
              {currentWeather ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <HumidityIcon className="w-6 h-6 mb-2" />
                    <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
                    <p className="text-sm text-sky-100">Rütubət</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <WindIcon className="w-6 h-6 mb-2" />
                    <p className="text-2xl font-bold">{currentWeather.wind} km/s</p>
                    <p className="text-sm text-sky-100">Külək</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <ThermometerIcon className="w-6 h-6 mb-2" />
                    <p className="text-2xl font-bold">{currentWeather.pressure} hPa</p>
                    <p className="text-sm text-sky-100">Təzyiq</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <SunIcon className="w-6 h-6 mb-2" />
                    <p className="text-2xl font-bold">{currentWeather.uvIndex || 'N/A'}</p>
                    <p className="text-sm text-sky-100">UV İndeksi</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-6 h-6 mb-2 bg-white/20 rounded animate-pulse"></div>
                      <div className="w-12 h-8 bg-white/20 rounded animate-pulse mb-2"></div>
                      <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Farming Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-display font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <InfoIcon className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Fermer Tövsiyələri
            </h2>
            <div className="space-y-4">
              {farmingTips.map((tip, index) => (
                <div key={index} className="card p-5 hover:bg-white dark:hover:bg-dark-800">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weather Alert - Dynamic based on current weather */}
            {currentWeather && (() => {
              const condition = currentWeather?.condition?.toLowerCase() || '';
              const temp = currentWeather?.temp || 20;
              
              // Check for extreme temperatures
              if (temp < 0 || temp > 35) {
                return (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <InfoIcon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">Xəbərdarlıq</h4>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                          {temp < 0 
                            ? 'Temperatur çox aşağıdır. Həssas bitkiləri qoruyun.'
                            : 'Temperatur çox yüksəkdir. Bitkilər üçün istilik stressi riski var.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              
              // Check for rain
              if (condition.includes('yağış') || condition.includes('tufan')) {
                return (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <InfoIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Məlumat</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          Bu gün yağış gözlənilir. Suvarmanı dayandırın və ya azaldın.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return null;
            })()}
          </motion.div>
      </div>
    </div>
  );
};

export default memo(Weather);

