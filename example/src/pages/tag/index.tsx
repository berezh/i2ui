import React from 'react';
import { MasterPage } from '../../components/master-page';
import { TagCloud } from '../../i2ui';
import { TagControlPanel } from './control-panel';
import { GlobalState } from '../../interfaces';
import { TagCloudEditor } from '../../components/tag-cloud-editor';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { MainState } from '../../units/main/redux';
import { MainActions } from '../../units/main/redux/actions';
import { ViewBox } from '../../components/view-box';
import { BlockHeader } from '../../components/block-header';

export const TagPage: React.FC = () => {
    const {
        tagOptions,
        tagProps: { fromStyle, toStyle, order },
    } = useSelector<GlobalState, MainState>(state => state.main);
    const dispatch = useDispatch();

    return (
        <MasterPage
            sidebar={<TagControlPanel />}
            gitFileUrl="https://github.com/berezh/i2ui/blob/master/example/src/pages/tag/index.tsx"
        >
            <div className="tag-page">
                <div>
                    <ViewBox>
                        <TagCloud
                            options={[...tagOptions]}
                            fromStyle={fromStyle}
                            toStyle={toStyle}
                            order={order}
                            renderOption={(tagOption, style) => <div style={style}>{tagOption.text} </div>}
                        ></TagCloud>
                        {/* <TagCloud
                            fromStyle={{
                                fontSize: 10,
                                color: 'DarkBlue',
                                backgroundColor: 'LightSkyBlue',
                                margin: 5,
                                padding: '1px 2px',
                                borderRadius: 3,
                                border: '2px solid DarkBlue',
                                boxShadow: '0 0 6px #111',
                            }}
                            toStyle={{
                                fontSize: 40,
                                color: 'LightSkyBlue',
                                backgroundColor: 'DarkBlue',
                                margin: 10,
                                padding: '2px 8px',
                                borderRadius: 15,
                                border: '5px solid LightSkyBlue',
                                boxShadow: '10px 10px 15px #888',
                            }}
                            order="middle"
                            options={[
                                { text: 'Paris', rate: 2420069 },
                                { text: 'Marseille', rate: 855393 },
                                { text: 'Lyon', rate: 500715 },
                                { text: 'Toulon', rate: 163760 },
                                { text: 'Dunkirk', rate: 89882 },
                                { text: 'Cambrai', rate: 32852 },
                                { text: 'Mallemort', rate: 5298 },
                            ]}
                        /> */}
                    </ViewBox>
                </div>
                <div>
                    <BlockHeader>Data</BlockHeader>
                    <TagCloudEditor
                        options={tagOptions}
                        updateTagOption={params => dispatch(MainActions.updateTagOption(params))}
                        removeTagOption={index => dispatch(MainActions.removeTagOption(index))}
                        addTagOption={tag => dispatch(MainActions.addTagOption(tag))}
                        reset={() => dispatch(MainActions.resetTag())}
                    />
                </div>
            </div>
        </MasterPage>
    );
};
