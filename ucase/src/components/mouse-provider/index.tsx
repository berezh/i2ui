import React, { useEffect, createContext, useContext, useState, useCallback, MouseEvent, useLayoutEffect } from 'react';
import s from './index.module.scss';

export interface Point {
  x: number;
  y: number;
}

const ThemeContext = createContext<Point>({
  x: 0,
  y: 0,
});

interface Props {
  children: React.ReactNode;
  className?: string;
}

const POSITION_DEFAULT: Point = {x: 0, y: 0};

export const MousePositionProvider: React.FC<Props> = ({ children, className }) => {
  const [position, setPosition] = useState<Point>(POSITION_DEFAULT);

  const handleMouse = useCallback((e: MouseEvent) => {
    const { pageX, pageY } = e;
    setPosition({ x: pageX, y: pageY });
  }, []);

  return <ThemeContext.Provider value={position}><div className={s.root} onMouseMove={handleMouse}>{children}</div></ThemeContext.Provider>;
};

export const useMousePosition = (): Point => {
  return useContext(ThemeContext);
};
