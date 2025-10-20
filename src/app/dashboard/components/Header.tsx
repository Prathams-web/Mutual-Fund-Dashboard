"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Bell, ChevronDown, Search, X } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showSearch, setShowSearch] = useState(false);

  // Set theme on mount based on saved preference or system
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const activeTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(activeTheme);
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="sticky top-0 z-30 bg-base border-b border-stroke px-4 md:px-6 py-3 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Title (truncate on smaller screens) */}
        <h1 className="text-h2 text-text-primary font-semibold truncate max-w-[160px] sm:max-w-none">
          Mutual Funds
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Search — full input on md+, icon on mobile */}
        <div className="hidden md:flex items-center bg-base-secondary border border-stroke rounded-md px-3 py-1.5">
          <Search className="h-4 w-4 text-text-secondary mr-2" />
          <input
            type="text"
            placeholder="Search funds..."
            className="bg-transparent focus:outline-none text-sm text-text-primary placeholder:text-text-secondary w-48"
          />
        </div>

        {/* Mobile search toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Toggle search"
        >
          {showSearch ? (
            <X className="h-5 w-5 text-text-secondary" />
          ) : (
            <Search className="h-5 w-5 text-text-secondary" />
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-md hover:bg-primary/10 transition-colors"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-text-secondary" />
          ) : (
            <Sun className="h-5 w-5 text-text-secondary" />
          )}
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-md hover:bg-primary/10 transition-colors"
        >
          <Bell className="h-5 w-5 text-text-secondary" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-error"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 bg-base-secondary border border-stroke rounded-full px-2 py-1 hover:bg-primary/10 transition-colors">
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary text-sm">
            P
          </div>
          <ChevronDown className="h-4 w-4 text-text-secondary hidden sm:block" />
        </button>
      </div>

      {/* Mobile search overlay */}
      {showSearch && (
        <div className="absolute left-0 top-full w-full bg-base border-t border-stroke px-4 py-2 md:hidden flex items-center gap-2 shadow-md">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search funds..."
            className="flex-1 bg-transparent focus:outline-none text-sm text-text-primary placeholder:text-text-secondary"
          />
        </div>
      )}
    </header>
  );
}
