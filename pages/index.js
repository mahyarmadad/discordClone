import {userRecoil} from "@recoil/user";
import LoadingScreen from "@Screen/LoadingScreen";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";

export default function Home() {
  const user = useRecoilValue(userRecoil);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
    else router.push("/login");
  }, [router, user]);

  if (user) return <LoadingScreen title="loading Dashboard ...." />;
  else return <LoadingScreen title="Redirect to Login" />;
}
