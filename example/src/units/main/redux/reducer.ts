import { Reducer } from 'redux';

import { MainTypes } from './types';
import { MainState, UpdateTagParams } from '.';
import { Action, ReducerMethods } from '../../../redux';
import { FranceCities } from '../../../data/france-cities';
import { TagProps } from '../../../i2ui';
import { NumberStateProps, TagStateProps, EmphasizerStateProps } from './interfaces';
import { EuStates } from '../../../data/eu';
import { EuStateOption } from '../../../interfaces';

function getFranceCitiesOptions(): TagProps[] {
    return FranceCities.map(x => {
        return { text: x[0] as string, rate: x[1] as number };
    });
}

function getEuStatesOptions(): EuStateOption[] {
    return EuStates.map(x => {
        return {
            name: x[0] as string,
            population: x[1] as number,
            area: x[2] as number,
            gdpTotal: x[3] as number,
            gdpCapital: x[4] as number,
        };
    });
}

function getDefaultTagProps(): TagStateProps {
    return {
        fromStyle: {
            fontSize: 10,
            color: 'DarkBlue',
            backgroundColor: 'LightSkyBlue',
            margin: 5,
            padding: '1px 2px',
            borderRadius: 3,
            border: '2px solid DarkBlue',
            boxShadow: '0 0 6px #111',
        },
        toStyle: {
            fontSize: 40,
            color: 'LightSkyBlue',
            backgroundColor: 'DarkBlue',
            margin: 10,
            padding: '2px 8px',
            borderRadius: 15,
            border: '5px solid LightSkyBlue',
            boxShadow: '10px 10px 15px #888',
        },
        order: 'middle',
    };
}

function getDefaultNumberProps(): NumberStateProps {
    return {
        fromStyle: { fontSize: 10, opacity: 0.4 },
        toStyle: { fontSize: 30, opacity: 1 },
        verticalAlign: undefined,
        decimalDigits: 2,
    };
}

const fromIconSize = 10;
const toIconSize = 24;

const emphFromStyle: React.CSSProperties = {
    borderRadius: '50%',
    width: 16,
    height: 16,
};

const emphToStyle: React.CSSProperties = {
    width: 40,
    height: 40,
};

function getDefaultEmphasizerProps(): EmphasizerStateProps {
    return {
        population: {
            fromStyle: { backgroundColor: '#375dc7', ...emphFromStyle },
            toStyle: {
                ...emphToStyle,
            },
            fromIconSize,
            toIconSize,
        },
        area: {
            fromStyle: { backgroundColor: '#41ce65', ...emphFromStyle },
            toStyle: {
                ...emphToStyle,
            },
            fromIconSize,
            toIconSize,
        },
        gdpTotal: {
            fromStyle: { backgroundColor: '#ac85b8', ...emphFromStyle },
            toStyle: {
                ...emphToStyle,
            },
            fromIconSize,
            toIconSize,
        },
        gdpCapital: {
            fromStyle: { backgroundColor: '#b9888c', ...emphFromStyle },
            toStyle: {
                ...emphToStyle,
            },
            fromIconSize,
            toIconSize,
        },
    };
}

export const initialState: MainState = {
    tagOptions: getFranceCitiesOptions(),
    numberOptions: getFranceCitiesOptions(),
    tagProps: getDefaultTagProps(),
    numberProps: getDefaultNumberProps(),
    emphasizerProps: getDefaultEmphasizerProps(),
    emphasizerOptions: getEuStatesOptions(),
};

export class ReducerUtil {
    public static wrapper<TState>(initialState: TState, reducerMethods: ReducerMethods<TState>) {
        return (state: TState = initialState, action: Action = { type: '', payload: undefined }): TState => {
            if (action.type in reducerMethods) {
                return reducerMethods[action.type](state, action.payload);
            }
            return state;
        };
    }
}

export const MainReducer: Reducer<MainState, Action> = ReducerUtil.wrapper(initialState, {
    [MainTypes.TAG_UPDATE_PROPS]: (state, props: TagStateProps) => {
        state.tagProps = { ...props };
        return { ...state };
    },
    [MainTypes.TAG_RESET_PROPS]: state => {
        state.tagProps = { ...getDefaultTagProps() };
        return { ...state };
    },
    [MainTypes.UPDATE_TAG_OPTION]: (state, payload: UpdateTagParams) => {
        const options = state.tagOptions;
        const option = options[payload.index];
        if (option) {
            option.text = payload.name;
            option.rate = payload.rate;
            options[payload.index] = option;
            state.tagOptions = [...options];
        }

        return { ...state };
    },
    [MainTypes.REMOVE_TAG_OPTION]: (state, index: number) => {
        const options = state.tagOptions;
        options.splice(index, 1);
        state.tagOptions = [...options];
        return { ...state };
    },
    [MainTypes.ADD_TAG_OPTION]: (state, tag: TagProps) => {
        const options = state.tagOptions;
        options.push(tag);
        state.tagOptions = [...options];
        return { ...state };
    },
    [MainTypes.RESET_TAG]: state => {
        const options = getFranceCitiesOptions();
        state.tagOptions = [...options];
        return { ...state };
    },
    // number
    [MainTypes.NUMBER_UPDATE_PROPS]: (state, props: NumberStateProps) => {
        state.numberProps = { ...props };
        return { ...state };
    },
    [MainTypes.NUMBER_RESET_PROPS]: state => {
        state.numberProps = { ...getDefaultNumberProps() };
        return { ...state };
    },
    [MainTypes.UPDATE_NUMBER_OPTION]: (state, payload: UpdateTagParams) => {
        const options = state.numberOptions;
        const option = options[payload.index];
        if (option) {
            option.text = payload.name;
            option.rate = payload.rate;
            options[payload.index] = option;
            state.numberOptions = [...options];
        }

        return { ...state };
    },
    [MainTypes.ADD_NUMBER_OPTION]: (state, tag: TagProps) => {
        const options = state.numberOptions;
        options.push(tag);
        state.numberOptions = [...options];
        return { ...state };
    },
    [MainTypes.REMOVE_NUMBER_OPTION]: (state, index: number) => {
        const options = state.numberOptions;
        options.splice(index, 1);
        state.numberOptions = [...options];
        return { ...state };
    },
    [MainTypes.RESET_NUMBER]: state => {
        const options = getFranceCitiesOptions();
        state.numberOptions = [...options];
        return { ...state };
    },
    // Emphasizer
    [MainTypes.EMPHASIZER_UPDATE_PROPS]: (state, props: EmphasizerStateProps) => {
        state.emphasizerProps = { ...props };
        return { ...state };
    },
    [MainTypes.EMPHASIZER_RESET_PROPS]: state => {
        state.emphasizerProps = getDefaultEmphasizerProps();
        return { ...state };
    },
    [MainTypes.EMPHASIZER_RESET_OPTIONS]: state => {
        state.emphasizerOptions = getEuStatesOptions();
        return { ...state };
    },
    [MainTypes.EMPHASIZER_UPDATE_OPTIONS]: (state, options: EuStateOption[]) => {
        state.emphasizerOptions = [...options];
        return { ...state };
    },
});
