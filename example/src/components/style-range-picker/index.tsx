import React, { useCallback } from 'react';
import { Button, Icon, Tooltip } from '@blueprintjs/core';
import { Option, SelectOption } from '../../interfaces/option';
import { OptionSelect } from '../select';
import { StyleValueInput } from './style-value-input';
import { StyleKeys } from './style-keys';
import { StyleRange } from '../../interfaces';

import './index.scss';

const styleOptions: Option[] = StyleKeys.keys.map<Option>((x) => {
    return { value: x, name: x };
});

interface StyleOption {
    name: string;
    from: string;
    to: string;
}

interface Props {
    styleRange: StyleRange;
    onChange: (styleRange: StyleRange) => void;
}

export const StyleRangePicker: React.FC<Props> = (props) => {
    const { styleRange, onChange } = props;

    const onFromChange = useCallback<(name: string, value?: string) => void>(
        (name: string, value?: string): void => {
            udpateStyle(styleRange.fromStyle, name, value);
            onChange(styleRange);
        },
        [onChange]
    );

    const onToChange = useCallback<(name: string, value?: string) => void>(
        (name: string, value?: string): void => {
            udpateStyle(styleRange.toStyle, name, value);
            onChange(styleRange);
        },
        [onChange]
    );

    const addStyle = useCallback<(name?: string) => void>(
        (name?: string): void => {
            if (name) {
                const from = styleRange.fromStyle as any;
                const to = styleRange.toStyle as any;
                from[name] = '';
                to[name] = '';
                onChange(styleRange);
            }
        },
        [onChange]
    );

    const removeStyle = useCallback<(name?: string) => void>(
        (name?: string): void => {
            if (name) {
                const from = styleRange.fromStyle as any;
                const to = styleRange.toStyle as any;
                delete from[name];
                delete to[name];
                onChange(styleRange);
            }
        },
        [onChange]
    );

    const options = getOptions(styleRange);
    const items = styleOptions.map<SelectOption>((so) => {
        return {
            value: so.value,
            name: so.name,
            disabled: options.find((o) => o.name === so.name) ? true : false,
        };
    });

    return (
        <div className="style-picker">
            {options.map((x, i) => {
                return (
                    <div key={i} className="style-picker__line">
                        <div className="style-picker__line__row">{x.name}</div>
                        <div className="style-picker__line__row--input">
                            <Tooltip content={`${x.from}`}>
                                <StyleValueInput name={x.name} value={x.from} onChange={onFromChange} />
                            </Tooltip>
                        </div>
                        <div className="style-picker__line__row--input">
                            <Tooltip content={`${x.to}`}>
                                <StyleValueInput name={x.name} value={x.to} onChange={onToChange} />
                            </Tooltip>
                        </div>
                        <div className="style-picker__line__row--remove">
                            <Button onClick={() => removeStyle(x.name)}>
                                <Icon icon="small-cross" />
                            </Button>
                        </div>
                    </div>
                );
            })}
            <div className="style-picker__line">
                <div className="style-picker__line__row">
                    <OptionSelect options={items} placeholder="Add new style" onChange={addStyle}></OptionSelect>
                </div>
            </div>
        </div>
    );
};

function isNumeric(value?: string): boolean {
    return value ? parseFloat(value).toString() === value : false;
}
function udpateStyle(style: React.CSSProperties, name: string, value?: string): void {
    if (isNumeric(value)) {
        (style as any)[name] = parseFloat(value || '');
    } else {
        (style as any)[name] = value;
    }
}

function getOptions(styleRange: StyleRange): StyleOption[] {
    const from = styleRange.fromStyle as any;
    const to = styleRange.toStyle as any;
    const result: StyleOption[] = [];

    for (const key in from) {
        if (from.hasOwnProperty(key) || to.hasOwnProperty(key)) {
            let fromValue = from[key];
            let toValue = to[key];
            if (!fromValue) {
                fromValue = toValue;
            }
            if (!toValue) {
                toValue = fromValue;
            }

            result.push({ name: key, from: fromValue, to: toValue });
        }
    }

    return result;
}
