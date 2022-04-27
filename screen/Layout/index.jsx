import Container from "@mui/material/Container";
import styles from "./Layout.module.scss";

/**
 * @param {Boolean} maxWidth
 * @param {Boolean} padding
 * @param {Boolean} center
 * @param {String} title
 */

export default function Layout({children, className, maxWidth, padding, center, ...props}) {
  return (
    <Container
      maxWidth={maxWidth ? maxWidth : false}
      className={` ${center ? styles.containerCenter : styles.container} ${className}`}
      disableGutters={!padding}
      {...props}>
      {children}
    </Container>
  );
}
