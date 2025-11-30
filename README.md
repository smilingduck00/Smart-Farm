# SmartFarm Platform

Fermerlər üçün rəqəmsal kömək platforması - AI dəstəyi, hava proqnozu, bazar məlumatları və tədbirlər platforması.

## 📋 Tələblər

Aşağıdakı proqramların quraşdırılmış olması lazımdır:

- **Node.js** (v16 və ya daha yeni versiya) - [Download](https://nodejs.org/)
- **npm** (Node.js ilə birlikdə gəlir) və ya **yarn**
- **Git** (kodun klonlanması üçün)

## 🚀 Quraşdırma Addımları

### 1. Node.js və npm-in yoxlanılması

Terminal/Command Prompt-da aşağıdakı əmrləri işə salın:

```bash
node --version
npm --version
```

Əgər versiyalar göstərilirsə, Node.js quraşdırılıbdır. Əks halda, [Node.js rəsmi saytından](https://nodejs.org/) yükləyin.

### 2. Proyektin Klonlanması və ya Kopyalanması

Əgər Git istifadə edirsinizsə:
```bash
git clone <repository-url>
cd smartfarm_v2
```

Və ya proyekt qovluğunu yeni kompüterə kopyalayın.

### 3. Asılılıqların Quraşdırılması

Proyekt qovluğunda aşağıdakı əmri işə salın:

```bash
npm install
```

Bu əmr bütün lazımi paketləri quraşdıracaq (5-10 dəqiqə çəkə bilər).

### 4. Environment Variables (Mühit Dəyişənləri) Quraşdırması

Proyektin əsas qovluğunda `.env` adlı fayl yaradın və aşağıdakı məlumatları əlavə edin:

```env
# AI API Keys (İstəyə bağlı - demo rejimdə işləyir)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
GROQ_VISION_MODEL=llama-3.2-11b-vision-preview

# Hugging Face API Key (Şəkil analizi üçün - İstəyə bağlı)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Weather API Key (Hava məlumatları üçün - İstəyə bağlı)
# Demo rejimdə işləyir, lakin real məlumat üçün OpenWeatherMap API açarı lazımdır
WEATHER_API_KEY=demo
# və ya real açar üçün:
# WEATHER_API_KEY=your_openweathermap_api_key_here

# Server Port (İstəyə bağlı - default: 5001)
PORT=5001
```

**Qeyd:** 
- Əgər API açarları yoxdursa, platforma demo rejimdə işləyəcək
- GROQ API açarı üçün: https://console.groq.com
- OpenWeatherMap API açarı üçün: https://openweathermap.org/api
- Hugging Face API açarı üçün: https://huggingface.co/settings/tokens

### 5. Proyektin İşə Salınması

İki terminal pəncərəsi açın:

**Terminal 1 - Backend Server:**
```bash
npm run server
```

Bu əmr backend serveri `http://localhost:5001` ünvanında işə salacaq.

**Terminal 2 - Frontend Development Server:**
```bash
npm start
```

Bu əmr React development serveri işə salacaq və brauzerdə `http://localhost:3000` ünvanında avtomatik açılacaq.

### 6. Brauzerdə Açılması

Brauzer avtomatik olaraq açılacaq. Əgər açılmazsa, əl ilə `http://localhost:3000` ünvanına daxil olun.

## 📝 Əsas Əmrlər

```bash
# Asılılıqları quraşdır
npm install

# Backend serveri işə sal
npm run server

# Frontend development serveri işə sal
npm start

# Production üçün build yarat
npm run build

# Testləri işə sal
npm test
```

## 🔧 Problemlərin Həlli

### Port artıq istifadə olunur

Əgər port artıq istifadə olunursa:

**Backend üçün:**
`.env` faylında `PORT` dəyişənini dəyişdirin:
```env
PORT=5002
```

**Frontend üçün:**
Terminalda:
```bash
PORT=3001 npm start
```

### node_modules problemi

Əgər asılılıqlarla problem varsa:
```bash
# node_modules və package-lock.json-u silin
rm -rf node_modules package-lock.json

# Yenidən quraşdırın
npm install
```

### Windows-da problemlər

Windows istifadəçiləri üçün:
- PowerShell və ya Command Prompt istifadə edin
- `rm -rf` əvəzinə `rmdir /s /q` istifadə edin

## 📁 Proyekt Strukturu

```
smartfarm_v2/
├── public/              # Statik fayllar
├── src/
│   ├── components/      # React komponentləri
│   ├── pages/          # Səhifələr
│   ├── context/        # Context API (Auth, Theme)
│   ├── services/       # API servisləri
│   └── index.js        # Entry point
├── server.js           # Backend Express server
├── package.json        # Proyekt konfiqurasiyası
├── tailwind.config.js  # Tailwind CSS konfiqurasiyası
└── .env                # Environment variables (yaradılmalıdır)
```

## 🌐 API Endpoints

- `POST /api/chat` - AI söhbət
- `POST /api/chat-image` - Şəkil analizi
- `GET /api/weather?city=...` - Hava məlumatları

## 🔐 İstifadəçi Rolları

- **fermer** - Fermer istifadəçiləri
- **alici** - Alıcı istifadəçiləri

## 📦 İstehsal üçün Build

Production üçün build yaratmaq:

```bash
npm run build
```

Bu əmr `build/` qovluğunda optimallaşdırılmış fayllar yaradacaq.

## 🆘 Əlavə Yardım

Əgər problemlər yaşayırsınızsa:

1. Node.js versiyasını yoxlayın: `node --version` (v16+ olmalıdır)
2. Bütün asılılıqların quraşdırıldığını yoxlayın: `npm list`
3. `.env` faylının düzgün yaradıldığını yoxlayın
4. Portların boş olduğunu yoxlayın

## 📄 Lisenziya

Bu proyekt akademik tədqiqat məqsədi ilə yaradılmışdır.
