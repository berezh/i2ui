import { RateOption } from "../../interfaces";
import { NumberUtil } from "../../utils";
import { GridRectUtil } from "./grid-rect";
import { TreemapCellInfo, TreemapCellRect } from "./interface";

export interface TmNode {
  rate: number;
  rootRate: number;
  rootSquare: number;
  record: any | undefined;
  rect: TreemapCellRect;
  children: TmNode[];
}

const SPLIT_RATIO = 0.5;

export class TreemapManager {
  private _count = 0;

  private _data: any[] = [];

  private _cols = 0;

  private _rows = 0;

  private _baseRate: number | undefined = undefined;

  private _maxCells: number | undefined = undefined;

  private _minCellValue: number | undefined = undefined;

  private _cards: TreemapCellInfo[] = [];

  private _minValue = 0;

  private _maxValue = 0;

  private _dataValueKey = "";

  public rootNode: TmNode = {
    rate: 0,
    rootRate: 0,
    rootSquare: 0,
    rect: { top: 0, left: 0, width: 100, height: 100 },
    record: undefined,
    children: [],
  };

  public get cards(): TreemapCellInfo[] {
    return this._cards;
  }

  public init(
    cols: number,
    rows: number,
    data: any[],
    dataValueKey = "",
    baseRate: number | undefined,
    maxCells?: number | undefined,
    minCellValue?: number | undefined
  ) {
    this._count = 0;
    this._cols = cols;
    this._rows = rows;
    this._data = data;
    this._dataValueKey = dataValueKey;
    this._baseRate = baseRate;
    this._maxCells = maxCells;
    this._minCellValue = minCellValue;
    this.refresh();
  }

  public refresh() {
    let options = this._data
      .map<RateOption>(x => {
        return { ...x, __rate: NumberUtil.anyToFloat(x[this._dataValueKey]) + (this._baseRate || 0) };
      })
      .filter(x => {
        return x.__rate > 0;
      })
      .sort((a, b) => {
        return b.__rate - a.__rate;
      });

    const rates = options.map(x => x.__rate);

    this._minValue = Math.min(...rates);
    this._maxValue = Math.max(...rates);

    if (typeof this._minCellValue === "number") {
      options = options.filter(x => x.__rate >= (this._minCellValue || 0));
    }

    if (typeof this._maxCells === "number") {
      options = options.slice(0, this._maxCells);
    }

    const rootRectangle: TreemapCellRect = {
      top: 0,
      left: 0,
      width: this._rows,
      height: this._cols,
    };
    const rootRate = options.reduce((sum, x) => sum + x.__rate, 0);
    this.rootNode = this.initNode(options, rootRectangle, rootRate, this._cols * this._rows);
    this._cards = [];
    this.initCard(this.rootNode, this._cards);
  }

  private initNode(options: any[], rect: TreemapCellRect, rootRate: number, rootSquare: number): TmNode {
    this._count++;
    const nodeRate = options.reduce((sum, x) => sum + x.__rate, 0);
    const children: TmNode[] = [];
    let record: any | undefined = undefined;

    if (options.length === 1) {
      record = options[0];
    }
    if (options.length === 2) {
      const o1 = options[0];
      const o2 = options[1];
      const [r1, r2] = GridRectUtil.split(rect, o1.__rate, o2.__rate);
      children.push({ rate: o1.__rate, rootRate, rootSquare, rect: r1, record: o1, children: [] });
      children.push({ rate: o2.__rate, rootRate, rootSquare, rect: r2, record: o2, children: [] });
    } else if (options.length > 2) {
      let splitRate = 0;
      let halfIndex = 0;
      for (const option of options) {
        halfIndex++;
        splitRate += option.__rate;
        if (splitRate >= nodeRate * SPLIT_RATIO) {
          break;
        }
      }
      const [r1, r2] = GridRectUtil.split(rect, splitRate, nodeRate - splitRate);
      children.push(this.initNode(options.slice(0, halfIndex), r1, rootRate, rootSquare));
      children.push(this.initNode(options.slice(halfIndex), r2, rootRate, rootSquare));
    }

    return {
      rate: nodeRate,
      rootRate,
      rootSquare,
      rect,
      record,
      children,
    };
  }

  private initCard(node: TmNode, cards: TreemapCellInfo[]) {
    if (node.record) {
      cards.push({
        value: node.rate,
        record: node.record,
        rect: node.rect,
        minValue: this._minValue,
        maxValue: this._maxValue,
      });
    }
    node.children.forEach(x => {
      this.initCard(x, cards);
    });
  }
}
