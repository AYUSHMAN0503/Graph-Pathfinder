import { NodeData } from "./types";

export const createGrid = (rows: number, cols: number): NodeData[][] => {
  const grid: NodeData[][] = [];
  for (let r = 0; r < rows; r++) {
    const currentRow: NodeData[] = [];
    for (let c = 0; c < cols; c++) {
      currentRow.push({
        row: r,
        col: c,
        isStart: r === 5 && c === 5,
        isEnd: r === 5 && c === 15,
        isWall: false,
        isWeight: false,
        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,
        isPath: false,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getNeighbors = (node: NodeData, grid: NodeData[][]): NodeData[] => {
  const neighbors: NodeData[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((n) => !n.isVisited && !n.isWall);
};
