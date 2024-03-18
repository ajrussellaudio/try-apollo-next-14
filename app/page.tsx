import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

const query = gql`
  query ExampleQuery {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

type AllFilmsResponse = {
  allFilms: {
    films: Array<{ id: string; title: string }>;
  };
};

export default async function Home() {
  const { data } = await getClient().query<AllFilmsResponse>({ query });

  return (
    <ul>
      {data.allFilms.films.map((film) => (
        <li key={film.id}>{film.title}</li>
      ))}
    </ul>
  );
}
