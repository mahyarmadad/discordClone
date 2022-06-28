import DialogContainer from "@Components/DialogContainer";
import {LoadingButton} from "@mui/lab";
import {Divider, TextField, Typography} from "@mui/material";
import React from "react";
import {useState} from "react";
import {useCallback} from "react";

export default function InviteFriend({open, setOpen}) {
  const [inviteEmail, setInviteEmail] = useState("");
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <DialogContainer open={open} title="Invite a Friend" onCloseClick={onClose}>
      <Typography color="textSecondary" className="small-margin-top">
        Enter Email Address of your friend
      </Typography>
      <TextField
        fullWidth
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        label="Email Adress"
        className="medium-margin-top"
      />
      <Divider className="medium-margin-top medium-margin-bottom" />

      <LoadingButton disabled={!inviteEmail} variant="contained" fullWidth>
        Send
      </LoadingButton>
    </DialogContainer>
  );
}
