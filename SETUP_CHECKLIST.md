# ✅ Quraşdırma Checklist

Yeni kompüterdə proyekti işə salmaq üçün bu addımları izləyin:

## 📋 Checklist

- [ ] **Node.js quraşdırılıb** (v16+)
  - Yoxlamaq: `node --version`
  - Yükləmək: https://nodejs.org/

- [ ] **npm quraşdırılıb**
  - Yoxlamaq: `npm --version`
  - Node.js ilə birlikdə gəlir

- [ ] **Proyekt faylları kopyalanıb**
  - Bütün qovluqlar və fayllar mövcuddur

- [ ] **Asılılıqlar quraşdırılıb**
  - Əmr: `npm install`
  - Uğurlu olmalıdır (xəta olmamalıdır)

- [ ] **.env faylı yaradılıb**
  - Proyekt əsas qovluğunda `.env` faylı var
  - Minimum konfiqurasiya:
    ```
    PORT=5001
    WEATHER_API_KEY=demo
    ```

- [ ] **Backend server işləyir**
  - Terminal 1: `npm run server`
  - Mesaj: "AI proxy server 5001 portunda işləyir"

- [ ] **Frontend server işləyir**
  - Terminal 2: `npm start`
  - Brauzer avtomatik açılır: http://localhost:3000

- [ ] **Brauzerdə platforma açılır**
  - Giriş səhifəsi görünür
  - Xəta yoxdur

## 🔧 Əsas Əmrlər

```bash
# 1. Asılılıqları quraşdır
npm install

# 2. Backend server (Terminal 1)
npm run server

# 3. Frontend server (Terminal 2)
npm start
```

## ⚠️ Ümumi Problemlər

### Problem: "Port already in use"
**Həll:** `.env` faylında PORT-u dəyişdirin və ya digər port istifadə edin

### Problem: "Module not found"
**Həll:** `npm install` əmrini yenidən işə salın

### Problem: "Cannot find module"
**Həll:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Backend işləmir
**Həll:** `.env` faylının mövcud olduğunu yoxlayın

## 📞 Yardım Lazımdırsa

1. Node.js versiyasını yoxlayın: `node --version` (v16+)
2. npm versiyasını yoxlayın: `npm --version`
3. Bütün faylların mövcud olduğunu yoxlayın
4. README.md faylına baxın

