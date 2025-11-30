// Mock AI responses for different types of questions
const mockResponses = {
  // Bitki xəstəlikləri
  'bitki xəstəlikləri': `Bitki xəstəlikləri ilə mübarizə üçün:

1. **Profilaktika**: 
   - Sağlam toxumlar istifadə edin
   - Məhsul rotasiyası tətbiq edin
   - Bitkilərin arasında kifayət qədər məsafə saxlayın

2. **Yarpaq ləkələri**:
   - Zədələnmiş yarpaqları dərhal kəsin
   - Təbii fungisid preparatlar istifadə edin (mis sulfat məhlulu)
   - Hava dövriyyəsini yaxşılaşdırın

3. **Kök çürüməsi**:
   - Suvarmanı azaldın
   - Drenaj sistemini yaxşılaşdırın
   - Torpağı yaxşı havalandırın

4. **Həşərat zərərvericiləri**:
   - Neem yağı və ya sabun məhlulu istifadə edin
   - Təbii yırtıcı həşəratları cəlb edin
   - Məhsul rotasiyası tətbiq edin

Əgər xəstəlik davam edərsə, foto göndərin və daha dəqiq tövsiyə alın.`,

  // Hava tövsiyələri
  'hava tövsiyələri': `Hava şəraiti üçün tövsiyələr:

**Yaxın günlər üçün proqnoz:**
- Bu həftə: Mülayim hava, 15-22°C
- Yağış ehtimalı: 30%
- Külək: Yüngül, 5-10 km/saat

**Fermerlik üçün tövsiyələr:**
1. **Yağışdan əvvəl**:
   - Torpağı hazırlayın
   - Drenaj sistemini yoxlayın
   - Gübrələməni tamamlayın

2. **Soyuq hava zamanı**:
   - Həssas bitkiləri qoruyun
   - Sera istifadə edin
   - Torpağı malçla örtün

3. **İsti hava zamanı**:
   - Səhər və axşam suvarma
   - Günorta saatlarında suvarmadan çəkinin
   - Bitkiləri kölgə ilə qoruyun

Hava məlumatlarını daha dəqiq izləmək üçün Hava səhifəsinə baxın.`,

  // Suvarma planı
  'suvarma planı': `Suvarma planı tövsiyələri:

**Ümumi prinsiplər:**
1. **Səhər suvarma** (6-9 arası):
   - Ən yaxşı vaxt
   - Su itkisi minimal
   - Bitkilər günəşə hazır olur

2. **Axşam suvarma** (18-20 arası):
   - İkinci ən yaxşı variant
   - Gecə boyu rütubət qalır

3. **Qadağan olunan vaxtlar**:
   - Günorta (11-15 arası) - su itkisi çox
   - Gecə - xəstəlik riski

**Məhsul növünə görə:**
- **Tərəvəz**: Həftədə 2-3 dəfə, dərin suvarma
- **Meyvə ağacları**: Həftədə 1-2 dəfə, kök zonasına
- **Taxıl**: Yağışdan asılı, əlavə su lazım deyil

**Su qənaəti üçün:**
- Damcı suvarma sistemi
- Torpağı malçla örtün
- Torpaq rütubətini izləyin

Torpaq növünüzü və məhsulunuzu bildirəndə daha dəqiq plan hazırlaya bilərəm.`,

  // Mövsümə görə əkin
  'mövsümə görə əkin': `Mövsümə görə əkin planı:

**Yaz (Mart-May):**
- Pomidor, bibər, badımcan
- Xiyar, kabak, qarpız
- Göyərti (rejhan, cəfəri, soğan)
- Kartof, soğan

**Yay (İyun-Avqust):**
- Qarpız, qovun
- Pomidor, bibər (ikinci məhsul)
- Göyərti (davamlı əkin)
- Qarabaşaq, lobya

**Payız (Sentyabr-Noyabr):**
- Göyərti (rejhan, cəfəri)
- Xardal, turp
- Soğan, sarımsaq (qış üçün)
- Kartof (ikinci məhsul)

**Qış (Dekabr-Fevral):**
- Sera məhsulları
- Göyərti (səhərdə)
- Soğan, sarımsaq (saxlama)

**Məsləhət:**
- Məhsul rotasiyası tətbiq edin
- Torpağı əvvəlcədən hazırlayın
- Toxum seçimində regional uyğunluğa diqqət edin

Hansı məhsul yetişdirmək istəyirsiniz? Daha dəqiq tövsiyə verə bilərəm.`,

  // Məhsuldarlıq
  'məhsuldarlıq': `Məhsuldarlığı artırmaq üçün:

**Torpaq hazırlığı:**
1. Torpaq analizi aparın (pH, azot, fosfor, kalium)
2. Gübrələməni düzgün planlaşdırın
3. Torpağı yaxşı havalandırın

**Toxum və bitki seçimi:**
- Yüksək məhsuldar sortlar seçin
- Regional uyğunluğa diqqət edin
- Keyfiyyətli toxumlar istifadə edin

**Suvarma:**
- Düzgün suvarma rejimi
- Damcı suvarma sistemi
- Su qənaəti texnologiyaları

**Xəstəlik və zərərvericilərlə mübarizə:**
- Profilaktik tədbirlər
- Vaxtında müalicə
- Təbii metodlar üstünlük verin

**Məhsul idarəetməsi:**
- Məhsul rotasiyası
- Məhsul arası məsafə
- Vaxtında yığım

**Texnologiya:**
- Sera istifadəsi
- Avtomatlaşdırılmış sistemlər
- Sensor texnologiyaları

Hansı məhsul üzərində işləyirsiniz? Daha konkret tövsiyələr verə bilərəm.`,

  // Default responses
  'default': [
    'Bu sual üçün daha dəqiq məlumat lazımdır. Zəhmət olmasa, hansı məhsul və ya problem haqqında danışırıq?',
    'Çox maraqlı sual! Kənd təsərrüfatı üçün praktik tövsiyələr verməyə çalışıram. Daha çox məlumat verə bilərsinizmi?',
    'Bu mövzuda sizə kömək edə bilərəm. Zəhmət olmasa, sualınızı daha ətraflı izah edin.',
    'Kənd təsərrüfatı sahəsində təcrübəmə əsasən, bu sual üçün bir neçə həll yolu var. Hansı məhsul və ya vəziyyət haqqında danışırıq?',
  ],
};

