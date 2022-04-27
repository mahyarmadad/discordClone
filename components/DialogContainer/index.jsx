import {Dialog, Slide} from "@mui/material";
import {forwardRef} from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogContainer({children, zIndex = 1000, ...props}) {
  props.style = props.style || {};
  props.style.zIndex = zIndex;
  return (
    <Dialog TransitionComponent={Transition} keepMounted fullWidth {...props}>
      {children}
    </Dialog>
  );
}
