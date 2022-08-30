import React from 'react';
import s from './index.module.scss';

interface Props{
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}) => {
    return <div className={s.root}>
        {children}
    </div>
} 