# Quick Setup Guide

## 🚀 Tez Quraşdırma (5 dəqiqə)

### Addım 1: Node.js Quraşdır
- https://nodejs.org/ saytından Node.js yüklə və quraşdır
- Terminal aç və yoxla: `node --version` və `npm --version`

### Addım 2: Proyekti Aç
```bash
cd smartfarm_v2
```

### Addım 3: Paketləri Quraşdır
```bash
npm install
```

### Addım 4: .env Faylı Yarad
Proyekt qovluğunda `.env` faylı yarad və əlavə et:
```env
PORT=5001
WEATHER_API_KEY=demo
```

### Addım 5: Serverləri İşə Sal

**Terminal 1:**
```bash
npm run server
```

**Terminal 2:**
```bash
npm start
```

### Addım 6: Brauzerdə Aç
`http://localhost:3000` ünvanına daxil ol

✅ Hazır! Platforma işləyir.

## ⚠️ Problem Varsa

**Port istifadə olunur?**
- `.env` faylında `PORT=5002` yaz
- Frontend üçün: `PORT=3001 npm start`

**Paketlər quraşdırılmır?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API açarları lazımdır?**
- Demo rejimdə işləyir, API açarları istəyə bağlıdır
- Real məlumat üçün: README.md faylına bax

