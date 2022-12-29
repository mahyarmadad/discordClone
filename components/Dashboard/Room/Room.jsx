import {closeConnection} from "@functions/peerConnection";
import {IconButton} from "@mui/material";
import {userStreamRecoil} from "@recoil/chat";
import {remoteStreamsRecoil, roomDetailRecoil} from "@recoil/room";
import {leaveRoom} from "hook/socketServer";
import {useRef} from "react";
import {useEffect} from "react";
import {useCallback, useState} from "react";
import {AiOutlineAudio, AiOutlineAudioMuted} from "react-icons/ai";
import {FiVideo, FiVideoOff} from "react-icons/fi";
import {MdClose} from "react-icons/md";
import {useRecoilState, useRecoilValue} from "recoil";
import styles from "./room.module.scss";
import VideoContainer from "./VideoContainer";
export default function Room() {
  const [videoEnable, setVideoEnable] = useState(true);
  const [audioEnable, setAudioEnable] = useState(true);

  const [roomDetail, setRoomDetail] = useRecoilState(roomDetailRecoil);
  const [userStream, setUserStream] = useRecoilState(userStreamRecoil);

  const remoteStreams = useRecoilValue(remoteStreamsRecoil);

  const onClose = useCallback(() => {
    closeConnection();
    leaveRoom(roomDetail);
    setRoomDetail(null);
    setUserStream((prev) => {
      if (prev) prev.getTracks().forEach((track) => track.stop());
      return null;
    });
  }, [roomDetail, setRoomDetail, setUserStream]);

  useEffect(() => {
    setUserStream((prev) => {
      prev.getAudioTracks()[0].enabled = audioEnable;
      prev.getVideoTracks()[0].enabled = videoEnable;
      return prev;
    });
  }, [audioEnable, setUserStream, videoEnable]);

  useEffect(() => {
    console.log("remoteStreams", remoteStreams);
  }, [remoteStreams]);

  return (
    <div className={styles.room}>
      <div className={styles.videosContainer}>
        <VideoContainer stream={userStream} />
        {remoteStreams?.map((source) => (
          <VideoContainer key={source.id} stream={source} />
        ))}
      </div>
      <div className="flex-row justify-center small-gap">
        <IconButton size="small" onClick={() => setAudioEnable((prev) => !prev)}>
          {audioEnable ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
        </IconButton>
        <IconButton size="small" onClick={() => setVideoEnable((prev) => !prev)}>
          {videoEnable ? <FiVideo /> : <FiVideoOff />}
        </IconButton>
        <IconButton size="small" onClick={onClose}>
          <MdClose />
        </IconButton>
      </div>
    </div>
  );
}
