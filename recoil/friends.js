import {atom} from "recoil";

const syncUserFriends = ({setSelf, onSet}) => {
  const getInvites = async (sessionToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/friend/invite/", {
        method: "GET",
        headers: {
          authorization: sessionToken,
        },
      });
      const data = await res.json();
      if (data) setSelf(sessionToken);
      else setSelf([]);
    } catch (error) {
      console.log("error", error);
      setSelf([]);
    }
  };

  const sessionToken = localStorage.getItem("token");
  if (sessionToken) getInvites(sessionToken);
  onSet((newValue, _, isReset) => {
    if (newValue) setSelf((prev) => [...prev, newValue]);
    if (!newValue || isReset) setSelf([]);
  });
};

export const friendsRecoil = atom({
  key: "friendsRecoil",
  default: [],
});
