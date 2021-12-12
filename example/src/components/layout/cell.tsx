import React from 'react';
import { LayoutUtil } from './util';

export interface CellProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    fixed?: boolean;
    innerSpacing?: number;
}

interface InternalProps extends CellProps {
    isLast?: boolean;
    isFirst?: boolean;
    isCell: boolean;
}

export const Cell: React.FC<CellProps> = (props) => {
    const { className, style, children } = props;
    const { fixed, innerSpacing, isLast } = props as InternalProps;
    const css: React.CSSProperties = {
        ...{
            flex: fixed === true ? undefined : 1,
            marginRight: innerSpacing && !isLast ? innerSpacing : undefined,
        },
        ...style,
    };

    return (
        <div className={className} style={css}>
            {LayoutUtil.extend(children, (x) => x.isGrid, { innerSpacing })}
        </div>
    );
};
