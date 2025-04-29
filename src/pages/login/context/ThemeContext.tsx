import { createContext, Dispatch, SetStateAction } from "react";

type ThemeContextType = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
} | null;

// 타입이 지정된 컨텍스트 생성
// export const ThemeContext = createContext<ThemeContextType>(null);

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setIsDark: () => {}, // 초기에는 아무 작업도 하지 않는 함수
});
