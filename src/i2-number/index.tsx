import React, { useMemo } from 'react';
import { NumberUtil, SplitedNumberGroupProps, SplitedNumberOptionsProps } from '../utils/number-util';
import { emphasizeStyle } from 'emphasizer';

export type I2NumberVerticalAlignProps = 'top' | 'center' | 'bottom';

export interface I2NumberProps {
  fromStyle?: React.CSSProperties;
  toStyle?: React.CSSProperties;
  verticalAlign?: I2NumberVerticalAlignProps;
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
  display: 'inline-block',
};

const defaultContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
};

const numberPartStyle: React.CSSProperties = {
  lineHeight: '1em',
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
  const numberOptions = useMemo<SplitedNumberOptionsProps>(() => {
    return {
      decimalDigits,
      decimalSeparator,
      groupSeparator,
      groupDigits,
    };
  }, [decimalDigits, decimalSeparator, groupSeparator, groupDigits]);

  const splits = useMemo<SplitedNumberGroupProps[]>(() => {
    return NumberUtil.splitNumber(NumberUtil.toFloat(children || value), numberOptions);
  }, [children, value, numberOptions]);

  const basicSplits = useMemo<SplitedNumberGroupProps[]>(() => {
    return NumberUtil.splitNumber(NumberUtil.toFloat(basicMaxValue), numberOptions);
  }, [basicMaxValue, numberOptions]);

  const from = useMemo<React.CSSProperties>(() => {
    return {
      fontSize: '1em',
      ...fromStyle,
    };
  }, [fromStyle]);

  const to = useMemo<React.CSSProperties>(() => {
    return {
      fontSize: '2em',
      ...toStyle,
    };
  }, [toStyle]);

  const contentStyle = useMemo<React.CSSProperties>(() => {
    const result = { ...defaultContentStyle };
    if (align === 'top') {
      result.alignItems = 'flex-start';
    } else if (align === 'center') {
      result.alignItems = 'center';
    }
    return result;
  }, [align]);

  return (
    <div className={className} style={{ ...rootStyle, ...style }}>
      <div style={contentStyle}>
        {splits.map(({ text, separator }, i) => {
          const maxRate: number = basicSplits.length;
          return (
            <div key={i} style={{ ...emphasizeStyle(from, to, 1, maxRate, splits.length - i), ...numberPartStyle }}>{`${
              separator || ''
            }${text}`}</div>
          );
        })}
      </div>
    </div>
  );
};
