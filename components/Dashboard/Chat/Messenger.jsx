import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {activeChat, chatHistoryRecoil} from "@recoil/chat";
import {userRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {getMessage, sendMessage} from "hook/socketServer";
import {Fragment, useCallback} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {MdSend} from "react-icons/md";
import {useRecoilValue} from "recoil";
import styles from "../dashboard.module.scss";
import Navbar from "../Navbar";
import Message from "./Message";
export default function Messenger() {
  const chatFriend = useRecoilValue(activeChat);
  const chatHistory = useRecoilValue(chatHistoryRecoil);
  const user = useRecoilValue(userRecoil);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const onSendClick = useCallback(() => {
    sendMessage(chatFriend.id, message);
    setMessage("");
  }, [chatFriend, message]);

  useEffect(() => {
    if (chatFriend) getMessage(chatFriend.id);
  }, [chatFriend]);

  useEffect(() => {
    if (chatHistory) setLoading(false);
  }, [chatHistory]);

  return (
    <div className={`${styles.messenger}`}>
      <Navbar title={chatFriend ? chatFriend.username : ""} />
      {chatFriend ? (
        <div className={styles.messageDiv}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <Fragment>
              <div className={styles.chatDiv}>
                {chatHistory?.messages.map((chat) => (
                  <Message
                    key={chat._id}
                    content={chat.content}
                    date={chat.date}
                    username={chat.author.username}
                    isUser={chat.author._id === user.id}
                  />
                ))}
              </div>
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="filled"
                fullWidth
                multiline
                placeholder="Enter message..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onSendClick} disabled={!message}>
                        <MdSend />
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: "small-padding",
                }}
              />
            </Fragment>
          )}
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
