import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { PAGE_TITLE, PAGE_DESCRIPTION } from "@/configuration/ui";
import "./globals.css";
import { ErrorWrapper } from "./parts/error/error-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

/**
 * This file contains the root layout component for the application.
 * It sets up the HTML structure, imports global styles,
 * and configures fonts.
 *
 * @file app/layout.tsx
 * @author Son Nguyen
 * @license MIT
 * @version 1.0.0
 * @date 2025-05-11
 */

// Inter font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

// Fira Code font configuration (for code blocks)
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

// Page metadata - general information about the page
export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
};

/**
 * RootLayout - The root layout component for the application.
 * @param children - The child components to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} h-full w-screen`}
    >
      <body className="antialiased bg-background text-foreground h-full w-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <ErrorWrapper>{children}</ErrorWrapper>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
