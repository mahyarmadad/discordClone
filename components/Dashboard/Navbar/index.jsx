import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {MdMoreVert, MdVideoCameraFront} from "react-icons/md";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton size="small" sx={{mr: 2}} onClick={(event) => setOpenMenu(event.currentTarget)}>
          <MdMoreVert />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>

      <Menu anchorEl={openMenu} open={!!openMenu} onClose={() => setOpenMenu(null)}>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
