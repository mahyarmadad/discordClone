import DrawerContainer from "@Components/DrawerContainer";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {useState} from "react";
import {MdCancel, MdCheck, MdClose, MdFiberManualRecord} from "react-icons/md";
import styles from "../dashboard.module.scss";
import InviteFriend from "./InviteFriend";
const users = ["user1", "user2"];
export default function FriendsList() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.friendsSide}>
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

      <List className={styles.friendsList}>
        {users.map((user) => (
          <ListItem key={user} disableGutters>
            <Avatar sx={{width: 24, height: 24}} className="small-margin-right" />
            <ListItemText primary={user} />
            <MdFiberManualRecord color="#3ba55d" />
          </ListItem>
        ))}
      </List>

      <Typography
        variant="subtitle2"
        align="center"
        color="textSecondary"
        className="small-margin-top large-padding-right large-padding-left">
        Invitations
      </Typography>

      <List className={styles.inviteList}>
        {users.map((user) => (
          <ListItem key={user} disableGutters>
            <Avatar sx={{width: 24, height: 24}} className="small-margin-right" />
            <ListItemText primary={user} />
            <div className="flex-row">
              <IconButton size="small">
                <MdCheck />
              </IconButton>
              <IconButton size="small">
                <MdClose />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      <InviteFriend open={open} setOpen={setOpen} />
    </div>
  );
}
