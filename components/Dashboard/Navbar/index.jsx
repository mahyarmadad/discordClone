import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {MdVideoCameraFront} from "react-icons/md";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
          <MdVideoCameraFront />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
