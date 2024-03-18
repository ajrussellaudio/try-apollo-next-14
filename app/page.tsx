import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <main className="max-w-md mx-auto">
      <Accordion type="single" collapsible>
        {data.allFilms.films.map((film) => (
          <AccordionItem key={film.id} value={film.id}>
            <AccordionTrigger>{film.title}</AccordionTrigger>
            <AccordionContent>More info for {film.title}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