// Function to find the best matching response
const findBestResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for specific keywords
  if (lowerMessage.includes('bitki') && (lowerMessage.includes('xəstəlik') || lowerMessage.includes('xestelik'))) {
    return mockResponses['bitki xəstəlikləri'];
  }
  
  if (lowerMessage.includes('hava') || lowerMessage.includes('proqnoz') || lowerMessage.includes('yağış')) {
    return mockResponses['hava tövsiyələri'];
  }
  
  if (lowerMessage.includes('suvarma') || lowerMessage.includes('suvarma planı') || lowerMessage.includes('su')) {
    return mockResponses['suvarma planı'];
  }
  
  if (lowerMessage.includes('mövsüm') || lowerMessage.includes('əkin') || lowerMessage.includes('toxum')) {
    return mockResponses['mövsümə görə əkin'];
  }
  
  if (lowerMessage.includes('məhsuldarlıq') || lowerMessage.includes('məhsul') || lowerMessage.includes('gübrə')) {
    return mockResponses['məhsuldarlıq'];
  }
  
  // Return random default response
  const defaults = mockResponses['default'];
  return defaults[Math.floor(Math.random() * defaults.length)];
};

// Simulate AI response delay
const simulateDelay = (min = 800, max = 2000) => {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
};

// Backend URL - package.json'da proxy var, ancak tam URL kullanıyoruz
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const DEFAULT_API_URL = `${API_BASE_URL}/api/chat`;
const DEFAULT_IMAGE_API_URL = `${API_BASE_URL}/api/chat-image`;

