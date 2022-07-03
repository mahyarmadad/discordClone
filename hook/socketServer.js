import {invitationRecoil} from "@recoil/invite";
import {userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const setInvitation = useSetRecoilState(invitationRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("connect", () => {
      console.log("connect", socket.id);
    });

    socket.on("invitation", ({pendingInvitation}) => {
      setInvitation(pendingInvitation);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }, [setInvitation, user]);
};
