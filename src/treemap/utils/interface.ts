export interface TreemapCellInfo {
  record: any;
  rect: TreemapCellRect;
  value: number;
  minValue: number;
  maxValue: number;
}

export interface TreemapCellRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TreemapCellOptions extends TreemapCellRect {
  minValue: number;
  maxValue: number;
  value: number;
}
