import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TicoState {
  cityCode: string;
  cityName: string;

  setCity: (cityCode: string, cityName: string) => void;
}

const useTicoStore = create<TicoState>()(
  persist(
    (set, get) => ({
      cityCode: "12",
      cityName: "세종특별시",

      setCity: (cityCode: string, cityName: string) => {
        set({ cityCode: cityCode, cityName: cityName });
      },
    }),
    {
      name: "tico-storage",
    }
  )
);

export default useTicoStore;
