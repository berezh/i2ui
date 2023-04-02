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

export interface RateOption {
  __rate: number;
  [key: string]: any;
}

export interface TagCloudRecordOptions {
  maxValue: number;
  minValue: number;
}
