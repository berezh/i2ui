import { useMemo } from 'react';
import { Point, useMouse } from '../../components/mouse-provider';
import { useDebounce } from './general';

export interface MouseElementMeta {
  distance: number;
  ratio:number;
}

function getDistance(mouse: Point, element: Point){  
  return Math.floor(Math.sqrt(Math.abs(Math.pow(mouse.x - element.x, 2) + Math.pow(mouse.y - element.y, 2))));
}

export function useMouseMeta(elementNode: HTMLElement|null): MouseElementMeta {
  const mouse = useMouse();
  const element = useMemo<Point>(()=>{
    if (elementNode) {
      const {x, y, width, height} =  elementNode.getBoundingClientRect();
      return {
        x: Math.floor(x + width / 2),
        y: Math.floor(y + height / 2)
      }
    }
    return {x: 0, y: 0};
  }, [elementNode, mouse]);

  const prev = useDebounce({
    mouse,
    element
  }, 200);

  const distance = getDistance(mouse, element);
  
  const ratio = useMemo(()=>{
    const prevDistance = getDistance(prev.mouse, prev.element);
    const mousePassed = getDistance(mouse, prev.mouse);
    const distanceDelta = distance - prevDistance;

    return mousePassed>0? distanceDelta / mousePassed: 0;
  }, [prev, mouse, element, distance]);

  return {distance, ratio};
}
