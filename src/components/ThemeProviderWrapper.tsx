'use client';

import {ThemeProvider} from 'next-themes';
import React, {memo} from "react";
import dynamic from "next/dynamic";

const ThemeProviderWrapper = dynamic(() => {
    return Promise.resolve(({children}: { children: React.ReactNode }) => {
        return (
            <ThemeProvider attribute="class" defaultTheme="system">
                {children}
            </ThemeProvider>
        );
    })
}, {ssr: false});

    export default memo(ThemeProviderWrapper);

