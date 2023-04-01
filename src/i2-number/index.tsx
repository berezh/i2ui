import React, { useEffect, useMemo } from "react";
import { emphasizeStyle } from "emphasizer";

import { NumberUtil, I2NumberSplitGroup, I2NumberSplitOptions } from "../utils/number-util";

export type I2NumberVerticalAlign = "top" | "center" | "bottom";

export interface I2NumberProps {
  fromStyle?: React.CSSProperties;
  toStyle?: React.CSSProperties;
  verticalAlign?: I2NumberVerticalAlign;
  decimalDigits?: number;
  groupDigits?: number;
  groupSeparator?: string;
  decimalSeparator?: string;
  className?: string;
  style?: React.CSSProperties;
  basicMaxValue?: number | string;
  value?: number | string;
  children?: number | string;
}

const rootStyle: React.CSSProperties = {
  display: "inline-block",
};

const defaultContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
};

const numberPartStyle: React.CSSProperties = {
  lineHeight: "1em",
};

export const I2Number: React.FC<I2NumberProps> = ({
  fromStyle,
  toStyle,
  decimalDigits,
  verticalAlign: align,
  className,
  style,
  groupSeparator,
  decimalSeparator,
  groupDigits,
  value,
  basicMaxValue,
  children,
}) => {
  const numberOptions = useMemo<I2NumberSplitOptions>(() => {
    return {
      decimalDigits,
      decimalSeparator,
      groupSeparator,
      groupDigits,
    };
  }, [decimalDigits, decimalSeparator, groupSeparator, groupDigits]);

  const currentValue = useMemo(() => {
    return children || value;
  }, [children, value]);

  const splits = useMemo<I2NumberSplitGroup[]>(() => {
    return NumberUtil.splitNumber(currentValue, numberOptions);
  }, [currentValue, numberOptions]);

  const basicSplits = useMemo<I2NumberSplitGroup[]>(() => {
    return NumberUtil.splitNumber(basicMaxValue || currentValue, numberOptions);
  }, [basicMaxValue, currentValue, numberOptions]);

  const from = useMemo<React.CSSProperties>(() => {
    return {
      fontSize: "1em",
      ...fromStyle,
    };
  }, [fromStyle]);

  const to = useMemo<React.CSSProperties>(() => {
    return {
      fontSize: "2em",
      ...toStyle,
    };
  }, [toStyle]);

  const parts = useMemo<{ style: React.CSSProperties; children: string }[]>(() => {
    const maxRate: number = basicSplits.length;
    return splits.map(({ text, separator }, i) => {
      return { style: { ...emphasizeStyle(from, to, 1, maxRate, splits.length - i), ...numberPartStyle }, children: `${separator || ""}${text}` };
    });
  }, [from, to, splits, basicSplits]);

  const contentStyle = useMemo<React.CSSProperties>(() => {
    const result = { ...defaultContentStyle };
    if (align === "top") {
      result.alignItems = "flex-start";
    } else if (align === "center") {
      result.alignItems = "center";
    }
    return result;
  }, [align]);

  return (
    <div className={className} style={{ ...rootStyle, ...style }}>
      <div style={contentStyle}>
        {parts.map(({ children, style }, i) => {
          return (
            <div key={i} style={style}>
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};
