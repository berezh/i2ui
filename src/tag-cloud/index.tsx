import React, { useCallback, useMemo } from "react";
import { emphasizeStyle } from "emphasizer";

import { NumberUtil, TagUtil } from "../utils";

export type TagCloudOrder = "none" | "desc" | "middle" | "asc" | "edge";

export interface TagCloudProps {
  className?: string;
  style?: React.CSSProperties;
  data: any[];
  fromStyle: React.CSSProperties;
  toStyle: React.CSSProperties;
  order?: TagCloudOrder;
  render: (style: React.CSSProperties, record: any, index: number) => React.ReactElement;
  dataValueKey?: string;
}

export const TagCloud: React.FC<TagCloudProps> = ({ data, fromStyle, toStyle, order = "middle", className, style, render, dataValueKey = "value" }) => {
  const handleParseValue = useCallback(
    (record: any): number => {
      return NumberUtil.toFloat(record[dataValueKey]) || 0;
    },
    [dataValueKey]
  );

  const [min, max] = useMemo(() => {
    const rates = data.map(x => handleParseValue(x));
    const minV: number = Math.min(...rates);
    const maxV: number = Math.max(...rates);
    return [minV, maxV];
  }, [data, handleParseValue]);

  const orderData = useMemo(() => {
    return TagUtil.order(data, order, handleParseValue);
  }, [data, order, handleParseValue]);

  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      display: "flex",
      flexWrap: "wrap",
      justifyItems: "center",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      ...style,
    };
  }, [style]);

  return (
    <div className={className} style={rootStyle}>
      {orderData.map((record, i) => {
        const optionStyle = emphasizeStyle(fromStyle, toStyle, min, max, handleParseValue(record));
        return <React.Fragment key={i}>{render(optionStyle, record, i)}</React.Fragment>;
      })}
    </div>
  );
};
