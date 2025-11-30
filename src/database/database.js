// EcoGrow Database - Frontend Database System
// Bütün verilənlər bu faylda saxlanılır və idarə olunur

// ============================================
// USERS DATABASE
// ============================================
export const defaultUsers = [
  {
    id: 'admin-001',
    fullName: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'fermer',
    phone: '',
    createdAt: new Date('2024-01-01').toISOString(),
  }
];

// ============================================
// WEATHER DATABASE
// ============================================
export const weatherDatabase = {
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
      humidity: 75,
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
      feelsLike: 22,
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
      feelsLike: 23,
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
      condition: 'Buludlu',
      humidity: 68,
      wind: 9,
      pressure: 1015,
      uvIndex: 5
    },
    hourly: [
      { time: '09:00', temp: 15, condition: 'Buludlu' },
      { time: '12:00', temp: 19, condition: 'Buludlu' },
      { time: '15:00', temp: 21, condition: 'Buludlu' },
      { time: '18:00', temp: 18, condition: 'Buludlu' },
      { time: '21:00', temp: 16, condition: 'Açıq' },
      { time: '00:00', temp: 14, condition: 'Açıq' }
    ],
    daily: [
      { high: 21, low: 14, condition: 'Buludlu' },
      { high: 22, low: 15, condition: 'Günəşli' },
      { high: 20, low: 13, condition: 'Yağışlı' },
      { high: 18, low: 12, condition: 'Yağışlı' },
      { high: 19, low: 13, condition: 'Buludlu' },
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
      uvIndex: 4
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

// ============================================
// MARKET DATABASE
// ============================================
export const marketDatabase = {
  products: [
    { name: 'Pomidor', price: '1.80', change: '5.2', unit: 'kg', trend: 'up', category: 'vegetables', location: 'Bakı', seller: 'Əli Məmmədov', phone: '+994 50 123 45 67' },
    { name: 'Xiyar', price: '1.20', change: '2.1', unit: 'kg', trend: 'up', category: 'vegetables', location: 'Gəncə', seller: 'Gülər Əhmədova', phone: '+994 55 234 56 78' },
    { name: 'Kartof', price: '0.80', change: '0.5', unit: 'kg', trend: 'stable', category: 'vegetables', location: 'Sumqayıt', seller: 'Rəşad Hüseynov', phone: '+994 12 345 67 89' },
    { name: 'Soğan', price: '0.60', change: '3.8', unit: 'kg', trend: 'down', category: 'vegetables', location: 'Mingəçevir', seller: 'Nərgiz Qasımova', phone: '+994 70 456 78 90' },
    { name: 'Alma', price: '2.50', change: '1.5', unit: 'kg', trend: 'up', category: 'fruits', location: 'Şəki', seller: 'Vüsal Əliyev', phone: '+994 51 567 89 01' },
    { name: 'Armud', price: '3.00', change: '2.0', unit: 'kg', trend: 'up', category: 'fruits', location: 'Lənkəran', seller: 'Aygün Məlikova', phone: '+994 55 678 90 12' },
    { name: 'Nar', price: '4.50', change: '8.5', unit: 'kg', trend: 'up', category: 'fruits', location: 'Şirvan', seller: 'Elçin Rəhimov', phone: '+994 50 789 01 23' },
    { name: 'Üzüm', price: '3.50', change: '4.2', unit: 'kg', trend: 'down', category: 'fruits', location: 'Yevlax', seller: 'Leyla Həsənova', phone: '+994 12 890 12 34' },
    { name: 'Buğda', price: '0.45', change: '1.2', unit: 'kg', trend: 'stable', category: 'grains', location: 'Xaçmaz', seller: 'Tural Məmmədov', phone: '+994 70 901 23 45' },
    { name: 'Arpa', price: '0.35', change: '0.8', unit: 'kg', trend: 'stable', category: 'grains', location: 'Quba', seller: 'Səbinə Əliyeva', phone: '+994 51 012 34 56' },
    { name: 'Qarğıdalı', price: '0.55', change: '2.5', unit: 'kg', trend: 'up', category: 'grains', location: 'Bakı', seller: 'Ruslan Quliyev', phone: '+994 55 123 45 67' },
    { name: 'Süd', price: '1.50', change: '0.0', unit: 'litr', trend: 'stable', category: 'dairy', location: 'Gəncə', seller: 'Nigar Vəliyeva', phone: '+994 50 234 56 78' },
    { name: 'Pendir', price: '12.00', change: '3.0', unit: 'kg', trend: 'up', category: 'dairy', location: 'Sumqayıt', seller: 'Kamran İbrahimov', phone: '+994 12 345 67 89' },
    { name: 'Kərə yağı', price: '18.00', change: '5.5', unit: 'kg', trend: 'up', category: 'dairy', location: 'Mingəçevir', seller: 'Gülnar Əhmədova', phone: '+994 70 456 78 90' },
  ],
  news: [
    {
      title: 'Pomidor qiymətləri artdı',
      description: 'Son həftədə pomidor qiymətləri 5% artıb. Ekspertlər bunun mövsümi dəyişikliklə əlaqəli olduğunu bildirir.',
      date: '25 Noyabr 2024'
    },
    {
      title: 'Yeni ixrac bazarları',
      description: 'Azərbaycan meyvələri üçün yeni ixrac bazarları açılıb. Fermerlər üçün yeni imkanlar.',
      date: '23 Noyabr 2024'
    },
    {
      title: 'Taxıl istehsalı artıb',
      description: 'Bu il taxıl istehsalı keçən ilə nisbətən 12% artıb. Yerli bazarda kifayət qədər təchizat var.',
      date: '20 Noyabr 2024'
    }
  ],
  tips: [
    'Məhsullarınızı sərfəli qiymətə satmaq üçün mövsümə diqqət edin',
    'Yerli bazarları araşdırın - bəzən daha yaxşı qiymətlər tapa bilərsiniz',
    'Keyfiyyətli qablaşdırma satış qiymətini 10-15% artıra bilər',
    'Alıcılarla uzunmüddətli əlaqələr qurun'
  ],
  stats: {
    priceUp: 8,
    priceDown: 3,
    totalProducts: 14,
    lastUpdate: 'Bu gün'
  }
};

// ============================================
// FARMERS DATABASE (Buyer Market)
// ============================================
export const farmersDatabase = [
  {
    id: 'f1',
    name: 'Şəki Agro',
    region: 'Şəki',
    rating: 4.8,
    delivery: '3 günə çatdırılma',
    badge: 'Orqanik sertifikatlı',
    products: [
      { id: 'p1', name: 'Orqanik Pomidor', price: 2.2, unit: 'kg' },
      { id: 'p2', name: 'Xiyar', price: 1.6, unit: 'kg' },
      { id: 'p3', name: 'Bibər', price: 2.9, unit: 'kg' },
    ],
  },
  {
    id: 'f2',
    name: 'Quba Bağları',
    region: 'Quba',
    rating: 4.6,
    delivery: '2 günə çatdırılma',
    badge: 'Soyuducu logistika',
    products: [
      { id: 'p4', name: 'Alma', price: 2.8, unit: 'kg' },
      { id: 'p5', name: 'Armud', price: 3.2, unit: 'kg' },
      { id: 'p6', name: 'Çiyələk', price: 5.5, unit: 'kg' },
    ],
  },
  {
    id: 'f3',
    name: 'Lənkəran Citrus',
    region: 'Lənkəran',
    rating: 4.9,
    delivery: '4 günə çatdırılma',
    badge: 'İxrac keyfiyyəti',
    products: [
      { id: 'p7', name: 'Limon', price: 3.4, unit: 'kg' },
      { id: 'p8', name: 'Mandarin', price: 2.9, unit: 'kg' },
      { id: 'p9', name: 'Kivi', price: 6.0, unit: 'kg' },
    ],
  },
];

// ============================================
// EVENTS DATABASE
// ============================================
export const eventsDatabase = [
  {
    id: 1,
    title: 'Pomidor Yığımına Kömək Lazımdır',
    description: '5 hektar sahədə pomidor yığımına kömək lazımdır. Təcrübəli işçilər üstünlük verilir.',
    type: 'harvest',
    location: 'Bakı, Qaradağ',
    date: '2024-12-20',
    time: '08:00',
    duration: '6 saat',
    paymentType: 'paid',
    paymentAmount: '50 ₼',
    paymentDescription: 'Günlük ödəniş',
    organizer: 'Əli Məmmədov',
    organizerPhone: '+994 50 123 45 67',
    participants: 3,
    maxParticipants: 10,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80',
    createdAt: new Date('2024-11-15').toISOString()
  },
  {
    id: 2,
    title: 'Kartof Əkini - Könüllü Kömək',
    description: 'Kartof əkini üçün könüllü kömək axtarırıq. Təcrübə tələb olunmur, hər kəs qatıla bilər.',
    type: 'planting',
    location: 'Gəncə, Kəpəz',
    date: '2024-12-22',
    time: '09:00',
    duration: '4 saat',
    paymentType: 'free',
    paymentAmount: null,
    paymentDescription: 'Pulsuz könüllü iş',
    organizer: 'Gülər Əhmədova',
    organizerPhone: '+994 55 234 56 78',
    participants: 8,
    maxParticipants: 15,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    createdAt: new Date('2024-11-10').toISOString()
  },
  {
    id: 3,
    title: 'Suvarma Sisteminin Quraşdırılması',
    description: 'Yeni suvarma sisteminin quraşdırılması üçün mütəxəssis və köməkçi işçilər lazımdır.',
    type: 'irrigation',
    location: 'Sumqayıt, Xətai',
    date: '2024-12-25',
    time: '10:00',
    duration: '8 saat',
    paymentType: 'paid',
    paymentAmount: '80 ₼',
    paymentDescription: 'Günlük ödəniş + yemək',
    organizer: 'Rəşad Hüseynov',
    organizerPhone: '+994 12 345 67 89',
    participants: 2,
    maxParticipants: 5,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    createdAt: new Date('2024-11-20').toISOString()
  }
];

// ============================================
// TRAINING DATABASE
// ============================================
export const trainingDatabase = {
  courses: [
    {
      title: 'Modern Əkinçilik Əsasları',
      description: 'Müasir kənd təsərrüfatının əsas prinsipləri, torpaq hazırlığı, əkin texnikaları.',
      duration: '4 həftə',
      level: 'Başlanğıc',
      category: 'beginner',
      students: 245,
      rating: 4.8,
      topics: ['Torpaq hazırlığı', 'Əkin növləri', 'Gübrələmə', 'Zərərverici nəzarəti'],
      videoUrl: 'https://youtu.be/UqYOzTAjYto?si=qj2U7DPqXi9ue-EH'
    },
    {
      title: 'Torpaq Analizi və İdarəetmə',
      description: 'Torpağın kimyəvi tərkibi, pH balansı, qida maddələri və torpaq sağlamlığı.',
      duration: '3 həftə',
      level: 'Orta',
      category: 'intermediate',
      students: 189,
      rating: 4.9,
      topics: ['pH analizi', 'Qida maddələri', 'Torpaq növləri', 'İslahı metodları'],
      videoUrl: 'https://youtu.be/zfRByN-8OHc?si=lbsoqxVt40v-uWFZ'
    },
    {
      title: 'Suvarma Sistemləri',
      description: 'Damcı suvarma, sprinkler sistemləri, avtomatlaşdırma və su qənaəti.',
      duration: '2 həftə',
      level: 'Orta',
      category: 'intermediate',
      students: 312,
      rating: 4.7,
      topics: ['Damcı suvarma', 'Sprinkler', 'Avtomatlaşdırma', 'Su qənaəti'],
      videoUrl: 'https://youtu.be/izRbONjSrrM?si=Gs5mRuOSt604EScE'
    },
    {
      title: 'Ekoloji Əkinçilik',
      description: 'Bio məhsul istehsalı, ekoloji sertifikasiya, davamlı kənd təsərrüfatı.',
      duration: '6 həftə',
      level: 'Qabaqcıl',
      category: 'advanced',
      students: 156,
      rating: 4.9,
      topics: ['Bio sertifikat', 'Üzvi gübrələr', 'Təbii mübarizə', 'Ekosistemlər'],
      videoUrl: 'https://youtu.be/oIB_l_U9t3E?si=d-iUy75FQUKWjKpp'
    },
    {
      title: 'Aqrobiznes İdarəetməsi',
      description: 'Fermer təsərrüfatı üçün biznes planlaşdırma, maliyyə idarəetmə, marketinq.',
      duration: '5 həftə',
      level: 'Qabaqcıl',
      category: 'advanced',
      students: 198,
      rating: 4.8,
      topics: ['Biznes plan', 'Maliyyə', 'Marketinq', 'Satış strategiyası'],
      videoUrl: 'https://youtu.be/TpfmuSXmWoo?si=fb6qnGndnxw56a5x'
    },
    {
      title: 'Bitki Xəstəlikləri və Mübarizə',
      description: 'Bitki xəstəliklərinin diaqnostikası, profilaktika və müalicə metodları.',
      duration: '3 həftə',
      level: 'Orta',
      category: 'intermediate',
      students: 287,
      rating: 4.6,
      topics: ['Xəstəlik növləri', 'Diaqnostika', 'Pestisidlər', 'Bioloji mübarizə'],
      videoUrl: 'https://youtu.be/-7NuydSOLb4?si=l98KueBsWe4lXOO0'
    }
  ],
  upcomingEvents: [
    {
      title: 'Bahar Əkini Seminarı',
      date: '15 Mart 2025',
      location: 'Bakı, Aqrar Universitet',
      type: 'Pulsuz'
    },
    {
      title: 'Damcı Suvarma Workshop',
      date: '22 Mart 2025',
      location: 'Online',
      type: 'Pulsuz'
    },
    {
      title: 'Fermerlər Forumu 2025',
      date: '5-6 Aprel 2025',
      location: 'Gəncə',
      type: 'Qeydiyyat'
    }
  ],
  benefits: [
    'Sertifikat verilir',
    'Video dərslər',
    'Praktiki tapşırıqlar',
    'Expert dəstəyi',
    'Ömürlük giriş',
    'Mobil tətbiq'
  ],
  stats: {
    activeCourses: 6,
    graduates: 1200,
    averageRating: 4.8,
    videoHours: 50
  }
};

// ============================================
// DATABASE HELPER FUNCTIONS
// ============================================

// Get weather data for a city
export const getWeatherData = (city) => {
  return weatherDatabase[city] || weatherDatabase['Bakı'];
};

// Get all market products
export const getMarketProducts = () => {
  return marketDatabase.products;
};

// Get market products by category and location
export const getMarketProductsByCategory = (category, location = 'all') => {
  let filtered = marketDatabase.products;
  
  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  // Filter by location
  if (location !== 'all') {
    filtered = filtered.filter(product => product.location === location);
  }
  
  return filtered;
};

// Get all farmers
export const getFarmers = () => {
  return farmersDatabase;
};

// Get farmer by ID
export const getFarmerById = (id) => {
  return farmersDatabase.find(farmer => farmer.id === id);
};

// Get all events
export const getEvents = () => {
  return eventsDatabase;
};

// Get event by ID
export const getEventById = (id) => {
  return eventsDatabase.find(event => event.id === id);
};

// Get all training courses
export const getTrainingCourses = () => {
  return trainingDatabase.courses;
};

// Get training courses by category
export const getTrainingCoursesByCategory = (category) => {
  if (category === 'all') return trainingDatabase.courses;
  return trainingDatabase.courses.filter(course => course.category === category);
};

// Save to localStorage (for dynamic data like users, events)
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('LocalStorage-a yazma xətası:', error);
  }
};

// Load from localStorage
export const loadFromLocalStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('LocalStorage-dan oxuma xətası:', error);
    return fallback;
  }
};

