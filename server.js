const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { HfInference } = require('@huggingface/inference');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'; // Pulsuz, sürətli model
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || 'llama-3.2-11b-vision-preview'; // Vision model
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo'; // OpenWeatherMap API key

const buildChatMessages = (messages = []) => {
  const systemMessage = {
    role: 'system',
    content: `Sən EcoGrow platformasının AI köməkçisisən. 

Əsas vəzifələrin:
- İstifadəçilərin suallarına düzgün, məntiqi və faydalı cavablar vermək
- Yalnız kənd təsərrüfatı, fermerlik, aqro texnologiyalar, hava, bazar məlumatları mövzularında kömək etmək
- İstifadəçinin sualını düzgün başa düşmək və ona uyğun cavab vermək
- Konuşma geçmişini dikkate alarak bağlamı korumak ve önceki mesajlara referans vermek
- İstifadəçinin daha önce sorduğu soruları ve verdiağin cavabları hatırlamak
- Əgər sual aydın deyilsə, aydınlaşdırmaq istəmək
- Qeyri-müəyyən və ya uyğunsuz cavablar verməmək

Cavabların xüsusiyyətləri:
- Azərbaycan dilində
- Qısa, dəqiq və praktik
- Məntiqi və ardıcıl
- İstifadəçinin sualına birbaşa cavab
- Konuşma geçmişindeki bilgileri kullanarak bağlamı koru
- Önceki mesajlarda bahsedilen konuları hatırla ve ona göre cevap ver

Vacib: 
- İstifadəçinin sualını düzgün oxu və ona uyğun cavab ver
- Konuşma geçmişindeki tüm mesajları dikkate al
- Önceki sorular ve cevaplar arasındaki bağlantıyı koru
- Əgər sual aydın deyilsə, aydınlaşdırmaq istə
- Template cevaplar verme, her soruya özel ve bağlama uygun cevap ver`,
  };

  // Mesajları düzgün formatla - sistem mesajı hariç tüm mesajları al
  // Eğer ilk mesaj sistem mesajıysa, onu atla
  const converted = (messages || [])
    .filter(m => m.role !== 'system') // Sistem mesajını filtrele (zaten ekleyeceğiz)
    .map((m) => ({
      role: m.type === 'user' || m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

  return [systemMessage, ...converted];
};

app.post('/api/chat', async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY tapılmadı!');
      return res.status(500).json({
        error: 'Serverdə GROQ_API_KEY tapılmadı. Zəhmət olmasa .env faylınıza əlavə edin. Pulsuz API açarı üçün https://console.groq.com ziyarət edin.',
      });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('❌ Mesajlar göndərilməyib:', req.body);
      return res.status(400).json({ error: 'Mesajlar göndərilməyib.' });
    }

    console.log('📨 Gələn mesajlar:', messages.length, 'mesaj');
    const chatMessages = buildChatMessages(messages);
    console.log('📤 Groq API-yə göndərilən mesajlar:', chatMessages.length, 'mesaj');

    // Groq API - sadə və etibarlı
    console.log('🔄 Groq API-yə sorğu göndərilir...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: chatMessages,
        max_tokens: 1000, // Daha uzun cevaplar için artırıldı
        temperature: 0.8, // Biraz daha yaratıcı cevaplar için
        top_p: 0.95,
        stream: false,
      }),
    });

    console.log('📥 Groq API cavab statusu:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || response.statusText;
      console.error('❌ Groq API xətası:', errorMsg, errorData);
      throw new Error(`Groq API xətası: ${errorMsg}`);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    console.log('✅ Groq API cavabı alındı:', answer ? `${answer.substring(0, 100)}...` : 'BOŞ');

    if (!answer) {
      console.error('❌ AI cavabı boşdur!', data);
      return res.status(500).json({ error: 'AI cavabı tapılmadı. Daha sonra yenidən sınayın.' });
    }

    return res.json({ answer });
  } catch (error) {
    console.error('❌ AI proxy xətası:', error);
    console.error('Xəta detalları:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    const errorMessage = error.message || 'Server xətası baş verdi.';
    return res.status(500).json({ error: `AI servisi yanıt vermədi: ${errorMessage}` });
  }
});

