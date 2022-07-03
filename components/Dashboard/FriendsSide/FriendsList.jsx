import {Avatar, Button, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useState} from "react";
import {MdFiberManualRecord} from "react-icons/md";
import InvitationList from "./invitationList";
import InviteFriend from "./InviteFriend";
import styles from "../dashboard.module.scss";

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

      <InvitationList />

      <InviteFriend open={open} setOpen={setOpen} />
    </div>
  );
}
