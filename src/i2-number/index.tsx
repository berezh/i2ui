import React from 'react';
import { NumberUtil, SplitedNumberGroupProps, SplitedNumberOptionsProps } from '../utils/number-util';
import { emphasizeStyle } from 'emphasizer';

export type I2NumberVerticalAlignProps = 'top' | 'center' | 'bottom';

export interface I2NumberProps {
    value: number;
    fromStyle?: React.CSSProperties;
    toStyle?: React.CSSProperties;
    basicMaxValue?: number;
    verticalAlign?: I2NumberVerticalAlignProps;
    decimalDigits?: number;
    groupDigits?: number;
    groupSeparator?: string;
    decimalSeparator?: string;
    className?: string;
    style?: React.CSSProperties;
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

export const I2Number: React.FC<I2NumberProps> = (props) => {
    const {
        value,
        fromStyle,
        toStyle,
        decimalDigits,
        basicMaxValue,
        verticalAlign: align,
        className,
        style,
        groupSeparator,
        decimalSeparator,
        groupDigits,
    } = props;

    const numberOptions: SplitedNumberOptionsProps = {
        decimalDigits,
        decimalSeparator,
        groupSeparator,
        groupDigits,
    };
    const splits: SplitedNumberGroupProps[] = NumberUtil.splitNumber(value, numberOptions);
    const basicSplits: SplitedNumberGroupProps[] = NumberUtil.splitNumber(basicMaxValue || value, numberOptions);

    const from: React.CSSProperties = {
        fontSize: '1em',
        ...fromStyle,
    };
    const to: React.CSSProperties = {
        fontSize: '2em',
        ...toStyle,
    };
    const maxRate: number = Math.max(basicSplits.length);

    const contentStyle = { ...defaultContentStyle };
    if (align === 'top') {
        contentStyle.alignItems = 'flex-start';
    } else if (align === 'center') {
        contentStyle.alignItems = 'center';
    }

    return (
        <div className={className} style={{ ...rootStyle, ...style }}>
            <div style={contentStyle}>
                {splits.map(({ text, separator }, i) => (
                    <div
                        key={i}
                        style={{ ...emphasizeStyle(from, to, 1, maxRate, splits.length - i), ...numberPartStyle }}
                    >{`${separator || ''}${text}`}</div>
                ))}
            </div>
        </div>
    );
};
