import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeState {
  theme: Theme;
  effectiveTheme: 'light' | 'dark'; // 실제 적용되는 테마 (auto인 경우 시스템 설정 확인)
  setTheme: (theme: Theme) => void;
  updateEffectiveTheme: () => void;
  initTheme: () => void;
}

// 시스템 다크모드 감지
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// localStorage에서 테마 불러오기
const loadTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      return saved;
    }
  }
  return 'light';
};

// 테마를 document에 적용
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  effectiveTheme: 'light',
  
  initTheme: () => {
    const savedTheme = loadTheme();
    const effectiveTheme = savedTheme === 'auto' ? getSystemTheme() : savedTheme;
    set({ theme: savedTheme, effectiveTheme });
    applyTheme(effectiveTheme);
    
    // 시스템 테마 변경 감지 (auto 모드일 때만)
    if (savedTheme === 'auto' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const { theme } = get();
        if (theme === 'auto') {
          get().updateEffectiveTheme();
        }
      };
      mediaQuery.addEventListener('change', handleChange);
    }
  },
  
  setTheme: (theme: Theme) => {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    set({ theme, effectiveTheme });
    applyTheme(effectiveTheme);
    
    // localStorage에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    
    // 시스템 테마 변경 감지 설정 (auto 모드일 때만)
    if (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        get().updateEffectiveTheme();
      };
      mediaQuery.addEventListener('change', handleChange);
    }
  },
  
  updateEffectiveTheme: () => {
    const { theme } = get();
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    set({ effectiveTheme });
    applyTheme(effectiveTheme);
  },
}));

