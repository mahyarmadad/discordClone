import {PassLink} from "@Components/utils";
import {LoadingButton} from "@mui/lab";
import {Container, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import LoginLayout from "@Screen/LoginLayout";
import {useCallback, useState} from "react";
import {MdVisibilityOff, MdVisibility} from "react-icons/md";

export default function Login() {
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = useCallback(
    (e) => setLoginUser({...loginUser, [e.target.name]: e.target.value}),
    [loginUser],
  );
  const handelSigIn = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <LoginLayout title="Sign In">
      <form className="medium-margin-top flex-column medium-gap">
        <TextField
          name="username"
          value={loginUser.username}
          onChange={onChange}
          fullWidth
          label="Username"
        />

        <TextField
          name="password"
          value={loginUser.password}
          onChange={onChange}
          fullWidth
          label="Password"
          type="password"
        />

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          className="medium-padding"
          loading={loading}
          onClick={handelSigIn}
          disabled={Object.values(loginUser).some((item) => !item)}>
          Login
        </LoadingButton>

        <Typography variant="caption" color="GrayText">
          Need an Account ?{" "}
          <PassLink href={"/signup"}>
            <Typography variant="caption" color="#A2AEBB">
              Creat Now
            </Typography>
          </PassLink>
        </Typography>
      </form>
    </LoginLayout>
  );
}
