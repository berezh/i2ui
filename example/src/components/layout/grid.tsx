import React from 'react';
import { LayoutUtil } from './util';
import { withResizeDetector } from 'react-resize-detector';
import { MediaQueryOptions, getMatchedOptions } from './media-query';

interface SizeProps {
    width: number;
    height: number;
}

export interface GridProps extends SizeProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    spacing?: number;
    mediaQuery?: MediaQueryOptions | MediaQueryOptions[];
}

interface InternalProps extends GridProps {
    innerSpacing?: number;
    isGrid: boolean;
}

class Component extends React.Component<GridProps> {
    constructor(props: GridProps) {
        super(props);
        this.getProps = this.getProps.bind(this);
    }

    static defaultProps: Partial<InternalProps> = {
        isGrid: true,
    };

    private style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    public render(): React.ReactNode {
        const { className, style, children, spacing } = this.getProps();

        LayoutUtil.validateChildrenType(children, (x) => x.isRow, 'Children type must be `Row`');

        return (
            <div className={className} style={{ ...this.style, ...style }}>
                {LayoutUtil.extendChildren(children, { innerSpacing: spacing })}
            </div>
        );
    }

    private getProps(): GridProps {
        const { mediaQuery, width, height } = this.props;
        if (mediaQuery) {
            const options = getMatchedOptions(width, height, mediaQuery);
            return { ...this.props, ...(options as any) };
        }

        return this.props;
    }
}

export const Grid = withResizeDetector(Component as any, {
    // querySelector: undefined,
    // refreshMode: "debounce",
    // refreshRate: 100,
});
