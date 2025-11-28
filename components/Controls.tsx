import React from 'react';

interface ControlsProps {
  visualizeDijkstra: () => void;
  visualizeAStar: () => void;
  clearGrid: () => void;
  clearPath: () => void;
  exportGrid: () => void;
  importGrid: (e: React.ChangeEvent<HTMLInputElement>) => void;
  speed: number;
  setSpeed: (val: number) => void;
  isVisualizing: boolean;
}

export default function Controls({ 
  visualizeDijkstra, 
  visualizeAStar, 
  clearGrid, 
  clearPath,
  exportGrid,
  importGrid,
  speed, 
  setSpeed,
  isVisualizing 
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md mb-4 items-center justify-center">
      <div className="flex gap-2">
        <button 
          onClick={visualizeDijkstra} 
          disabled={isVisualizing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Visualize Dijkstra
        </button>
        <button 
          onClick={visualizeAStar} 
          disabled={isVisualizing}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          Visualize A*
        </button>
      </div>

      <div className="border-l border-gray-300 h-8 mx-2"></div>

      <button onClick={clearGrid} disabled={isVisualizing} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400">
        Reset Grid
      </button>
      <button onClick={clearPath} disabled={isVisualizing} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400">
        Clear Path
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-bold">Speed:</span>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="p-2 rounded border"
        >
          <option value={10}>Fast</option>
          <option value={30}>Medium</option>
          <option value={60}>Slow</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={exportGrid} className="px-3 py-1 bg-green-700 text-white text-sm rounded">Export JSON</button>
        <label className="px-3 py-1 bg-green-700 text-white text-sm rounded cursor-pointer">
          Import JSON
          <input type="file" accept=".json" onChange={importGrid} className="hidden" />
        </label>
      </div>
    </div>
  );
}
