import React, { useMemo } from "react";

import { TreemapCellInfo, TreemapCellOptions } from "./utils/interface";
import { TreemapManager } from "./utils/treemap-manager";
import { TreemapMode } from "../interfaces";

interface Props {
  className?: string;
  rows?: number;
  cols?: number;
  gap?: number;
  dataValueKey?: string;
  data: any[];
  render: (style: React.CSSProperties, record: any, index: number, rect: TreemapCellOptions) => React.ReactNode;
  // maximum cells to display
  maxCells?: number;
  // minimum cell's value to display
  minCellValue?: number;
  // mode
  mode?: TreemapMode;
  // TEST
  baseRate?: number;
}

export const Treemap: React.FC<Props> = ({ className, rows = 100, cols = 100, gap, dataValueKey = "value", render, data, baseRate, maxCells, minCellValue, mode }) => {
  const rootStyle = useMemo<React.CSSProperties>(() => {
    let gridRows = rows;
    let gridCols = cols;
    if (mode === "none") {
      gridRows = gridCols = Math.ceil(Math.sqrt(data.length));
    }

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      gridTemplateRows: `repeat(${gridRows}, 1fr)`,
      boxSizing: "border-box",
      gap,
    };
  }, [rows, cols, gap, mode]);

  const cells = useMemo<TreemapCellInfo[]>(() => {
    const manager = new TreemapManager();
    manager.init(rows, cols, data, dataValueKey, baseRate, maxCells, minCellValue);
    return manager.cards;
  }, [rows, cols, data, dataValueKey, baseRate, maxCells, minCellValue]);

  return (
    <div style={rootStyle} className={className}>
      {cells.map(({ rect, record, minValue, maxValue, value }, i) => {
        const { left, top, width, height } = rect;
        const cellStyle: React.CSSProperties = mode === "none" ? {} : { gridColumn: `${left + 1} / ${width + 1}`, gridRow: `${top + 1} / ${height + 1}` };
        return render(cellStyle, record, i, { left, top, width, height, minValue, maxValue, value });
      })}
    </div>
  );
};
