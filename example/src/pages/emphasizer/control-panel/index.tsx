import React, { useCallback } from 'react';
import { Button } from '@blueprintjs/core';
import { StyleRangePicker } from '../../../components/style-range-picker';
import { GlobalState } from '../../../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { MainState, CriteriaProps } from '../../../units/main/redux/interfaces';
import { MainActions } from '../../../units/main/redux/actions';
import { ControlLine } from '../../../components/control-line';
import { BlockHeader } from '../../../components/block-header';
import { NumberRangeInput } from '../../../components/number-range-input';

import './index.scss';

export const EmphasizerControlPanel: React.FC = () => {
    const { emphasizerProps } = useSelector<GlobalState, MainState>((state) => state.main);
    const { population, area, gdpTotal, gdpCapital } = emphasizerProps;
    const dispatch = useDispatch();

    const handleChangeProps = useCallback<
        (population?: CriteriaProps, area?: CriteriaProps, gdpTotal?: CriteriaProps, gdpCapital?: CriteriaProps) => void
    >(
        (population, area, gdpTotal, gdpCapital) => {
            const newProps = { ...emphasizerProps };
            if (population) {
                newProps.population = population;
            }
            if (area) {
                newProps.area = area;
            }
            if (gdpTotal) {
                newProps.gdpTotal = gdpTotal;
            }
            if (gdpCapital) {
                newProps.gdpCapital = gdpCapital;
            }

            dispatch(MainActions.updateEmphasizerProps(newProps));
        },
        [emphasizerProps]
    );

    return (
        <div className="control-panel">
            <div>
                <Button
                    small={true}
                    icon="reset"
                    intent="primary"
                    onClick={() => dispatch(MainActions.resetEmphasizerProps())}
                >
                    Reset
                </Button>
                <br />
            </div>
            <BlockHeader>Population</BlockHeader>
            <ControlLine label="box: fromStyle - toStyle">
                <StyleRangePicker
                    styleRange={{ ...population }}
                    onChange={(styleRange) =>
                        handleChangeProps({
                            ...population,
                            fromStyle: styleRange.fromStyle,
                            toStyle: styleRange.toStyle,
                        })
                    }
                />
            </ControlLine>
            <ControlLine label="incon: width - heigth">
                <NumberRangeInput
                    fromValue={population.fromIconSize}
                    toValue={population.toIconSize}
                    onChange={(from, to) => {
                        handleChangeProps({
                            ...population,
                            fromIconSize: from,
                            toIconSize: to,
                        });
                    }}
                />
            </ControlLine>
            <BlockHeader>Area</BlockHeader>
            <ControlLine label="box: fromStyle - toStyle">
                <StyleRangePicker
                    styleRange={{ ...area }}
                    onChange={(styleRange) =>
                        handleChangeProps(undefined, {
                            ...area,
                            fromStyle: styleRange.fromStyle,
                            toStyle: styleRange.toStyle,
                        })
                    }
                />
            </ControlLine>
            <ControlLine label="incon: width - heigth">
                <NumberRangeInput
                    fromValue={area.fromIconSize}
                    toValue={area.toIconSize}
                    onChange={(from, to) => {
                        handleChangeProps(undefined, {
                            ...area,
                            fromIconSize: from,
                            toIconSize: to,
                        });
                    }}
                />
            </ControlLine>
            <BlockHeader>GDP Total</BlockHeader>
            <ControlLine label="box: fromStyle - toStyle">
                <StyleRangePicker
                    styleRange={{ fromStyle: gdpTotal.fromStyle, toStyle: gdpTotal.toStyle }}
                    onChange={(styleRange) =>
                        handleChangeProps(undefined, undefined, {
                            ...gdpTotal,
                            fromStyle: styleRange.fromStyle,
                            toStyle: styleRange.toStyle,
                        })
                    }
                />
            </ControlLine>
            <ControlLine label="incon: width - heigth">
                <NumberRangeInput
                    fromValue={gdpTotal.fromIconSize}
                    toValue={gdpTotal.toIconSize}
                    onChange={(from, to) => {
                        handleChangeProps(undefined, undefined, {
                            ...gdpTotal,
                            fromIconSize: from,
                            toIconSize: to,
                        });
                    }}
                />
            </ControlLine>
            <BlockHeader>GDP Capital</BlockHeader>
            <ControlLine label="box: fromStyle - toStyle">
                <StyleRangePicker
                    styleRange={{ fromStyle: gdpCapital.fromStyle, toStyle: gdpCapital.toStyle }}
                    onChange={(styleRange) =>
                        handleChangeProps(undefined, undefined, undefined, {
                            ...gdpCapital,
                            fromStyle: styleRange.fromStyle,
                            toStyle: styleRange.toStyle,
                        })
                    }
                />
            </ControlLine>
            <ControlLine label="incon: width - heigth">
                <NumberRangeInput
                    fromValue={gdpCapital.fromIconSize}
                    toValue={gdpCapital.toIconSize}
                    onChange={(from, to) => {
                        handleChangeProps(undefined, undefined, undefined, {
                            ...gdpCapital,
                            fromIconSize: from,
                            toIconSize: to,
                        });
                    }}
                />
            </ControlLine>
        </div>
    );
};
