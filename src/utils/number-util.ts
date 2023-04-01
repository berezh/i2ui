export interface I2NumberSplitGroup {
  text: string;
  separator?: string;
  isFraction?: boolean;
}

export interface I2NumberSplitOptions {
  decimalDigits?: number;
  groupSeparator?: string;
  decimalSeparator?: string;
  groupDigits?: number;
}

export class NumberUtil {
  public static toFloat(value: number | string | undefined): number | undefined {
    if (typeof value === "string") {
      const tryNumberValue = parseFloat(value);
      return value === tryNumberValue.toString() ? tryNumberValue : undefined;
    }

    return value;
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

  public static toGroups(integer: string, groupDigits?: number): string[] {
    if (groupDigits === 0) {
      return [integer];
    }
    const digits = Math.abs(groupDigits || 3);
    const output: RegExpMatchArray | null = integer.match(new RegExp(`(\\d\+\?)(\?\=(\\d{${digits}})\+(\?\!\\d)\|\$)`, "g"));
    // integer.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    return output ? output : [];
  }
}
