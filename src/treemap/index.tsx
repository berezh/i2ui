import React, { useEffect, useMemo } from "react";

import { GridCardInfo, GridCellMeta } from "./utils/interface";
import { TreemapManager } from "./utils/treemap-manager";

interface Props {
  className?: string;
  rows?: number;
  cols?: number;
  gap?: number;
  valueDataIndex?: string;
  data: any[];
  render: (style: React.CSSProperties, record: any, index: number, rect: GridCellMeta) => React.ReactNode;
}

export const Treemap: React.FC<Props> = ({ className, rows = 100, cols = 100, gap, valueDataIndex = "value", render: renderCell, data }) => {
  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap,
    };
  }, [rows, cols, gap]);

  const cells = useMemo<GridCardInfo[]>(() => {
    const manager = new TreemapManager();
    manager.init(rows, cols, data, valueDataIndex);
    return manager.cards;
  }, [rows, cols, data, valueDataIndex]);

  useEffect(() => {
    console.info("TREEMAP", className, rows, cols, gap, valueDataIndex, data.length);
  }, [className, rows, cols, gap, valueDataIndex, data]);

  return (
    <div style={rootStyle} className={className}>
      {cells.map(({ rect, record }, i) => {
        const { left, top, width, height } = rect;
        const cellStyle: React.CSSProperties = { gridColumn: `${left + 1} / ${width + 1}`, gridRow: `${top + 1} / ${height + 1}` };
        return renderCell(cellStyle, record, i, { left, top, width, height, rootRate: 0, rootSquare: 0 });
      })}
    </div>
  );
};
