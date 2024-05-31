import axios from "axios";
import {fireEvent, render, screen} from '@testing-library/react';
import { starWarsApi } from "@/actions/StarWarsApi";
import { Hero } from "@/types/starWars";
import HeroItem from "@/components/HeroItem";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.create.mockImplementation(() => axios);

interface TestData {
  results: Hero[];
  next: string | null;
}
const testData: TestData = {
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

describe("fetchData", () => {
  it("fetches heroes data", async () => {
    const resp = { data: testData };
    mockedAxios.get.mockResolvedValue(resp);
    const result = await starWarsApi.getHeroes();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(testData);
  });
});
