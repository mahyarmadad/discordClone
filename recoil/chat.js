import {atom} from "recoil";

export const activeChat = atom({
  key: "activeChat",
  default: null,
});
export const chatHistoryRecoil = atom({
  key: "chatHistoryRecoil",
  default: null,
});
