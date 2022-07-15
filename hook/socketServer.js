import {chatHistoryRecoil} from "@recoil/chat";
import {friendsRecoil} from "@recoil/friends";
import {invitationRecoil} from "@recoil/invite";
import {activeRoomsRecoil, roomDetailRecoil} from "@recoil/room";
import {onlineUsersRecoil, userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";

let socketRef = null;

export const useSocket = () => {
  const setInvitation = useSetRecoilState(invitationRecoil);
  const setFriends = useSetRecoilState(friendsRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const setChatHistory = useSetRecoilState(chatHistoryRecoil);
  const setRoomDetail = useSetRecoilState(roomDetailRecoil);
  const setActiveRooms = useSetRecoilState(activeRoomsRecoil);

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
      setChatHistory(data);
    });
    socket.on("room-create", (data) => {
      setRoomDetail(data);
    });
    socket.on("active-Rooms", (data) => {
      setActiveRooms(data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }, [
    setActiveRooms,
    setChatHistory,
    setFriends,
    setInvitation,
    setOnlineUsers,
    setRoomDetail,
    user,
  ]);
  return () => {
    socket.disconnect();
    socketRef = null;
  };
};

export const sendMessage = (receiverId, message) => {
  socketRef?.emit("sendMessage", {receiverId, message});
};
export const getMessage = (receiverId) => {
  socketRef?.emit("chat-history", {receiverId});
};
export const createRoom = () => {
  socketRef?.emit("room-create");
};
export const joinRoom = (data) => {
  socketRef?.emit("room-join", data);
};
export const leaveRoom = (data) => {
  socketRef?.emit("room-leave", data);
};
