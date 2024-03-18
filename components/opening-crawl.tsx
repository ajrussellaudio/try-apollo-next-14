"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query OpeningCrawlById($filmId: ID) {
    film(id: $filmId) {
      openingCrawl
    }
  }
`;

type OpeningCrawlResponse = {
  film: {
    openingCrawl: string;
  };
};

export function OpeningCrawl({ filmId }: { filmId: string }) {
  const { data } = useSuspenseQuery<OpeningCrawlResponse>(query, {
    variables: { filmId },
  });
  return (
    <section className="flex flex-col gap-2">
      {data.film.openingCrawl.split("\r\n\r\n").map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
}
