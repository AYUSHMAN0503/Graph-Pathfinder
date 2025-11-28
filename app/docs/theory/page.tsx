import React from 'react';

export default function TheoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 prose">
      <h1>Pathfinding Theory for Beginners</h1>

      <h2>1. Graph Theory Basics</h2>
      <p>
        A <strong>Graph</strong> is a collection of points (called <strong>Nodes</strong>) 
        connected by links (called <strong>Edges</strong>). Imagine a map: 
        each city is a node and each road is an edge connecting the nodes.
      </p>

      <ul>
        <li>
          <strong>Grid as a Graph:</strong> Every square on the grid is a node. 
          A node connects to its neighbors (Up, Down, Left, Right).
        </li>
        <li>
          <strong>Weighted vs Unweighted:</strong>  
          In an unweighted grid, every step costs the same (1).  
          In a weighted grid, some cells cost more (e.g., weight = 5).
        </li>
      </ul>

      <h2>2. Breadth-First Search (BFS)</h2>
      <p>
        <strong>The Goal:</strong> BFS finds the <strong>shortest path</strong> on 
        an <strong>unweighted</strong> grid. 
      </p>
      <p>
        BFS explores the grid <strong>level-by-level</strong>, using a 
        <strong>queue</strong>. This makes it perfect for:
      </p>
      <ul>
        <li>Finding the shortest path when all edges have equal cost</li>
        <li>Mazes without weights</li>
        <li>Social network “degrees of separation”</li>
        <li>Finding minimum moves in board games</li>
      </ul>
      <p><strong>How BFS works:</strong></p>
      <ol>
        <li>Start at the beginning node and push it into a queue.</li>
        <li>Take a node from the queue (FIFO).</li>
        <li>Visit all its neighbors.</li>
        <li>Mark neighbors as visited, record their <code>previousNode</code>.</li>
        <li>Repeat until you reach the target.</li>
      </ol>
      <p>
        Because BFS expands like ripples in water, 
        the first time it reaches the target, you are guaranteed the shortest path.
      </p>

      <h2>3. Depth-First Search (DFS)</h2>
      <p>
        <strong>The Goal:</strong> DFS explores the grid by going as deep as 
        possible before backtracking. DFS is <strong>not guaranteed</strong> 
        to find the shortest path.
      </p>
      <p>
        DFS uses a <strong>stack</strong> (or recursion) and is ideal for:
      </p>
      <ul>
        <li>Exploring all reachable cells</li>
        <li>Maze generation (backtracking)</li>
        <li>Detecting connected components</li>
        <li>Solving puzzles like Sudoku</li>
      </ul>

      <p><strong>How DFS works:</strong></p>
      <ol>
        <li>Start at a node and dive into one direction.</li>
        <li>Keep going until you hit a wall or a visited node.</li>
        <li>Backtrack to the last fork.</li>
        <li>Try another direction.</li>
        <li>Continue until the target is reached or all nodes are explored.</li>
      </ol>

      <p>
        DFS does not guarantee the shortest path, but it shows 
        <strong>deep exploration</strong> and creates dramatic visualizations.
      </p>

      <h2>4. Dijkstra's Algorithm</h2>
      <p><strong>The Goal:</strong> Find the shortest path on a 
      <strong>weighted</strong> grid.</p>

      <p><strong>How it works:</strong></p>
      <ol>
        <li>Start distance = 0. All others = Infinity.</li>
        <li>Pick the unvisited node with the smallest distance.</li>
        <li>Relax its neighbors: <code>newDist = currentDist + weight</code>.</li>
        <li>Update if the new distance is smaller.</li>
        <li>Repeat until reaching the target.</li>
      </ol>

      <p><strong>Analogy:</strong> Water flowing outward from the start node. 
      The moment the water hits the target, that is the shortest path.</p>

      <h2>5. A* (A-Star) Algorithm</h2>
      <p><strong>The Goal:</strong> Find the shortest path 
      <strong>faster</strong> than Dijkstra.</p>

      <p><strong>The Secret:</strong> The Heuristic</p>
      <p>
        A* uses a “guess” of how far a node is from the goal. This is the 
        <strong>Manhattan Distance</strong>.
      </p>

      <ul>
        <li><strong>g score:</strong> Cost from start</li>
        <li><strong>h score:</strong> Estimated cost to end</li>
        <li><strong>f score:</strong> <strong>g + h</strong></li>
      </ul>

      <p>
        Nodes closer to the end are explored first — like a magnet pulling the 
        search toward the target.
      </p>

      <h2>6. Visualization Logic</h2>
      <ul>
        <li><strong>Blue Nodes:</strong> The algorithm's visited nodes.</li>
        <li><strong>Yellow Nodes:</strong> The shortest path reconstructed using 
        <code>previousNode</code>.</li>
        <li>
          The grid animates each step to show the algorithm’s decision-making 
          process in real time.
        </li>
      </ul>

    </div>
  );
}
