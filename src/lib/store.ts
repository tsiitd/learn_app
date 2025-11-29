import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageCode, DEFAULT_SETTINGS } from './constants';

interface GameSettings {
    maxNumber: number;
    language: LanguageCode;
    soundEnabled: boolean;
    setMaxNumber: (max: number) => void;
    setLanguage: (lang: LanguageCode) => void;
    toggleSound: () => void;
}

export const useGameSettings = create<GameSettings>()(
    persist(
        (set) => ({
            maxNumber: DEFAULT_SETTINGS.maxNumber,
            language: DEFAULT_SETTINGS.language,
            soundEnabled: DEFAULT_SETTINGS.soundEnabled,
            setMaxNumber: (max) => set({ maxNumber: max }),
            setLanguage: (lang) => set({ language: lang }),
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
        }),
        {
            name: 'game-settings',
        }
    )
);
