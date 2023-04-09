import React, { useMemo } from "react";

import { TreemapCellInfo, TreemapCellOptions } from "./utils/interface";
import { TreemapManager } from "./utils/treemap-manager";
import { TreemapMode } from "../interfaces";
import { useElementSize } from "../utils/hooks/size";

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
  // size
  size?: number;
  // TEST
  baseRate?: number;
}

export const Treemap: React.FC<Props> = ({ className, gap, dataValueKey, render, data, baseRate, maxCells, minCellValue, mode, size: cols = 50 }) => {
  const [squareRef, { width, height }] = useElementSize();

  const innerDataValueKey = useMemo(() => {
    return mode === "none" ? "value" : dataValueKey;
  }, [dataValueKey, mode]);

  const innerData = useMemo(() => {
    return mode === "none"
      ? data.map(() => {
          return {
            value: 1,
          };
        })
      : data;
  }, [data, mode]);

  const rows = useMemo(() => {
    if (width && height) {
      return Math.round(cols * (height / width));
    }
    return cols;
  }, [cols, width, height]);

  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      boxSizing: "border-box",
      gap,
    };
  }, [rows, cols, gap]);

  const cells = useMemo<TreemapCellInfo[]>(() => {
    const manager = new TreemapManager();
    manager.init(rows, cols, innerData, innerDataValueKey, baseRate, maxCells, minCellValue);
    return manager.cards;
  }, [rows, cols, innerData, innerDataValueKey, baseRate, maxCells, minCellValue]);

  return (
    <div style={rootStyle} className={className} ref={squareRef}>
      {cells.map(({ rect, record, minValue, maxValue, value }, i) => {
        const { left, top, width, height } = rect;
        const cellStyle: React.CSSProperties = { gridColumn: `${left + 1} / ${width + 1}`, gridRow: `${top + 1} / ${height + 1}` };
        return render(cellStyle, record, i, { left, top, width, height, minValue, maxValue, value });
      })}
    </div>
  );
};
