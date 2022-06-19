import DrawerContainer from "@Components/DrawerContainer";
import {Button} from "@mui/material";
import {useState} from "react";
import {HiUserGroup} from "react-icons/hi";
import styles from "./dashboard.module.scss";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.sidebar}>
      <Button variant="contained" sx={{minWidth: "unset"}}>
        <HiUserGroup />
      </Button>
    </div>
  );
}
