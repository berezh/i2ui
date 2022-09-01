import React, { useEffect, createContext, useContext, useState, useCallback, MouseEvent } from 'react';

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
}

export const MouseProvider: React.FC<Props> = ({ children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouse = useCallback((el: HTMLElement, { pageX, pageY }: MouseEvent) => {
    setPosition({ x: pageX, y: pageY });
  }, []);

  useEffect(() => {
    if (window) {
      window.document.body.addEventListener('mousemove', handleMouse as any);
      return () => {
        window.document.body.removeEventListener('mousemove', handleMouse as any);
      };
    }
  }, [handleMouse]);

  return <ThemeContext.Provider value={position}>{children}</ThemeContext.Provider>;
};

export const useMouse = (): MousePosition => {
  return useContext(ThemeContext);
};
