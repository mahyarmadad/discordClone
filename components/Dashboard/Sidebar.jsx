import DrawerContainer from "@Components/DrawerContainer";
import {Button} from "@mui/material";
import {useState} from "react";
import {HiUserGroup} from "react-icons/hi";
import styles from "./dashboard.module.scss";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <DrawerContainer
      open={open}
      setOpen={setOpen}
      onClose={() => setOpen(false)}
      className={styles.sidebar}
      width={100}>
      <Button variant="contained">
        <HiUserGroup />
      </Button>
    </DrawerContainer>
  );
}
