import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

// 타입 정의 추가
interface UserInfo {
  username: string;
  nickname: string;
  email: string;
  token: string;
}

export const userInfoAtom = atom<UserInfo>({
  key: "userInfoAtom",
  default: {
    username: "알수없음",
    nickname: "알수없음",
    email: "",
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});
