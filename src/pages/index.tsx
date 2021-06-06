import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "../components/Card";
import { LoginButton } from "../components/LoginButton";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import styles from "./home.module.scss";

export default function HomePage() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>What's In Ear</title>
      </Head>
      {!session ? (
        <section className={styles.mainHeroWithoutContent}>
          <h1>Hello 👋</h1>
          <p>
            This app show to you what's is in your ear. Using{" "}
            <strong>Spotify</strong>
          </p>
          <p>
            *This is a study application. All code is on:{" "}
            <a href="https://github.com/FilipeSsant/whatsinear">
              https://github.com/FilipeSsant/whatsinear
            </a>
          </p>
          <LoginButton />
        </section>
      ) : (
        <>
          <PageNavigationHeader title="Choose a Topic" hideNavigation />
          <div
            className={`${styles.mainHeroCardsContent} ${styles.initialCardsOption}`}>
            <Card
              cover="https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=521&q=80"
              handleClick={() => router.push("/artists")}
              coverText="Artists"
              title="See Your Artists"
              description="See your top artists"
            />
            <Card
              cover="https://images.unsplash.com/photo-1604907296594-240f842502e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=738&q=80"
              handleClick={() => router.push("/tracks")}
              coverText="Tracks"
              title="See Your Tracks"
              description="See your top tracks"
            />
          </div>
        </>
      )}
    </>
  );
}
