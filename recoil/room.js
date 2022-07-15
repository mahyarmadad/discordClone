import {atom} from "recoil";

export const roomDetailRecoil = atom({
  key: "roomDetailRecoil",
  default: null,
});
export const activeRoomsRecoil = atom({
  key: "activeRoomsRecoil",
  default: [],
});
