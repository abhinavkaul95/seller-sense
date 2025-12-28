"use client";

import { ThemeProvider } from "next-themes";
import AntdProvider from "./components/AntdProvider";
export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={process.env.NEXT_PUBLIC_DEFAULT_THEME || "system"}
      enableSystem
      disableTransitionOnChange
    >
      <AntdProvider> {children}</AntdProvider>
    </ThemeProvider>
  );
}
