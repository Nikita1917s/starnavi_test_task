import axios from "axios";
import "@testing-library/jest-dom";
import "intersection-observer";

import { render } from "@testing-library/react";
import { starWarsApi } from "@/actions/StarWarsApi";
import {
  filmsData,
  heroesData,
  shipsData,
} from "../shared/config/testsMockData";
import { dataTestid as heroItemTestId } from "@/components/HeroItem";
import { HeroesTable } from "@/components/HeroesTable";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockImplementation(() => axios);

export interface TestData {
  next: string | null;
}

describe("fetchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("get heroes data", async () => {
    const response = { data: heroesData };
    mockedAxios.get.mockResolvedValue(response);
    const result = await starWarsApi.getHeroes();

    expect(mockedAxios.get).toHaveBeenCalledWith("people?page=1");
    expect(result).toEqual(heroesData);
  });

  it("get films data", async () => {
    const response = { data: filmsData };
    mockedAxios.get.mockResolvedValue(response);
    const result = await starWarsApi.getFilms("1");

    expect(mockedAxios.get).toHaveBeenCalledWith("films/?id__in=1");
    expect(result).toEqual(filmsData);
  });

  it("get ships data", async () => {
    const response = { data: shipsData };
    mockedAxios.get.mockResolvedValue(response);
    const result = await starWarsApi.getShips("1");

    expect(mockedAxios.get).toHaveBeenCalledWith("starships/?id__in=1");
    expect(result).toEqual(shipsData);
  });

  it("render heroItem", async () => {
    const { getByTestId } = render(
      <HeroesTable initialHeroes={heroesData.results} />
    );
    expect(getByTestId(heroItemTestId)).toBeInTheDocument();
  });
});
