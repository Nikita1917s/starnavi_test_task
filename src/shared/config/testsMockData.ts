import { Film, Hero, Ship } from "@/types/starWars";
import { TestData } from "../../__tests__/heroes.test";

interface HeroesData extends TestData {
  results: Hero[];
}

export const heroesData: HeroesData = {
  results: [
    {
      id: 1,
      name: "test",
      gender: "Male",
      birth_year: "1996",
      films: [],
      starships: [],
    },
  ],
  next: null,
};

interface FilmsData extends TestData {
  results: Film[];
}

export const filmsData: FilmsData = {
  results: [
    {
      id: 1,
      title: "test",
      episode_id: 1,
      starships: [1],
    },
  ],
  next: null,
};

interface ShipsData extends TestData {
  results: Ship[];
}

export const shipsData: ShipsData = {
  results: [
    {
      id: 1,
      name: "test",
      films: [1],
    },
  ],
  next: null,
};
