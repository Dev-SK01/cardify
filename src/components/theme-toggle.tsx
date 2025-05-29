
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppSettings } from "@/hooks/use-card-data";

interface ThemeToggleProps {
  currentTheme: AppSettings['theme'];
  setTheme: (theme: AppSettings['theme']) => void;
}

export function ThemeToggle({ currentTheme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}>
      {currentTheme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}
