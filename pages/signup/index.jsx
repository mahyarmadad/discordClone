import {PassLink} from "@Components/utils";
import {postData} from "@functions/user";
import {LoadingButton} from "@mui/lab";
import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {userRecoil} from "@recoil/user";
import LoginLayout from "@Screen/LoginLayout";
import {toast} from "material-react-toastify";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {useRecoilState} from "recoil";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUserRecoil] = useRecoilState(userRecoil);

  const router = useRouter();

  const onChange = useCallback(
    (e) => setNewUser({...newUser, [e.target.name]: e.target.value}),
    [newUser],
  );

  const handelSigIn = useCallback(
    async (e) => {
      if (newUser.password !== newUser.confirmPassword)
        return toast.error("Password dosen't match");
      try {
        e.preventDefault();
        setLoading(true);
        let sendUser = {...newUser};
        delete sendUser.confirmPassword;
        const data = await postData("http://localhost:5000/api/auth/register", sendUser);
        if (data.user) {
          setUser(data.user);
          setUserRecoil(data.user);
        }
        router.push("/dashboard", null, {shallow: true});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [newUser, router, setUserRecoil],
  );

  useEffect(() => {
    if (user) router.push("/dashboard", null, {shallow: true});
  }, [router, user]);
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
