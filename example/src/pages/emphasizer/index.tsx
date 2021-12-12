import React from 'react';
import { MasterPage } from '../../components/master-page';
import { EmphasizerControlPanel } from './control-panel';
import { GlobalState } from '../../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { MainState } from '../../units/main/redux';
import { MainActions } from '../../units/main/redux/actions';
import { ViewBox } from '../../components/view-box';
import { BlockHeader } from '../../components/block-header';
import { emphasizeStyle, emphasizeNumber } from 'emphasizer';
import { Icon } from '@blueprintjs/core';
import numeral from 'numeral';
import { EmphasizerEditor } from '../../components/emphasizr-editor';

import './index.scss';

export const EmphasizerPage: React.FC = () => {
    const {
        emphasizerOptions,
        emphasizerProps: { population, area, gdpTotal, gdpCapital },
    } = useSelector<GlobalState, MainState>((state) => state.main);
    const dispatch = useDispatch();

    const maxPopulation = Math.max(0, ...emphasizerOptions.map((x) => x.population));
    const minPopulation = Math.min(0, ...emphasizerOptions.map((x) => x.population));

    const maxArea = Math.max(0, ...emphasizerOptions.map((x) => x.area));
    const minArea = Math.min(0, ...emphasizerOptions.map((x) => x.area));

    const maxGdpTotal = Math.max(0, ...emphasizerOptions.map((x) => x.gdpTotal));
    const minGdpTotal = Math.min(0, ...emphasizerOptions.map((x) => x.gdpTotal));

    const maxGdpCapital = Math.max(0, ...emphasizerOptions.map((x) => x.gdpCapital));
    const minGdpCapital = Math.min(0, ...emphasizerOptions.map((x) => x.gdpCapital));

    return (
        <MasterPage
            sidebar={<EmphasizerControlPanel />}
            gitFileUrl="https://github.com/berezh/i2ui/blob/master/example/src/pages/emphasizer/index.tsx"
        >
            <div className="tag-page">
                <div>
                    <ViewBox>
                        <div className="states">
                            {emphasizerOptions.map((x, i) => {
                                return (
                                    <div key={i} className="states__item">
                                        <div className="states__name">{x.name}</div>
                                        <div className="states__stat">
                                            <div>
                                                <div
                                                    style={emphasizeStyle(
                                                        population.fromStyle,
                                                        population.toStyle,
                                                        minPopulation,
                                                        maxPopulation,
                                                        x.population
                                                    )}
                                                    title={`Population ${numeral(x.population).format('0.00a')}`}
                                                >
                                                    <Icon
                                                        iconSize={emphasizeNumber(
                                                            population.fromIconSize,
                                                            population.toIconSize,
                                                            minPopulation,
                                                            maxPopulation,
                                                            x.population
                                                        )}
                                                        icon="people"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    style={emphasizeStyle(
                                                        area.fromStyle,
                                                        area.toStyle,
                                                        minArea,
                                                        maxArea,
                                                        x.area
                                                    )}
                                                    title={`Area: ${numeral(x.area).format('0.00a')} (km²)`}
                                                >
                                                    <Icon
                                                        iconSize={emphasizeNumber(
                                                            area.fromIconSize,
                                                            area.toIconSize,
                                                            minArea,
                                                            maxArea,
                                                            x.area
                                                        )}
                                                        icon="map"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    style={emphasizeStyle(
                                                        gdpTotal.fromStyle,
                                                        gdpTotal.toStyle,
                                                        minGdpTotal,
                                                        maxGdpTotal,
                                                        x.gdpTotal
                                                    )}
                                                    title={`GDP (Total): $${numeral(x.gdpTotal * 1000000).format(
                                                        '0.00a'
                                                    )}`}
                                                >
                                                    <Icon
                                                        iconSize={emphasizeNumber(
                                                            gdpTotal.fromIconSize,
                                                            gdpTotal.toIconSize,
                                                            minGdpTotal,
                                                            maxGdpTotal,
                                                            x.gdpTotal
                                                        )}
                                                        icon="euro"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    style={emphasizeStyle(
                                                        gdpCapital.fromStyle,
                                                        gdpCapital.toStyle,
                                                        minGdpCapital,
                                                        maxGdpCapital,
                                                        x.gdpCapital
                                                    )}
                                                    title={`GDP (Per Capital): $${numeral(x.gdpCapital).format(
                                                        '0.00a'
                                                    )}`}
                                                >
                                                    <Icon
                                                        iconSize={emphasizeNumber(
                                                            gdpCapital.fromIconSize,
                                                            gdpCapital.toIconSize,
                                                            minGdpCapital,
                                                            maxGdpCapital,
                                                            x.gdpCapital
                                                        )}
                                                        icon="bank-account"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ViewBox>
                </div>
                <div>
                    <BlockHeader>Data</BlockHeader>
                    <EmphasizerEditor
                        options={emphasizerOptions}
                        updateTagOption={(params) => {
                            const { index, ...option } = params;
                            emphasizerOptions[index] = { ...option };
                            dispatch(MainActions.updateEmphasizerOptions(emphasizerOptions));
                        }}
                        removeTagOption={(index) => {
                            emphasizerOptions.splice(index, 1);
                            dispatch(MainActions.updateEmphasizerOptions(emphasizerOptions));
                        }}
                        addTagOption={(tag) => {
                            emphasizerOptions.push(tag);
                            dispatch(MainActions.updateEmphasizerOptions(emphasizerOptions));
                        }}
                        reset={() => {
                            dispatch(MainActions.resetEmphasizerOptions());
                        }}
                    />
                </div>
            </div>
        </MasterPage>
    );
};
