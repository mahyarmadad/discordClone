import {Avatar, IconButton, List, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {invitationRecoil} from "@recoil/invite";
import {MdCheck, MdClose} from "react-icons/md";
import {useRecoilValue} from "recoil";
import styles from "../dashboard.module.scss";

export default function InvitationList() {
  const invitations = useRecoilValue(invitationRecoil);
  return invitations?.length ? (
    <List className={styles.inviteList}>
      {invitations.map((invite) => (
        <ListItem key={invite._id} disableGutters>
          <Avatar sx={{width: 24, height: 24}} className="small-margin-right" />
          <Tooltip title={invite.senderId.email}>
            <ListItemText primary={invite.senderId.username} />
          </Tooltip>

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
  ) : (
    <div className="text-center">
      <Typography variant="caption" color="textSecondary">
        No Invitations
      </Typography>
    </div>
  );
}
