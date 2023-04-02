import React, { useMemo } from "react";

import { GridCardInfo, GridCellMeta } from "./utils/interface";
import { TreemapManager } from "./utils/treemap-manager";

interface Props {
  className?: string;
  rows?: number;
  cols?: number;
  gap?: number;
  dataValueKey?: string;
  data: any[];
  render: (style: React.CSSProperties, record: any, index: number, rect: GridCellMeta) => React.ReactNode;
  // maximum cells to display
  maxCells?: number;
  // minimum cell's value to display
  minCellValue?: number;
  // TEST
  baseRate?: number;
}

export const Treemap: React.FC<Props> = ({ className, rows = 100, cols = 100, gap, dataValueKey = "value", render, data, baseRate, maxCells, minCellValue }) => {
  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      boxSizing: "border-box",
      gap,
    };
  }, [rows, cols, gap]);

  const cells = useMemo<GridCardInfo[]>(() => {
    const manager = new TreemapManager();
    manager.init(rows, cols, data, dataValueKey, baseRate, maxCells, minCellValue);
    return manager.cards;
  }, [rows, cols, data, dataValueKey, baseRate, maxCells, minCellValue]);

  return (
    <div style={rootStyle} className={className}>
      {cells.map(({ rect, record }, i) => {
        const { left, top, width, height } = rect;
        const cellStyle: React.CSSProperties = { gridColumn: `${left + 1} / ${width + 1}`, gridRow: `${top + 1} / ${height + 1}` };
        return render(cellStyle, record, i, { left, top, width, height, rootRate: 0, rootSquare: 0 });
      })}
    </div>
  );
};
