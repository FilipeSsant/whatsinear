import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";
import { Card } from "../components/Card";
import { EmptyContent } from "../components/EmptyContent";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import { RadioGroup } from "../components/RadioGroup";
import { TrackProps } from "../libs/TracksPageProps";
import { api } from "../services/api";
import styles from "./home.module.scss";

interface ArtistsPageProps {
  shortTerm: TrackProps[];
  mediumTerm: TrackProps[];
  longTerm: TrackProps[];
}

export default function ArtistsPage({
  shortTerm,
  mediumTerm,
  longTerm,
}: ArtistsPageProps) {
  const [selectedTerm, setSelectedTerm] = useState("long_term");
  const options = [
    { label: "All time", value: "long_term", selected: true },
    { label: "Last 6 months", value: "medium_term" },
    { label: "Last month", value: "short_term" },
  ];

  const cardData: Record<string, TrackProps[]> = {
    short_term: shortTerm,
    medium_term: mediumTerm,
    long_term: longTerm,
  };

  return (
    <>
      <Head>
        <title>What's In Ear | Tracks</title>
      </Head>
      <PageNavigationHeader title="Tracks" />
      <div className={styles.mainHeroOptionsContainer}>
        <RadioGroup
          onRadioChange={(selectedRadio) =>
            setSelectedTerm(selectedRadio.value)
          }
          values={options}
        />
      </div>
      {cardData[selectedTerm].length ? (
        <section className={styles.mainHeroCardsContent}>
          {cardData[selectedTerm].map((track, index) => (
            <Card
              position={index + 1}
              key={track.id}
              cover={track.album.images[0].url}
              title={track.name}
              description={`${track.artists
                .map((artist) => artist.name)
                .join(", ")}`}
              preview={track.preview_url}
              link={track.external_urls.spotify}
            />
          ))}
        </section>
      ) : (
        <EmptyContent />
      )}
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

  const shortTermResponse = await api.get("/me/top/tracks", {
    params: { limit: 10, time_range: "short_term" },
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  });

  const mediumTermResponse = await api.get("/me/top/tracks", {
    params: { limit: 10, time_range: "medium_term" },
    headers: { Authorization: `Bearer ${session.user.accessToken}` },
  });

  const longTermResponse = await api.get("/me/top/tracks", {
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
