export interface GridCardInfo {
  record: any;
  rect: GridCardRect;
}

export interface GridCardRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface GridCellMeta extends GridCardRect {
  rootRate: number;
  rootSquare: number;
}