app.post('/api/chat-image', async (req, res) => {
  try {
    const { image, imageType, question } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Şəkil göndərilməyib.' });
    }

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Sual göndərilməyib.' });
    }

    const systemPrompt = `Sən EcoGrow platformasının AI şəkil analiz köməkçisisən. 

Əsas vəzifələrin:
- Fermerlərin yüklədiyi bitki, məhsul və ya kənd təsərrüfatı ilə bağlı şəkilləri analiz etmək
- Şəkildə görünən bitkilərdə xəstəlik, zərərverici, kimyəvi çatışmazlıq və ya digər problemləri müəyyən etmək
- Məhsulun keyfiyyətini, yetişmə mərhələsini və ya digər xüsusiyyətlərini qiymətləndirmək
- İstifadəçinin sualına əsasən şəkilə dair dəqiq və faydalı məlumat vermək
- Tövsiyələr və həll yolları təklif etmək

Cavabların xüsusiyyətləri:
- Azərbaycan dilində
- Dəqiq, praktik və faydalı
- Şəkilə əsaslanan konkret müşahidələr
- Tövsiyələr və həll yolları ilə birlikdə

Vacib: Şəkilə diqqətlə bax və istifadəçinin sualına dəqiq cavab ver.`;

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');
    
    let imageDescription = '';
    
    // Try to get image description using Hugging Face
    try {
      const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
      
      if (HUGGINGFACE_API_KEY) {
        const hf = new HfInference(HUGGINGFACE_API_KEY);
        
        // Use BLIP model for image captioning
        const hfResponse = await hf.imageToText({
          data: imageBuffer,
          model: 'Salesforce/blip-image-captioning-base',
        });
        
        imageDescription = hfResponse.generated_text || '';
        console.log('Image description from HF:', imageDescription);
      } else {
        console.log('HUGGINGFACE_API_KEY not set, using fallback');
      }
    } catch (hfError) {
      console.error('Hugging Face image analysis error:', hfError.message);
      // Continue with fallback
    }

    // Use Groq chat model with the image description and question
    if (!GROQ_API_KEY) {
      return res.status(500).json({
        error: 'Serverdə GROQ_API_KEY tapılmadı. Zəhmət olmasa .env faylınıza əlavə edin.',
      });
    }

    const userMessage = imageDescription 
      ? `Şəkil təsviri: ${imageDescription}\n\nİstifadəçinin sualı: ${question.trim()}\n\nZəhmət olmasa şəkil təsvirinə əsasən istifadəçinin sualına dəqiq cavab ver.`
      : `İstifadəçi bir kənd təsərrüfatı şəkli yükləyib və sual verib: "${question.trim()}". Zəhmət olmasa suala əsasən kənd təsərrüfatı, bitki xəstəlikləri, məhsul keyfiyyəti və ya digər aqro məsələlərə dair faydalı məlumat və tövsiyələr ver.`;

    const chatMessages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: chatMessages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.95,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || response.statusText;
      console.error('Groq API error:', errorMsg);
      throw new Error(`Groq API xətası: ${errorMsg}`);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(500).json({ error: 'AI cavabı tapılmadı. Daha sonra yenidən sınayın.' });
    }

    return res.json({ answer });
  } catch (error) {
    console.error('AI image analysis error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    const errorMessage = error.message || 'Server xətası baş verdi.';
    return res.status(500).json({ error: `AI servisi yanıt vermədi: ${errorMessage}` });
  }
});

