import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiResult, ErrorResult } from "./result/APIResult";
import { ErrorType } from "./error/ErrorType";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export interface AuthState {
  //State
  token: string | null;
  username: string | null;
  nickname: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;

  //Actions
  login: (loginId: string, password: string) => Promise<ApiResult>;
  logout: () => void;
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
      login: async (loginId: string, password: string): Promise<ApiResult> => {
        console.log(SERVER_URL);

        //     if (response.status === 200) {
        //       console.log("로그인 성공");
        //     }

        //     setUserInfo({
        //       username: response.data.username,
        //       email: response.data.email,
        //       nickname: response.data.nickname,
        //       token: response.data.token,
        //     });
        // 로딩 시작
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post(`${SERVER_URL}/login`, {
            username: loginId,
            password: password,
          });

          const { token, username, email, nickname } = response.data;

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          set({
            token,
            username,
            email,
            nickname,
          });

          return { success: true };
        } catch (error) {
          console.log(error);
          let errorResult: ErrorResult;

          if (axios.isAxiosError(error) && error.response) {
            // 서버에서 응답을 받았지만 상태 코드가 2xx가 아닌 경우
            const statusCode = error.response.status;
            console.log(statusCode);

            switch (statusCode) {
              case 400:
                errorResult = {
                  success: false,
                  error: ErrorType.INVALID_REQUEST,
                  message: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
                };
                break;

              case 401:
                errorResult = {
                  success: false,
                  error: ErrorType.UNAUTHORIZED,
                  message: "아이디 또는 비밀번호가 올바르지 않습니다.",
                };
                break;

              case 404:
                errorResult = {
                  success: false,
                  error: ErrorType.USER_NOT_FOUND,
                  message: "존재하지 않는 사용자입니다.",
                };
                break;

              case 429:
                errorResult = {
                  success: false,
                  error: ErrorType.TOO_MANY_REQUESTS,
                  message:
                    "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",
                };
                break;

              case 500:
                errorResult = {
                  success: false,
                  error: ErrorType.SERVER_ERROR,
                  message:
                    "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
                };
                break;

              default:
                errorResult = {
                  success: false,
                  error: ErrorType.UNKNOWN_ERROR,
                  message: `로그인 중 오류가 발생했습니다. (${statusCode})`,
                };
            }
          } else if (axios.isAxiosError(error) && error.request) {
            // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류)
            errorResult = {
              success: false,
              error: ErrorType.NETWORK_ERROR,
              message: "네트워크 연결을 확인해주세요.",
            };
          } else {
            // 요청 설정 중에 오류가 발생한 경우
            errorResult = {
              success: false,
              error: ErrorType.REQUEST_SETUP_ERROR,
              message: "요청 처리 중 오류가 발생했습니다.",
            };
          }

          // 에러 상태 업데이트
          set({
            isLoading: false,
            error: errorResult.message,
          });

          return errorResult;
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
      name: "auth-storage", //default localstorage
      partialize: (state) => ({
        //persist 대상
        token: state.token,
        username: state.username,
        nickname: state.nickname,
        email: state.email,
      }),
    }
  )
);

export default useAuthStore;
