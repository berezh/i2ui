import { I2NumberSplitGroup, I2NumberSplitOptions } from "../interfaces";

export class NumberUtil {
  public static toFloat(value: number | string | undefined): number | undefined {
    if (typeof value === "string") {
      const tryNumberValue = parseFloat(value);
      return value === tryNumberValue.toString() ? tryNumberValue : undefined;
    }

    return value;
  }

  public static anyToFloat(value: any): number {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      const tryNumberValue = parseFloat(value);
      if (tryNumberValue.toString() === value.toString()) {
        return tryNumberValue;
      }
    }

    return 0;
  }

  public static toGroups(integer: string, groupDigits?: number): string[] {
    if (groupDigits === 0) {
      return [integer];
    }
    const digits = Math.abs(groupDigits || 3);
    const output: RegExpMatchArray | null = integer.match(new RegExp(`(\\d\+\?)(\?\=(\\d{${digits}})\+(\?\!\\d)\|\$)`, "g"));
    // integer.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    return output ? output : [];
  }

  public static splitNumber(value: string | number | undefined, options: I2NumberSplitOptions): I2NumberSplitGroup[] {
    const result: I2NumberSplitGroup[] = [];

    const numberValue = NumberUtil.toFloat(value);

    if (numberValue !== undefined) {
      const { decimalDigits, groupSeparator = ",", decimalSeparator, groupDigits } = options;
      const stringValue: string = numberValue.toFixed(decimalDigits || 0);
      const splits: string[] = stringValue.split(".");
      if (splits.length > 0) {
        const groups = NumberUtil.toGroups(splits[0], groupDigits);
        for (let i = 0; i < groups.length; i++) {
          result.push({
            text: groups[i],
            separator: i > 0 ? (groupSeparator === undefined ? undefined : groupSeparator) : undefined,
          });
        }

        if (splits.length === 2) {
          const fraction = splits[1];
          if (fraction) {
            result.push({
              text: fraction,
              isFraction: true,
              separator: decimalSeparator || ".",
            });
          }
        }
      }
    }

    return result;
  }

  public static splitNumberSet(
    value: string | number | undefined,
    basicValue: string | number | undefined,
    options: I2NumberSplitOptions
  ): [I2NumberSplitGroup[], I2NumberSplitGroup[]] {
    return [NumberUtil.splitNumber(value, options), NumberUtil.splitNumber(basicValue, options)];
  }
}
