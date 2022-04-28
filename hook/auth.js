import {loggingInRecoil, userRecoil} from "@recoil/user";
import {toast} from "material-react-toastify";
import {useRouter} from "next/router";
import {useCallback, useEffect} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

/**
 *
 * @param {Object {redirect, showSnackbar}} options
 * @returns
 */
export const useAuth = (redirect = false) => {
  const [user, setUser] = useRecoilState(userRecoil);
  const router = useRouter();
  const setLoggingIn = useSetRecoilState(loggingInRecoil);

  useEffect(() => {
    try {
      if (!user) {
        let storeToken = localStorage.getItem("token");
        if (storeToken) {
          setLoggingIn(true);
          setUser(storeToken);
          setLoggingIn(false);
        } else if (redirect) {
          router.replace("/login");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  }, [redirect, router, setLoggingIn, setUser, user]);

  return user;
};

export const useLogin = () => {
  const setUser = useSetRecoilState(currentUser);
  const setCache = useSetRecoilState(userCache);

  return useCallback(
    (email, password) => {
      return loginUser(email, password)
        .then((d) => {
          setUser(d);
          setCache({});
        })
        .catch((e) => {
          setUser(null);
          throw e;
        });
    },
    [setCache, setUser],
  );
};

export const useLogout = () => {
  const setUser = useSetRecoilState(currentUser);
  const setCache = useSetRecoilState(userCache);

  return useCallback(
    (email, password) => {
      return logOutUser(email, password).then((d) => {
        setUser(null);
        setCache({});
        return d;
      });
    },
    [setCache, setUser],
  );
};

export const useSignUp = () => {
  const setUser = useSetRecoilState(currentUser);
  const setCache = useSetRecoilState(userCache);

  return useCallback(
    (username, password, name, ref, recaptchaToken) => {
      return registerUser(username, password, name, ref, recaptchaToken).then((d) => {
        setUser(d);
        setCache({});
        return d;
      });
    },
    [setCache, setUser],
  );
};
