import FriendsSide from "@Components/Dashboard/FriendsSide";
import Messenger from "@Components/Dashboard/Chat/Messenger";
import Sidebar from "@Components/Dashboard/Sidebar";
import Layout from "@Screen/Layout";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <Layout className={styles.container}>
      <Sidebar />
      <FriendsSide />
      <Messenger />
    </Layout>
  );
}
