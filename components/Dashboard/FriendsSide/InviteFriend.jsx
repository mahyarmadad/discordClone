import DialogContainer from "@Components/DialogContainer";
import {postData} from "@functions/request";
import {LoadingButton} from "@mui/lab";
import {Divider, TextField, Typography} from "@mui/material";
import {toast} from "material-react-toastify";
import React from "react";
import {useState} from "react";
import {useCallback} from "react";

export default function InviteFriend({open, setOpen}) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
    setLoading(false);
    setInviteEmail("");
  }, [setOpen]);

  const onSendClick = useCallback(async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      setLoading(true);
      const res = await postData(
        "http://localhost:5000/api/friend/invite/",
        {email: inviteEmail},
        sessionToken,
      );
      toast.success(await res.text());
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }, [inviteEmail, onClose]);

  return (
    <DialogContainer open={open} title="Invite a Friend" onCloseClick={onClose}>
      <Typography color="textSecondary" className="small-margin-top">
        Enter Email Address of your friend
      </Typography>
      <TextField
        fullWidth
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value.trim())}
        label="Email Adress"
        className="medium-margin-top"
      />
      <Divider className="medium-margin-top medium-margin-bottom" />

      <LoadingButton
        onClick={onSendClick}
        loading={loading}
        disabled={!inviteEmail}
        variant="contained"
        fullWidth>
        Send
      </LoadingButton>
    </DialogContainer>
  );
}
