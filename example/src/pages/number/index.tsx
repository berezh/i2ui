import React from 'react';
import { MasterPage } from '../../components/master-page';
import { I2Number } from '../../i2ui';
import './index.scss';
import { GlobalState } from '../../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { MainState } from '../../units/main/redux';
import { NumberControlPanel } from './control-panel';
import { TagCloudEditor } from '../../components/tag-cloud-editor';
import { MainActions } from '../../units/main/redux/actions';
import { ViewBox } from '../../components/view-box';
import { BlockHeader } from '../../components/block-header';

export const NumberPage: React.FC = () => {
    const { numberProps, numberOptions } = useSelector<GlobalState, MainState>((state) => state.main);
    const {
        fromStyle,
        toStyle,
        verticalAlign,
        basicMaxValue,
        decimalDigits,
        groupSeparator,
        decimalSeparator,
        groupDigits,
    } = numberProps;
    const maxValue = basicMaxValue || Math.max(0, ...numberOptions.map((x) => x.rate));
    const dispatch = useDispatch();

    return (
        <MasterPage
            sidebar={<NumberControlPanel />}
            gitFileUrl="https://github.com/berezh/i2ui/blob/master/example/src/pages/number/index.tsx"
        >
            <div className="number-page">
                <ViewBox>
                    <div className="number-page__number-set">
                        {/* <div>
                            <div>Test</div>
                            <div>
                                <I2Number
                                    value={1234567.89}
                                    fromStyle={{ fontSize: '1em', opacity: 0.6 }}
                                    toStyle={{ fontSize: '4em', opacity: 1 }}
                                    decimalDigits={2}
                                />
                            </div>
                        </div> */}
                        {numberOptions.map(({ text, rate }, i) => (
                            <div key={i}>
                                <div>{text}</div>
                                <div>
                                    <I2Number
                                        fromStyle={fromStyle}
                                        toStyle={toStyle}
                                        value={rate}
                                        basicMaxValue={maxValue}
                                        verticalAlign={verticalAlign}
                                        decimalDigits={decimalDigits}
                                        groupSeparator={groupSeparator}
                                        decimalSeparator={decimalSeparator}
                                        groupDigits={groupDigits}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </ViewBox>
                <div className="number-page__edit">
                    <BlockHeader>Data</BlockHeader>
                    <TagCloudEditor
                        options={numberOptions}
                        updateTagOption={(params) => dispatch(MainActions.updateNumberOption(params))}
                        removeTagOption={(index) => dispatch(MainActions.removeNumberOption(index))}
                        addTagOption={(tag) => dispatch(MainActions.addNumberOption(tag))}
                        reset={() => dispatch(MainActions.resetNumber())}
                    />
                </div>
            </div>
        </MasterPage>
    );
};
