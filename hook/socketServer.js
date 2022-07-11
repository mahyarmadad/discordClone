import {friendsRecoil} from "@recoil/friends";
import {invitationRecoil} from "@recoil/invite";
import {onlineUsersRecoil, userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";

let socketRef = null;

export const useSocket = () => {
  const setInvitation = useSetRecoilState(invitationRecoil);
  const setFriends = useSetRecoilState(friendsRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const user = useRecoilValue(userRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socketRef = socket;
    socket.on("connect", () => {
      console.log("connect", socket?.id);
    });
    socket.on("invitation", ({pendingInvitation}) => {
      setInvitation(pendingInvitation);
    });
    socket.on("friends", ({friendsList}) => {
      setFriends(friendsList);
    });
    socket.on("onlineUsers", ({onlineUsers}) => {
      setOnlineUsers(onlineUsers);
    });

    socket.on("chat-history", (data) => {
      console.log("chat-history", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }, [setFriends, setInvitation, setOnlineUsers, user]);
  return () => {
    socket.disconnect();
  };
};

export const SendMessage = (receiverId, message) => {
  if (!socketRef) return;
  socketRef.emit("sendMessage", {receiverId, message});
};
export const GetMessage = (receiverId) => {
  if (!socketRef) return;
  socketRef.emit("chat-history", {receiverId});
};
