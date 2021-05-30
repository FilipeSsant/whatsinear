import { Provider as NextAuthProvider } from "next-auth/client";
import { Router } from "next/router";
import NProgress from "nprogress";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/global.scss";
import styles from "./home.module.scss";

// Listen routing events
// When route starts the change of pages
Router.events.on("routeChangeStart", () => NProgress.start());
// When route ends the change of pages
Router.events.on("routeChangeComplete", () => NProgress.done());
// When route has a error in change
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <main className={styles.mainContainer}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </NextAuthProvider>
  );
}

export default MyApp;
