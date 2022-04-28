import {AppBar} from "@mui/material";
import styles from "./dashboard.module.scss";
export default function Messenger() {
  return (
    <div className={`${styles.messenger}`}>
      <AppBar></AppBar>
      to chat
    </div>
  );
}
