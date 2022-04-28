import {Drawer} from "@mui/material";

export default function DrawerContainer({width, children, className, open, setOpen, ...props}) {
  return (
    <Drawer
      // variant="temporary permanent"
      variant="permanent"
      open={open}
      onClose={() => setOpen(false)}
      className={`${className}`}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        className: className,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          position: "relative",
          borderRight: "none",
          width: width,
        },
      }}
      {...props}>
      <div className="medium-padding">{children}</div>
    </Drawer>
  );
}
