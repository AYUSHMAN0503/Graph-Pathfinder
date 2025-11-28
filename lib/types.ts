export interface NodeData {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isWeight: boolean;
  distance: number;
  totalDistance: number;
  isVisited: boolean;
  isPath: boolean;
  previousNode: NodeData | null;
}
