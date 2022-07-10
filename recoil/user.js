import {atom} from "recoil";

const syncLocalStorageUser =
  (key) =>
  ({setSelf, onSet}) => {
    const getUser = async (sessionToken) => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/", {
          method: "GET",
          headers: {
            authorization: sessionToken || token,
          },
        });
        if (res.status === 200) setSelf(sessionToken);
        else setSelf(null);
      } catch (error) {
        console.log("syncLocalStorageUser", error.message);
        setSelf(null);
      }
    };

    const sessionToken = localStorage.getItem(key);
    if (sessionToken) getUser(sessionToken);
    else setSelf(null);
  };

export const userRecoil = atom({
  key: "userRecoil",
  default: null,
  effects: [syncLocalStorageUser("token")],
});
export const onlineUsersRecoil = atom({
  key: "onlineUsersRecoil",
  default: [],
});
