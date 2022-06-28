import {userRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {useSocket} from "hook/socketServer";
import {useRouter} from "next/router";
import {useMemo} from "react";
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

  if (redirect && !user) {
    router.replace("/login");
    return <LoadingScreen title="Authenticating..." />;
  } else return children;
};

export default function MiddleApp({children, ...props}) {
  return <AuthArea {...props}>{children}</AuthArea>;
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/auth/`);
  const data = await res.json();
  return {props: {data}};
}
