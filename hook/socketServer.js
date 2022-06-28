import {userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import io from "socket.io-client";

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const socket = io("http://localhost:5000", {
    auth: {
      token: localStorage.getItem("token"),
    },
  });
  useEffect(() => {
    if (!user) return;
    socket.on("connect", () => {
      console.log("connect", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnect", socket.id);
    });
  }, [socket, user]);

  return () => {
    socket = null;
  };
};
