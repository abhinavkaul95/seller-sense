"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
      >
        System
      </button>
    </div>
  );
}
