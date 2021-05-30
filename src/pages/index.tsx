import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Card } from "../components/Card";
import { LoginButton } from "../components/LoginButton";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import styles from "./home.module.scss";

export default function HomePage() {
  const [session] = useSession();
  const router = useRouter();

  return !session ? (
    <section className={styles.mainHeroWithoutContent}>
      <h1>Hello 👋</h1>
      <p>
        This app show to you what's is in your ear. Using{" "}
        <strong>Spotify</strong>
      </p>
      <p>
        *This is a study application. All code is on:{" "}
        <a>https://github.com.br</a>
      </p>
      <LoginButton />
    </section>
  ) : (
    <>
      <PageNavigationHeader title="Choose a Topic" hideNavigation />
      <div
        className={`${styles.mainHeroCardsContent} ${styles.initialCardsOption}`}>
        <Card
          handleClick={() => router.push("/artists")}
          coverText="Artists"
          title="See Artists"
          description="See your top artists"
        />
        <Card
          handleClick={() => router.push("/tracks")}
          coverText="Tracks"
          title="See Tracks"
          description="See your top tracks"
        />
      </div>
    </>
  );
}
