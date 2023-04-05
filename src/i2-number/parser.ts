import { emphasizeStyle } from "emphasizer";

import { I2NumberProps } from "../interfaces";
import { NumberUtil } from "../utils";

export function parseI2Number(options: Omit<I2NumberProps, "children" | "className" | "style">) {
  const { value, fromStyle, toStyle, decimalDigits, decimalSeparator, groupSeparator, groupDigits, basicMaxValue, prefix, ending } = options;
  const [splits, basicSplits] = NumberUtil.splitNumberSet(value, basicMaxValue || value, {
    decimalDigits,
    decimalSeparator,
    groupSeparator,
    groupDigits,
  });
  const maxRate: number = basicSplits.length;

  return splits.map(({ text, separator }, i) => {
    const currPrefix = i === 0 && prefix ? prefix : "";
    const currEnding = i === splits.length - 1 && ending ? ending : "";
    return {
      style: {
        lineHeight: "1em",
        ...emphasizeStyle(
          {
            fontSize: "1em",
            ...fromStyle,
          },
          {
            fontSize: "2em",
            ...toStyle,
          },
          1,
          maxRate,
          splits.length - i
        ),
      },
      children: `${currPrefix}${separator || ""}${text}${currEnding}`,
    };
  });
}
