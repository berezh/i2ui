import React from 'react';
import './index.scss';
import { NumericInput } from '@blueprintjs/core';

interface Props {
    onChange: (from: number, to: number) => void;
    fromValue: number;
    toValue: number;
}

export const NumberRangeInput: React.FC<Props> = props => {
    const { onChange, fromValue, toValue } = props;

    return (
        <div className="number-range-input">
            <div className="number-range-input__line">
                <NumericInput min={0} value={fromValue} onValueChange={value => onChange(value, toValue)} />
            </div>
            <div className="number-range-input__line">
                <NumericInput min={0} value={toValue} onValueChange={value => onChange(fromValue, value)} />
            </div>
        </div>
    );
};
