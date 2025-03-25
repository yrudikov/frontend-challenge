import type {Metadata} from "next";
import "@/styles/globals.css";
import React from "react";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";


export const metadata: Metadata = {
    title: "ToDo",
    description: "Frontend challenge",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body >
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </body>
        </html>
    );
}
