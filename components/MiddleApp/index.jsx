import {loggingInRecoil, userRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {useAuth} from "hook/auth";
import {useRouter} from "next/router";
import {useMemo} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";

const exclusions = ["/login", "/signup", "/forgotPassword", "/choosePassword", "/verifySuccess"];

const AuthArea = ({children, ...props}) => {
  const router = useRouter();
  const redirect = useMemo(
    () => !exclusions.some((t) => router.pathname.trim().toLowerCase().startsWith(t.toLowerCase())),
    [router.pathname],
  );
  const isLogging = useRecoilValue(loggingInRecoil);
  const setUser = useSetRecoilState(userRecoil);

  const user = useAuth(redirect);
  if (user) setUser(user);
  if (isLogging || (redirect && !user)) return <LoadingScreen title="Authenticating..." />;
  else return children;
};

export default function MiddleApp({children, ...props}) {
  return <AuthArea {...props}>{children}</AuthArea>;
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/auth/`);
  const data = await res.json();
  return {props: {data}};
}
