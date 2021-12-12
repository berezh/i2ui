import React, { useCallback, FormEvent } from 'react';
import { StyleRangePicker } from '../../../components/style-range-picker';
import { StyleRange, GlobalState } from '../../../interfaces';
import { MainActions } from '../../../units/main/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MainState } from '../../../units/main/redux';
import { ControlLine } from '../../../components/control-line';
import { BlockHeader } from '../../../components/block-header';
import { ButtonGroup, Button, NumericInput, InputGroup } from '@blueprintjs/core';

import './index.scss';

export const NumberControlPanel: React.FC = () => {
    const { numberProps } = useSelector<GlobalState, MainState>((state) => state.main);
    const {
        fromStyle,
        toStyle,
        verticalAlign,
        decimalDigits,
        basicMaxValue,
        groupSeparator,
        decimalSeparator,
        groupDigits,
    } = numberProps;
    const dispatch = useDispatch();

    const handleChangeStyle = useCallback<(styleRange: StyleRange) => void>(
        (styleRange) => {
            dispatch(
                MainActions.updateNumberProps({
                    ...numberProps,
                    fromStyle: styleRange.fromStyle,
                    toStyle: styleRange.toStyle,
                })
            );
        },
        [numberProps]
    );

    const handleVerticalAlign = useCallback<(verticalAlign: string | any) => void>(
        (verticalAlign) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, verticalAlign }));
        },
        [numberProps]
    );

    const handleFractionDigits = useCallback<(decimalDigits: number | undefined) => void>(
        (decimalDigits) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, decimalDigits }));
        },
        [numberProps]
    );

    const handleGroupDigits = useCallback<(groupDigits: number | undefined) => void>(
        (groupDigits) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, groupDigits }));
        },
        [numberProps]
    );

    const handleBasicMaxValue = useCallback<(basicMaxValue: number | undefined) => void>(
        (basicMaxValue) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, basicMaxValue }));
        },
        [numberProps]
    );

    const handleGroupSeparator = useCallback<(groupSeparator: string | undefined) => void>(
        (groupSeparator) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, groupSeparator }));
        },
        [numberProps]
    );

    const handleDecimalSeparator = useCallback<(decimalSeparator: string | undefined) => void>(
        (decimalSeparator) => {
            dispatch(MainActions.updateNumberProps({ ...numberProps, decimalSeparator }));
        },
        [numberProps]
    );

    return (
        <div className="control-panel">
            <BlockHeader>Properties</BlockHeader>
            <div>
                <Button
                    small={true}
                    icon="reset"
                    intent="primary"
                    onClick={() => dispatch(MainActions.resetNumberProps())}
                >
                    Reset
                </Button>
            </div>
            <ControlLine label="verticalAlign">
                <ButtonGroup>
                    <Button onClick={() => handleVerticalAlign('top')} active={verticalAlign === 'top'}>
                        top
                    </Button>
                    <Button onClick={() => handleVerticalAlign('center')} active={verticalAlign === 'center'}>
                        center
                    </Button>
                    <Button
                        onClick={() => handleVerticalAlign('bottom')}
                        active={verticalAlign === 'bottom' || verticalAlign === undefined}
                    >
                        bottom
                    </Button>
                </ButtonGroup>
            </ControlLine>
            <ControlLine label="basicMaxValue">
                <NumericInput
                    min={0}
                    value={basicMaxValue}
                    onValueChange={(numberValue, stringValue) =>
                        handleBasicMaxValue(stringValue ? numberValue : undefined)
                    }
                />
            </ControlLine>
            <ControlLine label="decimalDigits">
                <NumericInput
                    max={10}
                    min={0}
                    value={decimalDigits}
                    onValueChange={(numberValue, stringValue) =>
                        handleFractionDigits(stringValue ? numberValue : undefined)
                    }
                />
            </ControlLine>
            <ControlLine label="groupDigits">
                <NumericInput
                    max={10}
                    min={0}
                    value={groupDigits}
                    onValueChange={(numberValue, stringValue) =>
                        handleGroupDigits(stringValue ? numberValue : undefined)
                    }
                />
            </ControlLine>
            <ControlLine label="groupSeparator">
                <InputGroup
                    value={groupSeparator || ''}
                    onChange={(e: FormEvent<HTMLInputElement>) => handleGroupSeparator(e.currentTarget.value)}
                ></InputGroup>
            </ControlLine>
            <ControlLine label="decimalSeparator">
                <InputGroup
                    value={decimalSeparator || ''}
                    onChange={(e: FormEvent<HTMLInputElement>) => handleDecimalSeparator(e.currentTarget.value)}
                ></InputGroup>
            </ControlLine>
            <ControlLine label="fromStyle - toStyle">
                <StyleRangePicker
                    styleRange={{ fromStyle: fromStyle, toStyle: toStyle }}
                    onChange={(styleRange) => handleChangeStyle(styleRange)}
                />
            </ControlLine>
        </div>
    );
};
