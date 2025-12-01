// Get basePath from environment (set in next.config.ts)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Helper function to convert number to digit-by-digit speech
export function numberToDigitSpeech(num: number, language: string = 'en'): string {
    const numStr = num.toString();
    const digits = numStr.split('');

    const digitNames: Record<string, string[]> = {
        en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        hi: ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ'],
        fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'],
        ar: ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'],
    };

    const names = digitNames[language] || digitNames.en;
    const digitSpeech = digits.map(d => names[parseInt(d)]).join(' ');

    // For single-digit numbers, only say the digit name (avoid redundancy)
    if (num >= 0 && num <= 9) {
        return digitSpeech;
    }

    return `${digitSpeech} - ${num}`;
}

// Play animal sound only on row changes (shorter sounds < 2s)
export function playAnimalSound(rowId: number, soundEnabled: boolean = true): void {
    if (!soundEnabled) return;

    const animalSounds: Record<number, string> = {
        0: `${basePath}/sounds/dog.wav`,
        1: `${basePath}/sounds/cat.wav`,
        2: `${basePath}/sounds/mouse.wav`,
        3: `${basePath}/sounds/rabbit.wav`,
        4: `${basePath}/sounds/fox.wav`,
        5: `${basePath}/sounds/bear.wav`,
        6: `${basePath}/sounds/panda.wav`,
        7: `${basePath}/sounds/koala.wav`,
        8: `${basePath}/sounds/tiger.mp3`,
        9: `${basePath}/sounds/lion.wav`,
    };

    const soundUrl = animalSounds[rowId];
    if (!soundUrl) return;

    const audio = new Audio(soundUrl);
    audio.volume = 0.3;
    audio.play().catch(() => { });
}

// Play ding sound for number changes within same row
export function playDingSound(soundEnabled: boolean = true): void {
    if (!soundEnabled) return;

    const dingUrl = `${basePath}/sounds/ding.wav`;

    const audio = new Audio(dingUrl);
    audio.volume = 0.2;
    audio.play().catch(() => { });
}

// Play clapping sound for correct answer
export function playClappingSound(soundEnabled: boolean = true): void {
    if (!soundEnabled) return;

    const clappingUrl = `${basePath}/sounds/clapping.mp3`;

    const audio = new Audio(clappingUrl);
    audio.volume = 0.4;
    audio.play().catch(() => { });
}

