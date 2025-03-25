'use client';

import { ThemeProvider } from 'next-themes';
import React, {memo} from "react";

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode })=> {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}

export default memo(ThemeProviderWrapper);