import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import Link from "next/link";
import {Button, TextField} from "@mui/material";

export function PassLink({href, children, ...props}) {
  return (
    <Link href={href} passHref>
      <a href="#" {...props}>
        {children}
      </a>
    </Link>
  );
}

export function DateTimePicker({value, setValue, fullWidth, ...props}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDateTimePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField fullWidth={fullWidth} {...params} />}
        {...props}
      />
    </LocalizationProvider>
  );
}

export const SnackAction = (title, onClick) => {
  let Snack = () => <Button onClick={onClick}>{title}</Button>;
  return Snack;
};
