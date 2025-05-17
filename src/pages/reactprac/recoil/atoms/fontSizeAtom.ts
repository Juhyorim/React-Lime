import { atom } from "recoil";

export const fontSizeAtom = atom<number>({
  key: "fontSizeAtom",
  default: 12,
  // effects_UNSTABLE: [persistAtom],
});
