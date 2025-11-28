import { expect, test, describe } from 'vitest';
import { createGrid } from '../lib/utils';
import { dijkstra } from '../lib/algorithms/dijkstra';
import { aStar } from '../lib/algorithms/astar';

const getNodes = () => {
  const grid = createGrid(5, 5);
  const start = grid[0][0];
  const end = grid[4][4];
  return { grid, start, end };
};

describe('Dijkstra Algorithm', () => {
  test('should find a path in an empty grid', () => {
    const { grid, start, end } = getNodes();
    const visitedNodes = dijkstra(grid, start, end);
    expect(end.isVisited).toBe(true);
    expect(end.previousNode).not.toBeNull();
  });

  test('should avoid walls', () => {
    const { grid, start, end } = getNodes();
    grid[0][1].isWall = true;
    grid[1][0].isWall = true;
    dijkstra(grid, start, end);
    expect(end.isVisited).toBe(false);
  });
});

describe('A* Algorithm', () => {
  test('should find a path', () => {
    const { grid, start, end } = getNodes();
    aStar(grid, start, end);
    expect(end.isVisited).toBe(true);
  });

  test('should calculate costs correctly with weights', () => {
    const { grid, start, end } = getNodes();
    grid[0][1].isWeight = true; // Cost 5
    aStar(grid, start, end);
    expect(grid[0][1].distance).toBe(5);
  });
});
