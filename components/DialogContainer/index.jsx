import {Dialog, Divider, IconButton, Slide, Typography} from "@mui/material";
import {forwardRef} from "react";
import {MdClose} from "react-icons/md";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogContainer({children, zIndex = 1000, title, onCloseClick, ...props}) {
  props.style = props.style || {};
  props.style.zIndex = zIndex;
  return (
    <Dialog TransitionComponent={Transition} keepMounted fullWidth {...props}>
      <div className="flex-column full-height medium-padding">
        <div className="flex-row">
          <Typography className={`flex-grow`}>{title}</Typography>
          <IconButton onClick={onCloseClick}>
            <MdClose />
          </IconButton>
        </div>
        <Divider className="small-margin-bottom" />
        {children}
      </div>
    </Dialog>
  );
}
