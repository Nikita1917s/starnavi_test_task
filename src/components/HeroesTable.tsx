/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Hero } from "@/types/starWars";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import HeroItem  from "./HeroItem";
import { starWarsApi } from "@/actions/StarWarsApi";

const initialPage = 2;

export function HeroesTable({ initialHeroes }: { initialHeroes: Hero[] }) {
  const [heroes, setHeroes] = useState<Hero[]>(initialHeroes);
  const [page, setPage] = useState<number | null>(initialPage);
  const { ref, inView } = useInView();

  const loadMoreHeroes = async () => {
    if (page === null) {
      return;
    }
    const result = await starWarsApi.getHeroes(page);
    setHeroes([...heroes, ...result.results]);
    setPage(result.next === null ? null : page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreHeroes();
    }
  }, [inView]);

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">
                Date of Birdth
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroes.map((hero) => (
              <HeroItem key={hero.id} hero={hero} />
            ))}
          </TableBody>
        </Table>
        {page !== null && <div ref={ref}>Loading...</div>}
      </form>
    </>
  );
}
