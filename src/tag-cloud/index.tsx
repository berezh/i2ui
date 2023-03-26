import React from "react";
import { emphasizeStyle } from "emphasizer";

import { TagUtil } from "../utils";

export type TagCloudOrder = "none" | "desc" | "middle" | "asc" | "edge";

export interface TagCloudProps {
  className?: string;
  style?: React.CSSProperties;
  data: TagProps[];
  fromStyle: React.CSSProperties;
  toStyle: React.CSSProperties;
  order?: TagCloudOrder;
  renderOption?: (option: TagProps, style: React.CSSProperties) => React.ReactElement;
}

export interface TagProps {
  text: string;
  rate: number;
}

export const TagCloud: React.FC<TagCloudProps> = ({ data: data, fromStyle, toStyle, order, className, style, renderOption }) => {
  const rates: number[] = data.map(x => x.rate);
  const min: number = Math.min(...rates);
  const max: number = Math.max(...rates);

  const orderData: TagProps[] = TagUtil.order(data, order);

  const rootStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  };

  return (
    <div className={className} style={{ ...rootStyle, ...style }}>
      {orderData.map((x, i) => {
        const optionStyle = emphasizeStyle(fromStyle, toStyle, min, max, x.rate);
        return <React.Fragment key={i}>{renderOption ? renderOption(x, optionStyle) : <div style={optionStyle}>{x.text}</div>}</React.Fragment>;
      })}
    </div>
  );
};
