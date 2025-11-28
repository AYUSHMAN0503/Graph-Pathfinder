import { NodeData } from "../types";
import { getNeighbors } from "../utils";

export function dfs(grid: NodeData[][], startNode: NodeData, endNode: NodeData) {
  const visitedNodesInOrder: NodeData[] = [];
  const stack: NodeData[] = [];

  stack.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!currentNode) break;

    // If already visited (can happen if added to stack multiple times via different paths), skip
    if (currentNode.isVisited) continue;
    if (currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder;

    // Get neighbors (filters out walls and already visited)
    const neighbors = getNeighbors(currentNode, grid);
    
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}