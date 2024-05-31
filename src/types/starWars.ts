export interface Hero {
    id: number;
    name: string;
    gender: string;
    birth_year: string;
    films: number[];
    starships: number[];
}

export interface Film {
    id: number;
    title: string;
    episode_id: number;
    starships: number[];
}

export interface Ship {
    id: number;
    name: string;
    films: number[];
}