export interface Option<T = string> {
    value: T;
    name: string;
}

export interface SelectOption extends Option<string> {
    disabled?: boolean;
}

export interface EuStateOption {
    name: string;
    population: number;
    area: number;
    gdpTotal: number;
    gdpCapital: number;
}

export interface IndexEuStateOption extends EuStateOption {
    index: number;
}
