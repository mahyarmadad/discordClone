import {atom} from "recoil";

export const userRecoil = atom({
  key: "userRecoil",
  default: null,
});
export const loggingInRecoil = atom({
  key: "loggingInRecoil",
  default: false,
});
