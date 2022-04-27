import {Container, Typography} from "@mui/material";
import Layout from "@Screen/Layout";
import styles from "./loginLayout.module.scss";

export default function LoginLayout({title, children, className, ...props}) {
  return (
    <Layout center>
      <Container maxWidth="sm" className={`${styles.container} ${className}`} {...props}>
        <Typography variant="h4">{title}</Typography>
        {children}
      </Container>
    </Layout>
  );
}
