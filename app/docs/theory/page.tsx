import React from 'react';

export default function TheoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 prose">
      <h1>Pathfinding Theory for Beginners</h1>

      <h2>1. Graph Theory Basics</h2>
      <p>
        A <strong>Graph</strong> is just a collection of objects (called <strong>Nodes</strong>) connected by lines (called <strong>Edges</strong>).
        Imagine a map of cities. Each city is a Node, and the roads connecting them are Edges.
      </p>
      <ul>
        <li><strong>Grid as a Graph:</strong> In our visualizer, every square is a Node. It connects to its neighbors (Up, Down, Left, Right).</li>
        <li><strong>Weighted vs Unweighted:</strong> 
          In an unweighted graph, every step costs the same (e.g., 1). 
          In a weighted graph, some steps are "harder" (e.g., walking through mud costs 5, walking on pavement costs 1).
        </li>
      </ul>

      <h2>2. Dijkstra's Algorithm</h2>
      <p><strong>The Goal:</strong> Find the shortest path from Point A to Point B.</p>
      <p><strong>How it works (The Priority Queue Logic):</strong></p>
      <ol>
        <li>Start at the beginning. Set its distance to 0. Set everyone else's distance to Infinity (unknown).</li>
        <li>Look at all unvisited nodes. Pick the one with the smallest distance (initially, this is the Start node).</li>
        <li>Look at its neighbors. Calculate: <em>Current Distance + Step Cost</em>.</li>
        <li><strong>Relaxation:</strong> If this calculated number is smaller than what the neighbor currently has, update the neighbor with the new, shorter distance.</li>
        <li>Repeat until you reach the target.</li>
      </ol>
      <p><strong>Analogy:</strong> Imagine pouring water on the start node. It spreads evenly in all directions. The moment it touches the target, that is the shortest path.</p>

      <h2>3. A* (A-Star) Algorithm</h2>
      <p><strong>The Goal:</strong> Find the shortest path, but be smarter and faster than Dijkstra.</p>
      <p><strong>The Secret (Heuristic):</strong></p>
      <p>
        Dijkstra explores in a circle. A* explores directionally. It uses a "guess" (heuristic) to decide which node to check next.
      </p>
      <ul>
        <li><strong>g score:</strong> Exact cost from start to current node (like Dijkstra).</li>
        <li><strong>h score:</strong> Estimated cost from current node to end (Manhattan distance).</li>
        <li><strong>f score:</strong> g + h.</li>
      </ul>
      <p>
        A* always picks the node with the lowest <strong>f score</strong>. This makes it "magnetically attracted" to the target.
      </p>

      <h2>4. Visualization Logic</h2>
      <ul>
        <li><strong>Blue Nodes:</strong> These are nodes the algorithm checked/visited.</li>
        <li><strong>Yellow Path:</strong> Once the target is found, we trace backwards using the <code>previousNode</code> property stored on every node. We go from End -- Parent -- Parent -- Start.</li>
      </ul>
    </div>
  );
}
