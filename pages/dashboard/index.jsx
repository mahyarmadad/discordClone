import Messenger from "@Components/Dashboard/Chat/Messenger";
import FriendsSide from "@Components/Dashboard/FriendsSide";
import Room from "@Components/Dashboard/Room/Room";
import Sidebar from "@Components/Dashboard/Room/Sidebar";
import {roomDetailRecoil} from "@recoil/room";
import {userRecoil} from "@recoil/user";
import Layout from "@Screen/Layout";
import {useRecoilValue} from "recoil";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const roomDetail = useRecoilValue(roomDetailRecoil);
  const user = useRecoilValue(userRecoil);
  return (
    <Layout className={styles.container}>
      <Sidebar />
      <FriendsSide />
      <Messenger />
      {roomDetail ? <Room /> : null}
    </Layout>
  );
}
