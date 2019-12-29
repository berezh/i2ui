import { Action } from '.';

function baseAction(type: string): Action;
function baseAction<T = undefined>(type: string, payload: T): Action<T>;
function baseAction(type: string, payload?: any): any {
    if (payload) {
        return { type, payload };
    } else {
        return { type };
    }
}

export const BaseActions = {
    baseAction,
};
