'use client';
import { useTheme } from 'next-themes';
import React from "react";
import styles from "./ThemeButton.module.css";

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className={styles.themeToggleButton}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ?
                <img
                    src="/frontend-challenge/images/icon-sun.svg"
                    alt="Switch to light theme"
                    className="button-icon"
                />
                :
                <img
                    src="/frontend-challenge/images/icon-moon.svg"
                    alt="Switch to dark theme"
                    className="button-icon"
                />
            }
        </button>
    );
};

export default ThemeButton;
