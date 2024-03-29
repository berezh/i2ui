import React, { CSSProperties, ReactNode, useMemo } from "react";

import { TreemapCellInfo, TreemapCellOptions } from "./utils/interface";
import { TreemapManager } from "./utils/treemap-manager";
import { TreemapMode } from "../interfaces";
import { useElementSize } from "../utils/hooks/size";

interface Props {
  className?: string;
  gap?: number;
  dataValueKey: string;
  data: any[];
  render: (style: CSSProperties, record: any, index: number, rect: TreemapCellOptions) => ReactNode;
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

export const Treemap: React.FC<Props> = ({ className, gap, dataValueKey, render, data, baseRate, maxCells, minCellValue, mode, size: cols = 30 }) => {
  const [squareRef, { width, height }] = useElementSize();

  const size = useMemo(() => {
    const count = data?.length || 0;
    if (width && height) {
      if (mode === "none") {
        const totalS = width * height;
        const cellS = Math.ceil(Math.sqrt(totalS / count));
        const cols = Math.round(width / cellS);
        const rows = Math.ceil(count / cols);
        return [cols, rows];
      } else {
        const radio = height / width;
        return [cols, Math.round(cols * radio)];
      }
    }

    if (mode === "none") {
      const edge = Math.ceil(Math.sqrt(count));
      return [edge, edge];
    } else {
      return [cols, cols];
    }
  }, [cols, width, height, mode, data]);

  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${size[0]}, 1fr)`,
      gridTemplateRows: `repeat(${size[1]}, 1fr)`,
      boxSizing: "border-box",
      gap,
    };
  }, [size, gap]);

  const cells = useMemo<TreemapCellInfo[]>(() => {
    const manager = new TreemapManager();
    manager.init(size[1], cols, data, dataValueKey, baseRate, maxCells, minCellValue);
    return manager.cards;
  }, [size, data, dataValueKey, baseRate, maxCells, minCellValue]);

  return (
    <div style={rootStyle} className={className} ref={squareRef}>
      {cells.map(({ rect, record, minValue, maxValue, value }, i) => {
        const { left, top, width, height } = rect;
        const cellStyle: React.CSSProperties =
          mode === "none" ? {} : { gridColumn: `${left + 1} / ${width + 1}`, gridRow: `${top + 1} / ${height + 1}` };
        return render(cellStyle, record, i, { left, top, width, height, minValue, maxValue, value });
      })}
    </div>
  );
};
