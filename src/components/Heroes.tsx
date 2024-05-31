import { starWarsApi } from "@/actions/StarWarsApi";
import { HeroesTable } from "./HeroesTable";


export default async function Heroes() {
  const heroes = (await starWarsApi.getHeroes()).results;
  return (
    <>
      <HeroesTable initialHeroes={heroes} />
    </>
  );
}
