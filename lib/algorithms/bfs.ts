import { NodeData } from "../types";
import { getNeighbors } from "../utils";

export function bfs(grid: NodeData[][], startNode: NodeData, endNode: NodeData) {
  const visitedNodesInOrder: NodeData[] = [];
  const queue: NodeData[] = [];

  // Initialize start node
  startNode.distance = 0;
  startNode.isVisited = true;
  queue.push(startNode);
  visitedNodesInOrder.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!currentNode) break;

    // If we reached the end, we are done
    if (currentNode === endNode) return visitedNodesInOrder;

    // getNeighbors handles filtering out walls and visited nodes
    const neighbors = getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      neighbor.distance = currentNode.distance + 1;
      visitedNodesInOrder.push(neighbor);
      queue.push(neighbor);
      
      if (neighbor === endNode) return visitedNodesInOrder;
    }
  }
  return visitedNodesInOrder;
}