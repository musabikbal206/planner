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
        categories: {
            sleep: 'Sleep',
            education: 'Education', work: 'Work', community: 'Social', meal: 'Meal',
            special: 'Special', chores: 'Chores', coding: 'Coding'
        },
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
        categories: {
            sleep: 'Uyku',
            education: 'Eğitim', work: 'İş/Staj', community: 'Sosyal', meal: 'Yemek',
            special: 'Özel', chores: 'Ev İşleri', coding: 'Yazılım'
        },
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

const COLORS = {
    sleep: { labelKey: 'sleep', class: 'bg-indigo-100 dark:bg-indigo-900/40 border-l-4 border-indigo-500 text-indigo-900 dark:text-indigo-100' },
    education: { labelKey: 'education', class: 'bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500 text-blue-900 dark:text-blue-100' },
    work: { labelKey: 'work', class: 'bg-green-100 dark:bg-green-900/40 border-l-4 border-green-500 text-green-900 dark:text-green-100' },
    community: { labelKey: 'community', class: 'bg-purple-100 dark:bg-purple-900/40 border-l-4 border-purple-500 text-purple-900 dark:text-purple-100' },
    meal: { labelKey: 'meal', class: 'bg-orange-100 dark:bg-orange-900/40 border-l-4 border-orange-500 text-orange-900 dark:text-orange-100' },
    special: { labelKey: 'special', class: 'bg-pink-100 dark:bg-pink-900/40 border-l-4 border-pink-500 text-pink-900 dark:text-pink-100' },
    chores: { labelKey: 'chores', class: 'bg-gray-200 dark:bg-gray-700 border-l-4 border-gray-500 dark:border-gray-400 text-gray-800 dark:text-gray-200' },
    coding: { labelKey: 'coding', class: 'bg-white dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-400' },
};

