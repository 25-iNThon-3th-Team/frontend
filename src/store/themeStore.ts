import { create } from "zustand";

type Theme = "light" | "dark" | "auto";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
    // 테마 적용
    applyTheme(theme);
  },
  initTheme: () => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    set({ theme: savedTheme });
    // 테마 적용
    applyTheme(savedTheme);
  },
}));

// 테마를 실제로 적용하는 함수
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  
  if (theme === "auto") {
    // 시스템 설정 확인
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } else if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export { useThemeStore };
export type { Theme };

