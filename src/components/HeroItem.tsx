import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import Button from "@mui/material/Button";
import { useState } from "react";
import { starWarsApi } from "@/actions/StarWarsApi";
import { Hero } from "@/types/starWars";

interface DataNode {
  id: string;
  style: { width: number };
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
}

interface EdgeItem {
  id: string;
  source: string;
  target: string;
}

function HeroItem({ hero }: { hero: Hero }) {
  const [isExtended, setIsExtended] = useState(false);
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [edges, setEdges] = useState<EdgeItem[]>([]);

  const addNode = (arr: any[], position: { x: number; y: number }) => {
    const nodeSet = arr.map((item: any, i) => ({
      id: item.id + "",
      style: { width: 200 },
      position: {
        x: i * position.x,
        y: +position.y,
      },
      data: {
        label: item.title || item.name,
      },
    }));
    return nodeSet;
  };

  const addEdge = (parrentArr: any[], childArr: any[], key: string) => {
    const edgeSet = childArr.map((childItem: any) => ({
      id: Math.random().toString(),
      source: parrentArr
        .find((parrentItem: any) => parrentItem[key].includes(childItem.id))
        .id.toString(),
      target: childItem.id.toString(),
    }));

    return edgeSet;
  };

  const loadFilms = async () => {
    const { results } = await starWarsApi.getFilms(hero.films.join());
    return results;
  };

  const loadShips = async () => {
    const { results } = await starWarsApi.getShips(hero.starships.join());
    return results;
  };

  const switchExtension = () => {
    setIsExtended((prev) => !prev);
    if (dataNodes.length) return;
    extendGraph();
  };

  const extendGraph = async () => {
    const films = await loadFilms();
    const ships = await loadShips();

    const heroNode = addNode([hero], { x: 0, y: 0 });
    const filmsNode = addNode(films, { x: 300, y: 100 });
    const shipsNode = addNode(ships, { x: 300, y: 200 });

    const filmsEdge = addEdge([hero], films, "films");
    const shipsEdge = addEdge(films, ships, "starships");

    setDataNodes([...heroNode, ...filmsNode, ...shipsNode]);
    setEdges([...filmsEdge, ...shipsEdge]);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{hero.name}</TableCell>
        <TableCell className="hidden md:table-cell">{hero.gender}</TableCell>
        <TableCell>{hero.birth_year}</TableCell>
        <TableCell>
          <Button size="small" variant="outlined" onClick={switchExtension}>
            {isExtended ? "Reduce" : "Extend"}
          </Button>
        </TableCell>
      </TableRow>

      {isExtended && (
        <TableRow>
          <TableCell
            colSpan={4}
            style={{
              width: "100vw",
              height: "50vh",
              backgroundColor: "#18183c",
            }}
          >
            <ReactFlow nodes={dataNodes} edges={edges} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default HeroItem;
