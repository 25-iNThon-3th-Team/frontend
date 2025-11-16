import {create} from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkLogin: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false, token: null });
  },
  checkLogin: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ isLoggedIn: true, token });
    }
  },
}));

export default useAuthStore;
