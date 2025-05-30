import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "@/api/tokenManager";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ticoAxios = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000, //10초
  withCredentials: true,
});

ticoAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = tokenManager.getToken();
    // console.log(`토큰: ${token}`);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

ticoAxios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    console.log(error);

    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      if (status === 401 && !originalRequest._retry) {
        console.log("토큰 만료");

        // 토큰 만료 시 다시 로그인시킴 @TODO 나중에 refresh 적용
        alert("세션이 만료되었습니다. 다시 로그인해주세요");

        tokenManager.logout();
        window.location.href = "/login";
      } else if (status === 403) {
        console.error("접근 권한이 없습니다:", error.response.data);
      } else if (status === 404) {
        console.error("요청한 리소스를 찾을 수 없습니다:", error.response.data);
      } else if (status >= 500) {
        console.error("서버 에러가 발생했습니다:", error.response.data);
      }
    } else if (axios.isAxiosError(error) && error.request) {
      console.error("네트워크 에러 또는 서버 응답 없음:", error.message);
    } else if (axios.isAxiosError(error)) {
      console.error("요청 설정 에러:", error.message);
    } else {
      console.error("알 수 없는 에러:", error);
    }

    return Promise.reject(error);
  }
);

export default ticoAxios;
