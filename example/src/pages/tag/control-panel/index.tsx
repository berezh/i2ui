import React, { useCallback } from 'react';
import { TagCloudOrder } from '../../../i2ui';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { StyleRangePicker } from '../../../components/style-range-picker';
import { StyleRange, GlobalState } from '../../../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { MainState } from '../../../units/main/redux/interfaces';
import { MainActions } from '../../../units/main/redux/actions';
import { ControlLine } from '../../../components/control-line';
import { BlockHeader } from '../../../components/block-header';

import './index.scss';

export const TagControlPanel: React.FC = () => {
    const { tagProps } = useSelector<GlobalState, MainState>((state) => state.main);
    const { order, fromStyle, toStyle } = tagProps;
    const dispatch = useDispatch();

    const handleChangeOrder = useCallback<(order?: TagCloudOrder) => void>(
        (order) => {
            dispatch(MainActions.updateTagProps({ ...tagProps, order }));
        },
        [tagProps]
    );

    const handleChangeStyle = useCallback<(styleRange: StyleRange) => void>(
        (styleRange) => {
            dispatch(
                MainActions.updateTagProps({
                    ...tagProps,
                    fromStyle: styleRange.fromStyle,
                    toStyle: styleRange.toStyle,
                })
            );
        },
        [tagProps]
    );

    return (
        <div className="control-panel">
            <BlockHeader>Properties</BlockHeader>
            <div>
                <Button
                    small={true}
                    icon="reset"
                    intent="primary"
                    onClick={() => dispatch(MainActions.resetTagProps())}
                >
                    Reset
                </Button>
            </div>
            <ControlLine label="order">
                <ButtonGroup>
                    <Button onClick={() => handleChangeOrder('none')} active={order === 'none' || order === undefined}>
                        none
                    </Button>
                    <Button onClick={() => handleChangeOrder('desc')} active={order === 'desc'}>
                        desc
                    </Button>
                    <Button onClick={() => handleChangeOrder('middle')} active={order === 'middle'}>
                        middle
                    </Button>
                    <Button onClick={() => handleChangeOrder('asc')} active={order === 'asc'}>
                        asc
                    </Button>
                    <Button onClick={() => handleChangeOrder('edge')} active={order === 'edge'}>
                        edge
                    </Button>
                </ButtonGroup>
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