// City name mapping for Azerbaijani cities to OpenWeatherMap compatible names
const cityMapping = {
  'Bakı': 'Baku',
  'Gəncə': 'Ganja',
  'Sumqayıt': 'Sumqayit',
  'Mingəçevir': 'Mingachevir',
  'Şəki': 'Shaki',
  'Lənkəran': 'Lankaran',
  'Şirvan': 'Shirvan',
  'Yevlax': 'Yevlakh',
  'Xaçmaz': 'Khachmaz',
  'Quba': 'Quba'
};

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'Şəhər adı göndərilməyib.' });
    }

    // Map Azerbaijani city name to English name for API
    const englishCityName = cityMapping[city] || city;
    
    // If using demo key, return realistic sample data based on current time
    if (WEATHER_API_KEY === 'demo') {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Base temperature varies by time of day (colder at night, warmer during day)
      const baseTemp = 15 + Math.sin((currentHour - 6) * Math.PI / 12) * 8; // Varies between 7-23°C
      const baseTempWithVariation = baseTemp + (Math.random() - 0.5) * 4;
      
      // Conditions vary by time and randomness
      const conditions = ['Günəşli', 'Qismən Buludlu', 'Buludlu', 'Yağışlı'];
      const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      const sampleData = {
        current: {
          temp: Math.round(baseTempWithVariation),
          feelsLike: Math.round(baseTempWithVariation - 2 + Math.random() * 2),
          condition: currentCondition,
          humidity: Math.round(40 + Math.random() * 40),
          wind: Math.round(3 + Math.random() * 12),
          pressure: Math.round(1005 + Math.random() * 20),
          uvIndex: currentHour >= 10 && currentHour <= 16 ? Math.round(3 + Math.random() * 5) : Math.round(1 + Math.random() * 2),
          visibility: Math.round(8 + Math.random() * 4)
        },
        hourly: Array.from({ length: 8 }, (_, i) => {
          const forecastHour = (currentHour + i * 3) % 24;
          const forecastTemp = 15 + Math.sin((forecastHour - 6) * Math.PI / 12) * 8 + (Math.random() - 0.5) * 3;
          return {
            time: `${forecastHour.toString().padStart(2, '0')}:00`,
            temp: Math.round(forecastTemp),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.round(40 + Math.random() * 40),
            wind: Math.round(3 + Math.random() * 12)
          };
        }),
        daily: Array.from({ length: 7 }, (_, dayIndex) => {
          const dayVariation = (Math.random() - 0.5) * 5;
          const high = Math.round(20 + dayVariation + Math.random() * 3);
          const low = Math.round(high - 8 - Math.random() * 3);
          return {
            high: high,
            low: low,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.round(45 + Math.random() * 30),
            wind: Math.round(5 + Math.random() * 10)
          };
        })
      };
      return res.json(sampleData);
    }

    // Fetch current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(englishCityName)},AZ&appid=${WEATHER_API_KEY}&units=metric&lang=az`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
      throw new Error(`Hava məlumatı alına bilmədi: ${currentResponse.statusText}`);
    }
    
    const currentData = await currentResponse.json();
    
    // Get coordinates for forecast
    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    
    // Fetch 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=az`;
    const forecastResponse = await fetch(forecastUrl);
    
    let forecastData = null;
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json();
    }
    
    // Map weather condition codes to Azerbaijani descriptions
    const conditionMap = {
      'Clear': 'Günəşli',
      'Clouds': 'Buludlu',
      'Rain': 'Yağışlı',
      'Drizzle': 'Yüngül Yağış',
      'Thunderstorm': 'Tufan',
      'Snow': 'Qar',
      'Mist': 'Duman',
      'Fog': 'Duman',
      'Haze': 'Duman'
    };
    
    const getCondition = (weather) => {
      return conditionMap[weather.main] || weather.description || 'Naməlum';
    };
    
    // Process current weather
    const current = {
      temp: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      condition: getCondition(currentData.weather[0]),
      humidity: currentData.main.humidity,
      wind: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      pressure: currentData.main.pressure,
      uvIndex: 0, // UV index requires separate API call
      visibility: currentData.visibility ? Math.round(currentData.visibility / 1000) : 10
    };
    
    // Process hourly forecast (next 24 hours, showing every 3 hours)
    let hourly = [];
    if (forecastData && forecastData.list) {
      // Get next 6-8 forecast items (every 3 hours)
      hourly = forecastData.list.slice(0, 8).map(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return {
          time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
          temp: Math.round(item.main.temp),
          condition: getCondition(item.weather[0]),
          humidity: item.main.humidity,
          wind: Math.round(item.wind.speed * 3.6)
        };
      });
    }
    
    // Process daily forecast (7 days) - group by day
    let daily = [];
    if (forecastData && forecastData.list) {
      const dailyMap = new Map();
      
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        // Use date without time for grouping
        const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        
        if (!dailyMap.has(dayKey)) {
          dailyMap.set(dayKey, {
            high: item.main.temp_max,
            low: item.main.temp_min,
            conditions: [getCondition(item.weather[0])],
            humidity: item.main.humidity,
            wind: item.wind.speed * 3.6,
            date: date
          });
        } else {
          const existing = dailyMap.get(dayKey);
          existing.high = Math.max(existing.high, item.main.temp_max);
          existing.low = Math.min(existing.low, item.main.temp_min);
          existing.conditions.push(getCondition(item.weather[0]));
          existing.humidity = Math.round((existing.humidity + item.main.humidity) / 2);
          existing.wind = Math.max(existing.wind, item.wind.speed * 3.6);
        }
      });
      
      // Convert to array and sort by date
      daily = Array.from(dailyMap.values())
        .sort((a, b) => a.date - b.date)
        .slice(0, 7)
        .map(day => ({
          high: Math.round(day.high),
          low: Math.round(day.low),
          condition: day.conditions[Math.floor(day.conditions.length / 2)], // Most common condition
          humidity: Math.round(day.humidity),
          wind: Math.round(day.wind)
        }));
    }
    
    res.json({
      current,
      hourly,
      daily
    });
    
  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ 
      error: `Hava məlumatı alına bilmədi: ${error.message}` 
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ AI proxy server ${PORT} portunda işləyir`);
  console.log(`📡 Backend URL: http://localhost:${PORT}`);
  if (GROQ_API_KEY) {
    console.log(`🔑 GROQ_API_KEY: ${GROQ_API_KEY.substring(0, 10)}... (aktiv)`);
  } else {
    console.log(`⚠️  GROQ_API_KEY tapılmadı! API işləməyəcək.`);
    console.log(`📝 .env faylına GROQ_API_KEY əlavə edin: https://console.groq.com`);
  }
  console.log(`🤖 Model: ${GROQ_MODEL}`);
});