const INITIAL_EVENTS = [
    { id: 'sleepM', day: 'Monday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepTu', day: 'Tuesday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepW', day: 'Wednesday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepTh', day: 'Thursday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepF', day: 'Friday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepSa', day: 'Saturday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },
    { id: 'sleepSu', day: 'Sunday', start: '00:00', duration: 570, title: 'UYKU ZAMANI', type: 'sleep', alarm: false },

    { id: 'bkM', day: 'Monday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkTu', day: 'Tuesday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkW', day: 'Wednesday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkTh', day: 'Thursday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkF', day: 'Friday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkSa', day: 'Saturday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },
    { id: 'bkSu', day: 'Sunday', start: '09:30', duration: 30, title: 'Kahvaltı', type: 'meal', alarm: false },

    { id: 'mon1', day: 'Monday', start: '10:00', duration: 120, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'mon2', day: 'Monday', start: '12:00', duration: 180, title: 'ÜNİVERSİTE DERSLERİ', type: 'education', alarm: true },
    { id: 'mon3', day: 'Monday', start: '15:00', duration: 120, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'mon4', day: 'Monday', start: '17:00', duration: 60, title: 'Akşam Yemeği', type: 'meal', alarm: false }, 
    { id: 'mon5', day: 'Monday', start: '18:00', duration: 90, title: 'GENÇLİK MERKEZİ EĞİTİMİ', type: 'community', alarm: true },
    { id: 'mon6', day: 'Monday', start: '19:30', duration: 270, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },

    { id: 'tue1', day: 'Tuesday', start: '10:00', duration: 420, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'tue2', day: 'Tuesday', start: '17:00', duration: 60, title: 'Akşam Yemeği', type: 'meal', alarm: false },
    { id: 'tue3', day: 'Tuesday', start: '18:00', duration: 90, title: 'GENÇLİK MERKEZİ EĞİTİMİ', type: 'community', alarm: true },
    { id: 'tue4', day: 'Tuesday', start: '19:30', duration: 270, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },

    { id: 'wed1', day: 'Wednesday', start: '10:00', duration: 420, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'wed2', day: 'Wednesday', start: '17:00', duration: 60, title: 'Akşam Yemeği', type: 'meal', alarm: false },
    { id: 'wed3', day: 'Wednesday', start: '18:00', duration: 90, title: 'GENÇLİK MERKEZİ EĞİTİMİ', type: 'community', alarm: true },
    { id: 'wed4', day: 'Wednesday', start: '19:30', duration: 270, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },

    { id: 'thu1', day: 'Thursday', start: '10:00', duration: 120, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'thu2', day: 'Thursday', start: '12:00', duration: 180, title: 'ÜNİVERSİTE DERSLERİ', type: 'education', alarm: true },
    { id: 'thu3', day: 'Thursday', start: '15:00', duration: 120, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'thu4', day: 'Thursday', start: '17:00', duration: 60, title: 'Akşam Yemeği', type: 'meal', alarm: false },
    { id: 'thu5', day: 'Thursday', start: '18:00', duration: 90, title: 'GENÇLİK MERKEZİ EĞİTİMİ', type: 'community', alarm: true },
    { id: 'thu6', day: 'Thursday', start: '19:30', duration: 270, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },

    { id: 'fri1', day: 'Friday', start: '10:00', duration: 150, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },
    { id: 'fri2', day: 'Friday', start: '12:30', duration: 180, title: 'STAJ', type: 'work', alarm: true },
    { id: 'fri3', day: 'Friday', start: '15:30', duration: 360, title: 'AKRABA ZİYARETİ', type: 'special', alarm: false },
    { id: 'fri4', day: 'Friday', start: '21:30', duration: 150, title: 'KODLAMA / BOŞ ZAMAN', type: 'coding', alarm: false },

    { id: 'sat1', day: 'Saturday', start: '10:00', duration: 840, title: 'CODING / FREE TIME', type: 'coding', alarm: false },

    { id: 'sun1', day: 'Sunday', start: '10:00', duration: 420, title: 'TEMİZLİK & ÇAMAŞIR', type: 'chores', alarm: false },
    { id: 'sun2', day: 'Sunday', start: '17:00', duration: 60, title: 'Akşam Yemeği', type: 'meal', alarm: false },
    { id: 'sun3', day: 'Sunday', start: '18:00', duration: 360, title: 'TEMİZLİK & ÇAMAŞIR', type: 'chores', alarm: false },
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

    init() {
        try {
            const saved = localStorage.getItem('weeklyScheduleEvents');
            this.events = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_EVENTS));
        } catch(e) {
            this.events = JSON.parse(JSON.stringify(INITIAL_EVENTS));
        }

        const savedTheme = localStorage.getItem('weeklyScheduleTheme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.setDarkMode(true);
        } else {
            this.setDarkMode(false);
        }

        const savedLang = localStorage.getItem('weeklyScheduleLang');
        if (savedLang) this.lang = savedLang;

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

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'tr' : 'en';
        localStorage.setItem('weeklyScheduleLang', this.lang);
        this.updateUITexts();
        this.renderGrid();
        this.updateMobileHeader();
    },

    updateUITexts() {
        const tr = TRANSLATIONS[this.lang];
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
        Object.entries(COLORS).forEach(([key, val]) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const baseClass = val.class.split(' ').find(c => c.startsWith('bg-'));
            const pickerClass = `bg-${baseClass ? baseClass.split('-')[1] : 'gray'}-100 dark:bg-${baseClass ? baseClass.split('-')[1] : 'gray'}-800`;
            btn.className = `h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${pickerClass}`;
            btn.innerHTML = `<span class="opacity-75">${tr.categories[val.labelKey]}</span>`;
            btn.dataset.value = key;
            btn.onclick = () => {
                Array.from(picker.children).forEach(c => c.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'dark:ring-offset-gray-900'));
                btn.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2', 'dark:ring-offset-gray-900');
                document.getElementById('inputType').value = key;
            };
            picker.appendChild(btn);
            if(key === oldVal) btn.click();
        });
        
        if(!oldVal) picker.firstElementChild?.click();

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
        const wb = XLSX.utils.book_new();
        const ws_data = [[tr.ui.time, ...tr.days]];

        for (let i = 0; i < CONFIG.gridRows; i++) { 
            const hour = Math.floor(i / 2);
            const min = (i % 2) * 30;
            const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
            const row = [timeStr, '', '', '', '', '', '', ''];
            ws_data.push(row);
        }

        const merges = [];
        this.events.forEach(ev => {
            const dayIndex = DAYS_KEYS.indexOf(ev.day);
            if (dayIndex === -1) return;
            const colIndex = dayIndex + 1; 

            const [h, m] = ev.start.split(':').map(Number);
            const startSlot = (h * 2) + (m === 30 ? 1 : 0);
            const excelRowIndex = startSlot + 1;
            const durationSlots = Math.ceil(ev.duration / 30);
            const catName = tr.categories[COLORS[ev.type]?.labelKey] || ev.type;
            
            if (ws_data[excelRowIndex]) {
                ws_data[excelRowIndex][colIndex] = `${ev.title} (${catName})`;
            }

            if (durationSlots > 1) {
                merges.push({
                    s: { r: excelRowIndex, c: colIndex }, 
                    e: { r: excelRowIndex + durationSlots - 1, c: colIndex } 
                });
            }
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        if (merges.length > 0) ws['!merges'] = merges;
        ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

        XLSX.utils.book_append_sheet(wb, ws, "Program");
        XLSX.writeFile(wb, "HaftalikProgram_Tablo.xlsx");
    },

    async exportPDF() {
        const tr = TRANSLATIONS[this.lang];
        if (window.location.protocol === 'file:') console.warn("Font issue possible on file protocol.");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const fontUrl = 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.ttf';
        
        try {
            const response = await fetch(fontUrl);
            if (!response.ok) throw new Error("Font fetch failed");
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                doc.addFileToVFS('Roboto-Regular.ttf', base64data);
                doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
                doc.setFont('Roboto');
                doc.setFontSize(16);
                doc.text(tr.title, 14, 20);

                const tableData = this.events.map(ev => [
                    tr.days[DAYS_KEYS.indexOf(ev.day)],
                    ev.start,
                    ev.title,
                    tr.categories[COLORS[ev.type]?.labelKey] || ''
                ]).sort((a,b) => {
                    const da = tr.days.indexOf(a[0]);
                    const db = tr.days.indexOf(b[0]);
                    if(da !== db) return da - db;
                    return a[1].localeCompare(b[1]);
                });

                doc.autoTable({
                    head: [[tr.ui.lblDay, tr.ui.lblStart, tr.ui.lblTitle, tr.ui.lblCategory]],
                    body: tableData,
                    startY: 30,
                    theme: 'grid',
                    styles: { font: 'Roboto', fontStyle: 'normal', fontSize: 10 },
                    headStyles: { font: 'Roboto', fillColor: [45, 55, 72], textColor: 255 }
                });
                doc.save("HaftalikProgram.pdf");
            };
            reader.onerror = () => { throw new Error("File read error"); };
        } catch (e) {
            console.error("PDF Error:", e);
            alert("PDF Error: Font could not be loaded. Exporting with default font.");
            doc.autoTable({
                head: [[tr.ui.lblDay, tr.ui.lblStart, tr.ui.lblTitle, tr.ui.lblCategory]],
                body: this.events.map(ev => [
                    tr.days[DAYS_KEYS.indexOf(ev.day)],
                    ev.start,
                    ev.title,
                    tr.categories[COLORS[ev.type]?.labelKey] || ''
                ]),
                startY: 30
            });
            doc.save("HaftalikProgram_Simple.pdf");
        }
    },

    exportWord() {
        if (!window.docx) {
            alert("Docx library missing.");
            return;
        }
        const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, HeadingLevel, TextRun, AlignmentType } = window.docx;
        const tr = TRANSLATIONS[this.lang];
        const WORD_COLORS = {
            sleep: 'E0E7FF', education: 'DBEAFE', work: 'DCFCE7', community: 'F3E8FF',
            meal: 'FFEDD5', special: 'FCE7F3', chores: 'E5E7EB', coding: 'FFFFFF'
        };
        const sorted = [...this.events].sort((a,b) => {
            const da = DAYS_KEYS.indexOf(a.day);
            const db = DAYS_KEYS.indexOf(b.day);
            if(da !== db) return da - db;
            return a.start.localeCompare(b.start);
        });
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
        const dataRows = sorted.map(ev => {
            const color = WORD_COLORS[ev.type] || 'FFFFFF';
            const catName = tr.categories[COLORS[ev.type]?.labelKey] || ev.type;
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

    renderGrid() {
        const grid = document.getElementById('scheduleGrid');
        grid.innerHTML = '';
        const tr = TRANSLATIONS[this.lang];
        const isMobile = this.isMobile();
        const daysToRender = isMobile ? [tr.days[this.activeMobileDayIndex]] : tr.days;

        // --- TABLO BAŞLIKLARI VE ZAMAN SÜTUNU (Değişmedi) ---
        const tl = document.createElement('div');
        tl.className = 'sticky top-0 z-20 bg-gray-50 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider transition-colors duration-200';
        tl.textContent = tr.ui.time;
        tl.style.gridRow = '1'; 
        tl.style.gridColumn = '1';
        grid.appendChild(tl);

        daysToRender.forEach((day, index) => {
            const d = document.createElement('div');
            d.className = 'sticky top-0 z-20 bg-gray-50 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center font-bold text-gray-700 dark:text-gray-300 text-sm shadow-sm transition-colors duration-200';
            d.innerHTML = `<span>${day.substring(0, 3)}</span>`;
            d.style.gridRow = '1';
            d.style.gridColumn = `${index + 2}`;
            grid.appendChild(d);
        });

        let currentMin = timeToMinutes(CONFIG.gridStart);
        for(let i = 0; i < CONFIG.gridRows; i++) {
            const timeStr = minutesToTime(currentMin);
            const row = CONFIG.rowOffset + i;
            const timeLabel = document.createElement('div');
            timeLabel.className = 'border-r border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center bg-white dark:bg-gray-900 sticky left-0 z-10 transition-colors duration-200';
            timeLabel.style.gridRow = `${row}`;
            timeLabel.style.gridColumn = '1';
            const isHour = timeStr.endsWith('00');
            const textClass = isHour ? 'text-gray-800 dark:text-gray-200 font-bold' : 'text-gray-400 dark:text-gray-600 font-medium';
            timeLabel.innerHTML = `<span class="text-xs ${textClass}">${timeStr}</span>`;
            grid.appendChild(timeLabel);

            const numCols = isMobile ? 1 : 7;
            for(let d = 0; d < numCols; d++) {
                const cell = document.createElement('div');
                cell.className = 'border-r border-b border-gray-100 dark:border-gray-800 transition-colors duration-200';
                cell.style.gridRow = `${row}`;
                cell.style.gridColumn = `${d + 2}`;
                grid.appendChild(cell);
            }
            currentMin += 30;
        }

        // --- ETKİNLİKLERİ ÇİZME (GÜNCELLENMİŞ MANTIK) ---
        this.events.forEach(ev => {
            // Etkinliğin toplam bitiş dakikasını hesapla
            const startMin = timeToMinutes(ev.start);
            const totalEndMin = startMin + ev.duration;

            // Parçaları tutacak dizi (Segmentler)
            const segments = [];

            if (totalEndMin > 1440) {
                // DURUM: Gece yarısını geçiyor -> İKİYE BÖL
                
                // 1. Parça (Bugün): Başlangıçtan 24:00'e kadar
                segments.push({
                    day: ev.day,
                    start: ev.start,
                    duration: 1440 - startMin,
                    isSplit: true, // Görsel ipucu için (opsiyonel)
                    part: 'first'
                });

                // 2. Parça (Yarın): 00:00'dan kalana kadar
                const dayIndex = DAYS_KEYS.indexOf(ev.day);
                const nextDayIndex = (dayIndex + 1) % 7;
                const nextDayName = DAYS_KEYS[nextDayIndex];

                segments.push({
                    day: nextDayName,
                    start: '00:00',
                    duration: totalEndMin - 1440,
                    isSplit: true,
                    part: 'second'
                });

            } else {
                // DURUM: Normal Etkinlik
                segments.push({
                    day: ev.day,
                    start: ev.start,
                    duration: ev.duration,
                    isSplit: false
                });
            }

            // Oluşturulan parçaları çiz
            segments.forEach(seg => {
                // MOBİL KONTROLÜ: Eğer mobildeysek ve bu parça aktif günde değilse çizme
                if (isMobile) {
                    if (seg.day !== DAYS_KEYS[this.activeMobileDayIndex]) return;
                }

                // Sütun Hesabı
                let colStart = 0;
                if (isMobile) {
                    colStart = 2; // Mobilde hep 2. sütun
                } else {
                    colStart = DAYS_KEYS.indexOf(seg.day) + 2;
                }

                // Konum Hesabı
                const gridStartMin = timeToMinutes(CONFIG.gridStart);
                let segmentStartMin = timeToMinutes(seg.start);
                // Gece yarısı düzeltmesi (Eğer start 00:00 ise ve gridStart 00:00 ise sorun yok)
                
                const diff = segmentStartMin - gridStartMin;
                const slotIndex = Math.floor(diff / 30);
                const rowStart = CONFIG.rowOffset + slotIndex;
                const remainderMinutes = diff % 30;

                const pxPerMin = isMobile ? (80/30) : (60/30);
                const topOffset = remainderMinutes * pxPerMin;
                const exactHeight = seg.duration * pxPerMin;

                if(rowStart >= (CONFIG.gridRows + CONFIG.rowOffset)) return;

                // Element Oluşturma
                const style = COLORS[ev.type] || COLORS.coding;
                const el = document.createElement('div');
                const paddingClass = isMobile ? 'p-1' : 'p-2';
                
                // Bölünmüş etkinlikler için hafif görsel fark (opsiyonel opaklık vb.)
                const splitClass = seg.isSplit ? 'opacity-90' : '';

                el.className = `event-card m-[2px] rounded-lg ${paddingClass} flex flex-col justify-center cursor-pointer relative overflow-hidden shadow-sm border ${style.class} ${splitClass}`;
                
                el.style.gridColumn = `${colStart} / span 1`;
                el.style.gridRow = `${rowStart} / span 1`; 
                el.style.marginTop = `${topOffset}px`; 
                el.style.height = `${exactHeight}px`;  
                el.style.zIndex = '10'; 

                // İçerik
                const showDetails = exactHeight > 25;
                const alarmIcon = ev.alarm ? `<i data-lucide="bell" class="w-3 h-3 absolute top-1 right-1 opacity-60"></i>` : '';
                const titleClass = isMobile ? 'event-title font-bold' : 'font-bold leading-tight line-clamp-2 pr-2 text-xs';
                const timeClass = isMobile ? 'event-time opacity-75 leading-tight' : 'mt-1 opacity-75 text-[10px] leading-tight';

                // Başlık yanına (Devamı...) gibi bir ibare koyabiliriz
                let titleSuffix = '';
                if (seg.part === 'first') titleSuffix = ' (Devamı Yarın)';
                if (seg.part === 'second') titleSuffix = ' (Devam)';

                // Saat Metni: Parça olsa bile orijinal saati mi gösterelim yoksa parçanın saatini mi?
                // Genelde parçanın kendi saat aralığını göstermek daha az kafa karıştırır.
                const segEndTime = minutesToTime(timeToMinutes(seg.start) + seg.duration);
                const displayTime = `${seg.start} - ${segEndTime}`;

                el.innerHTML = `
                    <div class="resize-handle top" onmousedown="app.startResize(event, '${ev.id}', 'start')" ontouchstart="app.startResize(event, '${ev.id}', 'start')"></div>
                    ${alarmIcon}
                    <div class="${titleClass} pointer-events-none">${ev.title}${titleSuffix}</div>
                    ${showDetails ? `<div class="${timeClass} pointer-events-none">${displayTime}</div>` : ''}
                    <div class="resize-handle bottom" onmousedown="app.startResize(event, '${ev.id}', 'end')" ontouchstart="app.startResize(event, '${ev.id}', 'end')"></div>
                `;
                
                // Tıklama Olayı (Orijinal 'ev' objesini gönderiyoruz)
                el.onclick = (e) => { 
                    if(!e.target.classList.contains('resize-handle')) {
                        this.openEditModal(ev); 
                    }
                };
                
                grid.appendChild(el);
            });
        });
    },

    // --- YENİ EKLENEN FONKSİYON: ÇAKIŞMA KONTROLÜ ---
    checkOverlap(newEvent) {
        const newStart = timeToMinutes(newEvent.start);
        const newEnd = newStart + newEvent.duration;

        return this.events.some(ev => {
            // Kendisiyle çakışmayı kontrol etme (Düzenleme modu için)
            if (ev.id == newEvent.id) return false;
            // Farklı gün ise kontrol etme
            if (ev.day !== newEvent.day) return false;

            const evStart = timeToMinutes(ev.start);
            const evEnd = evStart + ev.duration;

            // Çakışma mantığı: (A Biter > B Başlar) VE (A Başlar < B Biter)
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

        // --- YENİ EKLENEN FONKSİYON: OTOMATİK SÜRE KISITLAMA ---
        const autoAdjustDuration = () => {
            const day = iDay.value;
            const startVal = iStart.value;
            const currentId = document.getElementById('eventId').value;
            
            if (!startVal) return;

            const startMin = timeToMinutes(startVal);
            
            // Bu günün diğer etkinliklerini bul (kendi hariç)
            const otherEvents = this.events.filter(e => e.day === day && e.id != currentId);
            
            // Varsayılan olarak gece yarısına kadar (24:00) izin var
            let limitMin = 24 * 60;
            
            // Seçilen saatten SONRA başlayan ilk etkinliği bul
            let nextEventStart = limitMin;

            otherEvents.forEach(ev => {
                const evStart = timeToMinutes(ev.start);
                const evEnd = evStart + ev.duration;

                // Eğer seçilen saat bir etkinliğin İÇİNDEYSE (Tam çakışma), yapacak bir şey yok
                // Kaydetme sırasında hata verecek zaten.
                
                // Eğer bu etkinlik bizimkinden SONRA başlıyorsa
                if (evStart >= startMin) {
                    if (evStart < nextEventStart) {
                        nextEventStart = evStart;
                    }
                }
            });

            // Maksimum kullanılabilir süre
            const maxDuration = nextEventStart - startMin;

            // Eğer mevcut süre bu boşluktan büyükse, kısalt
            let currentDur = parseInt(iDur.value) || 60; // Default 60
            if (currentDur > maxDuration) {
                // Eğer maxDuration 0 veya negatifse (zaten çakışmışsa), en az 15dk verelim
                if (maxDuration <= 0) currentDur = 15; 
                else currentDur = maxDuration;
                
                iDur.value = currentDur;
                syncEnd(); // Bitiş saatini güncelle
            }
        };

        // Başlangıç saati veya gün değişirse süreyi sığdır
        iStart.addEventListener('change', () => {
            autoAdjustDuration();
            syncEnd();
        });
        iDay.addEventListener('change', () => {
            autoAdjustDuration();
        });

        // Süre değişirse bitişi güncelle (Manuel süre girişi)
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
        Array.from(picker.children).forEach(c => c.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'dark:ring-offset-gray-900'));
        picker.firstElementChild.click(); 

        // Event trigger ederek oto kontrolü çalıştır
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
        const btn = picker.querySelector(`button[data-value="${ev.type}"]`) || picker.firstElementChild;
        if(btn) btn.click();

        // Event trigger ederek oto kontrolü çalıştır
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

        // --- ÇAKIŞMA KONTROLÜ ---
        if (this.checkOverlap(data)) {
            alert(this.t('ui.overlapError'));
            return; // Kaydetmeyi durdur
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
    // ... app objesi içinde metod olarak ekle ...

// 1. Sürüklemeyi Başlat
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
        
        // Mevcut değerleri al
        const currentHeight = el.getBoundingClientRect().height;
        // Mevcut margin-top değerini al (parse et)
        const currentMarginTop = parseFloat(window.getComputedStyle(el).marginTop) || 0;

        this.dragState = {
            isDragging: true,
            eventId: eventId,
            direction: direction,
            startY: clientY,
            el: el,
            // Başlangıç referansları
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

    // 2. Sürükleme Hareketi
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
            // ALTTAN ÇEKME: Sadece yükseklik değişir
            newDur = s.originalDuration + diffMin;
            if (newDur < 15) newDur = 15; 
            
            const minHeight = 15 * s.pxPerMin;
            let newPixelHeight = s.startHeight + diffY;
            if(newPixelHeight < minHeight) newPixelHeight = minHeight;
            
            s.el.style.height = `${newPixelHeight}px`;

        } else {
            // ÜSTTEN ÇEKME: Margin-top ve Yükseklik değişir
            newStart = s.originalStartMin + diffMin;
            newDur = s.originalDuration - diffMin;

            if (newDur < 15) {
                newDur = 15;
                newStart = s.originalStartMin + s.originalDuration - 15;
                // Minimum süreye ulaşıldığında diffMin'i sabitlemek gerekir ama
                // basitlik için görseli minHeight'te tutuyoruz.
            }

            // Görsel Hesaplama:
            // Aşağı çekersem (diffY pozitif): Margin artar, Height azalır.
            // Yukarı çekersem (diffY negatif): Margin azalır, Height artar.
            
            const minHeight = 15 * s.pxPerMin;
            
            // Yeni yükseklik
            let newPixelHeight = s.startHeight - diffY;
            // Yeni üst boşluk
            let newMarginTop = s.startMarginTop + diffY;

            // Sınır Kontrolü (Min 15dk)
            if (newPixelHeight < minHeight) {
                // Eğer min yüksekliğe dayandıysa, margin daha fazla artmamalı (aşağı itmemeli)
                // Farkın ne kadarının "geçerli" olduğunu bul
                const overflow = minHeight - newPixelHeight; 
                newPixelHeight = minHeight;
                newMarginTop -= overflow; // Fazla itmeyi geri al
            }

            s.el.style.height = `${newPixelHeight}px`;
            s.el.style.marginTop = `${newMarginTop}px`;
        }

        // Saat Formatlama
        let displayStart = newStart;
        if(displayStart >= 1440) displayStart -= 1440;
        if(displayStart < 0) displayStart += 1440;
        
        let displayEnd = displayStart + newDur;
        if(displayEnd >= 1440) displayEnd -= 1440;

        s.newDuration = newDur;
        s.newStartMin = newStart;

        // Tooltip Güncelleme
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

    // 3. Sürükleme Bitti
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
            
            // Başlangıç dakikasını hesapla (Gün döngüsü korumalı)
            let finalStart = s.newStartMin;
            while(finalStart >= 1440) finalStart -= 1440;
            while(finalStart < 0) finalStart += 1440;

            const updatedEvent = { 
                ...oldEvent, 
                start: minutesToTime(finalStart),
                duration: s.newDuration 
            };

            // --- YENİ EKLENEN KISIM: ERTESİ GÜN KONTROLÜ ---
            // Eğer etkinlik gece yarısını (1440 dk) geçiyorsa
            // Örn: Başlangıç 23:00 (1380 dk) + Süre 120 dk = Bitiş 1500 dk (Gece 01:00)
            const absoluteEnd = s.newStartMin + s.newDuration;
            
            if (absoluteEnd > 1440) {
                const overflowAmount = absoluteEnd - 1440; // Örn: 60 dk taşma
                
                // 1. Sonraki günü bul
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const currentDayIdx = days.indexOf(oldEvent.day);
                const nextDay = days[(currentDayIdx + 1) % 7]; // Döngüsel (Pazar -> Pzt)

                // 2. Sonraki günün sabahında, taşma süresi içinde kalan etkinliği bul (Genelde Uyku)
                // Şart: 00:00 ile Taşma Süresi (örn 01:00) arasında başlayan bir şey var mı?
                const nextDayEvIndex = app.events.findIndex(e => 
                    e.day === nextDay && 
                    timeToMinutes(e.start) < overflowAmount
                );

                if (nextDayEvIndex > -1) {
                    const nextEv = app.events[nextDayEvIndex];
                    const nextEvStart = timeToMinutes(nextEv.start);
                    
                    // Örn: Uyku 00:00'da başlıyor, biz 01:00'e kadar taştık.
                    // Yeni Uyku Başlangıcı: 01:00
                    // Yeni Uyku Süresi: Eski Süre - (Taşma - Eski Başlangıç)
                    
                    const shiftAmount = overflowAmount - nextEvStart;
                    const newNextDuration = nextEv.duration - shiftAmount;

                    if (newNextDuration > 0) {
                        // Sonraki günün etkinliğini güncelle
                        app.events[nextDayEvIndex] = {
                            ...nextEv,
                            start: minutesToTime(overflowAmount), // Yeni başlangıç saati
                            duration: newNextDuration
                        };
                    } else {
                        // Eğer taşma, uykuyu tamamen yutuyorsa, o etkinliği silmek isteyebilirsin
                        // Şimdilik 15 dk'da bırakalım ki kaybolmasın
                         app.events[nextDayEvIndex] = {
                            ...nextEv,
                            start: minutesToTime(overflowAmount),
                            duration: 15
                        };
                    }
                }
            }
            // ---------------------------------------------------

            // Çakışma kontrolü (Kendi gününde başka şeye çarpıyor mu?)
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
};

window.onload = () => app.init();