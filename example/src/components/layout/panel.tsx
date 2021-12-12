import React from 'react';
import { LayoutUtil } from './util';

export type PanelOrientation = 'horizontal' | 'vertical';

export interface PanelProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    orientation?: PanelOrientation;
}

interface InternalProps extends PanelProps {
    innerSpacing?: number;
    isLast?: boolean;
    isFirst?: boolean;
    isPanel: boolean;
}

export class Panel extends React.Component<PanelProps> {
    constructor(props: PanelProps) {
        super(props);
        this.extendStyle = this.extendStyle.bind(this);
    }

    static defaultProps: Partial<InternalProps> = {
        isPanel: true,
    };

    private style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
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
