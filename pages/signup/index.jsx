import {PassLink} from "@Components/utils";
import {LoadingButton} from "@mui/lab";
import {Container, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import LoginLayout from "@Screen/LoginLayout";
import {useCallback, useState} from "react";
import {MdVisibilityOff, MdVisibility} from "react-icons/md";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = useCallback(
    (e) => setNewUser({...newUser, [e.target.name]: e.target.value}),
    [newUser],
  );

  const handelSigIn = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <LoginLayout title="Sign Up">
      <form className="medium-margin-top flex-column medium-gap">
        <TextField
          name="username"
          value={newUser.username}
          onChange={onChange}
          fullWidth
          label="Username"
        />
        <TextField
          name="email"
          value={newUser.email}
          onChange={onChange}
          fullWidth
          label="Email Address"
          type="email"
        />
        <TextField
          name="password"
          value={newUser.password}
          onChange={onChange}
          fullWidth
          label="Password"
          type="password"
        />
        <TextField
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={onChange}
          fullWidth
          label="Confirm Password"
          type={showPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPass((prev) => !prev)}
                  edge="end">
                  {showPass ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          className="medium-padding"
          loading={loading}
          onClick={handelSigIn}
          disabled={Object.values(newUser).some((item) => !item)}>
          Create Account
        </LoadingButton>

        <Typography variant="caption" color="GrayText">
          Have an Account ?{" "}
          <PassLink href={"/login"}>
            <Typography variant="caption" color="#A2AEBB">
              Login
            </Typography>
          </PassLink>
        </Typography>
      </form>
    </LoginLayout>
  );
}
