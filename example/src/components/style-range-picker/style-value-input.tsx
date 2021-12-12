import React, { useCallback } from 'react';
import './index.scss';
import { InputGroup } from '@blueprintjs/core';
import { StyleKeys } from './style-keys';
import { ColorPicker } from '../color-picker';

interface Props {
    name: string;
    value?: string;
    onChange: (name: string, value?: string) => void;
}

export const StyleValueInput: React.FC<Props> = (props) => {
    const { name, value, onChange } = props;

    const iputChange = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(
        (e) => {
            onChange(name, e.currentTarget.value);
        },
        [name]
    );
    const colorChange = useCallback<(newValue: string) => void>(
        (newValue) => {
            onChange(name, newValue);
        },
        [name]
    );

    return StyleKeys.isColor(name) ? (
        <ColorPicker color={value} onChange={colorChange} />
    ) : (
        <InputGroup value={value} onChange={iputChange} />
    );
};
