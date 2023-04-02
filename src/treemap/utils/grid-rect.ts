import { TreemapCellRect } from "./interface";

export class GridRectUtil {
  public static rect(left: number, top: number, width: number, height: number): TreemapCellRect {
    return { left, top, width, height };
  }

  public static split(rect: TreemapCellRect, rate1: number, rate2: number): [TreemapCellRect, TreemapCellRect] {
    const horizontal = rect.width - rect.left;
    const vertical = rect.height - rect.top;
    const isVertical = vertical >= horizontal;
    const length = isVertical ? vertical : horizontal;
    const delta = Math.floor(length * (rate1 / (rate1 + rate2)));

    if (isVertical) {
      const height = rect.top + delta;
      const result: [TreemapCellRect, TreemapCellRect] = [
        {
          ...rect,
          height,
        },
        {
          ...rect,
          top: height,
        },
      ];

      // result.forEach(x => {
      //   x.top = 100 - x.top;
      //   x.height = 100 - x.height;
      // });

      return result;
    } else {
      const width = rect.left + delta;
      const result: [TreemapCellRect, TreemapCellRect] = [
        {
          ...rect,
          width,
        },
        {
          ...rect,
          left: width,
        },
      ];

      // result.forEach(x => {
      //   x.left = 100 - x.left;
      // });

      return result;
    }
  }

  public static square(rect: TreemapCellRect): number {
    const { width, left, height, top } = rect;
    const horizontal = width - left;
    const vertical = height - top;
    return horizontal * vertical;
  }
}
