import {CircularProgress, Typography} from "@mui/material";
import Layout from "@Screen/Layout";

export default function LoadingScreen({title = "Loading....", noNavbar = true, ...props}) {
  return (
    <Layout
      center
      // noNavbar={noNavbar}
      {...props}>
      <CircularProgress />
      <Typography className="medium-margin-top">{title}</Typography>
    </Layout>
  );
}
