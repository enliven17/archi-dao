"use client";
import { useEffect, useState } from "react";

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-6 h-6 transition-transform duration-500 ${active ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-6 h-6 transition-transform duration-500 ${active ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // İlk yüklemede localStorage'dan oku
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
    if (saved === "light") setDark(false);
  }, []);

  // Tema değişince hem html class'ı hem de localStorage güncelle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="mr-4 px-3 py-2 rounded bg-gray-200 dark:bg-[#222] text-[#2D3748] dark:text-[#E2E8F0] border border-gray-300 dark:border-[#444] shadow flex items-center transition-colors duration-500"
      type="button"
      aria-label="Toggle dark mode"
    >
      <SunIcon active={!dark} />
      <MoonIcon active={dark} />
    </button>
  );
} 