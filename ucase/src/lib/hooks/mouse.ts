import { RefObject, useMemo, useState } from 'react';
import { useMouse } from '../../components/mouse-provider';

export interface MouseElementMeta {
  distance: number;
}

export function useMouseMeta(element: HTMLElement|null): MouseElementMeta {
  const position = useMouse();
  return useMemo<MouseElementMeta>(()=>{
    if (element) {
      const { x, y, width, height } = element.getBoundingClientRect();
      const oX = Math.floor(x + width / 2);
      const oY = Math.floor(y + height / 2);
  
      const d = Math.sqrt(Math.abs(Math.pow(position.x - oX, 2) + Math.pow(position.y - oY, 2)));
      return { distance: Math.floor(d) };
    }
    return {distance: 0};
  }, [element, position]);
}
