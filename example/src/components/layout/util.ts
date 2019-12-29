import React from 'react';

export class LayoutUtil {
    public static validateChildrenType<TProps = any>(
        children: React.ReactNode,
        accessor: (props: TProps) => boolean | undefined,
        exceptionText: string,
    ): void {
        React.Children.toArray(children).forEach(x => {
            const child = x as any;
            if (child && child.props) {
                if (accessor(child.props) !== true) {
                    throw exceptionText;
                }
            } else {
                throw exceptionText;
            }
        });
    }

    public static extendChildren(children: React.ReactNode, extendProps: any): any[] {
        const childrenSet = React.Children.toArray(children);
        return childrenSet.map((child, index) => {
            const isFirst = index === 0;
            const isLast = index === childrenSet.length - 1;
            return React.cloneElement(child as any, { isFirst, isLast, ...extendProps });
        });
    }

    public static extend<TProps = any>(
        children: React.ReactNode,
        condition: (props: TProps) => boolean | undefined,
        extendProps: any,
    ): any[] {
        const childrenSet = React.Children.toArray(children);
        return childrenSet.map(child => {
            if (LayoutUtil.hasProperty(child, condition)) {
                return React.cloneElement(child as any, extendProps);
            } else {
                return child;
            }
        });
    }

    public static hasProperty<TProps = any>(
        child: any,
        condition: (props: TProps) => boolean | undefined,
    ): boolean | undefined {
        if (child && child.props) {
            return condition(child.props);
        } else {
            return false;
        }
    }
}
