import { NodeData } from "../types";
import { getNeighbors } from "../utils";

function calculateManhattanDistance(nodeA: NodeData, nodeB: NodeData) {
  const x = Math.abs(nodeA.row - nodeB.row);
  const y = Math.abs(nodeA.col - nodeB.col);
  return x + y;
}

export function aStar(grid: NodeData[][], startNode: NodeData, endNode: NodeData) {
  const visitedNodesInOrder: NodeData[] = [];
  startNode.distance = 0;
  startNode.totalDistance = 0;
  const unvisitedNodes: NodeData[] = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) break;
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateNeighborsAStar(closestNode, endNode, grid);
  }
  return visitedNodesInOrder;
}

function updateNeighborsAStar(node: NodeData, endNode: NodeData, grid: NodeData[][]) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    const weight = neighbor.isWeight ? 5 : 1;
    const tentativeDistance = node.distance + weight;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      const heuristic = calculateManhattanDistance(neighbor, endNode);
      neighbor.totalDistance = tentativeDistance + heuristic;
      neighbor.previousNode = node;
    }
  }
}
