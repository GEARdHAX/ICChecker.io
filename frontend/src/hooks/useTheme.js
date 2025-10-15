import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export const useTheme = () => {
    const theme = useAppStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        // Apply dark class to HTML tag for Tailwind
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);

        // Dynamically switch PrimeReact theme CSS file
        let themeLink = document.getElementById('theme-link');
        if (!themeLink) {
            themeLink = document.createElement('link');
            themeLink.id = 'theme-link';
            themeLink.rel = 'stylesheet';
            document.head.appendChild(themeLink);
        }
        themeLink.href = `/src/themes/${isDark ? 'arya-blue' : 'saga-blue'}.css`;

    }, [theme]);

    return theme;
};