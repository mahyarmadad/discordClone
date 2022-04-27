import {loggingInRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {useRouter} from "next/router";
import {useMemo} from "react";

const exclusions = ["/login", "/signup", "/forgotPassword", "/choosePassword", "/verifySuccess"];

const AuthArea = ({children, ...props}) => {
  const router = useRouter();
  const redirect = useMemo(
    () => !exclusions.some((t) => router.pathname.trim().toLowerCase().startsWith(t.toLowerCase())),
    [router.pathname],
  );
  const isLogging = useRecoilValue(loggingInRecoil);
  console.log("...props", ...props);
  // const user = useAuth(redirect);
  if (isLogging || (redirect && !user)) return <LoadingScreen title="Authenticating..." />;
  else return children;
};

export default function MiddleApp({children, ...props}) {
  return <AuthArea {...props}>{children}</AuthArea>;
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:5000/api/auth/`);
  const data = await res.json();

  // Pass data to the page via props
  return {props: {data}};
}
