import {userRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {useSocket} from "hook/socketServer";
import {useRouter} from "next/router";
import {useEffect, useMemo} from "react";
import {useRecoilValue} from "recoil";

const exclusions = ["/login", "/signup", "/forgotPassword", "/choosePassword", "/verifySuccess"];

const AuthArea = ({children, ...props}) => {
  const router = useRouter();
  const redirect = useMemo(
    () => !exclusions.some((t) => router.pathname.trim().toLowerCase().startsWith(t.toLowerCase())),
    [router.pathname],
  );
  const user = useRecoilValue(userRecoil);

  useSocket();
  useEffect(() => {
    if (!user && redirect) router.replace("/login");
  }, [redirect, user, router]);

  if (redirect && !user) return <LoadingScreen title="Authenticating..." />;
  else return children;
};

export default function MiddleApp({children, ...props}) {
  return <AuthArea {...props}>{children}</AuthArea>;
}
