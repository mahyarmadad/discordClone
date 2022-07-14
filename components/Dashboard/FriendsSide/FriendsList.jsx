import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {activeChat, chatHistoryRecoil} from "@recoil/chat";
import {friendsRecoil} from "@recoil/friends";
import {onlineUsersRecoil} from "@recoil/user";
import {MdFiberManualRecord} from "react-icons/md";
import {useRecoilValue, useSetRecoilState} from "recoil";
import styles from "../dashboard.module.scss";

export default function FriendsList() {
  const userFriends = useRecoilValue(friendsRecoil);
  const onlineUsers = useRecoilValue(onlineUsersRecoil);

  const setChat = useSetRecoilState(activeChat);
  const setChatHistory = useSetRecoilState(chatHistoryRecoil);

  return userFriends?.length ? (
    <List className={styles.friendsList}>
      {userFriends.map((friend) => (
        <ListItemButton
          key={friend.id}
          onClick={() => {
            setChat(friend);
            setChatHistory(null);
          }}>
          <Avatar sx={{width: 24, height: 24}} className="small-margin-right" />
          <Tooltip title={friend.email}>
            <ListItemText primary={friend.username} />
          </Tooltip>
          {onlineUsers[friend.id] ? <MdFiberManualRecord color="#3ba55d" /> : null}
        </ListItemButton>
      ))}
    </List>
  ) : (
    <div className={`${styles.friendsList} text-center`}>
      <Typography variant="caption" color="textSecondary">
        No Friends
      </Typography>
    </div>
  );
}
