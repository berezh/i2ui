import React, { useEffect, createContext, useContext, useState, useCallback, MouseEvent, useLayoutEffect } from 'react';

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

export const MouseProvider: React.FC<Props> = ({ children, className }) => {
  const [position, setPosition] = useState<Point>(POSITION_DEFAULT);

  const handleMouse = useCallback((e: MouseEvent) => {
    const { pageX, pageY } = e;
    setPosition({ x: pageX, y: pageY });
  }, []);

  // useEffect(() => {
  //   if (window) {
  //     window.document.body.addEventListener('mousemove', handleMouse as any);
  //     return () => {
  //       window.document.body.removeEventListener('mousemove', handleMouse as any);
  //     };
  //   }
  // }, [handleMouse]);

  return <ThemeContext.Provider value={position}><div className={className} onMouseMove={handleMouse}>{children}</div></ThemeContext.Provider>;
};

export const useMouse = (): Point => {
  return useContext(ThemeContext);
};
