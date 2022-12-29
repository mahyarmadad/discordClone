import Peer from "simple-peer";
import {signalPeerData} from "../hook/socketServer";

let peers = {};

export const getPeerConfig = () => {
  const turnIceServers = null;
  if (turnIceServers) {
  } else {
    console.warn("Using only stun Server");
    return {
      iceServers: [
        {urls: "stun:stun.l.google.com:19302"},
        {urls: "stun:global.stun.twilio.com:3478?transport=udp"},
      ],
    };
  }
};

export const prepareNewPeerConn = (
  connectedUserSocketId,
  isInitiator,
  stream,
  setRemoteStreams,
) => {
  peers[connectedUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getPeerConfig(),
    stream,
  });

  if (!peers[connectedUserSocketId]) return;
  peers[connectedUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connectedUserSocketId: connectedUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connectedUserSocketId].on("stream", (remoteStream) => {
    remoteStream.connectedUserSocketId = connectedUserSocketId;
    setRemoteStreams((prev) => [...prev, remoteStream]);
  });
};

export const signalData = (data) => {
  const {connectedUserSocketId, signal} = data;
  peers[connectedUserSocketId]?.signal(signal);
};
export const closeConnection = () => {
  Object.entries(peers).forEach((item) => {
    let index = item[0];
    if (peers[index]) {
      peers[index].destroy();
      delete peers[index];
    }
  });
};
export const participantLeft = (data, setRemoteStreams) => {
  const {connectedUserSocketId} = data;
  if (peers[connectedUserSocketId]) {
    peers[connectedUserSocketId].destroy();
    delete peers[connectedUserSocketId];
  }
  setRemoteStreams((prev) => {
    let cache = [...prev];
    cache = cache.filter((item) => item.connectedUserSocketId !== connectedUserSocketId);
    return cache;
  });
};
