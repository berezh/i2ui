import React from 'react';
import { LayoutUtil } from './util';

export interface RowProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface InternalProps extends RowProps {
    innerSpacing?: number;
    isLast?: boolean;
    isFirst?: boolean;
    isRow: boolean;
}

export class Row extends React.Component<RowProps> {
    constructor(props: RowProps) {
        super(props);
        this.extendStyle = this.extendStyle.bind(this);
    }

    static defaultProps: Partial<InternalProps> = {
        isRow: true,
    };

    private style: React.CSSProperties = {
        display: 'flex',
        flex: 1,
    };

    public render(): React.ReactNode {
        const { className, style, children, innerSpacing } = this.props as InternalProps;
        const css = this.extendStyle({ ...this.style, ...style });

        LayoutUtil.validateChildrenType(children, (x) => x.isCell, 'Children type must be `Cell`');
        return (
            <div className={className} style={css}>
                {LayoutUtil.extendChildren(children, { innerSpacing })}
            </div>
        );
    }

    private extendStyle(style: React.CSSProperties): React.CSSProperties {
        const { innerSpacing, isLast } = this.props as InternalProps;
        if (innerSpacing && !isLast) {
            style.marginBottom = innerSpacing;
        }
        return style;
    }
}
