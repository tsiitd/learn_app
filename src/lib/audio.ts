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

    return `${digitSpeech} - ${num}`;
}

// Play animal sound from audio file
export function playAnimalSound(rowId: number, soundEnabled: boolean = true): void {
    if (!soundEnabled) return;

    // Map of available animal sounds (only use animals we have sounds for)
    const animalSounds: Record<number, string> = {
        0: '/sounds/dog.mp3',
        1: '/sounds/cat.mp3',
        2: '/sounds/mouse.mp3',
        // Add more as sounds become available
    };

    const soundPath = animalSounds[rowId];
    if (!soundPath) return; // No sound available for this animal

    const audio = new Audio(soundPath);
    audio.volume = 0.3; // Not too loud
    audio.play().catch(err => console.log('Audio play failed:', err));
}
