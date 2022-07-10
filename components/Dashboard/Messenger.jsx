import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {activeChat} from "@recoil/chat";
import {SendMessage} from "hook/socketServer";
import {useCallback} from "react";
import {useState} from "react";
import {MdSend} from "react-icons/md";
import {useRecoilValue} from "recoil";
import styles from "./dashboard.module.scss";
import Navbar from "./Navbar";
export default function Messenger() {
  const chatFriend = useRecoilValue(activeChat);

  const [message, setMessage] = useState("");
  const onSendClick = useCallback(() => {
    SendMessage(chatFriend.id, message);
    setMessage("");
  }, [chatFriend, message]);

  return (
    <div className={`${styles.messenger}`}>
      <Navbar title={chatFriend ? chatFriend.username : ""} />
      {chatFriend ? (
        <div className={styles.messageDiv}>
          <div className={styles.chatDiv}></div>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="filled"
            fullWidth
            placeholder="Enter message..."
            inputProps={{
              style: {
                padding: 8,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onSendClick} disabled={!message}>
                    <MdSend />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      ) : (
        <div className="flex-column justify-center align-center full-height">
          <Typography variant="caption" color="textSecondary">
            Please Select a friend to chat
          </Typography>
        </div>
      )}
    </div>
  );
}
