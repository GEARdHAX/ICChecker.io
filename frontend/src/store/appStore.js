import { create } from 'zustand';

export const useAppStore = create((set) => ({
    theme: 'dark',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

    // To store result between Upload and Result pages
    latestResult: null,
    setLatestResult: (result) => set({ latestResult: result }),
    toastRef: null,
    setToastRef: (ref) => set({ toastRef: ref }),
}));