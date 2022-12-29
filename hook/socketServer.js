import {chatHistoryRecoil, userStreamRecoil} from "@recoil/chat";
import {friendsRecoil} from "@recoil/friends";
import {invitationRecoil} from "@recoil/invite";
import {activeRoomsRecoil, remoteStreamsRecoil, roomDetailRecoil} from "@recoil/room";
import {onlineUsersRecoil, userRecoil} from "@recoil/user";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";
import {participantLeft, prepareNewPeerConn, signalData} from "../functions/peerConnection";

let socketRef = null;

export const useSocket = () => {
  const setInvitation = useSetRecoilState(invitationRecoil);
  const setFriends = useSetRecoilState(friendsRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const setChatHistory = useSetRecoilState(chatHistoryRecoil);
  const setRoomDetail = useSetRecoilState(roomDetailRecoil);
  const setActiveRooms = useSetRecoilState(activeRoomsRecoil);
  const setRemoteStreams = useSetRecoilState(remoteStreamsRecoil);

  const user = useRecoilValue(userRecoil);
  const stream = useRecoilValue(userStreamRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socketRef = socket;

    socket.on("connect", () => {
      console.log("connect", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef = null;
    };
  }, [user]);

  useEffect(() => {
    socketRef?.on("invitation", ({pendingInvitation}) => {
      setInvitation(pendingInvitation);
    });
    socketRef?.on("friends", ({friendsList}) => {
      setFriends(friendsList);
    });
    socketRef?.on("onlineUsers", ({onlineUsers}) => {
      setOnlineUsers(onlineUsers);
    });
    socketRef?.on("chat-history", (data) => {
      setChatHistory(data);
    });
    socketRef?.on("room-create", (data) => {
      setRoomDetail(data);
    });
    socketRef?.on("active-Rooms", (data) => {
      setActiveRooms(data);
    });
    socketRef?.on("conn-prepare", (data) => {
      const {connectedUserSocketId} = data;
      prepareNewPeerConn(connectedUserSocketId, false, stream, setRemoteStreams);
      socketRef?.emit("conn-init", connectedUserSocketId);
    });
    socketRef?.on("conn-init", (data) => {
      const {connectedUserSocketId} = data;
      prepareNewPeerConn(connectedUserSocketId, true, stream, setRemoteStreams);
    });
    socketRef?.on("conn-signal", (data) => {
      signalData(data);
    });
    socketRef?.on("room-participant-left", (data) => {
      participantLeft(data, setRemoteStreams);
    });
  }, [
    setActiveRooms,
    setChatHistory,
    setFriends,
    setInvitation,
    setOnlineUsers,
    setRemoteStreams,
    setRoomDetail,
    stream,
    user,
  ]);
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
export const signalPeerData = (data) => {
  socketRef?.emit("conn-signal", data);
};
