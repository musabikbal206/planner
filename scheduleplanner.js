const CONFIG = {
    gridStart: '00:00',
    gridRows: 48,
    rowOffset: 2 
};

const DAYS_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TRANSLATIONS = {
    en: {
        title: 'Linguamis Planner',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        shortDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        ui: {
            time: 'Time',
            editTitle: 'Edit Activity', newTitle: 'New Activity',
            lblTitle: 'Title', lblCategory: 'Category', lblDay: 'Day', lblStart: 'Start', lblEnd: 'End Time', lblDuration: 'Duration (Min)',
            lblAlarm: 'Enable Alarm', lblAlarmDesc: 'Notify me when starts',
            btnDelete: 'Delete', btnSave: 'Save',
            resetConfirm: 'Revert to default template? This erases custom changes.',
            clearConfirm: 'Delete EVERYTHING? This cannot be undone.',
            deleteEventConfirm: 'Delete this activity?',
            settings: 'Settings', export: 'Export', data: 'Data & Share',
            share: 'Share / Copy Data', import: 'Import Data',
            reset: 'Reset Default', clear: 'Clear All',
            importPrompt: 'Paste your schedule JSON data here:',
            importError: 'Invalid JSON data!',
            copied: 'Data copied to clipboard!',
            notificationTitle: 'Activity Starting!',
            notificationBody: '{title} starts now.',
            overlapError: 'Conflict detected! This time slot overlaps with another activity.'
        }
    },
    tr: {
        title: 'Linguamis Planlayıcı',
        days: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
        shortDays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
        ui: {
            time: 'Saat',
            editTitle: 'Etkinliği Düzenle', newTitle: 'Yeni Etkinlik',
            lblTitle: 'Başlık', lblCategory: 'Kategori', lblDay: 'Gün', lblStart: 'Başlangıç', lblEnd: 'Bitiş Saati', lblDuration: 'Süre (Dk)',
            lblAlarm: 'Alarm Kur', lblAlarmDesc: 'Başlangıçta bildirim gönder',
            btnDelete: 'Sil', btnSave: 'Kaydet',
            resetConfirm: 'Varsayılan şablona dönülsün mü? Tüm değişiklikler silinecek.',
            clearConfirm: 'HER ŞEYİ silmek istediğine emin misin? Bu işlem geri alınamaz.',
            deleteEventConfirm: 'Bu etkinliği silmek istiyor musun?',
            settings: 'Ayarlar', export: 'Dışa Aktar', data: 'Veri & Paylaşım',
            share: 'Paylaş / Kopyala', import: 'Veri Yükle',
            reset: 'Sıfırla', clear: 'Temizle',
            importPrompt: 'Program JSON verisini buraya yapıştırın:',
            importError: 'Geçersiz veri formatı!',
            copied: 'Veri panoya kopyalandı!',
            notificationTitle: 'Etkinlik Başlıyor!',
            notificationBody: '{title} şimdi başlıyor.',
            overlapError: 'Çakışma tespit edildi! Bu saat aralığında başka bir etkinlik var.'
        }
    }
};

// Varsayılan Kategoriler
const DEFAULT_CATEGORIES = [
    { id: 'sleep', name: 'Uyku / Sleep', color: '#6366f1' },
    { id: 'education', name: 'Eğitim / Edu', color: '#3b82f6' },
    { id: 'work', name: 'İş / Work', color: '#22c55e' },
    { id: 'community', name: 'Sosyal / Social', color: '#a855f7' },
    { id: 'meal', name: 'Yemek / Meal', color: '#f97316' },
    { id: 'special', name: 'Özel / Special', color: '#ec4899' },
    { id: 'chores', name: 'Ev İşleri / Chores', color: '#64748b' },
    { id: 'coding', name: 'Yazılım / Coding', color: '#0ea5e9' }
];

// YARDIMCI RENK FONKSİYONLARI (GLOBAL)
const hexToRgba = (hex, alpha) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
    }
    return `rgba(${r},${g},${b},${alpha})`;
};

const adjustBrightness = (col, amt) => {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255; else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255; else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255; else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6,'0');
};

