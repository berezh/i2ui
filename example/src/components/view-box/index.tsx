import React from 'react';
import './index.scss';

interface Props {
    children: React.ReactNode;
}

export const ViewBox: React.FC<Props> = (props) => {
    const { children } = props;
    return <div className="view-box">{children}</div>;
};
