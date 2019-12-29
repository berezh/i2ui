import { PanelOrientation } from './panel';

interface MediaQueryConditions {
    minWidth?: number;
    maxWidth?: number;
    minHeigth?: number;
    maxHeigth?: number;
}

export interface MediaQueryOptions extends MediaQueryConditions {
    style?: React.CSSProperties;
    className?: string;
    orientation?: PanelOrientation;
    spacing?: number;
}

export function getMatchedOptions(
    width: number,
    heigth: number,
    conditions: MediaQueryOptions | MediaQueryOptions[],
): undefined | MediaQueryOptions {
    if (Array.isArray(conditions)) {
        let result: MediaQueryOptions = {};
        conditions.map(x => {
            result = { ...result, ...getSingleMatchedOptions(width, heigth, x) };
        });
    } else {
        return getSingleMatchedOptions(width, heigth, conditions);
    }

    return undefined;
}

function getSingleMatchedOptions(
    width: number,
    heigth: number,
    conditions: MediaQueryOptions,
): undefined | MediaQueryOptions {
    const result: boolean[] = [];
    if (conditions.minWidth) {
        result.push(conditions.minWidth >= width);
    }
    if (conditions.maxWidth) {
        result.push(conditions.maxWidth <= width);
    }
    if (conditions.minHeigth) {
        result.push(conditions.minHeigth >= heigth);
    }
    if (conditions.maxHeigth) {
        result.push(conditions.maxHeigth <= heigth);
    }

    if (result.length > 0 && result.filter(x => x === true).length === result.length) {
        return conditions;
    }
}
