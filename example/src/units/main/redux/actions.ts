import { BaseActions } from '../../../redux/actions';
import { MainTypes } from './types';
import { UpdateTagParams, NumberStateProps, TagStateProps, EmphasizerStateProps } from './interfaces';
import { TagProps } from '../../../i2ui';
import { EuStateOption } from '../../../interfaces';

export const MainActions = {
    // tag
    updateTagProps: (params: TagStateProps) => BaseActions.baseAction(MainTypes.TAG_UPDATE_PROPS, params),
    resetTagProps: () => BaseActions.baseAction(MainTypes.TAG_RESET_PROPS),
    addTagOption: (tag?: TagProps) => BaseActions.baseAction(MainTypes.ADD_TAG_OPTION, tag),
    updateTagOption: (params: UpdateTagParams) => BaseActions.baseAction(MainTypes.UPDATE_TAG_OPTION, params),
    removeTagOption: (index: number) => BaseActions.baseAction(MainTypes.REMOVE_TAG_OPTION, index),
    resetTag: () => BaseActions.baseAction(MainTypes.RESET_TAG),
    // number
    updateNumberProps: (params: NumberStateProps) => BaseActions.baseAction(MainTypes.NUMBER_UPDATE_PROPS, params),
    resetNumberProps: () => BaseActions.baseAction(MainTypes.NUMBER_RESET_PROPS),
    updateNumberOption: (params: UpdateTagParams) => BaseActions.baseAction(MainTypes.NUMBER_UPDATE_PROPS, params),
    removeNumberOption: (index: number) => BaseActions.baseAction(MainTypes.REMOVE_NUMBER_OPTION, index),
    addNumberOption: (tag?: TagProps) => BaseActions.baseAction(MainTypes.ADD_NUMBER_OPTION, tag),
    resetNumber: () => BaseActions.baseAction(MainTypes.RESET_NUMBER),
    // emphasizer
    updateEmphasizerProps: (params: EmphasizerStateProps) =>
        BaseActions.baseAction(MainTypes.EMPHASIZER_UPDATE_PROPS, params),
    resetEmphasizerProps: () => BaseActions.baseAction(MainTypes.EMPHASIZER_RESET_PROPS),
    updateEmphasizerOptions: (options: EuStateOption[]) =>
        BaseActions.baseAction(MainTypes.EMPHASIZER_UPDATE_OPTIONS, options),
    resetEmphasizerOptions: () => BaseActions.baseAction(MainTypes.EMPHASIZER_RESET_OPTIONS),
};
