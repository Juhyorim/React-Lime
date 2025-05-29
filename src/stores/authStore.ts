import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiResult } from "./result/APIResult";
import { ErrorType } from "./error/ErrorType";
import ticoAxios from "@/api/ticoAxios";
import { tokenManager } from "@/api/tokenManager";

const TOKEN_KEY = "auth-storage";

export interface AuthState {
  //State
  token: string | null;
  username: string | null;
  nickname: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;

  //Actions
  getToken: () => string | null;
  login: (loginId: string, password: string) => Promise<ApiResult>;
  logout: () => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      nickname: null,
      email: null,
      isLoading: false,
      error: null,

      //Actions
      getToken: () => get().token,
      clearToken: () => {
        set({
          token: null,
          username: null,
          nickname: null,
          email: null,
          isLoading: false,
          error: null,
        });
      },
      login: async (loginId: string, password: string): Promise<ApiResult> => {
        set({ isLoading: true, error: null });

        try {
          const response = await ticoAxios.post(`/login`, {
            username: loginId,
            password: password,
          });

          const { token, username, email, nickname } = response.data;

          set({
            token,
            username,
            email,
            nickname,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          let errorMessage = "로그인 중 오류가 발생했습니다.";

          if (error?.response?.status === 401) {
            errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
          } else if (error?.response?.status === 429) {
            errorMessage =
              "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
          } else if (error?.response?.status >= 500) {
            errorMessage =
              "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
          } else if (!error?.response) {
            errorMessage = "네트워크 연결을 확인해주세요.";
          }

          set({
            isLoading: false,
            error: errorMessage,
          });

          return {
            success: false,
            error: ErrorType.LOGIN_FAILED,
            message: errorMessage,
          };
        }
      },
      logout: () => {
        set({
          token: null,
          username: null,
          nickname: null,
          email: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: TOKEN_KEY,
      partialize: (state) => ({
        token: state.token,
        username: state.username,
        nickname: state.nickname,
        email: state.email,
      }),
    }
  )
);

// tokenManager에 로그아웃 콜백 등록
tokenManager.onLogout = () => {
  const { logout } = useAuthStore.getState();
  logout();
};

export default useAuthStore;
