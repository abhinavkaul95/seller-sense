"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AntdProvider({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConfigProvider
        theme={{
          algorithm:
            resolvedTheme === "dark"
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}
