import { NodeData } from "../types";
import { getNeighbors } from "../utils";

export function dijkstra(grid: NodeData[][], startNode: NodeData, endNode: NodeData) {
  const visitedNodesInOrder: NodeData[] = [];
  startNode.distance = 0;
  const unvisitedNodes: NodeData[] = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) break;
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }

  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node: NodeData, grid: NodeData[][]) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    const weight = neighbor.isWeight ? 5 : 1;
    const newDistance = node.distance + weight;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }
  }
}

export function getNodesInShortestPathOrder(endNode: NodeData) {
  const nodesInShortestPathOrder: NodeData[] = [];
  let currentNode: NodeData | null = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
