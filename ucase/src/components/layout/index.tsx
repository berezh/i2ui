import React, { MouseEvent } from 'react';
import s from './index.module.scss';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const Layout: React.FC<Props> = ({ children, className, onMouseMove }) => {
  return (
    <div className={classNames(s.root, className)} onMouseMove={onMouseMove}>
      <div className={s.menu}>
        <a href="/">Counter</a>
        <a href="/direction">Direction</a>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
