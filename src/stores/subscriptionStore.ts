import { create } from "zustand";
import { ApiResult, ErrorResult } from "./result/APIResult";
import { ErrorType } from "./error/ErrorType";
import { SubscribeDTO } from "@/pages/tico/types/subscribe";
import ticoAxios from "@/api/ticoAxios";

// 스토어 상태 인터페이스
export interface SubscriptionStoreState {
  // State
  subscriptionList: SubscribeDTO[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getList: () => Promise<ApiResult>;
}

const useSubscriptionStore = create<SubscriptionStoreState>((set) => ({
  subscriptionList: [],
  isLoading: false,
  error: null,

  getList: async (): Promise<ApiResult> => {
    // 로딩 시작
    set({ subscriptionList: [], isLoading: true, error: null });

    try {
      console.log(
        "현재 axios 기본 헤더:",
        ticoAxios.defaults.headers.common["Authorization"]
      );
      const response = await ticoAxios.get(`/subscribe`);
      console.log(response);

      set({
        subscriptionList: response.data.subscribeResponseList, // 수정된 부분
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      let errorResult: ErrorResult;

      errorResult = {
        success: false,
        error: ErrorType.INVALID_REQUEST,
        message: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
      };

      // 에러 상태 업데이트
      set({
        isLoading: false,
        error: errorResult.message,
      });

      return errorResult;
    }
  },
}));

export default useSubscriptionStore;
