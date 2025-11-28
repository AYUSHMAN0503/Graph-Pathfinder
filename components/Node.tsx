import React from 'react';
import { NodeData } from '@/lib/types';

interface NodeProps {
  data: NodeData;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export default function Node({ data, onMouseDown, onMouseEnter, onMouseUp }: NodeProps) {
  const { row, col, isStart, isEnd, isWall, isVisited, isPath, isWeight } = data;

  let extraClass = "bg-white";

  if (isStart) extraClass = "bg-green-500 border-green-600";
  else if (isEnd) extraClass = "bg-red-500 border-red-600";
  else if (isWall) extraClass = "bg-black border-black";
  else if (isPath) extraClass = "bg-yellow-400 node-path";
  else if (isVisited) extraClass = "bg-blue-400 node-visited";
  else if (isWeight) extraClass = "bg-orange-400";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border border-gray-200 inline-block align-top ${extraClass}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    ></div>
  );
}
