import {RecoilRoot} from "recoil";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import Header from "@Components/Header";
import {responsiveFontSizes, ThemeProvider} from "@mui/material";
import ThemeFile from "styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import {ToastContainer} from "material-react-toastify";

import "material-react-toastify/dist/ReactToastify.css";
import "../styles/main.scss";
import MiddleApp from "@Components/MiddleApp";

function createEmotionCache() {
  return createCache({key: "css", prepend: true});
}

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const theme = responsiveFontSizes(ThemeFile);

  return (
    <CacheProvider value={emotionCache}>
      <RecoilRoot>
        <Header />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <MiddleApp>
            <Component {...pageProps} />
          </MiddleApp>
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

export default MyApp;
