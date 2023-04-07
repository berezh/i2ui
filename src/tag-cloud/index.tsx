import React, { useMemo } from "react";
import { emphasizeStyle } from "emphasizer";

import { NumberUtil, TagUtil } from "../utils";
import { RateOption, TagCloudRecordOptions } from "../interfaces";

export type TagCloudOrder = "none" | "desc" | "middle" | "asc" | "edge";

export interface TagCloudProps {
  className?: string;
  style?: React.CSSProperties;
  data: any[];
  fromStyle: React.CSSProperties;
  toStyle: React.CSSProperties;
  order?: TagCloudOrder;
  render: (style: React.CSSProperties, record: any, index: number, options: TagCloudRecordOptions) => React.ReactElement;
  dataValueKey?: string;
}

export const TagCloud: React.FC<TagCloudProps> = ({ data, fromStyle, toStyle, order = "middle", className, style, render, dataValueKey = "value" }) => {
  const rateData = useMemo<RateOption[]>(() => {
    return data.map(x => {
      return { ...x, __rate: NumberUtil.anyToFloat(x[dataValueKey]) };
    });
  }, [data, dataValueKey]);

  const [min, max] = useMemo(() => {
    const rates = rateData.map(x => x.__rate);
    const minV: number = Math.min(...rates);
    const maxV: number = Math.max(...rates);
    return [minV, maxV];
  }, [rateData]);

  const orderData = useMemo(() => {
    return TagUtil.order(rateData, order);
  }, [rateData, order]);

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
      {orderData.map(({ __rate, ...record }, i) => {
        const optionStyle: React.CSSProperties = emphasizeStyle(fromStyle, toStyle, min, max, __rate);
        return render(optionStyle, record, i, { minValue: min, maxValue: max, value: __rate });
      })}
    </div>
  );
};