// Mock AI function - works without API
export const askAI = async ({ messages, signal }) => {
  // Check if we should use mock data (when API is not available or for development)
  const USE_MOCK = process.env.REACT_APP_USE_MOCK_AI === 'true';
  
  if (USE_MOCK) {
    console.log('⚠️ Mock mod aktivdir (REACT_APP_USE_MOCK_AI=true)');
    // Simulate network delay
    await simulateDelay(1000, 2500);
    
    // Check if request was aborted
    if (signal?.aborted) {
      throw new Error('AbortError');
    }
    
    // Get the last user message
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop();
    
    if (!lastUserMessage) {
      return 'Zəhmət olmasa, sualınızı yazın.';
    }
    
    // Generate response based on user message
    const response = findBestResponse(lastUserMessage.content);
    
    // Simulate typing effect by returning response
    return response;
  }
  
  // Original API call (fallback)
  try {
    console.log('🔄 Backend API-yə sorğu göndərilir:', DEFAULT_API_URL);
    console.log('📤 Göndərilən mesajlar:', messages.length, 'mesaj');
    
    const response = await fetch(DEFAULT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
      signal,
    });

    console.log('📥 Backend cavab statusu:', response.status, response.statusText);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const serverMessage = errorBody.error?.message || response.statusText;
      console.error('❌ Backend xətası:', serverMessage, errorBody);
      
      // If API fails, fallback to mock
      const lastUserMessage = messages
        .filter(m => m.role === 'user')
        .pop();
      
      if (lastUserMessage) {
        console.warn('⚠️ Mock moda keçilir...');
        await simulateDelay(1000, 2000);
        if (signal?.aborted) {
          throw new Error('AbortError');
        }
        return findBestResponse(lastUserMessage.content);
      }
      
      throw new Error(`AI servisi yanıt vermədi: ${serverMessage}`);
    }

    const data = await response.json();
    const answer = data?.answer?.trim();

    console.log('✅ Backend cavabı alındı:', answer ? `${answer.substring(0, 100)}...` : 'BOŞ');

    if (!answer) {
      console.error('❌ Backend cavabı boşdur!', data);
      // Fallback to mock
      const lastUserMessage = messages
        .filter(m => m.role === 'user')
        .pop();
      
      if (lastUserMessage) {
        console.warn('⚠️ Mock moda keçilir...');
        await simulateDelay(1000, 2000);
        if (signal?.aborted) {
          throw new Error('AbortError');
        }
        return findBestResponse(lastUserMessage.content);
      }
      
      throw new Error('AI cavabı tapılmadı. Daha sonra yenidən sınayın.');
    }

    return answer;
  } catch (error) {
    // If network error, use mock data
    if (error.name === 'AbortError') {
      throw error;
    }
    
    console.error('❌ Network xətası:', error.message);
    console.error('Xəta detalları:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop();
    
    if (lastUserMessage) {
      console.warn('⚠️ Network xətası səbəbindən mock moda keçilir...');
      await simulateDelay(1000, 2000);
      if (signal?.aborted) {
        throw new Error('AbortError');
      }
      return findBestResponse(lastUserMessage.content);
    }
    
    throw error;
  }
};

export const askAIImage = async ({ image, question, signal }) => {
  // Convert image to base64
  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Remove data:image/...;base64, prefix
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });

  // Mock response for image analysis - yalnız USE_MOCK_AI true olduqda mock istifadə et
  const USE_MOCK = process.env.REACT_APP_USE_MOCK_AI === 'true';
  
  if (USE_MOCK) {
    await simulateDelay(1500, 3000);
    if (signal?.aborted) {
      throw new Error('AbortError');
    }
    
    return `Şəkil analizi nəticəsi:

Göndərdiyiniz şəkilə əsasən, bitki sağlam görünür. Əgər hər hansı bir problem görürsünüzsə, daha ətraflı təsvir edin.

**Müşahidələr:**
- Yarpaqlar normal rəngdədir
- Gövdə sağlam görünür
- Xəstəlik əlamətləri görünmür

**Tövsiyələr:**
- Bitki sağlamlığını izləməyə davam edin
- Düzgün suvarma rejimini saxlayın
- Torpağı düzgün qidalandırın

Əgər konkret problem görürsünüzsə, daha ətraflı təsvir edin və ya başqa bucaqdan foto çəkin.`;
  }

  try {
    const response = await fetch(DEFAULT_IMAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: base64Image,
        imageType: image.type,
        question 
      }),
      signal,
    });

    if (!response.ok) {
      // Fallback to mock
      await simulateDelay(1500, 3000);
      if (signal?.aborted) {
        throw new Error('AbortError');
      }
      return `Şəkil analizi nəticəsi: Bitki sağlam görünür. Əgər problem görürsünüzsə, daha ətraflı təsvir edin.`;
    }

    const data = await response.json();
    const answer = data?.answer?.trim();

    if (!answer) {
      await simulateDelay(1500, 3000);
      if (signal?.aborted) {
        throw new Error('AbortError');
      }
      return `Şəkil analizi nəticəsi: Bitki sağlam görünür. Əgər problem görürsünüzsə, daha ətraflı təsvir edin.`;
    }

    return answer;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    
    // Fallback to mock
    await simulateDelay(1500, 3000);
    if (signal?.aborted) {
      throw new Error('AbortError');
    }
    return `Şəkil analizi nəticəsi: Bitki sağlam görünür. Əgər problem görürsünüzsə, daha ətraflı təsvir edin.`;
  }
};