const INITIAL_EVENTS = [
    { "id": "sleepM", "day": "Monday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkM", "day": "Monday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840", "title": "İTALYANCA", "day": "Monday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranM", "title": "KUR'AN OKUMA", "day": "Monday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480", "title": "OYUN OYNAMA", "day": "Monday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177", "title": "NAMAZ", "day": "Monday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "mon3", "day": "Monday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089", "title": "NAMAZ", "day": "Monday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994", "title": "SEVDİĞİNLE MUHABBET", "day": "Monday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463", "title": "NAMAZ", "day": "Monday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "mon4", "day": "Monday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525", "title": "NAMAZ", "day": "Monday", "start": "18:30", "duration": 30,"type": "special", "alarm": false },
    { "id": "sporM", "day": "Monday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "mon6", "day": "Monday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Monday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepTu", "day": "Tuesday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkTu", "day": "Tuesday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_Tu", "title": "İTALYANCA", "day": "Tuesday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranTu", "title": "KUR'AN OKUMA", "day": "Tuesday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_Tu", "title": "OYUN OYNAMA", "day": "Tuesday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177_Tu", "title": "NAMAZ", "day": "Tuesday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "tue3", "day": "Tuesday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_Tu", "title": "NAMAZ", "day": "Tuesday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_Tu", "title": "SEVDİĞİNLE MUHABBET", "day": "Tuesday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_Tu", "title": "NAMAZ", "day": "Tuesday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "tue4", "day": "Tuesday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_Tu", "title": "NAMAZ", "day": "Tuesday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporTu", "day": "Tuesday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "tue6", "day": "Tuesday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_Tu", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Tuesday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepW", "day": "Wednesday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkW", "day": "Wednesday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_We", "title": "İTALYANCA", "day": "Wednesday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranW", "title": "KUR'AN OKUMA", "day": "Wednesday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_We", "title": "OYUN OYNAMA", "day": "Wednesday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177_We", "title": "NAMAZ", "day": "Wednesday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "wed3", "day": "Wednesday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_We", "title": "NAMAZ", "day": "Wednesday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_We", "title": "SEVDİĞİNLE MUHABBET", "day": "Wednesday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_We", "title": "NAMAZ", "day": "Wednesday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "wed4", "day": "Wednesday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_We", "title": "NAMAZ", "day": "Wednesday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporW", "day": "Wednesday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "wed6", "day": "Wednesday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_We", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Wednesday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepTh", "day": "Thursday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkTh", "day": "Thursday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_Th", "title": "İTALYANCA", "day": "Thursday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranTh", "title": "KUR'AN OKUMA", "day": "Thursday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_Th", "title": "OYUN OYNAMA", "day": "Thursday", "start": "11:30", "duration": 60,"type": "special", "alarm": false },
    { "id": "1767572767177_Th", "title": "NAMAZ", "day": "Thursday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "thu3", "day": "Thursday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_Th", "title": "NAMAZ", "day": "Thursday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_Th", "title": "SEVDİĞİNLE MUHABBET", "day": "Thursday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_Th", "title": "NAMAZ", "day": "Thursday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "thu4", "day": "Thursday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_Th", "title": "NAMAZ", "day": "Thursday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporTh", "day": "Thursday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "thu6", "day": "Thursday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_Th", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Thursday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepF", "day": "Friday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkF", "day": "Friday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_Fr", "title": "İTALYANCA", "day": "Friday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranF", "title": "KUR'AN OKUMA", "day": "Friday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_Fr", "title": "OYUN OYNAMA", "day": "Friday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177_Fr", "title": "NAMAZ", "day": "Friday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "fri3", "day": "Friday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_Fr", "title": "NAMAZ", "day": "Friday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_Fr", "title": "SEVDİĞİNLE MUHABBET", "day": "Friday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_Fr", "title": "NAMAZ", "day": "Friday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "fri4", "day": "Friday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_Fr", "title": "NAMAZ", "day": "Friday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporF", "day": "Friday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "fri6", "day": "Friday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_Fr", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Friday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepSa", "day": "Saturday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkSa", "day": "Saturday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_Sa", "title": "İTALYANCA", "day": "Saturday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranSa", "title": "KUR'AN OKUMA", "day": "Saturday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_Sa", "title": "OYUN OYNAMA", "day": "Saturday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177_Sa", "title": "NAMAZ", "day": "Saturday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sat3", "day": "Saturday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_Sa", "title": "NAMAZ", "day": "Saturday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_Sa", "title": "SEVDİĞİNLE MUHABBET", "day": "Saturday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_Sa", "title": "NAMAZ", "day": "Saturday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sat4", "day": "Saturday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_Sa", "title": "NAMAZ", "day": "Saturday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporSa", "day": "Saturday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "sat6", "day": "Saturday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_Sa", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Saturday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false },

    { "id": "sleepSu", "day": "Sunday", "start": "00:00", "duration": 570, "title": "UYKU ZAMANI", "type": "sleep", "alarm": false },
    { "id": "bkSu", "day": "Sunday", "start": "09:30", "duration": 30, "title": "Kahvaltı", "type": "meal", "alarm": false },
    { "id": "1767573364840_Su", "title": "İTALYANCA", "day": "Sunday", "start": "10:00", "duration": 60, "type": "education", "alarm": false },
    { "id": "kuranSu", "title": "KUR'AN OKUMA", "day": "Sunday", "start": "11:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573428480_Su", "title": "OYUN OYNAMA", "day": "Sunday", "start": "11:30", "duration": 60, "type": "special", "alarm": false },
    { "id": "1767572767177_Su", "title": "NAMAZ", "day": "Sunday", "start": "12:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sun3", "day": "Sunday", "start": "13:00", "duration": 120, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767572938089_Su", "title": "NAMAZ", "day": "Sunday", "start": "15:00", "duration": 30, "type": "special", "alarm": false },
    { "id": "1767573566994_Su", "title": "SEVDİĞİNLE MUHABBET", "day": "Sunday", "start": "15:30", "duration": 120, "type": "community", "alarm": false },
    { "id": "1767573056463_Su", "title": "NAMAZ", "day": "Sunday", "start": "17:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sun4", "day": "Sunday", "start": "18:00", "duration": 30, "title": "Akşam Yemeği", "type": "meal", "alarm": false },
    { "id": "1767573265525_Su", "title": "NAMAZ", "day": "Sunday", "start": "18:30", "duration": 30, "type": "special", "alarm": false },
    { "id": "sporSu", "day": "Sunday", "start": "19:00", "duration": 30, "title": "Spor", "type": "special", "alarm": false },
    { "id": "sun6", "day": "Sunday", "start": "19:30", "duration": 150, "title": "KODLAMA / BOŞ ZAMAN", "type": "coding", "alarm": false },
    { "id": "1767573698180_Su", "title": "SEVDİĞİNLE AKTİVİTE", "day": "Sunday", "start": "22:00", "duration": 120, "type": "sleep", "alarm": false }
];

const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
};
const minutesToTime = (min) => {
    let h = Math.floor(min / 60);
    let m = min % 60;
    if (h >= 24) h -= 24;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const app = {
    viewSettings: {
        startHour: '00:00',
        endHour: '24:00',
        visibleDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    events: [],
    activeMobileDayIndex: 0, 
    isDark: false,
    lang: 'en',
    timerInterval: null,
    dragState: {
        isDragging: false,
        eventId: null,
        startY: 0,
        originalDuration: 0,
        rowHeight: 0,
        newDuration: 0
    },
    categories: [],

    init() {
        try {
            const saved = localStorage.getItem('weeklyScheduleEvents');
            this.events = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_EVENTS));
        } catch(e) {
            this.events = JSON.parse(JSON.stringify(INITIAL_EVENTS));
        }

        try {
            const savedView = localStorage.getItem('weeklyScheduleView');
            if(savedView) this.viewSettings = JSON.parse(savedView);
        } catch(e) {}

        const savedTheme = localStorage.getItem('weeklyScheduleTheme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.setDarkMode(true);
        } else {
            this.setDarkMode(false);
        }

        const savedLang = localStorage.getItem('weeklyScheduleLang');
        if (savedLang) this.lang = savedLang;

        try {
            const savedCats = localStorage.getItem('weeklyScheduleCategories');
            this.categories = savedCats ? JSON.parse(savedCats) : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        } catch(e) {
            this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        }

        this.initSettingsUI();
        this.renderCategorySettings();
        this.updateUITexts();
        this.renderGrid();
        this.initModalListeners();
        this.requestNotificationPermission();
        this.startNotificationTimer();

        window.addEventListener('resize', () => this.renderGrid());
        
        const todayJs = new Date().getDay(); 
        const dayMap = { 1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 0:6 }; 
        this.activeMobileDayIndex = dayMap[todayJs] !== undefined ? dayMap[todayJs] : 0;
        this.updateMobileHeader();
        
        if (!document.getElementById('dragTooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'dragTooltip';
            tooltip.className = 'drag-tooltip';
            document.body.appendChild(tooltip);
        }

        lucide.createIcons();
    },

    t(key) {
        const parts = key.split('.');
        let res = TRANSLATIONS[this.lang];
        for(let p of parts) res = res?.[p];
        return res || key;
    },

    // --- RENDER GRID (DÜZELTİLMİŞ) ---
    renderGrid() {
        const grid = document.getElementById('scheduleGrid');
        grid.innerHTML = '';
        const tr = TRANSLATIONS[this.lang];
        const isMobile = this.isMobile();
        
        let visibleDayKeys = this.viewSettings.visibleDays;
        if(visibleDayKeys.length === 0) visibleDayKeys = DAYS_KEYS;

        const activeDayKeyMobile = DAYS_KEYS[this.activeMobileDayIndex];
        const daysToRender = isMobile ? [activeDayKeyMobile] : visibleDayKeys;

        const startMin = timeToMinutes(this.viewSettings.startHour);
        let endMin = timeToMinutes(this.viewSettings.endHour);
        if (endMin <= startMin) endMin = startMin + (24*60);
        
        const totalDuration = endMin - startMin;
        const totalSlots = Math.ceil(totalDuration / 30);

        // Grid Style
        if (isMobile) {
            grid.style.gridTemplateColumns = '50px 1fr';
        } else {
            grid.style.gridTemplateColumns = `80px repeat(${daysToRender.length}, minmax(130px, 1fr))`;
        }
        grid.style.gridTemplateRows = `50px repeat(${totalSlots}, ${isMobile ? '80px' : '60px'})`;

        // 1. SOL ÜST KÖŞE
        const tl = document.createElement('div');
        tl.className = 'sticky top-0 z-30 bg-gray-50 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider transition-colors duration-200';
        tl.textContent = tr.ui.time;
        tl.style.gridRow = '1'; tl.style.gridColumn = '1';
        grid.appendChild(tl);

        // 2. GÜN BAŞLIKLARI
        daysToRender.forEach((dayKey, index) => {
            const dayIdx = DAYS_KEYS.indexOf(dayKey);
            const d = document.createElement('div');
            d.className = 'sticky top-0 z-20 bg-gray-50 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center font-bold text-gray-700 dark:text-gray-300 text-sm shadow-sm transition-colors duration-200';
            d.innerHTML = `<span>${tr.days[dayIdx].substring(0, 3)}</span>`;
            d.style.gridRow = '1';
            d.style.gridColumn = `${index + 2}`;
            grid.appendChild(d);
        });

        // 3. IZGARA
        let currentMin = startMin;
        for(let i = 0; i < totalSlots; i++) {
            const timeStr = minutesToTime(currentMin);
            const row = CONFIG.rowOffset + i;
            
            const timeLabel = document.createElement('div');
            timeLabel.className = 'border-r border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 sticky left-0 z-20 transition-colors duration-200';
            timeLabel.style.gridRow = `${row}`; timeLabel.style.gridColumn = '1';
            
            const isHour = timeStr.endsWith('00');
            timeLabel.innerHTML = `<span class="text-xs ${isHour ? 'text-gray-900 dark:text-white font-extrabold' : 'text-gray-400 dark:text-gray-500 font-medium'}">${timeStr}</span>`;
            grid.appendChild(timeLabel);

            const cellCols = isMobile ? 1 : daysToRender.length;
            for(let c = 0; c < cellCols; c++) {
                const cell = document.createElement('div');
                cell.className = 'border-r border-b border-gray-100 dark:border-gray-800 transition-colors duration-200';
                cell.style.gridRow = `${row}`; cell.style.gridColumn = `${c + 2}`;
                grid.appendChild(cell);
            }
            currentMin += 30;
        }

        // 4. ETKİNLİKLER
        this.events.forEach(ev => {
            if (!isMobile && !daysToRender.includes(ev.day)) return;
            if (isMobile && ev.day !== activeDayKeyMobile) return;

            const evStartMin = timeToMinutes(ev.start);
            const evEndMin = evStartMin + ev.duration;

            if (evStartMin >= endMin || evEndMin <= startMin) return;

            let displayStartMin = Math.max(evStartMin, startMin);
            let displayEndMin = Math.min(evEndMin, endMin);
            let displayDuration = displayEndMin - displayStartMin;
            if (displayDuration <= 0) return;

            const diff = displayStartMin - startMin;
            const slotIndex = Math.floor(diff / 30);
            const rowStart = CONFIG.rowOffset + slotIndex;
            const remainderMinutes = diff % 30;
            const pxPerMin = isMobile ? (80/30) : (60/30);
            const topOffset = remainderMinutes * pxPerMin;
            const exactHeight = displayDuration * pxPerMin;

            let colStart = 2;
            if (!isMobile) colStart = daysToRender.indexOf(ev.day) + 2;

            const catData = this.categories.find(c => c.id === ev.type) || { color: '#94a3b8', name: 'Unknown' };
            
            // --- RENK VE GÖRÜNÜRLÜK DÜZELTMESİ ---
            let bgColor, borderColor, titleColor, timeColor;

            if (this.isDark) {
                // KARANLIK MOD
                // Arka planı %15 opaklığa düşürdük (Şeffaf/Neon görünüm)
                // Böylece "catData.color" rengindeki saat yazısı net okunacak.
                bgColor = hexToRgba(catData.color, 0.15);
                borderColor = catData.color;
                
                titleColor = '#ffffff'; 
                timeColor = catData.color; // Saat yazısı kutu renginde (Neon efekt)
            } else {
                // AYDINLIK MOD
                // Arka plan pastel (%20 opaklık)
                bgColor = hexToRgba(catData.color, 0.20);
                borderColor = catData.color;
                
                const darkText = adjustBrightness(catData.color, -50); 
                titleColor = darkText;
                timeColor = darkText;
            }

            const titleStyle = `color: ${titleColor}; font-weight: 800; text-shadow: ${this.isDark ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'};`;
            // Saat fontu kalınlaştırıldı
            const timeStyle = `color: ${timeColor}; font-weight: 700; font-size: 10px; line-height: 1.2;`;

            const origEnd = minutesToTime(evEndMin >= 1440 ? evEndMin - 1440 : evEndMin);
            const showDetails = displayDuration >= 25; 
            
            const alarmIcon = ev.alarm ? `<div class="absolute top-1 right-1 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm z-20"><i data-lucide="bell" class="w-3 h-3"></i></div>` : '';

            const el = document.createElement('div');
            const paddingClass = isMobile ? 'p-1' : 'p-2';

            el.className = `event-card m-[2px] rounded-lg ${paddingClass} flex flex-col justify-center cursor-pointer relative overflow-hidden shadow-sm border-2 border-l-4 transition-transform hover:scale-[1.01] hover:shadow-lg`;

            // Inline stiller
            el.style.backgroundColor = bgColor;
            el.style.borderColor = borderColor;

            el.style.gridColumn = `${colStart} / span 1`;
            el.style.gridRow = `${rowStart} / span 1`; 
            el.style.marginTop = `${topOffset}px`; 
            el.style.height = `${exactHeight}px`;  
            el.style.zIndex = '10'; 

            el.innerHTML = `
                <div class="resize-handle top" onmousedown="app.startResize(event, '${ev.id}', 'start')" ontouchstart="app.startResize(event, '${ev.id}', 'start')"></div>
                ${alarmIcon}
                <div class="${isMobile ? 'event-title font-bold' : 'font-bold leading-tight line-clamp-2 pr-2 text-xs'} pointer-events-none" style="${titleStyle}">${ev.title}</div>
                ${showDetails ? `<div class="${isMobile ? 'event-time' : 'mt-0.5'} pointer-events-none" style="${timeStyle}">${ev.start} - ${origEnd}</div>` : ''}
                <div class="resize-handle bottom" onmousedown="app.startResize(event, '${ev.id}', 'end')" ontouchstart="app.startResize(event, '${ev.id}', 'end')"></div>
            `;
            
            el.onclick = (e) => { if(!e.target.classList.contains('resize-handle')) this.openEditModal(ev); };
            grid.appendChild(el);
        });
        lucide.createIcons();
    },

    initSettingsUI() {
        const startSelect = document.getElementById('gridStartSelect');
        const endSelect = document.getElementById('gridEndSelect');
        startSelect.innerHTML = '';
        endSelect.innerHTML = '';

        for(let i=0; i<=24; i++) {
            const t = `${i.toString().padStart(2, '0')}:00`;
            const optS = document.createElement('option');
            optS.value = t; optS.text = t;
            startSelect.appendChild(optS);

            const optE = document.createElement('option');
            optE.value = t; optE.text = t;
            if(i !== 0) endSelect.appendChild(optE);
        }
        startSelect.value = this.viewSettings.startHour;
        endSelect.value = this.viewSettings.endHour;
    },

    updateViewSettings() {
        this.viewSettings.startHour = document.getElementById('gridStartSelect').value;
        this.viewSettings.endHour = document.getElementById('gridEndSelect').value;

        const checkedDays = [];
        document.querySelectorAll('.day-toggle:checked').forEach(cb => checkedDays.push(cb.value));
        this.viewSettings.visibleDays = checkedDays;

        localStorage.setItem('weeklyScheduleView', JSON.stringify(this.viewSettings));
        this.renderGrid();
    },

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'tr' : 'en';
        localStorage.setItem('weeklyScheduleLang', this.lang);
        this.updateUITexts();
        this.renderGrid();
        this.updateMobileHeader();
    },

    updateUITexts() {
        const tr = TRANSLATIONS[this.lang];
        const dayToggles = document.getElementById('dayToggles');
        dayToggles.innerHTML = '';
        DAYS_KEYS.forEach((key, idx) => {
            const isChecked = this.viewSettings.visibleDays.includes(key) ? 'checked' : '';
            const lbl = document.createElement('label');
            lbl.className = 'flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700';
            lbl.innerHTML = `
                <input type="checkbox" value="${key}" class="day-toggle w-4 h-4 rounded text-blue-600 focus:ring-blue-500" ${isChecked} onchange="app.updateViewSettings()">
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">${tr.shortDays[idx]}</span>
            `;
            dayToggles.appendChild(lbl);
        });

        document.getElementById('appTitle').textContent = tr.title;
        document.getElementById('langBtn').textContent = this.lang.toUpperCase();
        document.getElementById('currentLangDisplay').textContent = this.lang.toUpperCase();

        document.getElementById('lblTitle').textContent = tr.ui.lblTitle;
        document.getElementById('lblCategory').textContent = tr.ui.lblCategory;
        document.getElementById('lblDay').textContent = tr.ui.lblDay;
        document.getElementById('lblStart').textContent = tr.ui.lblStart;
        document.getElementById('lblEnd').textContent = tr.ui.lblEnd;
        document.getElementById('lblDuration').textContent = tr.ui.lblDuration;
        document.getElementById('lblAlarm').textContent = tr.ui.lblAlarm;
        document.getElementById('lblAlarmDesc').textContent = tr.ui.lblAlarmDesc;
        document.getElementById('lblViewSettings').textContent = tr.ui.settings;
        document.getElementById('lblGridStart').textContent = tr.ui.lblStart; 
        document.getElementById('lblGridEnd').textContent = tr.ui.lblEnd;
        document.getElementById('lblVisibleDays').textContent = tr.ui.lblDay; 
        
        document.getElementById('btnSave').innerHTML = `<i data-lucide="check" class="w-5 h-5"></i> ${tr.ui.btnSave}`;
        document.getElementById('btnDelete').innerHTML = `<i data-lucide="trash-2" class="w-5 h-5"></i> ${tr.ui.btnDelete}`;
        document.getElementById('btnAddDesktop').innerHTML = `<i data-lucide="plus" class="w-4 h-4"></i> ${this.lang === 'tr' ? 'Ekle' : 'Add'}`;

        document.getElementById('settingsTitle').textContent = tr.ui.settings;
        document.getElementById('lblExport').textContent = tr.ui.export;
        document.getElementById('lblData').textContent = tr.ui.data;
        document.getElementById('btnShare').textContent = tr.ui.share;
        document.getElementById('btnImport').textContent = tr.ui.import;
        document.getElementById('btnReset').textContent = tr.ui.reset;
        document.getElementById('btnClear').textContent = tr.ui.clear;
        

        const daySelect = document.getElementById('inputDay');
        const currentVal = daySelect.value;
        daySelect.innerHTML = '';
        DAYS_KEYS.forEach((key, idx) => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = tr.days[idx];
            daySelect.appendChild(opt);
        });
        daySelect.value = currentVal || 'Monday';

        const picker = document.getElementById('colorPicker');
        const oldVal = document.getElementById('inputType').value;
        picker.innerHTML = '';

        this.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            // Dinamik stil
            btn.className = `h-10 rounded-lg border flex items-center justify-center gap-2 text-xs font-semibold transition-all overflow-hidden relative`;
            btn.style.backgroundColor = hexToRgba(cat.color, 0.1); 
            btn.style.borderColor = cat.color;
            btn.style.color = cat.color; 

            btn.innerHTML = `<span class="truncate px-1">${cat.name}</span>`;

            // Seçili olma durumu
            if (oldVal === cat.id) {
                btn.style.backgroundColor = hexToRgba(cat.color, 0.25);
                btn.style.boxShadow = `0 0 0 2px white, 0 0 0 4px ${cat.color}`;
            }

            btn.onclick = () => {
                Array.from(picker.children).forEach(c => c.style.boxShadow = 'none');
                btn.style.boxShadow = `0 0 0 2px ${this.isDark ? '#111827' : 'white'}, 0 0 0 4px ${cat.color}`;
                document.getElementById('inputType').value = cat.id;
            };
            picker.appendChild(btn);
        });

        const exists = this.categories.find(c => c.id === oldVal);
        if(!exists && this.categories.length > 0) {
            document.getElementById('inputType').value = this.categories[0].id;
        } else if (!oldVal && this.categories.length > 0) {
            document.getElementById('inputType').value = this.categories[0].id;
        }

        lucide.createIcons();
    },

    toggleDarkMode() {
        this.setDarkMode(!this.isDark);
    },
    setDarkMode(isDark) {
        this.isDark = isDark;
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('weeklyScheduleTheme', isDark ? 'dark' : 'light');
        const icon = isDark ? 'sun' : 'moon';
        document.getElementById('mobileThemeIcon')?.setAttribute('data-lucide', icon);
        document.getElementById('desktopThemeIcon')?.setAttribute('data-lucide', icon);
        
        this.updateUITexts(); // Renkleri güncelle
        this.renderGrid();    // Takvimi yeniden çiz
        lucide.createIcons();
    },

    requestNotificationPermission() {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    },
    startNotificationTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.checkNotifications(), 60000);
    },
    checkNotifications() {
        if (Notification.permission !== "granted") return;

        const now = new Date();
        const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1; 
        const currentDayKey = DAYS_KEYS[dayIndex];
        
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${h}:${m}`;

        this.events.forEach(ev => {
            if (ev.alarm && ev.day === currentDayKey && ev.start === currentTime) {
                this.triggerNotification(ev);
            }
        });
    },
    triggerNotification(ev) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);

        const tr = TRANSLATIONS[this.lang];
        new Notification(tr.ui.notificationTitle, {
            body: tr.ui.notificationBody.replace('{title}', ev.title),
            icon: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/calendar.svg'
        });
    },

    exportExcel() {
        const tr = TRANSLATIONS[this.lang];
        // --- AYARLARI ÇEK ---
        const visibleDayKeys = this.viewSettings.visibleDays.length > 0 ? this.viewSettings.visibleDays : DAYS_KEYS;
        const startMin = timeToMinutes(this.viewSettings.startHour);
        let endMin = timeToMinutes(this.viewSettings.endHour);
        if (endMin <= startMin) endMin = startMin + (24 * 60); // Gece yarısını geçerse

        // --- STİL TANIMLARI (xlsx-js-style) ---
        const borderStyle = { style: "thin", color: { auto: 1 } };
        const baseStyle = {
            alignment: { horizontal: "center", vertical: "center", wrapText: true },
            border: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle },
            font: { name: "Arial", sz: 10 }
        };
        const headerStyle = {
            ...baseStyle,
            font: { name: "Arial", sz: 11, bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4B5563" } }
        };

        const wb = XLSX.utils.book_new();

        // 1. BAŞLIK SATIRI (Sadece Görünür Günler)
        const headerRow = [{ v: tr.ui.time, s: headerStyle }];
        visibleDayKeys.forEach(key => {
            const dayIndex = DAYS_KEYS.indexOf(key);
            headerRow.push({ v: tr.days[dayIndex], s: headerStyle });
        });
        const ws_data = [headerRow];

        // 2. SAAT SATIRLARI (Sadece Seçili Aralık)
        const totalSlots = Math.ceil((endMin - startMin) / 30);
        
        for (let i = 0; i < totalSlots; i++) {
            const currentSlotMin = startMin + (i * 30);
            const timeStr = minutesToTime(currentSlotMin);
            
            const row = [];
            // Saat hücresi
            row.push({ v: timeStr, s: baseStyle });
            
            // Gün hücreleri (Boş ama kenarlıklı)
            for (let d = 0; d < visibleDayKeys.length; d++) {
                row.push({ v: "", s: baseStyle });
            }
            ws_data.push(row);
        }

        // 3. ETKİNLİKLERİ YERLEŞTİR
        const merges = [];

        this.events.forEach(ev => {
            // A. Gün Filtresi: Etkinlik günü görünür günlerde mi?
            if (!visibleDayKeys.includes(ev.day)) return;

            // B. Saat Filtresi: Etkinlik görünür saat aralığında mı?
            const evStartMin = timeToMinutes(ev.start);
            const evEndMin = evStartMin + ev.duration;

            // Çakışma kontrolü (Görünür aralığa giriyor mu?)
            if (evEndMin <= startMin || evStartMin >= endMin) return;

            // C. Koordinatları Hesapla
            // Sütun İndeksi
            const dayColIndex = visibleDayKeys.indexOf(ev.day) + 1; // +1 Time sütunu için

            // Satır İndeksi (Kırpma mantığı ile)
            const displayStartMin = Math.max(evStartMin, startMin);
            const displayEndMin = Math.min(evEndMin, endMin);
            
            // Excel satırı hesaplama (Başlangıç dakikasına göre ofset)
            const rowOffset = Math.floor((displayStartMin - startMin) / 30);
            const excelRowIndex = rowOffset + 1; // +1 Başlık satırı için

            // Süre (Kaç hücre birleşecek?)
            const durationSlots = Math.ceil((displayEndMin - displayStartMin) / 30);

            // D. Stil ve Renk
            const cat = this.categories.find(c => c.id === ev.type);
            const catName = cat ? cat.name : ev.type;
            let hexColor = cat ? cat.color : "FFFFFF";
            if(hexColor.startsWith('#')) hexColor = hexColor.substring(1);

            const eventStyle = {
                alignment: { horizontal: "center", vertical: "center", wrapText: true },
                border: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle },
                font: { name: "Arial", sz: 10, bold: true },
                fill: { fgColor: { rgb: hexColor } }
            };

            // E. Veriyi Yaz
            if (ws_data[excelRowIndex] && ws_data[excelRowIndex][dayColIndex]) {
                ws_data[excelRowIndex][dayColIndex] = {
                    v: `${ev.title}\n(${catName})`,
                    s: eventStyle
                };

                // Merge edilecek diğer hücreleri de boya (Kenarlık için)
                for(let k=1; k<durationSlots; k++) {
                    if(ws_data[excelRowIndex + k]) {
                        ws_data[excelRowIndex + k][dayColIndex] = { v: "", s: eventStyle };
                    }
                }

                // Merge Ekle
                if (durationSlots > 1) {
                    merges.push({
                        s: { r: excelRowIndex, c: dayColIndex },
                        e: { r: excelRowIndex + durationSlots - 1, c: dayColIndex }
                    });
                }
            }
        });

        // 4. DOSYAYI OLUŞTUR
        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, ws_data, { origin: "A1" });

        if (merges.length > 0) ws['!merges'] = merges;

        // Sütun Genişlikleri
        const cols = [{ wch: 10 }]; // Saat
        visibleDayKeys.forEach(() => cols.push({ wch: 20 })); // Günler
        ws['!cols'] = cols;

        XLSX.utils.book_append_sheet(wb, ws, "Program");
        XLSX.writeFile(wb, "HaftalikProgram_Ozel.xlsx");
    },

    async exportPDF() {
        const tr = TRANSLATIONS[this.lang];
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // DEĞİŞİKLİK: Google Fonts yerine CORS destekleyen bir CDN adresi kullanıyoruz.
        const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf';
        
        const getTableData = () => {
            return this.events.map(ev => {
                const cat = this.categories.find(c => c.id === ev.type);
                const catName = cat ? cat.name : ev.type;
                return [
                    tr.days[DAYS_KEYS.indexOf(ev.day)], // Gün
                    ev.start,                           // Saat
                    ev.title,                           // Başlık
                    catName                             // Kategori
                ];
            }).sort((a,b) => {
                // Sıralama mantığı: Önce gün, sonra saat
                const da = tr.days.indexOf(a[0]);
                const db = tr.days.indexOf(b[0]);
                if(da !== db) return da - db;
                return a[1].localeCompare(b[1]);
            });
        };

        try {
            const response = await fetch(fontUrl);
            if (!response.ok) throw new Error("Font fetch failed");
            
            const blob = await response.blob();
            const reader = new FileReader();
            
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                
                // Fontu sanal dosya sistemine ekle
                doc.addFileToVFS('Roboto-Regular.ttf', base64data);
                // Fontu kaydet (Adını 'Roboto' koyduk)
                doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
                
                // Döküman genelinde fontu ayarla
                doc.setFont('Roboto'); 
                doc.setFontSize(16);
                doc.text(tr.title, 14, 20);

                doc.autoTable({
                    head: [[tr.ui.lblDay, tr.ui.lblStart, tr.ui.lblTitle, tr.ui.lblCategory]],
                    body: getTableData(),
                    startY: 30,
                    theme: 'grid',
                    styles: { 
                        font: 'Roboto', // Tablo hücresi için font
                        fontStyle: 'normal', 
                        fontSize: 10 
                    },
                    headStyles: { 
                        font: 'Roboto', // Tablo başlığı için font
                        fillColor: [45, 55, 72], 
                        textColor: 255 
                    }
                });
                doc.save("HaftalikProgram.pdf");
            };
            reader.onerror = () => { throw new Error("File read error"); };
        } catch (e) {
            console.error("PDF Error:", e);
            alert("Font yüklenemedi (İnternet bağlantınızı kontrol edin). Standart font ile indiriliyor.");
            
            // Hata olursa varsayılan font ile devam et
            doc.setFont("helvetica");
            doc.autoTable({
                head: [[tr.ui.lblDay, tr.ui.lblStart, tr.ui.lblTitle, tr.ui.lblCategory]],
                body: getTableData(),
                startY: 30
            });
            doc.save("HaftalikProgram_Basit.pdf");
        }
    },

    exportWord() {
        if (!window.docx) {
            alert("Docx library missing.");
            return;
        }
        const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, HeadingLevel, TextRun, AlignmentType } = window.docx;
        const tr = TRANSLATIONS[this.lang];
        
        // Ayarları al
        const visibleDayKeys = this.viewSettings.visibleDays.length > 0 ? this.viewSettings.visibleDays : DAYS_KEYS;
        const startMin = timeToMinutes(this.viewSettings.startHour);
        let endMin = timeToMinutes(this.viewSettings.endHour);
        if (endMin <= startMin) endMin = startMin + (24 * 60);

        // Filtreleme
        const filteredEvents = this.events.filter(ev => {
            if (!visibleDayKeys.includes(ev.day)) return false;
            const evStart = timeToMinutes(ev.start);
            const evEnd = evStart + ev.duration;
            return (evEnd > startMin && evStart < endMin);
        });

        const sorted = filteredEvents.sort((a,b) => {
            const da = DAYS_KEYS.indexOf(a.day);
            const db = DAYS_KEYS.indexOf(b.day);
            if(da !== db) return da - db;
            return a.start.localeCompare(b.start);
        });

        // Tablo Başlıkları
        const headerCells = [tr.ui.lblDay, tr.ui.lblStart, tr.ui.lblTitle, tr.ui.lblCategory, tr.ui.lblDuration].map(text => {
            return new TableCell({
                children: [new Paragraph({
                    children: [new TextRun({ text: text, bold: true, color: "FFFFFF" })],
                    alignment: AlignmentType.CENTER
                })],
                shading: { fill: "333333" },
                verticalAlign: "center",
                margins: { top: 100, bottom: 100, left: 100, right: 100 }
            });
        });
        const headerRow = new TableRow({ children: headerCells });
        
        // Tablo Verileri
        const dataRows = sorted.map(ev => {
            const cat = this.categories.find(c => c.id === ev.type);
            const color = cat ? cat.color.replace('#', '') : 'FFFFFF';
            const catName = cat ? cat.name : ev.type;
            const dayName = tr.days[DAYS_KEYS.indexOf(ev.day)];
            
            const cells = [dayName, ev.start, ev.title, catName, ev.duration + ' dk'].map(text => {
                return new TableCell({
                    children: [new Paragraph(text)],
                    shading: { fill: color },
                    margins: { top: 100, bottom: 100, left: 100, right: 100 }
                });
            });
            return new TableRow({ children: cells });
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        text: tr.title,
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        text: `Range: ${this.viewSettings.startHour} - ${this.viewSettings.endHour}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),
                    new Table({
                        rows: [headerRow, ...dataRows],
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    })
                ]
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "HaftalikProgram.docx");
        }).catch(err => {
            console.error(err);
            alert("Error creating Word file.");
        });
    },

    exportImage() {
        const element = document.getElementById("scheduleGrid");
        const isMobile = window.innerWidth < 768;
        const clone = element.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.zIndex = '-9999';
        const bgColor = this.isDark ? '#111827' : '#ffffff'; 
        clone.style.backgroundColor = bgColor;

        if (isMobile) {
            clone.style.width = '600px'; 
            clone.style.gridTemplateColumns = '50px 1fr';
        } else {
            clone.style.width = '2400px'; 
            clone.style.gridTemplateColumns = '80px repeat(7, 1fr)';
        }
        
        clone.style.height = 'auto';
        clone.style.overflow = 'visible'; 
        document.body.appendChild(clone);

        const eventCards = clone.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const texts = card.querySelectorAll('div');
            texts.forEach(t => {
                t.style.whiteSpace = 'normal'; 
                t.style.overflow = 'visible'; 
                t.style.textOverflow = 'clip';
                t.style.display = 'block'; 
            });
            const title = card.querySelector('.font-bold');
            if(title) {
                title.style.fontSize = isMobile ? '16px' : '14px';
                title.style.lineHeight = '1.2';
                title.style.marginBottom = '4px';
            }
        });

        const width = clone.scrollWidth;
        const height = clone.scrollHeight;

        html2canvas(clone, {
            scale: 2,
            backgroundColor: bgColor,
            useCORS: true,
            logging: false,
            width: width,   
            height: height, 
            windowWidth: width,
            windowHeight: height,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('scheduleGrid');
                if(clonedElement) clonedElement.style.transform = 'none';
            }
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Program_${isMobile ? 'Gunluk' : 'Haftalik'}.jpeg`;
            link.href = canvas.toDataURL("image/jpeg", 0.9);
            link.click();
            document.body.removeChild(clone);
        }).catch(err => {
            console.error("Export error:", err);
            alert("Error creating image.");
            if (document.body.contains(clone)) document.body.removeChild(clone);
        });
    },

    shareOrCopy() {
        const tr = TRANSLATIONS[this.lang];
        const jsonStr = JSON.stringify(this.events);
        if (navigator.share && this.isMobile()) {
            navigator.share({ title: 'My Weekly Schedule', text: jsonStr }).catch(console.error);
        } else {
            navigator.clipboard.writeText(jsonStr).then(() => {
                alert(tr.ui.copied);
            });
        }
    },
    importData() {
        const tr = TRANSLATIONS[this.lang];
        const json = prompt(tr.ui.importPrompt);
        if(json) {
            try {
                const parsed = JSON.parse(json);
                if(Array.isArray(parsed)) {
                    this.events = parsed;
                    this.save();
                    alert("OK!");
                } else throw new Error();
            } catch(e) {
                alert(tr.ui.importError);
            }
        }
    },

    save() {
        localStorage.setItem('weeklyScheduleEvents', JSON.stringify(this.events));
        this.renderGrid();
    },

    isMobile() {
        return window.innerWidth < 768;
    },

    changeMobileDay(delta) {
        let newIndex = this.activeMobileDayIndex + delta;
        if(newIndex < 0) newIndex = 6;
        if(newIndex > 6) newIndex = 0;
        this.activeMobileDayIndex = newIndex;
        this.updateMobileHeader();
        this.renderGrid(); 
    },

    updateMobileHeader() {
        const tr = TRANSLATIONS[this.lang];
        document.getElementById('mobileCurrentDayDisplay').textContent = tr.days[this.activeMobileDayIndex];
    },

    checkOverlap(newEvent) {
        const newStart = timeToMinutes(newEvent.start);
        const newEnd = newStart + newEvent.duration;

        return this.events.some(ev => {
            if (ev.id == newEvent.id) return false;
            if (ev.day !== newEvent.day) return false;

            const evStart = timeToMinutes(ev.start);
            const evEnd = evStart + ev.duration;
            return (newEnd > evStart && newStart < evEnd);
        });
    },

    initModalListeners() {
        const iStart = document.getElementById('inputStart');
        const iEnd = document.getElementById('inputEnd');
        const iDur = document.getElementById('inputDuration');
        const iDay = document.getElementById('inputDay');

        const syncEnd = () => {
            const s = iStart.value;
            const d = parseInt(iDur.value) || 0;
            if(s) {
                let mins = timeToMinutes(s) + d;
                if(mins >= 24*60) mins -= 24*60; 
                iEnd.value = minutesToTime(mins);
            }
        };

        const syncDur = () => {
            const s = iStart.value;
            const e = iEnd.value;
            if(s && e) {
                let startM = timeToMinutes(s);
                let endM = timeToMinutes(e);
                let diff = endM - startM;
                if(diff < 0) diff += 24*60; 
                if(diff === 0) diff = 1440;
                iDur.value = diff;
            }
        };

        const autoAdjustDuration = () => {
            const day = iDay.value;
            const startVal = iStart.value;
            const currentId = document.getElementById('eventId').value;
            
            if (!startVal) return;

            const startMin = timeToMinutes(startVal);
            const otherEvents = this.events.filter(e => e.day === day && e.id != currentId);
            let limitMin = 24 * 60;
            let nextEventStart = limitMin;

            otherEvents.forEach(ev => {
                const evStart = timeToMinutes(ev.start);
                if (evStart >= startMin) {
                    if (evStart < nextEventStart) {
                        nextEventStart = evStart;
                    }
                }
            });

            const maxDuration = nextEventStart - startMin;
            let currentDur = parseInt(iDur.value) || 60;
            if (currentDur > maxDuration) {
                if (maxDuration <= 0) currentDur = 15; 
                else currentDur = maxDuration;
                iDur.value = currentDur;
                syncEnd();
            }
        };

        iStart.addEventListener('change', () => {
            autoAdjustDuration();
            syncEnd();
        });
        iDay.addEventListener('change', () => {
            autoAdjustDuration();
        });

        iDur.addEventListener('input', syncEnd);
        iEnd.addEventListener('change', syncDur);

        document.getElementById('eventForm').onsubmit = (e) => { e.preventDefault(); this.saveFromModal(); };
        
        document.getElementById('btnDelete').onclick = () => {
            if(confirm(this.t('ui.deleteEventConfirm'))) {
                const id = document.getElementById('eventId').value;
                this.events = this.events.filter(e => e.id !== id);
                this.save();
                this.closeModal();
            }
        };
        document.getElementById('eventModal').onclick = (e) => {
            if(e.target.id === 'eventModal') this.closeModal();
        };
        document.getElementById('settingsModal').onclick = (e) => {
            if(e.target.id === 'settingsModal') this.closeSettingsModal();
        };
    },

    openModal(isEdit) {
        const tr = TRANSLATIONS[this.lang];
        const m = document.getElementById('eventModal');
        m.classList.add('active');
        document.getElementById('modalTitle').textContent = isEdit ? tr.ui.editTitle : tr.ui.newTitle;
        document.getElementById('btnDelete').classList.toggle('hidden', !isEdit);
    },
    closeModal() {
        document.getElementById('eventModal').classList.remove('active');
    },
    openSettingsModal() {
        document.getElementById('settingsModal').classList.add('active');
        this.renderCategorySettings(); 
    },
    closeSettingsModal() {
        document.getElementById('settingsModal').classList.remove('active');
    },

    openNewEventModal() {
        document.getElementById('eventId').value = Date.now();
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputStart').value = '09:30';
        document.getElementById('inputDuration').value = 60;
        document.getElementById('inputAlarm').checked = false; 
        
        const defaultDay = this.isMobile() ? DAYS_KEYS[this.activeMobileDayIndex] : 'Monday';
        document.getElementById('inputDay').value = defaultDay;

        const picker = document.getElementById('colorPicker');
        Array.from(picker.children).forEach(c => c.style.boxShadow = 'none');
        if(picker.firstElementChild) picker.firstElementChild.click(); 

        document.getElementById('inputStart').dispatchEvent(new Event('change'));
        this.openModal(false);
    },

    openEditModal(ev) {
        document.getElementById('eventId').value = ev.id;
        document.getElementById('inputTitle').value = ev.title;
        document.getElementById('inputDay').value = ev.day;
        document.getElementById('inputStart').value = ev.start;
        document.getElementById('inputDuration').value = ev.duration;
        document.getElementById('inputAlarm').checked = ev.alarm === true;

        const picker = document.getElementById('colorPicker');
        let catId = ev.type;
        if (!this.categories.find(c => c.id === catId) && this.categories.length > 0) {
            catId = this.categories[0].id;
        }

        document.getElementById('inputType').value = catId;
        this.updateUITexts(); 

        document.getElementById('inputStart').dispatchEvent(new Event('change'));
        this.openModal(true);
    },

    saveFromModal() {
        const id = document.getElementById('eventId').value;
        const data = {
            id: id,
            title: document.getElementById('inputTitle').value,
            day: document.getElementById('inputDay').value,
            start: document.getElementById('inputStart').value,
            duration: parseInt(document.getElementById('inputDuration').value),
            type: document.getElementById('inputType').value,
            alarm: document.getElementById('inputAlarm').checked
        };

        if (this.checkOverlap(data)) {
            alert(this.t('ui.overlapError'));
            return; 
        }

        const idx = this.events.findIndex(e => e.id == id);
        if(idx > -1) this.events[idx] = data;
        else this.events.push(data);

        this.save();
        this.closeModal();
    },

    resetSchedule() {
        if(confirm(this.t('ui.resetConfirm'))) {
            this.events = JSON.parse(JSON.stringify(INITIAL_EVENTS));
            this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
            this.saveCategories();
            this.save();
            this.closeSettingsModal();
        }
    },

    clearAll() {
        if(confirm(this.t('ui.clearConfirm'))) {
            this.events = [];
            this.save();
            this.closeSettingsModal();
        }
    },

    startResize(e, eventId, direction) { 
        e.stopPropagation();
        e.preventDefault();

        const ev = this.events.find(x => x.id === eventId);
        if (!ev) return;

        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const rowHeight = this.isMobile() ? 80 : 60;
        const pxPerMin = rowHeight / 30;

        let eventStartMin = timeToMinutes(ev.start);
        const gridStartMin = timeToMinutes(CONFIG.gridStart);
        if(eventStartMin < gridStartMin) eventStartMin += (24*60); 

        const handle = e.target;
        const el = handle.closest('.event-card');
        
        const currentHeight = el.getBoundingClientRect().height;
        const currentMarginTop = parseFloat(window.getComputedStyle(el).marginTop) || 0;

        this.dragState = {
            isDragging: true,
            eventId: eventId,
            direction: direction,
            startY: clientY,
            el: el,
            startHeight: currentHeight,
            startMarginTop: currentMarginTop,
            originalDuration: ev.duration,
            originalStartMin: eventStartMin,
            pxPerMin: pxPerMin,
            newDuration: ev.duration,
            newStartMin: eventStartMin
        };

        document.body.classList.add('resizing');
        
        const tooltip = document.getElementById('dragTooltip');
        if(tooltip) tooltip.style.display = 'block';
        
        window.addEventListener('mousemove', this.handleResizeMove);
        window.addEventListener('mouseup', this.stopResize);
        window.addEventListener('touchmove', this.handleResizeMove, { passive: false });
        window.addEventListener('touchend', this.stopResize);
    },

    handleResizeMove: (e) => {
        if (!app.dragState.isDragging) return;

        const s = app.dragState;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        
        const diffY = clientY - s.startY; 
        const diffMin = Math.round(diffY / s.pxPerMin);

        let newDur = s.originalDuration;
        let newStart = s.originalStartMin;

        if (s.direction === 'end') {
            newDur = s.originalDuration + diffMin;
            if (newDur < 15) newDur = 15; 
            
            const minHeight = 15 * s.pxPerMin;
            let newPixelHeight = s.startHeight + diffY;
            if(newPixelHeight < minHeight) newPixelHeight = minHeight;
            
            s.el.style.height = `${newPixelHeight}px`;

        } else {
            newStart = s.originalStartMin + diffMin;
            newDur = s.originalDuration - diffMin;

            if (newDur < 15) {
                newDur = 15;
                newStart = s.originalStartMin + s.originalDuration - 15;
            }

            const minHeight = 15 * s.pxPerMin;
            let newPixelHeight = s.startHeight - diffY;
            let newMarginTop = s.startMarginTop + diffY;

            if (newPixelHeight < minHeight) {
                const overflow = minHeight - newPixelHeight; 
                newPixelHeight = minHeight;
                newMarginTop -= overflow;
            }

            s.el.style.height = `${newPixelHeight}px`;
            s.el.style.marginTop = `${newMarginTop}px`;
        }

        let displayStart = newStart;
        if(displayStart >= 1440) displayStart -= 1440;
        if(displayStart < 0) displayStart += 1440;
        
        let displayEnd = displayStart + newDur;
        if(displayEnd >= 1440) displayEnd -= 1440;

        s.newDuration = newDur;
        s.newStartMin = newStart;

        const tooltip = document.getElementById('dragTooltip');
        if (tooltip) {
            const strStart = minutesToTime(displayStart);
            const strEnd = minutesToTime(displayEnd);
            tooltip.innerHTML = `
                <div class="flex items-center gap-2">
                    <span>${strStart} - ${strEnd}</span>
                    <span class="text-blue-300">(${newDur} dk)</span>
                </div>
            `;
            tooltip.style.left = `${clientX}px`;
            tooltip.style.top = `${clientY}px`;
        }
    },

    stopResize: () => {
        const s = app.dragState;
        if (!s.isDragging) return;

        window.removeEventListener('mousemove', app.handleResizeMove);
        window.removeEventListener('mouseup', app.stopResize);
        window.removeEventListener('touchmove', app.handleResizeMove);
        window.removeEventListener('touchend', app.stopResize);
        document.body.classList.remove('resizing');
        
        const tooltip = document.getElementById('dragTooltip');
        if(tooltip) tooltip.style.display = 'none';

        s.el.style.zIndex = '';

        if (s.newDuration === s.originalDuration && s.newStartMin === s.originalStartMin) {
            s.isDragging = false;
            app.renderGrid(); 
            return;
        }

        const evIndex = app.events.findIndex(x => x.id === s.eventId);
        if (evIndex > -1) {
            const oldEvent = app.events[evIndex];
            
            let finalStart = s.newStartMin;
            while(finalStart >= 1440) finalStart -= 1440;
            while(finalStart < 0) finalStart += 1440;

            const updatedEvent = { 
                ...oldEvent, 
                start: minutesToTime(finalStart),
                duration: s.newDuration 
            };

            const absoluteEnd = s.newStartMin + s.newDuration;
            
            if (absoluteEnd > 1440) {
                const overflowAmount = absoluteEnd - 1440; 
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const currentDayIdx = days.indexOf(oldEvent.day);
                const nextDay = days[(currentDayIdx + 1) % 7]; 

                const nextDayEvIndex = app.events.findIndex(e => 
                    e.day === nextDay && 
                    timeToMinutes(e.start) < overflowAmount
                );

                if (nextDayEvIndex > -1) {
                    const nextEv = app.events[nextDayEvIndex];
                    const nextEvStart = timeToMinutes(nextEv.start);
                    
                    const shiftAmount = overflowAmount - nextEvStart;
                    const newNextDuration = nextEv.duration - shiftAmount;

                    if (newNextDuration > 0) {
                        app.events[nextDayEvIndex] = {
                            ...nextEv,
                            start: minutesToTime(overflowAmount), 
                            duration: newNextDuration
                        };
                    } else {
                         app.events[nextDayEvIndex] = {
                            ...nextEv,
                            start: minutesToTime(overflowAmount),
                            duration: 15
                        };
                    }
                }
            }

            if (app.checkOverlap(updatedEvent)) {
                alert(app.t('ui.overlapError'));
                app.renderGrid(); 
            } else {
                app.events[evIndex] = updatedEvent;
                app.save(); 
            }
        }
        s.isDragging = false;
    },

    renderCategorySettings() {
        const list = document.getElementById('categoryListContainer');
        if(!list) return;
        list.innerHTML = '';

        this.categories.forEach((cat, index) => {
            const item = document.createElement('div');
            item.className = 'category-item flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700';

            item.innerHTML = `
                <div class="flex items-center gap-2 flex-1">
                    <div class="color-input-wrapper">
                        <input type="color" value="${cat.color}" class="custom-color-input" 
                            onchange="app.updateCategory('${cat.id}', 'color', this.value)">
                    </div>
                    <input type="text" value="${cat.name}" 
                        class="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-200 w-full"
                        onchange="app.updateCategory('${cat.id}', 'name', this.value)">
                </div>
                ${this.categories.length > 1 ? `
                <button onclick="app.deleteCategory('${cat.id}')" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>` : ''}
            `;
            list.appendChild(item);
        });
        lucide.createIcons();
    },

    addNewCategory() {
        const newId = 'cat_' + Date.now();
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

        this.categories.push({
            id: newId,
            name: 'New Category',
            color: randomColor
        });

        this.saveCategories();
    },

    updateCategory(id, field, value) {
        const cat = this.categories.find(c => c.id === id);
        if(cat) {
            cat[field] = value;
            this.saveCategories();
        }
    },

    deleteCategory(id) {
        if(confirm('Delete this category? Activities with this category will remain but look gray.')) {
            this.categories = this.categories.filter(c => c.id !== id);
            this.saveCategories();
        }
    },

    saveCategories() {
        localStorage.setItem('weeklyScheduleCategories', JSON.stringify(this.categories));
        this.renderCategorySettings(); 
        this.updateUITexts(); 
        this.renderGrid(); 
    }
};


window.onload = () => app.init();
