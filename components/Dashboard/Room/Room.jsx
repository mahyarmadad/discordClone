import {IconButton} from "@mui/material";
import {roomDetailRecoil} from "@recoil/room";
import {leaveRoom} from "hook/socketServer";
import {useCallback, useState} from "react";
import {AiOutlineAudio, AiOutlineAudioMuted} from "react-icons/ai";
import {FiVideo, FiVideoOff} from "react-icons/fi";
import {MdClose} from "react-icons/md";
import {useRecoilState, useRecoilValue} from "recoil";
import styles from "./room.module.scss";
export default function Room() {
  const [roomDetail, setRoomDetail] = useRecoilState(roomDetailRecoil);

  const [media, setMmedia] = useState({
    audio: false,
    video: false,
  });

  const onClose = useCallback(() => {
    leaveRoom(roomDetail);
    setRoomDetail(null);
  }, [roomDetail, setRoomDetail]);

  return (
    <div className={styles.room}>
      <div className="flex-grow"></div>
      <div className="flex-row justify-center small-gap">
        <IconButton size="small">
          {media.audio ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
        </IconButton>
        <IconButton size="small">{media.video ? <FiVideo /> : <FiVideoOff />}</IconButton>
        <IconButton size="small" onClick={onClose}>
          <MdClose />
        </IconButton>
      </div>
    </div>
  );
}
