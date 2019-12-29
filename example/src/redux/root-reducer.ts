import { combineReducers, Reducer } from 'redux';
import { MainReducer } from '../units/main/redux';
import { GlobalState } from '../interfaces';

export function createRootReducer(): Reducer<GlobalState> {
    return combineReducers({
        main: MainReducer,
    });
}
