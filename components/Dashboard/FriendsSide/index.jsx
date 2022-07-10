import {Button, Typography} from "@mui/material";
import {useState} from "react";
import styles from "../dashboard.module.scss";
import FriendsList from "./FriendsList";
import InvitationList from "./invitationList";
import InviteFriend from "./InviteFriend";

const users = ["user1", "user2"];
export default function FriendsSide() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.friendsSide}>
      <div className="small-padding">
        <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
          Add Friends
        </Button>
      </div>

      <Typography
        variant="subtitle2"
        align="center"
        color="textSecondary"
        className="small-margin-top large-padding-right large-padding-left">
        Private Messages
      </Typography>

      <FriendsList />

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
