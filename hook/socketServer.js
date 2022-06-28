import {userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  useEffect(() => {
    if (!user) return;
    socket.on("connection", (s) => {
      console.log("connection", s.id); // x8WIv7-mJelg7on_ALbx
    });

    // client-side
    socket.on("connect", () => {
      console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log("disconnect", socket.id); // undefined
    });
  }, [user]);

  return () => {
    socket = null;
  };
};
