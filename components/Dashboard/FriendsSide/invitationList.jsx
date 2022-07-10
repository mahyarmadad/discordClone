import {postData} from "@functions/request";
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {invitationRecoil} from "@recoil/invite";
import {toast} from "material-react-toastify";
import {useCallback, useState} from "react";
import {MdCheck, MdClose} from "react-icons/md";
import {useRecoilValue} from "recoil";
import styles from "../dashboard.module.scss";

export default function InvitationList() {
  const invitations = useRecoilValue(invitationRecoil);
  const [loading, setLoading] = useState(false);
  const onButtonClick = useCallback(async (id, type) => {
    try {
      const sessionToken = localStorage.getItem("token");
      setLoading(type);
      const res = await postData(
        `http://localhost:5000/api/friend/invite/${type}`,
        {inviteId: id},
        sessionToken,
      );
      toast.success(await res.text());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }, []);

  return invitations?.length ? (
    <List className={styles.inviteList}>
      {invitations.map((invite) => (
        <ListItem key={invite._id} disableGutters>
          <Avatar sx={{width: 24, height: 24}} className="small-margin-right" />
          <Tooltip title={invite.senderId.email}>
            <ListItemText primary={invite.senderId.username} />
          </Tooltip>

          <div className="flex-row">
            <IconButton
              size="small"
              onClick={() => onButtonClick(invite._id, "accept")}
              disabled={!!loading}>
              {loading === "accept" ? <CircularProgress color="inherit" /> : <MdCheck />}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onButtonClick(invite._id, "reject")}
              disabled={!!loading}>
              {loading === "reject" ? <CircularProgress color="inherit" /> : <MdClose />}
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
