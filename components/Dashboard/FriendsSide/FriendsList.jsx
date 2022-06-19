import DrawerContainer from "@Components/DrawerContainer";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {useState} from "react";
import styles from "../dashboard.module.scss";
import InviteFriend from "./InviteFriend";
const users = ["user1", "user2"];
export default function FriendsList() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.friendsList}>
      <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
        Add Friends
      </Button>
      <Typography
        variant="subtitle2"
        align="center"
        color="textSecondary"
        className="small-margin-top large-padding-right large-padding-left">
        Private Messages
      </Typography>

      <List>
        {users.map((user) => (
          <ListItem key={user} disableGutters>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>

      <InviteFriend open={open} setOpen={setOpen} />
    </div>
  );
}
