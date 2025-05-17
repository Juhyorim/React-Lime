import { selector } from "recoil";
import axios from "axios";
// import { authState } from "../atoms/authState";

export const locationData = selector({
  key: "locationData",
  get: async () => {
    // const authValue = get(authState);

    // API 호출
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/tico/test`);
      console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
});
