import { TreemapCellRect } from "../src";
import { GridRectUtil } from "../src/treemap/utils/grid-rect";

function splitTest(rect: TreemapCellRect, rate1: number, rate2: number, result1: TreemapCellRect, result2: TreemapCellRect) {
  expect(GridRectUtil.split(rect, rate1, rate2)).toEqual<[TreemapCellRect, TreemapCellRect]>([result1, result2]);
}

describe("GridRectUtil", () => {
  describe("split", () => {
    test("simple vertical", () => {
      const rect = GridRectUtil.rect(0, 0, 100, 100);

      splitTest(
        rect,
        50,
        50,
        {
          ...rect,
          height: 50,
        },
        {
          ...rect,
          top: 50,
        }
      );
    });

    test("simple horizontal", () => {
      const rect = GridRectUtil.rect(0, 0, 100, 50);

      splitTest(
        rect,
        50,
        50,
        {
          ...rect,
          width: 50,
        },
        {
          ...rect,
          left: 50,
        }
      );
    });

    test("real 1", () => {
      const rect = GridRectUtil.rect(65, 62, 100, 100);
      splitTest(rect, 407386, 276956, GridRectUtil.rect(65, 62, 100, 84), GridRectUtil.rect(65, 84, 100, 100));
    });

    test("real 2", () => {
      const rect = GridRectUtil.rect(65, 63, 100, 85);
      splitTest(rect, 243626, 163760, GridRectUtil.rect(65, 63, 85, 85), GridRectUtil.rect(85, 63, 100, 85));
    });
  });
});
