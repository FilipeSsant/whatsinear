import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { EmptyContent } from "../components/EmptyContent";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import { RadioGroup } from "../components/RadioGroup";
import { ArtistProps } from "../libs/ArtistsPageProps";
import { api } from "../services/api";
import styles from "./home.module.scss";

interface ArtistsPageProps {
  hasResError: boolean;
  shortTerm: ArtistProps[];
  mediumTerm: ArtistProps[];
  longTerm: ArtistProps[];
}

export default function ArtistsPage({
  hasResError,
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

  const cardData: Record<string, ArtistProps[]> = {
    short_term: shortTerm,
    medium_term: mediumTerm,
    long_term: longTerm,
  };

  useEffect(() => {
    if (hasResError) {
      signOut();
    }
  }, [hasResError]);

  return (
    <>
      <Head>
        <title>What's In Ear | Artists</title>
      </Head>
      <PageNavigationHeader title="Artists" />
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
          {cardData[selectedTerm].map((artist, index) => (
            <Card
              position={index + 1}
              key={artist.id}
              cover={artist.images[0].url}
              title={artist.name}
              description={artist.genres.join(", ")}
              handleClick={() =>
                window.open(artist.external_urls.spotify, "_blank")
              }
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

  let hasResError = false;

  let shortTermResponse = [];
  let mediumTermResponse = [];
  let longTermResponse = [];

  const headers = { Authorization: `Bearer ${session.user.accessToken}` };

  const promiseResult = Promise.all([
    api.get("/me/top/artists", {
      params: { limit: 10, time_range: "short_term" },
      headers,
    }),
    api.get("/me/top/artists", {
      params: { limit: 10, time_range: "medium_term" },
      headers,
    }),
    api.get("/me/top/artists", {
      params: { limit: 10, time_range: "long_term" },
      headers,
    }),
  ]);

  await promiseResult
    .then((response) => {
      shortTermResponse = response[0].data.items;
      mediumTermResponse = response[1].data.items;
      longTermResponse = response[2].data.items;
    })
    .catch(() => {
      hasResError = true;
    });

  return {
    props: {
      hasResError,
      shortTerm: shortTermResponse,
      mediumTerm: mediumTermResponse,
      longTerm: longTermResponse,
    },
  };
};
