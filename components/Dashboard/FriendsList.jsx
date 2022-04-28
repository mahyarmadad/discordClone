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
import styles from "./dashboard.module.scss";
const users = ["user1", "user2"];
export default function FriendsList() {
  const [open, setOpen] = useState(true);

  return (
    <DrawerContainer
      open={open}
      setOpen={setOpen}
      onClose={() => setOpen(false)}
      className={styles.friendsList}>
      <Button variant="contained" fullWidth>
        Add Friends
      </Button>
      <Typography
        variant="subtitle2"
        align="center"
        color="textSecondary"
        className="small-margin-top">
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
    </DrawerContainer>
  );
}
