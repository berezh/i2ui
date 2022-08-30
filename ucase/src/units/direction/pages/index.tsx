import React, { MouseEvent, useCallback, useState, useRef, useEffect } from 'react';
import { Layout } from '../../../components/layout';

import s from './index.module.css';

interface CursorPosition {
  x: number;
  y: number;
}

export function DirectionPage() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [distance, setDistance] = useState(0);
  const handleMouse = useCallback(({ pageX, pageY }: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: pageX, y: pageY });
  }, []);

  const objectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (objectRef.current) {
      const { x, y, width, height } = objectRef.current.getBoundingClientRect();
      const oX = Math.floor(x + width / 2);
      const oY = Math.floor(y + height / 2);

      const d = Math.sqrt(Math.abs(Math.pow(position.x - oX, 2) + Math.pow(position.y - oY, 2)));
      setDistance(Math.floor(d));
    }
  }, [objectRef, position]);

  return (
    <Layout onMouseMove={handleMouse}>
      <div className={s.root}>
        <div ref={objectRef} className={s.object}>
          {distance}
        </div>
        <div className={s.position}>{`X:${position.x} Y:${position.y}`}</div>
      </div>
    </Layout>
  );
}
