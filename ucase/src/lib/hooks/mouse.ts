import { RefObject, useState } from 'react';
import { useMouse } from '../../components/mouse-provider';

export interface MouseElementMeta {
  distance: number;
}

export function useMouseMeta(ref: RefObject<HTMLElement>): MouseElementMeta {
  const position = useMouse();
  const [meta, setMeta] = useState<MouseElementMeta>({ distance: 0 });
  if (ref?.current) {
    const { x, y, width, height } = ref.current.getBoundingClientRect();
    const oX = Math.floor(x + width / 2);
    const oY = Math.floor(y + height / 2);

    const d = Math.sqrt(Math.abs(Math.pow(position.x - oX, 2) + Math.pow(position.y - oY, 2)));
    setMeta({ distance: Math.floor(d) });
  }

  return meta;
}
