import {AppBar} from "@mui/material";
import styles from "./dashboard.module.scss";
import Navbar from "./Navbar";
export default function Messenger() {
  return (
    <div className={`${styles.messenger}`}>
      <Navbar />
      <div className="medium-padding">Chat</div>
    </div>
  );
}
