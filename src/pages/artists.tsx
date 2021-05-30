import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useState } from "react";
import { Card } from "../components/Card";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import { RadioGroup } from "../components/RadioGroup";
import { ArtistProps } from "../libs/ArtistsPageProps";
import { api } from "../services/api";
import styles from "./home.module.scss";

interface ArtistsPageProps {
  shortTerm: ArtistProps[];
  mediumTerm: ArtistProps[];
  longTerm: ArtistProps[];
}

export default function ArtistsPage({
  shortTerm,
  mediumTerm,
  longTerm,
}: ArtistsPageProps) {
  const [selectedTerm, setSelectedTerm] = useState("short_term");

  const RenderCards = {
    short_term: shortTerm.map((artist, index) => (
      <Card
        position={index + 1}
        key={artist.id}
        cover={artist.images[0].url}
        title={artist.name}
        description={artist.genres.join(", ")}
      />
    )),
    medium_term: mediumTerm.map((artist, index) => (
      <Card
        position={index + 1}
        key={artist.id}
        cover={artist.images[0].url}
        title={artist.name}
        description={artist.genres.join(", ")}
      />
    )),
    long_term: longTerm.map((artist, index) => (
      <Card
        position={index + 1}
        key={artist.id}
        cover={artist.images[0].url}
        title={artist.name}
        description={artist.genres.join(", ")}
      />
    )),
  };

  return (
    <>
      <PageNavigationHeader title="Artists" />
      <div className={styles.mainHeroOptionsContainer}>
        <RadioGroup
          onRadioChange={(selectedRadio) =>
            setSelectedTerm(selectedRadio.value)
          }
          values={[
            { label: "Last month", value: "short_term", selected: true },
            { label: "Last 6 months", value: "medium_term" },
            { label: "All time", value: "long_term" },
          ]}
        />
      </div>
      <section className={styles.mainHeroCardsContent}>
        {RenderCards[selectedTerm]}
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const shortTermResponse = await api.get("/me/top/artists", {
    params: { limit: 10, time_range: "short_term" },
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  });

  const mediumTermResponse = await api.get("/me/top/artists", {
    params: { limit: 10, time_range: "medium_term" },
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  });

  const longTermResponse = await api.get("/me/top/artists", {
    params: { limit: 10, time_range: "long_term" },
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  });

  return {
    props: {
      shortTerm: shortTermResponse.data.items,
      mediumTerm: mediumTermResponse.data.items,
      longTerm: longTermResponse.data.items,
    },
  };
};
