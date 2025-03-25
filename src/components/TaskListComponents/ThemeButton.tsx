'use client';
import { useTheme } from 'next-themes';

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className="theme-toggle-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} theme
        </button>
    );
};

export default ThemeButton;
