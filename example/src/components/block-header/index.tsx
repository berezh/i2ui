import React from 'react';
import './index.scss';

interface Props {
    children: React.ReactNode;
}

export const BlockHeader: React.FC<Props> = props => {
    const { children } = props;
    return <div className="block-header">{children}</div>;
};
