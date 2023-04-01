import React, { useMemo } from "react";

import { I2NumberProps } from "../interfaces";
import { parseI2Number } from "./parser";

export * from "./parser";

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
  basicMaxValue,
  value,
  children,
}) => {
  const parts = useMemo<{ style: React.CSSProperties; children: string }[]>(() => {
    const currentValue = children || value;
    return parseI2Number({ value: currentValue, fromStyle, toStyle, decimalDigits, decimalSeparator, groupSeparator, groupDigits, basicMaxValue });
  }, [value, children, fromStyle, toStyle, decimalDigits, decimalSeparator, groupSeparator, groupDigits, basicMaxValue]);

  const contentStyle = useMemo<React.CSSProperties>(() => {
    const result: React.CSSProperties = { display: "flex", flexDirection: "row", alignItems: "flex-end" };
    if (align === "top") {
      result.alignItems = "flex-start";
    } else if (align === "center") {
      result.alignItems = "center";
    }
    return result;
  }, [align]);

  const rootStyle = useMemo<React.CSSProperties>(() => {
    return { display: "inline-block", ...style };
  }, [style]);

  return (
    <div className={className} style={rootStyle}>
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
