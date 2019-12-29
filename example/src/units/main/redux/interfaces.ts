import { TagProps, TagCloudOrder, I2NumberVerticalAlignProps } from '../../../i2ui';
import { EuStateOption } from '../../../interfaces';

export interface NumberStateProps {
    fromStyle: React.CSSProperties;
    toStyle: React.CSSProperties;
    decimalDigits?: number;
    groupDigits?: number;
    basicMaxValue?: number;
    verticalAlign?: I2NumberVerticalAlignProps;
    groupSeparator?: string;
    decimalSeparator?: string;
}

export interface TagStateProps {
    fromStyle: React.CSSProperties;
    toStyle: React.CSSProperties;
    order?: TagCloudOrder;
}

export interface CriteriaProps {
    fromStyle: React.CSSProperties;
    toStyle: React.CSSProperties;
    fromIconSize: number;
    toIconSize: number;
}

export interface EmphasizerStateProps {
    population: CriteriaProps;
    area: CriteriaProps;
    gdpTotal: CriteriaProps;
    gdpCapital: CriteriaProps;
}

export interface MainState {
    emphasizerOptions: EuStateOption[];
    emphasizerProps: EmphasizerStateProps;
    tagOptions: TagProps[];
    tagProps: TagStateProps;
    numberOptions: TagProps[];
    numberProps: NumberStateProps;
}

export interface UpdateTagParams {
    index: number;
    name: string;
    rate: number;
}
