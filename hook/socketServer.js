import {friendsRecoil} from "@recoil/friends";
import {invitationRecoil} from "@recoil/invite";
import {onlineUsersRecoil, userRecoil} from "@recoil/user";
import {useEffect, useRef} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";

export const useConnectSocket = () => {
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    return () => {
      socket.current = null;
    };
  }, []);
  return socket.current;
};
export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const setInvitation = useSetRecoilState(invitationRecoil);
  const setFriends = useSetRecoilState(friendsRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const socket = useConnectSocket();

  if (!user || !socket) return;

  socket.on("invitation", ({pendingInvitation}) => {
    setInvitation(pendingInvitation);
  });
  socket.on("friends", ({friendsList}) => {
    setFriends(friendsList);
  });
  socket.on("onlineUsers", ({onlineUsers}) => {
    setOnlineUsers(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export const SendMessage = (receiverId, message) => {
  const socket = useConnectSocket();
  socket.emit("sendMessage", {receiverId, message});
};
