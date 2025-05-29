const TOKEN_KEY = "auth-storage";

interface AuthStorage {
  state: {
    token: string | null;
    username: string | null;
    nickname: string | null;
    email: string | null;
  };
  version: number;
}

export const tokenManager = {
  getToken: (): string | null => {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored) {
        const parsed: AuthStorage = JSON.parse(stored);
        return parsed.state?.token || null;
      }
      return null;
    } catch (error) {
      console.error("토큰 읽기 실패:", error);
      return null;
    }
  },

  setToken: (token: string): void => {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored) {
        const parsed: AuthStorage = JSON.parse(stored);
        parsed.state.token = token;
        localStorage.setItem(TOKEN_KEY, JSON.stringify(parsed));
      }
    } catch (error) {
      console.error("토큰 저장 실패:", error);
    }
  },

  clearToken: (): void => {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored) {
        const parsed: AuthStorage = JSON.parse(stored);
        parsed.state.token = null;
        localStorage.setItem(TOKEN_KEY, JSON.stringify(parsed));
      }
    } catch (error) {
      console.error("토큰 삭제 실패:", error);
    }
  },

  onLogout: null as (() => void) | null,

  logout: (): void => {
    if (tokenManager.onLogout && typeof tokenManager.onLogout === "function") {
      tokenManager.onLogout();
    }
  },
};
