import { api } from "@/shared/config/config";
import { Hero, Film, Ship } from "@/types/starWars";

class StarWarsApi {
  getHeroes = async (
    page: number = 1
  ): Promise<{ results: Hero[]; next: string | null }> => {
    try {
      const { data } = await api.get(`people?page=${page}`);
      return {
        results: data.results,
        next: data.next,
      };
    } catch (error: unknown) {
      console.log(error);
      throw new Error(`An error happened: ${error}`);
    }
  };

  getFilms = async (
    filmsId: string
  ): Promise<{ results: Film[]; next: string | null }> => {
    try {
      const { data } = await api.get(`films/?id__in=${filmsId}`);
      return {
        results: data.results,
        next: data.next,
      };
    } catch (error: unknown) {
      console.log(error);
      throw new Error(`An error happened: ${error}`);
    }
  };

  getShips = async (
    shipsId: string
  ): Promise<{ results: Ship[]; next: string | null }> => {
    try {
      const { data } = await api.get(`starships/?id__in=${shipsId}`);
      return {
        results: data.results,
        next: data.next,
      };
    } catch (error: unknown) {
      console.log(error);
      throw new Error(`An error happened: ${error}`);
    }
  };
}

export const starWarsApi = new StarWarsApi();
