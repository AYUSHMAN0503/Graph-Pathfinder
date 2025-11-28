"use client";

import React, { useState, useEffect } from "react";
import Node from "@/components/Node";
import Controls from "@/components/Controls";
import { NodeData } from "@/lib/types";
import { createGrid, sleep } from "@/lib/utils";
import { dijkstra, getNodesInShortestPathOrder } from "@/lib/algorithms/dijkstra";
import { aStar } from "@/lib/algorithms/astar";
import { bfs } from "@/lib/algorithms/bfs";
import { dfs } from "@/lib/algorithms/dfs";

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<NodeData[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [isVisualizing, setIsVisualizing] = useState(false);
  
  // Key to force re-render when importing
  const [gridKey, setGridKey] = useState(0);

  // Setup Grid on Mount
  useEffect(() => {
    setGrid(createGrid(20, 40));
  }, []);

  // --- Mouse Handlers for Drawing ---
  const handleMouseDown = (row: number, col: number) => {
    setMouseIsPressed(true);
    toggleNode(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    toggleNode(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // Helper to toggle Wall/Start/End/Weight
  const toggleNode = (row: number, col: number) => {
    if (isVisualizing) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map(r => r.map(n => ({ ...n })));
      const node = { ...newGrid[row][col] };

      const e = window.event as MouseEvent | undefined;

      if (e?.shiftKey) {
        // Move Start
        newGrid.forEach(r => r.forEach(n => n.isStart = false));
        node.isStart = true;
        node.isWall = false;
        node.isWeight = false;
      } else if (e?.altKey) {
        // Move Target
        newGrid.forEach(r => r.forEach(n => n.isEnd = false));
        node.isEnd = true;
        node.isWall = false;
        node.isWeight = false;
      } else if (e?.ctrlKey || e?.metaKey) {
        // Add Weight
        node.isWeight = !node.isWeight;
        node.isWall = false;
      } else {
        // Draw Wall
        if (!node.isStart && !node.isEnd) {
          node.isWall = !node.isWall;
          node.isWeight = false;
        }
      }

      newGrid[row][col] = node;
      return newGrid;
    });
  };

  // --- Animation Logic ---
  const animateAlgorithm = async (visitedNodes: NodeData[], shortestPath: NodeData[]) => {
    setIsVisualizing(true);

    // 1. Animate Visited Nodes
    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(n => ({ ...n })));
        newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isVisited: true };
        return newGrid;
      });
      await sleep(speed);
    }

    // 2. Animate Shortest Path
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(n => ({ ...n })));
        newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isPath: true };
        return newGrid;
      });
      await sleep(50); // Path always animates nicely
    }

    setIsVisualizing(false);
  };

  // --- Algorithm Handlers ---

  const runDijkstra = () => {
    if (isVisualizing) return;
    const { startNode, endNode } = getStartEndNodes();
    if (!startNode || !endNode) return;

    clearPath();
    const visitedNodes = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodes, shortestPath);
  };

  const runAStar = () => {
    if (isVisualizing) return;
    const { startNode, endNode } = getStartEndNodes();
    if (!startNode || !endNode) return;

    clearPath();
    const visitedNodes = aStar(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodes, shortestPath);
  };

  const runBFS = () => {
    if (isVisualizing) return;
    const { startNode, endNode } = getStartEndNodes();
    if (!startNode || !endNode) return;

    clearPath();
    const visitedNodes = bfs(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodes, shortestPath);
  };

  const runDFS = () => {
    if (isVisualizing) return;
    const { startNode, endNode } = getStartEndNodes();
    if (!startNode || !endNode) return;

    clearPath();
    const visitedNodes = dfs(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodes, shortestPath);
  };

  // --- Utilities ---
  const getStartEndNodes = () => {
    let startNode: NodeData | null = null;
    let endNode: NodeData | null = null;
    grid.forEach(row => {
      row.forEach(node => {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      });
    });
    return { startNode, endNode };
  };

  const clearGrid = () => {
    setGrid(createGrid(20, 40));
    setIsVisualizing(false);
    setGridKey(prev => prev + 1); 
  };

  const clearPath = () => {
    setGrid(prev => prev.map(row => row.map(node => ({
      ...node,
      distance: Infinity,
      totalDistance: Infinity,
      isVisited: false,
      isPath: false,
      previousNode: null
    }))));
  };

  const exportGrid = () => {
    const json = JSON.stringify(grid.map(row => row.map(node => ({
      row: node.row, col: node.col, isWall: node.isWall, isWeight: node.isWeight, isStart: node.isStart, isEnd: node.isEnd
    }))));
    const blob = new Blob([json], {type: "application/json"});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "grid-layout.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importGrid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        console.log("File read successfully, parsing...");
        const rawGrid = JSON.parse(event.target?.result as string);
        
        // 1. Create a fresh grid (This comes with defaults!)
        const newGrid = createGrid(20, 40);

        // 2. CRITICAL FIX: Wipe the default start/end nodes
        newGrid.forEach(row => row.forEach(node => {
          node.isStart = false;
          node.isEnd = false;
        }));

        // 3. Loop through the SAVED data
        rawGrid.forEach((row: any[], r: number) => {
          row.forEach((node: any, c: number) => {
            if (r < newGrid.length && c < newGrid[0].length) {
              // Copy properties over
              newGrid[r][c].isWall = node.isWall;
              newGrid[r][c].isWeight = node.isWeight;
              newGrid[r][c].isStart = node.isStart;
              newGrid[r][c].isEnd = node.isEnd;
            }
          });
        });

        console.log("Grid updated, setting state...");
        setGrid(newGrid);
        setGridKey(prev => prev + 1);

      } catch (err) {
        console.error("Error parsing JSON:", err);
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Graph Pathfinder</h1>

      <Controls 
        visualizeDijkstra={runDijkstra}
        visualizeAStar={runAStar}
        visualizeBFS={runBFS}
        visualizeDFS={runDFS}
        clearGrid={clearGrid}
        clearPath={clearPath}
        exportGrid={exportGrid}
        importGrid={importGrid}
        speed={speed}
        setSpeed={setSpeed}
        isVisualizing={isVisualizing}
      />

      <div className="flex gap-4 mb-2 text-sm">
        <div className="flex items-center"><div className="w-4 h-4 bg-green-500 mr-1"></div> Start (Shift+Click)</div>
        <div className="flex items-center"><div className="w-4 h-4 bg-red-500 mr-1"></div> Target (Alt+Click)</div>
        <div className="flex items-center"><div className="w-4 h-4 bg-black mr-1"></div> Wall (Click)</div>
        <div className="flex items-center"><div className="w-4 h-4 bg-orange-400 mr-1"></div> Weight (Ctrl+Click)</div>
        <div className="flex items-center"><div className="w-4 h-4 bg-blue-400 mr-1"></div> Visited</div>
        <div className="flex items-center"><div className="w-4 h-4 bg-yellow-400 mr-1"></div> Path</div>
      </div>

      <div 
        key={gridKey}
        className="grid gap-[1px] bg-gray-200 border border-gray-400 p-1"
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((node, nodeIdx) => (
              <Node
                key={`${rowIdx}-${nodeIdx}`}
                data={node}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-2">Documentation</h2>
        <div className="bg-white p-6 rounded shadow border">
            <p className="mb-2">See <a href="/docs/theory" className="text-blue-600 underline">Graph Theory Documentation</a> for simple explanations of how this works.</p>
        </div>
      </div>
    </div>
  );
}