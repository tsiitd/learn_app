export const ANIMAL_ROWS = [
    { id: 0, name: "Dog", emoji: "🐶", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f436.svg", color: "bg-[#FEF3C7]", borderColor: "border-amber-300" },
    { id: 1, name: "Cat", emoji: "🐱", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f431.svg", color: "bg-[#FFEDD5]", borderColor: "border-orange-300" },
    { id: 2, name: "Mouse", emoji: "🐭", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f42d.svg", color: "bg-[#FEE2E2]", borderColor: "border-red-300" },
    { id: 3, name: "Rabbit", emoji: "🐰", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f430.svg", color: "bg-[#FCE7F3]", borderColor: "border-pink-300" },
    { id: 4, name: "Fox", emoji: "🦊", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f98a.svg", color: "bg-[#F3E8FF]", borderColor: "border-purple-300" },
    { id: 5, name: "Bear", emoji: "🐻", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43b.svg", color: "bg-[#DBEAFE]", borderColor: "border-blue-300" },
    { id: 6, name: "Panda", emoji: "🐼", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43c.svg", color: "bg-[#E0F2FE]", borderColor: "border-sky-300" },
    { id: 7, name: "Koala", emoji: "🐨", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f428.svg", color: "bg-[#CCFBF1]", borderColor: "border-teal-300" },
    { id: 8, name: "Tiger", emoji: "🐯", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f42f.svg", color: "bg-[#DCFCE7]", borderColor: "border-emerald-300" },
    { id: 9, name: "Lion", emoji: "🦁", image: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f981.svg", color: "bg-[#ECFCCB]", borderColor: "border-lime-300" },
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
