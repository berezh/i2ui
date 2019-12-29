import React from 'react';
import './index.scss';

interface ControlLineProps {
    children: React.ReactNode;
    label: string;
}

export const ControlLine: React.FC<ControlLineProps> = props => {
    const { children, label } = props;
    return (
        <div className="control-line">
            <div className="control-line__label">{label}</div>
            {children}
        </div>
    );
};
