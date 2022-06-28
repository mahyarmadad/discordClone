import {useCallback} from "react";
import {useSetRecoilState} from "recoil";

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
