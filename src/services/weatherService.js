import { weatherDatabase, getWeatherData } from '../database/database';

// Mock weather data for different cities (kept for backward compatibility)
const mockWeatherData = {
  'Bakı': {
    current: {
      temp: 22,
      feelsLike: 24,
      condition: 'Günəşli',
      humidity: 65,
      wind: 12,
      pressure: 1013,
      uvIndex: 7
    },
    hourly: [
      { time: '09:00', temp: 18, condition: 'Günəşli' },
      { time: '12:00', temp: 22, condition: 'Günəşli' },
      { time: '15:00', temp: 24, condition: 'Günəşli' },
      { time: '18:00', temp: 21, condition: 'Günəşli' },
      { time: '21:00', temp: 19, condition: 'Açıq' },
      { time: '00:00', temp: 17, condition: 'Açıq' }
    ],
    daily: [
      { high: 24, low: 17, condition: 'Günəşli' },
      { high: 25, low: 18, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Buludlu' },
      { high: 21, low: 15, condition: 'Yağışlı' },
      { high: 22, low: 16, condition: 'Günəşli' },
      { high: 24, low: 18, condition: 'Günəşli' },
      { high: 25, low: 19, condition: 'Günəşli' }
    ]
  },
  'Gəncə': {
    current: {
      temp: 20,
      feelsLike: 21,
      condition: 'Günəşli',
      humidity: 58,
      wind: 10,
      pressure: 1015,
      uvIndex: 6
    },
    hourly: [
      { time: '09:00', temp: 16, condition: 'Günəşli' },
      { time: '12:00', temp: 20, condition: 'Günəşli' },
      { time: '15:00', temp: 22, condition: 'Günəşli' },
      { time: '18:00', temp: 19, condition: 'Günəşli' },
      { time: '21:00', temp: 17, condition: 'Açıq' },
      { time: '00:00', temp: 15, condition: 'Açıq' }
    ],
    daily: [
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 21, low: 14, condition: 'Buludlu' },
      { high: 19, low: 13, condition: 'Yağışlı' },
      { high: 20, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' }
    ]
  },
  'Sumqayıt': {
    current: {
      temp: 21,
      feelsLike: 23,
      condition: 'Günəşli',
      humidity: 62,
      wind: 14,
      pressure: 1012,
      uvIndex: 7
    },
    hourly: [
      { time: '09:00', temp: 17, condition: 'Günəşli' },
      { time: '12:00', temp: 21, condition: 'Günəşli' },
      { time: '15:00', temp: 23, condition: 'Günəşli' },
      { time: '18:00', temp: 20, condition: 'Günəşli' },
      { time: '21:00', temp: 18, condition: 'Açıq' },
      { time: '00:00', temp: 16, condition: 'Açıq' }
    ],
    daily: [
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 24, low: 17, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Buludlu' },
      { high: 20, low: 14, condition: 'Yağışlı' },
      { high: 21, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 24, low: 17, condition: 'Günəşli' }
    ]
  },
  'Mingəçevir': {
    current: {
      temp: 19,
      feelsLike: 20,
      condition: 'Günəşli',
      humidity: 55,
      wind: 8,
      pressure: 1016,
      uvIndex: 6
    },
    hourly: [
      { time: '09:00', temp: 15, condition: 'Günəşli' },
      { time: '12:00', temp: 19, condition: 'Günəşli' },
      { time: '15:00', temp: 21, condition: 'Günəşli' },
      { time: '18:00', temp: 18, condition: 'Günəşli' },
      { time: '21:00', temp: 16, condition: 'Açıq' },
      { time: '00:00', temp: 14, condition: 'Açıq' }
    ],
    daily: [
      { high: 21, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 20, low: 13, condition: 'Buludlu' },
      { high: 18, low: 12, condition: 'Yağışlı' },
      { high: 19, low: 13, condition: 'Günəşli' },
      { high: 21, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' }
    ]
  },
  'Şəki': {
    current: {
      temp: 18,
      feelsLike: 19,
      condition: 'Buludlu',
      humidity: 70,
      wind: 9,
      pressure: 1014,
      uvIndex: 5
    },
    hourly: [
      { time: '09:00', temp: 14, condition: 'Buludlu' },
      { time: '12:00', temp: 18, condition: 'Buludlu' },
      { time: '15:00', temp: 20, condition: 'Buludlu' },
      { time: '18:00', temp: 17, condition: 'Buludlu' },
      { time: '21:00', temp: 15, condition: 'Açıq' },
      { time: '00:00', temp: 13, condition: 'Açıq' }
    ],
    daily: [
      { high: 20, low: 13, condition: 'Buludlu' },
      { high: 21, low: 14, condition: 'Günəşli' },
      { high: 19, low: 12, condition: 'Yağışlı' },
      { high: 17, low: 11, condition: 'Yağışlı' },
      { high: 18, low: 12, condition: 'Buludlu' },
      { high: 20, low: 13, condition: 'Günəşli' },
      { high: 21, low: 14, condition: 'Günəşli' }
    ]
  },
  'Lənkəran': {
    current: {
      temp: 23,
      feelsLike: 25,
      condition: 'Günəşli',
      humidity: 68,
      wind: 11,
      pressure: 1011,
      uvIndex: 8
    },
    hourly: [
      { time: '09:00', temp: 19, condition: 'Günəşli' },
      { time: '12:00', temp: 23, condition: 'Günəşli' },
      { time: '15:00', temp: 25, condition: 'Günəşli' },
      { time: '18:00', temp: 22, condition: 'Günəşli' },
      { time: '21:00', temp: 20, condition: 'Açıq' },
      { time: '00:00', temp: 18, condition: 'Açıq' }
    ],
    daily: [
      { high: 25, low: 18, condition: 'Günəşli' },
      { high: 26, low: 19, condition: 'Günəşli' },
      { high: 24, low: 17, condition: 'Buludlu' },
      { high: 22, low: 16, condition: 'Yağışlı' },
      { high: 23, low: 17, condition: 'Günəşli' },
      { high: 25, low: 18, condition: 'Günəşli' },
      { high: 26, low: 19, condition: 'Günəşli' }
    ]
  },
  'Şirvan': {
    current: {
      temp: 20,
      feelsLike: 21,
      condition: 'Günəşli',
      humidity: 60,
      wind: 13,
      pressure: 1013,
      uvIndex: 7
    },
    hourly: [
      { time: '09:00', temp: 16, condition: 'Günəşli' },
      { time: '12:00', temp: 20, condition: 'Günəşli' },
      { time: '15:00', temp: 22, condition: 'Günəşli' },
      { time: '18:00', temp: 19, condition: 'Günəşli' },
      { time: '21:00', temp: 17, condition: 'Açıq' },
      { time: '00:00', temp: 15, condition: 'Açıq' }
    ],
    daily: [
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 21, low: 14, condition: 'Buludlu' },
      { high: 19, low: 13, condition: 'Yağışlı' },
      { high: 20, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' }
    ]
  },
  'Yevlax': {
    current: {
      temp: 21,
      feelsLike: 22,
      condition: 'Günəşli',
      humidity: 58,
      wind: 10,
      pressure: 1014,
      uvIndex: 7
    },
    hourly: [
      { time: '09:00', temp: 17, condition: 'Günəşli' },
      { time: '12:00', temp: 21, condition: 'Günəşli' },
      { time: '15:00', temp: 23, condition: 'Günəşli' },
      { time: '18:00', temp: 20, condition: 'Günəşli' },
      { time: '21:00', temp: 18, condition: 'Açıq' },
      { time: '00:00', temp: 16, condition: 'Açıq' }
    ],
    daily: [
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 24, low: 17, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Buludlu' },
      { high: 20, low: 14, condition: 'Yağışlı' },
      { high: 21, low: 15, condition: 'Günəşli' },
      { high: 23, low: 16, condition: 'Günəşli' },
      { high: 24, low: 17, condition: 'Günəşli' }
    ]
  },
  'Xaçmaz': {
    current: {
      temp: 19,
      feelsLike: 20,
      condition: 'Günəşli',
      humidity: 63,
      wind: 11,
      pressure: 1015,
      uvIndex: 6
    },
    hourly: [
      { time: '09:00', temp: 15, condition: 'Günəşli' },
      { time: '12:00', temp: 19, condition: 'Günəşli' },
      { time: '15:00', temp: 21, condition: 'Günəşli' },
      { time: '18:00', temp: 18, condition: 'Günəşli' },
      { time: '21:00', temp: 16, condition: 'Açıq' },
      { time: '00:00', temp: 14, condition: 'Açıq' }
    ],
    daily: [
      { high: 21, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 20, low: 13, condition: 'Buludlu' },
      { high: 18, low: 12, condition: 'Yağışlı' },
      { high: 19, low: 13, condition: 'Günəşli' },
      { high: 21, low: 14, condition: 'Günəşli' },
      { high: 22, low: 15, condition: 'Günəşli' }
    ]
  },
  'Quba': {
    current: {
      temp: 17,
      feelsLike: 18,
      condition: 'Buludlu',
      humidity: 72,
      wind: 8,
      pressure: 1016,
      uvIndex: 5
    },
    hourly: [
      { time: '09:00', temp: 13, condition: 'Buludlu' },
      { time: '12:00', temp: 17, condition: 'Buludlu' },
      { time: '15:00', temp: 19, condition: 'Buludlu' },
      { time: '18:00', temp: 16, condition: 'Buludlu' },
      { time: '21:00', temp: 14, condition: 'Açıq' },
      { time: '00:00', temp: 12, condition: 'Açıq' }
    ],
    daily: [
      { high: 19, low: 12, condition: 'Buludlu' },
      { high: 20, low: 13, condition: 'Günəşli' },
      { high: 18, low: 11, condition: 'Yağışlı' },
      { high: 16, low: 10, condition: 'Yağışlı' },
      { high: 17, low: 11, condition: 'Buludlu' },
      { high: 19, low: 12, condition: 'Günəşli' },
      { high: 20, low: 13, condition: 'Günəşli' }
    ]
  }
};

// Simulate API delay
const simulateDelay = (min = 500, max = 1500) => {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
};

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const fetchWeatherData = async (city) => {
  // Check if we should use mock data
  const USE_MOCK = process.env.REACT_APP_USE_MOCK_WEATHER === 'true' || !process.env.REACT_APP_API_URL;
  
  if (USE_MOCK) {
    // Simulate network delay
    await simulateDelay(800, 1500);
    
    // Get data from database
    const cityData = getWeatherData(city);
    
    // Add some randomness to make it feel more dynamic
    const randomVariation = () => Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    
    return {
      current: {
        ...cityData.current,
        temp: cityData.current.temp + randomVariation(),
        feelsLike: cityData.current.feelsLike + randomVariation(),
        humidity: Math.max(40, Math.min(80, cityData.current.humidity + randomVariation() * 5)),
        wind: Math.max(5, Math.min(20, cityData.current.wind + randomVariation() * 2)),
      },
      hourly: cityData.hourly.map(hour => ({
        ...hour,
        temp: hour.temp + randomVariation()
      })),
      daily: cityData.daily.map(day => ({
        ...day,
        high: day.high + randomVariation(),
        low: day.low + randomVariation()
      }))
    };
  }
  
  // Try to fetch from API
  try {
    const response = await fetch(`${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      // If API fails, fallback to database
      await simulateDelay(500, 1000);
      const cityData = getWeatherData(city);
      return {
        current: cityData.current,
        hourly: cityData.hourly,
        daily: cityData.daily
      };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Fallback to database on error
    await simulateDelay(500, 1000);
    const cityData = getWeatherData(city);
    return {
      current: cityData.current,
      hourly: cityData.hourly,
      daily: cityData.daily
    };
  }
};
