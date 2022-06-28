import {atom} from "recoil";

const syncLocalStorageUser =
  (key) =>
  ({setSelf, onSet}) => {
    const sessionToken = localStorage.getItem(key);
    if (sessionToken) setSelf(sessionToken);
    else setSelf(null);

    onSet((newValue, _, isReset) => {
      if (isReset || !newValue) return localStorage.removeItem(key);
      localStorage.setItem(key, newValue);
    });
  };

export const userRecoil = atom({
  key: "userRecoil",
  default: null,
  effects: [syncLocalStorageUser("token")],
});
