import {atom} from "recoil";

const syncLocalStorageUser =
  (key) =>
  ({setSelf, onSet}) => {
    const getUser = async (sessionToken) => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/", {
          method: "GET",
          headers: {
            authorization: sessionToken,
          },
        });
        const data = await res.json();
        if (data) setSelf(sessionToken);
        else setSelf(null);
      } catch (error) {
        console.log("error", error);
        setSelf(null);
      }
    };

    const sessionToken = localStorage.getItem(key);
    if (sessionToken) getUser(sessionToken);
    else setSelf(null);

    onSet((newValue, _, isReset) => {
      if (isReset || !newValue) {
        localStorage.removeItem(key);
        localStorage.removeItem("user");
      } else {
        localStorage.setItem(key, newValue.token);
        localStorage.setItem("user", JSON.stringify(newValue));
      }
    });
  };

export const userRecoil = atom({
  key: "userRecoil",
  default: null,
  effects: [syncLocalStorageUser("token")],
});
