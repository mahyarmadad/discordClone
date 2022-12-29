import {useEffect, useRef} from "react";
import styles from "./room.module.scss";
export default function VideoContainer({stream}) {
  const videpRef = useRef();

  useEffect(() => {
    if (!stream) return;
    const video = videpRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return <video autoPlay ref={videpRef} className={styles.video} />;
}
