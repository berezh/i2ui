import { GridRectUtil } from "./grid-rect";
import { GridCardInfo, GridCardRect } from "./interface";

export interface TmNode {
  rate: number;
  rootRate: number;
  rootSquare: number;
  record: any | undefined;
  rect: GridCardRect;
  children: TmNode[];
}

interface RateOption {
  __rate: number;
  [key: string]: any;
}

const SPLIT_RATIO = 0.5;

export class TreemapManager {
  private _count = 0;

  private _data: any[] = [];

  private _cols = 0;

  private _rows = 0;

  private _baseRate = 0;

  private _cards: GridCardInfo[] = [];

  private _valueDataIndex = "";

  public rootNode: TmNode = {
    rate: 0,
    rootRate: 0,
    rootSquare: 0,
    rect: { top: 0, left: 0, width: 100, height: 100 },
    record: undefined,
    children: [],
  };

  public get cards(): GridCardInfo[] {
    return this._cards;
  }

  public init(cols: number, rows: number, data: any[], valueDataIndex = "rate", baseRate = 0) {
    this._count = 0;
    this._cols = cols;
    this._rows = rows;
    this._data = data;
    this._valueDataIndex = valueDataIndex;
    this._baseRate = baseRate;
    this.refresh();
  }

  private getRecordRate(record: any): number {
    const rate = record[this._valueDataIndex];
    if (typeof rate === "number") {
      return rate;
    } else if (typeof rate === "string") {
      const fv = parseFloat(rate);
      if (fv.toString() === rate.toString()) {
        return fv;
      }
    }

    return 0;
  }

  public refresh() {
    const options = this._data
      .map<RateOption>(x => {
        return { ...x, __rate: this.getRecordRate(x) + this._baseRate };
      })
      .filter(x => {
        return x.__rate > 0;
      })
      .sort((a, b) => {
        return b.__rate - a.__rate;
      });

    const rootRectangle: GridCardRect = {
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

  private initNode(options: any[], rect: GridCardRect, rootRate: number, rootSquare: number): TmNode {
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

  private initCard(node: TmNode, cards: GridCardInfo[]) {
    if (node.record) {
      cards.push({
        record: node.record,
        rect: node.rect,
      });
    }
    node.children.forEach(x => {
      this.initCard(x, cards);
    });
  }
}
