import React, { useEffect, createContext, useContext, useState, useCallback, MouseEvent, useLayoutEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

const ThemeContext = createContext<MousePosition>({
  x: 0,
  y: 0,
});

interface Props {
  children: React.ReactNode;
  className?: string;
}

const POSITION_DEFAULT: MousePosition = {x: 0, y: 0};

export const MouseProvider: React.FC<Props> = ({ children, className }) => {
  const [position, setPosition] = useState<MousePosition>(POSITION_DEFAULT);

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

export const useMouse = (): MousePosition => {
  return useContext(ThemeContext);
};
