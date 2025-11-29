export const ANIMAL_ROWS = [
    { id: 0, name: "Dog", emoji: "🐶", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f436.svg", color: "bg-[#FEF3C7]", borderColor: "border-amber-300", numberColor: "#D97706" },
    { id: 1, name: "Cat", emoji: "🐱", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f431.svg", color: "bg-[#FFEDD5]", borderColor: "border-orange-300", numberColor: "#EA580C" },
    { id: 2, name: "Mouse", emoji: "🐭", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f42d.svg", color: "bg-[#FEE2E2]", borderColor: "border-red-300", numberColor: "#DC2626" },
    { id: 3, name: "Rabbit", emoji: "🐰", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f430.svg", color: "bg-[#FCE7F3]", borderColor: "border-pink-300", numberColor: "#DB2777" },
    { id: 4, name: "Fox", emoji: "🦊", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f98a.svg", color: "bg-[#F3E8FF]", borderColor: "border-purple-300", numberColor: "#9333EA" },
    { id: 5, name: "Bear", emoji: "🐻", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43b.svg", color: "bg-[#DBEAFE]", borderColor: "border-blue-300", numberColor: "#2563EB" },
    { id: 6, name: "Panda", emoji: "🐼", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43c.svg", color: "bg-[#E0F2FE]", borderColor: "border-sky-300", numberColor: "#0284C7" },
    { id: 7, name: "Koala", emoji: "🐨", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f428.svg", color: "bg-[#CCFBF1]", borderColor: "border-teal-300", numberColor: "#0D9488" },
    { id: 8, name: "Tiger", emoji: "🐯", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f42f.svg", color: "bg-[#DCFCE7]", borderColor: "border-emerald-300", numberColor: "#059669" },
    { id: 9, name: "Lion", emoji: "🦁", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f981.svg", color: "bg-[#ECFCCB]", borderColor: "border-lime-300", numberColor: "#65A30D" },
];

export const TOTAL_NUMBERS = 100;
export const NUMBERS_PER_ROW = 10;
export const VISIBLE_ROWS_COUNT = 5;

export const LANGUAGES = {
    en: { name: "English", code: "en-US", flag: "🇺🇸" },
    hi: { name: "हिंदी", code: "hi-IN", flag: "🇮🇳" },
    fr: { name: "Français", code: "fr-FR", flag: "🇫🇷" },
    ar: { name: "العربية", code: "ar-SA", flag: "🇸🇦" },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const NUMBER_WORDS: Record<LanguageCode, (num: number) => string> = {
    en: (num) => num.toString(),
    hi: (num) => {
        const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return num.toString().split('').map(d => hindiDigits[parseInt(d)]).join('');
    },
    fr: (num) => num.toString(),
    ar: (num) => {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(d => arabicDigits[parseInt(d)]).join('');
    },
};

export const PHRASES = {
    findNumber: {
        en: "Can you find the number",
        hi: "क्या आप संख्या ढूंढ सकते हैं",
        fr: "Peux-tu trouver le numéro",
        ar: "هل يمكنك العثور على الرقم",
    },
    youFound: {
        en: "Woohoo! You found",
        hi: "वाह! आपने पाया",
        fr: "Bravo! Tu as trouvé",
        ar: "رائع! لقد وجدت",
    },
    thisIs: {
        en: "This is number",
        hi: "यह संख्या है",
        fr: "C'est le numéro",
        ar: "هذا هو الرقم",
    },
    current: {
        en: "Current",
        hi: "वर्तमान",
        fr: "Actuel",
        ar: "الحالي",
    },
    target: {
        en: "Target",
        hi: "लक्ष्य",
        fr: "Cible",
        ar: "الهدف",
    },
    hintOn: {
        en: "Hint On",
        hi: "संकेत चालू",
        fr: "Indice Activé",
        ar: "تلميح مفعل",
    },
    hintOff: {
        en: "Hint Off",
        hi: "संकेत बंद",
        fr: "Indice Désactivé",
        ar: "تلميح معطل",
    },
    playAgain: {
        en: "Play Again",
        hi: "फिर से खेलें",
        fr: "Rejouer",
        ar: "العب مرة أخرى",
    },
    youDidIt: {
        en: "You Did It!",
        hi: "आपने कर दिखाया!",
        fr: "Tu l'as fait!",
        ar: "لقد نجحت!",
    },
    foundTheNumber: {
        en: "You found the number",
        hi: "आपने संख्या पाई",
        fr: "Tu as trouvé le numéro",
        ar: "لقد وجدت الرقم",
    },
} as const;

export const DEFAULT_SETTINGS = {
    maxNumber: 100,
    language: "en" as LanguageCode,
    soundEnabled: true,
};

export const MAX_NUMBER_OPTIONS = [20, 30, 50, 100];

// Kid-friendly background patterns (Hero Patterns style)
export const BACKGROUND_PATTERNS = [
    {
        name: "bubbles",
        pattern: "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233B82F6' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E"
    },
    {
        name: "dots",
        pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322C55E' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E"
    },
    {
        name: "stars",
        pattern: "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FACC15' fill-opacity='0.2'%3E%3Cpath d='M40 10l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L40 25l-6.4 4.6 2.4-7.5-6.4-4.6h7.9zM0 10l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L0 25l-6.4 4.6 2.4-7.5-6.4-4.6h7.9zM80 10l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L80 25l-6.4 4.6 2.4-7.5-6.4-4.6h7.9zM40 50l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L40 65l-6.4 4.6 2.4-7.5-6.4-4.6h7.9zM0 50l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L0 65l-6.4 4.6 2.4-7.5-6.4-4.6h7.9zM80 50l2.5 7.5h7.9l-6.4 4.6 2.4 7.5L80 65l-6.4 4.6 2.4-7.5-6.4-4.6h7.9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    },
    {
        name: "zigzag",
        pattern: "data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='%23EF4444' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E"
    },
    {
        name: "plus",
        pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333EA' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    },
    {
        name: "circles",
        pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z' opacity='.5'/%3E%3Cpath d='M50 10c0 5.523-4.477 10-10 10S30 15.523 30 10 34.477 0 40 0s10 4.477 10 10zm-40 0c0 5.523-4.477 10-10 10S-10 15.523-10 10s4.477-10 10-10 10 4.477 10 10zm40 40c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zm-40 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    },
    {
        name: "triangles",
        pattern: "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 27L27 36 18 27 27 18 36 27zm-18 0l-9 9-9-9 9-9 9 9zM18 9l9 9-9 9-9-9 9-9zm0-9l9 9-9 9-9-9 9-9zm18 18l9 9-9 9-9-9 9-9z' fill='%23F97316' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E"
    }
];
